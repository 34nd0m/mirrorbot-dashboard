import React, { useState } from 'react';

export default function App() {
  const [buyEnabled, setBuyEnabled] = useState(true);
  const [sellEnabled, setSellEnabled] = useState(true);
  const [mode, setMode] = useState("TOKEN");

  return (
    <div className="p-8 font-sans">
      <h1 className="text-2xl font-bold mb-4">MirrorBot Dashboard</h1>

      <div className="space-y-4">
        <div>
          <label className="block font-semibold">Watch Mode:</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)} className="border rounded px-2 py-1">
            <option value="ETH">ETH</option>
            <option value="TOKEN">TOKEN</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Buy Mirroring:</label>
          <input type="checkbox" checked={buyEnabled} onChange={() => setBuyEnabled(!buyEnabled)} />
        </div>

        <div>
          <label className="block font-semibold">Sell Mirroring:</label>
          <input type="checkbox" checked={sellEnabled} onChange={() => setSellEnabled(!sellEnabled)} />
        </div>
      </div>
    </div>
  );
}
