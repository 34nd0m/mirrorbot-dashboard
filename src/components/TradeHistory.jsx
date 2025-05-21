import { useState } from 'react';

export default function TradeHistory() {
  const [history] = useState([
    { timestamp: "10:02:13", type: "BUY", amount: "0.01 ETH" },
    { timestamp: "10:15:47", type: "SELL", amount: "45 USDC" },
  ]);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">📜 Trade History</h2>
      <ul className="text-sm text-gray-700 space-y-1">
        {history.map((tx, i) => (
          <li key={i}>{tx.timestamp} - {tx.type}: {tx.amount}</li>
        ))}
      </ul>
    </div>
  );
}
