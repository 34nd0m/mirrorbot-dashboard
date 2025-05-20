import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const rpcUrl = "https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID"; // Replace with your Infura ID
const targetWallet = "0xYourTargetWallet"; // Replace with the wallet to watch
const tokenAddress = "0xYourTokenAddress"; // Needed if watchMode is TOKEN
const watchMode = "ETH"; // ETH or TOKEN

const erc20Abi = [
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)"
];

export default function BalanceBox() {
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
        setBalance("Error");
        console.error(err);
      }
    }

    fetchBalance();
    const interval = setInterval(fetchBalance, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded shadow p-4 mt-6">
      <h2 className="text-lg font-semibold">Live Balance</h2>
      <p className="text-2xl mt-2">{balance} {symbol}</p>
    </div>
  );
}
