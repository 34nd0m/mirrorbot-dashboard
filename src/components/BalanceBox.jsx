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
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const provider = new ethers.JsonRpcProvider(rpcUrl);

    async function fetchBalance() {
      try {
        let displayBalance, sym;
        if (watchMode === "ETH") {
          const bal = await provider.getBalance(targetWallet);
          displayBalance = ethers.formatEther(bal);
          sym = "ETH";
        } else {
          const token = new ethers.Contract(tokenAddress, erc20Abi, provider);
          const [rawBal, decimals, tokenSym] = await Promise.all([
            token.balanceOf(targetWallet),
            token.decimals(),
            token.symbol()
          ]);
          displayBalance = (Number(rawBal) / 10 ** decimals).toFixed(4);
          sym = tokenSym;
        }

        setBalance(displayBalance);
        setSymbol(sym);
        setHistory(prev => [...prev.slice(-9), { timestamp: new Date().toLocaleTimeString(), value: displayBalance }]);
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

      <div className="mt-4">
        <h3 className="text-md font-semibold mb-2">Last 10 Balances</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          {history.map((entry, idx) => (
            <li key={idx}>{entry.timestamp}: {entry.value} {symbol}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
