import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DexPrice({ tokenAddress }) {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    if (!tokenAddress || tokenAddress === "0x0000000000000000000000000000000000000000") return;

    const fetchPrice = async () => {
      try {
        const res = await axios.get(`https://api.coingecko.com/api/v3/simple/token_price/ethereum`, {
          params: {
            contract_addresses: tokenAddress,
            vs_currencies: 'usd'
          }
        });
        const priceVal = res.data[tokenAddress.toLowerCase()]?.usd;
        setPrice(priceVal ? `$${priceVal}` : "N/A");
      } catch (err) {
        setPrice("Error");
      }
    };

    fetchPrice();
  }, [tokenAddress]);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold">📈 DEX Price Info</h2>
      <p className="text-2xl">{price || "Loading..."}</p>
    </div>
  );
}
