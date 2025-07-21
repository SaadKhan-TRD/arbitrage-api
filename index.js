import express from 'express';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;

const exchanges = {
  binance: async () => (await axios.get("https://api.binance.com/api/v3/ticker/price?symbol=BTTUSDT")).data.price,
  kucoin: async () => (await axios.get("https://api.kucoin.com/api/v1/market/orderbook/level1?symbol=BTT-USDT")).data.price,
  okx: async () => (await axios.get("https://www.okx.com/api/v5/market/ticker?instId=BTT-USDT")).data.data[0].last,
  bitget: async () => (await axios.get("https://api.bitget.com/api/spot/v1/market/ticker?symbol=BTTUSDT_SPBL")).data.data[0].close,
  bybit: async () => (await axios.get("https://api.bybit.com/v5/market/tickers?category=spot&symbol=BTTUSDT")).data.result.list[0].lastPrice,
  bingx: async () => (await axios.get("https://api-swap-rest.bingbon.pro/api/v1/market/spot/ticker?symbol=BTT-USDT")).data.data[0].last_price,
  kraken: async () => (await axios.get("https://api.kraken.com/0/public/Ticker?pair=BTTUSDT")).data.result.BTTUSDT.c[0],
  coinex: async () => (await axios.get("https://api.coinex.com/v1/market/ticker?market=BTTUSDT")).data.data.ticker.last,
  htx: async () => (await axios.get("https://api.huobi.pro/market/detail/merged?symbol=bttusdt")).data.tick.close,
  cexio: async () => (await axios.get("https://cex.io/api/ticker/BTT/USDT")).data.last,
  mexc: async () => (await axios.get("https://api.mexc.com/api/v3/ticker/price?symbol=BTTUSDT")).data.price,
  gate: async () => (await axios.get("https://api.gate.io/api/v4/spot/tickers?currency_pair=BTT_USDT")).data[0].last,
  lbank: async () => (await axios.get("https://api.lbkex.com/v2/ticker/24hr.do?symbol=btt_usdt")).data.ticker.latest
};

app.get('/btt-prices', async (req, res) => {
  const results = {};
  for (const [name, fn] of Object.entries(exchanges)) {
    try {
      results[name] = parseFloat(await fn());
    } catch (err) {
      results[name] = null;
    }
  }
  res.json(results);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
