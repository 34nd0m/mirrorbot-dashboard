import { useState } from 'react';
import BalanceBox from './components/BalanceBox';

export default function App() {
  const [rpcUrl] = useState("https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID");
  const [watchMode, setWatchMode] = useState("ETH");
  const [targetWallet, setTargetWallet] = useState("0x0000000000000000000000000000000000000000");
  const [tokenAddress, setTokenAddress] = useState("0x0000000000000000000000000000000000000000");

  return (
    <div className="p-8 font-sans">
      <h1 className="text-2xl font-bold mb-4">MirrorBot Dashboard</h1>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block font-semibold">Watch Mode:</label>
          <select
            className="border px-2 py-1 rounded"
            value={watchMode}
            onChange={(e) => setWatchMode(e.target.value)}
          >
            <option value="ETH">ETH</option>
            <option value="TOKEN">TOKEN</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Target Wallet:</label>
          <input
            type="text"
            className="border px-2 py-1 rounded w-full"
            placeholder="0x..."
            value={targetWallet}
            onChange={(e) => setTargetWallet(e.target.value)}
          />
        </div>

        {watchMode === "TOKEN" && (
          <div>
            <label className="block font-semibold">Token Address:</label>
            <input
              type="text"
              className="border px-2 py-1 rounded w-full"
              placeholder="0x..."
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
            />
          </div>
        )}
      </div>

      {targetWallet && (watchMode === "ETH" || (watchMode === "TOKEN" && tokenAddress)) && (
        <BalanceBox
          rpcUrl={rpcUrl}
          targetWallet={targetWallet}
          watchMode={watchMode}
          tokenAddress={tokenAddress}
        />
      )}
    </div>
  );
}
