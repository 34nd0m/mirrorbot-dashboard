import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const erc20Abi = [
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)"
];

export default function BalanceBox({ rpcUrl, targetWallet, watchMode = "ETH", tokenAddress = "" }) {
  const [balance, setBalance] = useState("...");
  const [symbol, setSymbol] = useState(watchMode === "ETH" ? "ETH" : "");

  useEffect(() => {
    const provider = new ethers.JsonRpcProvider(rpcUrl);

    async function fetchBalance() {
      try {
        if (watchMode === "ETH") {
          const bal = await provider.getBalance(targetWallet);
          setBalance(ethers.formatEther(bal));
          setSymbol("ETH");
        } else {
          const token = new ethers.Contract(tokenAddress, erc20Abi, provider);
          const [bal, decimals, sym] = await Promise.all([
            token.balanceOf(targetWallet),
            token.decimals(),
            token.symbol()
          ]);
          setBalance((Number(bal) / 10 ** decimals).toFixed(4));
          setSymbol(sym);
        }
      } catch (err) {
        console.error("Error fetching balance:", err);
        setBalance("Error");
      }
    }

    fetchBalance();
    const interval = setInterval(fetchBalance, 30000);
    return () => clearInterval(interval);
  }, [rpcUrl, targetWallet, watchMode, tokenAddress]);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-lg font-semibold">🧾 Live Wallet Balance</h2>
      <p className="text-3xl mt-3">{balance} {symbol}</p>
    </div>
  );
}
