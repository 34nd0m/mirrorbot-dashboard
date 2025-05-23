import { useState } from 'react';
import BalanceBox from './components/BalanceBox';
import MirrorToggle from './components/MirrorToggle';
import TradeHistory from './components/TradeHistory';
import DexPrice from './components/DexPrice';
import Configuration from './components/Configuration';

export default function App() {
  const [rpcUrl] = useState("https://sepolia.infura.io/v3/7bf402dad7654ae3b80e3a6063876a64");
  const [watchMode, setWatchMode] = useState("ETH");
  const [targetWallet, setTargetWallet] = useState("0x13CB6AE34A13a0977F4d7101eBc24B87Bb23F0d5");
  const [tokenAddress, setTokenAddress] = useState("0x397a59aA02eB65702E5DAdDd5967bbe1979F9aC3");
  const [selectedDex, setSelectedDex] = useState("UniswapV3");

  return (
    <div className="p-6 font-sans max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">MirrorBot Dashboard</h1>

      <MirrorToggle />

      <Configuration
        rpcUrl={rpcUrl} setRpcUrl={setRpcUrl}
        watchMode={watchMode} setWatchMode={setWatchMode}
        targetWallet={targetWallet} setTargetWallet={setTargetWallet}
        tokenAddress={tokenAddress} setTokenAddress={setTokenAddress}
        selectedDex={selectedDex} setSelectedDex={setSelectedDex}
      />

      <BalanceBox rpcUrl={rpcUrl} targetWallet={targetWallet} watchMode={watchMode} tokenAddress={tokenAddress} />
      <DexPrice tokenAddress={tokenAddress} />
      <TradeHistory />
    </div>
  );
}
