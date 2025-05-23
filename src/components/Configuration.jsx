export default function Configuration({
  rpcUrl, setRpcUrl,
  watchMode, setWatchMode,
  targetWallet, setTargetWallet,
  tokenAddress, setTokenAddress,
  selectedDex, setSelectedDex
}) {
  return (
    <div className="mt-4 bg-gray-50 rounded-xl shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">⚙️ Configuration</h2>

      <div className="mb-3">
        <label className="block font-semibold">Ethereum RPC URL:</label>
        <input
          className="border px-2 py-1 rounded w-full"
          value={rpcUrl}
          onChange={(e) => setRpcUrl(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="block font-semibold">Target Wallet:</label>
        <input
          className="border px-2 py-1 rounded w-full"
          value={targetWallet}
          onChange={(e) => setTargetWallet(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="block font-semibold">Watch Mode:</label>
        <select
          className="border px-2 py-1 rounded w-full"
          value={watchMode}
          onChange={(e) => setWatchMode(e.target.value)}
        >
          <option value="ETH">ETH</option>
          <option value="TOKEN">TOKEN</option>
        </select>
      </div>

      {watchMode === "TOKEN" && (
        <div className="mb-3">
          <label className="block font-semibold">Token Address:</label>
          <input
            className="border px-2 py-1 rounded w-full"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
          />
        </div>
      )}

      <div className="mb-3">
        <label className="block font-semibold">Select DEX or Aggregator:</label>
        <select
          className="border px-2 py-1 rounded w-full"
          value={selectedDex}
          onChange={(e) => setSelectedDex(e.target.value)}
        >
          <option value="UniswapV3">Uniswap V3</option>
          <option value="UniswapV2">Uniswap V2</option>
          <option value="1inch">1inch Aggregator</option>
          <option value="Paraswap">Paraswap</option>
        </select>
      </div>
    </div>
  );
}
