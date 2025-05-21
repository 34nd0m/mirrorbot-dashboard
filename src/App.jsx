import { useState } from 'react';
import BalanceBox from './components/BalanceBox';
import MirrorToggle from './components/MirrorToggle';
import TradeHistory from './components/TradeHistory';
import DexPrice from './components/DexPrice';

export default function App() {
  const [rpcUrl] = useState("https://sepolia.infura.io/v3/7bf402dad7654ae3b80e3a6063876a64");
  const [watchMode, setWatchMode] = useState("ETH");
  const [targetWallet, setTargetWallet] = useState("0x13CB6AE34A13a0977F4d7101eBc24B87Bb23F0d5");
  const [tokenAddress, setTokenAddress] = useState("0x397a59aA02eB65702E5DAdDd5967bbe1979F9aC3");

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-6">MirrorBot Dashboard</h1>

      <MirrorToggle />
      <div className="my-4">
        <label className="block font-semibold">Watch Mode:</label>
        <select className="border px-2 py-1 rounded" value={watchMode} onChange={e => setWatchMode(e.target.value)}>
          <option value="ETH">ETH</option>
          <option value="TOKEN">TOKEN</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Target Wallet:</label>
        <input className="border px-2 py-1 rounded w-full" value={targetWallet} onChange={e => setTargetWallet(e.target.value)} />
      </div>

      {watchMode === "TOKEN" && (
        <div className="mb-4">
          <label className="block font-semibold">Token Address:</label>
          <input className="border px-2 py-1 rounded w-full" value={tokenAddress} onChange={e => setTokenAddress(e.target.value)} />
        </div>
      )}

      <BalanceBox rpcUrl={rpcUrl} targetWallet={targetWallet} watchMode={watchMode} tokenAddress={tokenAddress} />
      <DexPrice tokenAddress={tokenAddress} />
      <TradeHistory />
    </div>
  );
}
