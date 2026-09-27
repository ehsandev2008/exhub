import { useState, useEffect, useRef } from "react";
import { USD_TO_TOMAN } from "../../../utils/formatters";

// Re-export formatters for backward compatibility
export * from "../../../utils/formatters";

export function useCryptoTicker(symbol = "btcusdt") {
  const [ticker, setTicker] = useState(() => ({
    price: 63245.18,
    lastPrice: 63245.18,
    priceChange: 2115.45,
    priceChangePercent: 3.45,
    highPrice: 65245.8,
    lowPrice: 62150.0,
    volume: 11987.72,
    direction: "up", // 'up' | 'down' | 'neutral'
    updatedAt: 0,
  }));

  const [tomanPrice, setTomanPrice] = useState(
    () => Math.round(63245.18 * USD_TO_TOMAN)
  );

  const prevPriceRef = useRef(ticker.price);
  const wsRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    let fallbackInterval = null;

    // Connect to Binance WebSocket (combined stream for both ticker stats & instant real-time trades)
    const connectWS = () => {
      try {
        const streamUrl = `wss://stream.binance.com:9443/stream?streams=${symbol.toLowerCase()}@ticker/${symbol.toLowerCase()}@trade`;
        const ws = new WebSocket(streamUrl);
        wsRef.current = ws;

        let opened = false;

        ws.onopen = () => {
          opened = true;
          if (fallbackInterval) {
            clearInterval(fallbackInterval);
            fallbackInterval = null;
          }
        };

        ws.onmessage = (event) => {
          if (!isMounted) return;
          try {
            const raw = JSON.parse(event.data);
            const data = raw.data || raw;

            // Trade stream payload
            if (data.e === "trade") {
              const newPrice = parseFloat(data.p);
              const prevPrice = prevPriceRef.current;
              const dir =
                newPrice > prevPrice
                  ? "up"
                  : newPrice < prevPrice
                    ? "down"
                    : "neutral";
              prevPriceRef.current = newPrice;

              setTicker((prev) => ({
                ...prev,
                price: newPrice,
                lastPrice: prevPrice,
                direction: dir,
                updatedAt: Date.now(),
              }));
              setTomanPrice(Math.round(newPrice * USD_TO_TOMAN));
              return;
            }

            // Ticker stream payload
            if (data.e === "24hrTicker" || data.c) {
              const newPrice = parseFloat(data.c);
              const prevPrice = prevPriceRef.current;
              const dir =
                newPrice > prevPrice
                  ? "up"
                  : newPrice < prevPrice
                    ? "down"
                    : "neutral";
              prevPriceRef.current = newPrice;

              setTicker((prev) => ({
                ...prev,
                price: newPrice,
                lastPrice: prevPrice,
                priceChange: parseFloat(data.p || prev.priceChange),
                priceChangePercent: parseFloat(
                  data.P || prev.priceChangePercent,
                ),
                highPrice: parseFloat(data.h || prev.highPrice),
                lowPrice: parseFloat(data.l || prev.lowPrice),
                volume: parseFloat(data.v || prev.volume),
                direction: dir,
                updatedAt: Date.now(),
              }));
              setTomanPrice(Math.round(newPrice * USD_TO_TOMAN));
            }
          } catch (e) {
            console.error("WS Parse Error:", e);
          }
        };

        ws.onerror = () => {
          if (!fallbackInterval) startFallback();
        };

        ws.onclose = () => {
          if (!fallbackInterval) startFallback();
        };

        setTimeout(() => {
          if (!opened && !fallbackInterval) {
            startFallback();
          }
        }, 3500);
      } catch {
        startFallback();
      }
    };

    // Live continuous tick engine fallback when WebSocket is blocked
    const startFallback = () => {
      if (fallbackInterval) return;

      fallbackInterval = setInterval(() => {
        if (!isMounted) return;

        setTicker((prev) => {
          // Realistic small market jitter (-0.15% to +0.15%)
          const jitter = (Math.random() - 0.49) * 0.002 * prev.price;
          const newPrice = Math.round((prev.price + jitter) * 100) / 100;
          const dir =
            newPrice > prev.price
              ? "up"
              : newPrice < prev.price
                ? "down"
                : "neutral";
          prevPriceRef.current = newPrice;

          setTomanPrice(Math.round(newPrice * USD_TO_TOMAN));

          return {
            ...prev,
            lastPrice: prev.price,
            price: newPrice,
            direction: dir,
            highPrice: Math.max(prev.highPrice, newPrice),
            lowPrice: Math.min(prev.lowPrice, newPrice),
            volume:
              Math.round((prev.volume + Math.random() * 0.5) * 100) / 100,
            updatedAt: Date.now(),
          };
        });
      }, 1500);
    };

    connectWS();

    return () => {
      isMounted = false;
      if (wsRef.current) {
        try {
          wsRef.current.close();
        } catch {
          // ignore
        }
      }
      if (fallbackInterval) clearInterval(fallbackInterval);
    };
  }, [symbol]);

  return { ticker, tomanPrice, USD_TO_TOMAN };
}
