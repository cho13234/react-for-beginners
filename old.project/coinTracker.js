import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [amount, setAmount] = useState("");
  const [selCoin, setSelCoin] = useState({});
  const onIptChange = (event) => setAmount(event.target.value);
  const onSelChange = (event) => {
    let coinId = event.target.value;
    let coinArr = coins.filter((coin) => coin.id === coinId);
    if (coinArr.length > 0) {
      setSelCoin(coinArr[0]);
    } else {
      setSelCoin({});
    }
  };
  console.log(selCoin, "is Selected Coin");
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    if (coins.length > 0) {
      setSelCoin(coins[0]);
    }
  }, [coins]);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <input
            type="number"
            placeholder="input amount that you want to buying. (USD)"
            value={amount}
            onChange={onIptChange}
          />
          {" USD "}
          <select
            placeholder="Select Coin"
            onChange={onSelChange}
            value={selCoin.id}
          >
            {coins.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.name} ({coin.symbol}): {coin.quotes.USD.price} $
              </option>
            ))}
          </select>
          {selCoin.id ? (
            <h3>
              You can buy : {amount / selCoin.quotes.USD.price} {selCoin.symbol}
            </h3>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default App;
