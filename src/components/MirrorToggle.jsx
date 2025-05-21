import { useState } from 'react';

export default function MirrorToggle() {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="mb-4">
      <label className="font-semibold mr-2">🔁 Mirroring:</label>
      <button
        className={`px-4 py-1 rounded text-white ${enabled ? 'bg-green-500' : 'bg-gray-400'}`}
        onClick={() => setEnabled(!enabled)}
      >
        {enabled ? "Enabled" : "Disabled"}
      </button>
    </div>
  );
}
