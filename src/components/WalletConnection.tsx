import React, { useState, useEffect } from 'react';
import { Wallet, WalletCards, Coins, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface WalletConnectionProps {
  onBetPlaced: (amount: number) => void;
  tokens: number;
}

export const WalletConnection: React.FC<WalletConnectionProps> = ({ onBetPlaced, tokens }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [balance, setBalance] = useState<string>('0');
  const [betAmount, setBetAmount] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setIsConnected(true);
          setWalletAddress(accounts[0]);
          await getBalance(accounts[0]);
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      toast({
        title: "MetaMask Not Found",
        description: "Please install MetaMask to connect your wallet",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts.length > 0) {
        setIsConnected(true);
        setWalletAddress(accounts[0]);
        await getBalance(accounts[0]);
        
        toast({
          title: "🎉 Wallet Connected!",
          description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`
        });
      }
    } catch (error: any) {
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getBalance = async (address: string) => {
    try {
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address, 'latest']
      });
      
      // Convert from Wei to ETH
      const balanceInEth = parseInt(balance, 16) / Math.pow(10, 18);
      setBalance(balanceInEth.toFixed(4));
    } catch (error) {
      console.error('Error getting balance:', error);
    }
  };

  const placeBet = async () => {
    if (!isConnected || betAmount <= 0) return;

    setIsLoading(true);
    try {
      // Sign a message to place bet (simulation)
      const message = `Betting ${betAmount} tokens on Cricket Arena Masters game`;
      
      await window.ethereum.request({
        method: 'personal_sign',
        params: [message, walletAddress]
      });

      onBetPlaced(betAmount);
      
      toast({
        title: "🎯 Bet Placed!",
        description: `Successfully bet ${betAmount} tokens. Good luck!`
      });
      
    } catch (error: any) {
      toast({
        title: "Bet Failed",
        description: error.message || "Failed to place bet",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
    setBalance('0');
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected"
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Crypto Wallet
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isConnected ? (
          <div className="text-center space-y-4">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <WalletCards className="h-12 w-12" />
              <p>Connect your wallet to place bets</p>
            </div>
            <Button 
              onClick={connectWallet} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Connecting..." : "Connect MetaMask"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Wallet Info */}
            <div className="p-3 bg-secondary/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Address:</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={disconnectWallet}
                  className="h-6 px-2 text-xs"
                >
                  Disconnect
                </Button>
              </div>
              <p className="font-mono text-sm">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</p>
              <div className="flex justify-between mt-2 text-sm">
                <span>ETH Balance:</span>
                <span>{balance} ETH</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Game Tokens:</span>
                <span className="flex items-center gap-1">
                  <Coins className="h-3 w-3" />
                  {tokens.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Betting */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Bet Amount (Tokens)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(Number(e.target.value))}
                  min="1"
                  max={tokens}
                  className="flex-1 px-3 py-2 border rounded-md bg-background"
                />
                <Button
                  onClick={placeBet}
                  disabled={isLoading || betAmount > tokens || betAmount <= 0}
                  className="shrink-0"
                >
                  {isLoading ? "Placing..." : "Place Bet"}
                </Button>
              </div>
              <div className="flex gap-2">
                {[50, 100, 250, 500].map(amount => (
                  <Button
                    key={amount}
                    variant="outline"
                    size="sm"
                    onClick={() => setBetAmount(amount)}
                    disabled={amount > tokens}
                    className="flex-1"
                  >
                    {amount}
                  </Button>
                ))}
              </div>
            </div>

            {/* Warning */}
            <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400">
              <AlertCircle className="h-4 w-4" />
              <span>This is a demo. No real cryptocurrency is involved.</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};