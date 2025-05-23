import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// Your contract ABI
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			}
		],
		"name": "addToWhitelist",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			}
		],
		"name": "removeFromWhitelist",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_bot",
				"type": "address"
			}
		],
		"name": "setAuthorizedBot",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amountInWei",
				"type": "uint256"
			}
		],
		"name": "setMaxTradeAmount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountOutMin",
				"type": "uint256"
			}
		],
		"name": "swapEthForToken",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenIn",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amountIn",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountOutMin",
				"type": "uint256"
			}
		],
		"name": "swapTokenForETH",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_uniswapRouter",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "direction",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountIn",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "tokenOut",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "TradeMirrored",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdrawETH",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdrawToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "authorizedBot",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxTradeAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "path",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "token1",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "uniswapRouter",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "whitelist",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

// Your deployed contract address
const contractAddress = "0x039AA82bFC4091dFB3A8bf50009c1d883F4C5806";

// Ethereum RPC URL
const rpcUrl = "https://sepolia.infura.io/v3/7bf402dad7654ae3b80e3a6063876a64";

export default function TradeHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    // Function to format timestamps
    const formatTimestamp = (timestamp) => new Date(timestamp * 1000).toLocaleTimeString();

    async function fetchPastEvents() {
      // Fetch historical events from the blockchain
      const filter = contract.filters.TradeExecuted(null);
      const events = await contract.queryFilter(filter, -10000); // Fetch last ~10,000 blocks

      const pastTrades = events.map(event => ({
        timestamp: formatTimestamp(event.blockNumber), // blockNumber used if no timestamp; better to fetch block timestamp
        type: event.args.tradeType,
        amount: ethers.formatEther(event.args.amount)
      }));

      setHistory(pastTrades.reverse()); // Most recent first
    }

    fetchPastEvents();

    // Listen for real-time TradeExecuted events
    contract.on("TradeExecuted", (user, amount, tradeType, event) => {
      const newTrade = {
        timestamp: formatTimestamp(Date.now() / 1000), // immediate timestamp
        type: tradeType,
        amount: ethers.formatEther(amount)
      };

      setHistory(prevHistory => [newTrade, ...prevHistory.slice(0, 9)]); // Keep only latest 10
    });

    return () => {
      contract.removeAllListeners("TradeExecuted"); // Cleanup on component unmount
    };
  }, []);

  return (
    <div className="mt-6 bg-white rounded-xl shadow-md p-6">
      <h2 className="text-lg font-semibold mb-2">📜 Real-Time Trade History</h2>
      <ul className="text-sm text-gray-700 space-y-1">
        {history.length === 0 && <li>No recent trades.</li>}
        {history.map((tx, i) => (
          <li key={i}>{tx.timestamp} - {tx.type}: {tx.amount} ETH</li>
        ))}
      </ul>
    </div>
  );
}

