import {
  CandlestickSeries,
  ColorType,
  createChart,
  CrosshairMode,
  HistogramSeries,
  LineSeries,
} from "lightweight-charts";
import { useEffect, useMemo, useRef, useState } from "react";
import { BiRuler, BiTrendingUp } from "react-icons/bi";
import {
  FiLayers,
  FiMenu,
  FiMove,
  FiSliders,
  FiSmile,
  FiTrash2,
  FiType,
  FiX,
  FiZoomIn,
} from "react-icons/fi";
import { TbMagnet, TbVectorTriangle } from "react-icons/tb";
import { useCryptoTicker } from "../hooks/useCryptoTicker";
import { formatEnglishNumber } from "../../../utils/formatters";

// Realistic initial 1-hour BTC/USDT candlestick dataset
function generateHistoricalCandles(basePrice = 63245) {
  const candles = [];
  const volumes = [];
  const now = Math.floor(Date.now() / 1000);
  const hour = 3600;
  const count = 75;

  let current = basePrice - 1800;

  for (let i = count; i >= 0; i--) {
    const time = now - i * hour;
    const change = (Math.random() - 0.48) * 480;
    const open = current;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * 260;
    const low = Math.min(open, close) - Math.random() * 260;
    const isUp = close >= open;

    candles.push({
      time,
      open: Math.round(open * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      close: Math.round(close * 100) / 100,
    });

    volumes.push({
      time,
      value: Math.round((2.5 + Math.random() * 5.5) * 1000) / 100,
      color: isUp ? "rgba(0, 184, 148, 0.4)" : "rgba(37, 99, 235, 0.35)",
    });

    current = close;
  }

  return { candles, volumes };
}

function TradingChart() {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const candleSeriesRef = useRef(null);
  const volumeSeriesRef = useRef(null);
  const maSeriesRef = useRef(null);
  const svgOverlayRef = useRef(null);

  const { ticker } = useCryptoTicker("btcusdt");
  const tickerPriceRef = useRef(ticker.price);

  const [activeTool, setActiveTool] = useState("cursor");
  const [activeInterval, setActiveInterval] = useState("1h");
  const [magnetEnabled, setMagnetEnabled] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showFibModal, setShowFibModal] = useState(false);
  const [showLayersModal, setShowLayersModal] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [colorTheme, setColorTheme] = useState("modern"); // 'modern' (blue/cyan) or 'classic' (red/green)
  const [statusNotification, setStatusNotification] = useState("");

  // Visibility layers
  const [layers, setLayers] = useState({
    candles: true,
    volume: true,
    ma: false,
    drawings: true,
    fibonacci: false,
  });

  // Interactive Drawings State
  const [lines, setLines] = useState([]); // [{x1, y1, x2, y2, color, id}]
  const [freehandPaths, setFreehandPaths] = useState([]); // [[{x,y},...]]
  const [currentFreehand, setCurrentFreehand] = useState(null);
  const [textNotes, setTextNotes] = useState([]); // [{x, y, text, id}]
  const [emojis, setEmojis] = useState([]); // [{x, y, char, id}]
  const [activeDrawingLine, setActiveDrawingLine] = useState(null); // {x1, y1}
  const [measurePoints, setMeasurePoints] = useState(null); // {p1: {x,y, price}, p2: {x,y, price}}
  const [measureResult, setMeasureResult] = useState(null);

  const [ohlc, setOhlc] = useState({
    open: 62978.54,
    high: 63572.21,
    low: 62620.11,
    close: 63245.18,
    change: 351.64,
    changePercent: 0.55,
    volume: "4.38K",
  });

  const intervals = ["1m", "5m", "15m", "1h", "4h", "1D"];

  const showToast = (msg) => {
    setStatusNotification(msg);
    setTimeout(() => {
      setStatusNotification("");
    }, 3000);
  };

  // Initialize Lightweight Chart
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const container = chartContainerRef.current;

    const chart = createChart(container, {
      layout: {
        background: { type: ColorType.Solid, color: "#ffffff" },
        textColor: "#64748b",
        fontFamily: "IRANSans, Inter, system-ui, sans-serif",
      },
      grid: {
        vertLines: { color: "#f1f5f9" },
        horzLines: { color: "#f1f5f9" },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          color: "#94a3b8",
          width: 1,
          style: 3,
          labelBackgroundColor: "#2563eb",
        },
        horzLine: {
          color: "#94a3b8",
          width: 1,
          style: 3,
          labelBackgroundColor: "#2563eb",
        },
      },
      rightPriceScale: {
        borderColor: "#e2e8f0",
        visible: true,
      },
      timeScale: {
        borderColor: "#e2e8f0",
        timeVisible: true,
        secondsVisible: false,
      },
      handleScroll: true,
      handleScale: true,
    });

    chartRef.current = chart;

    // Candlestick Series
    const isModern = colorTheme === "modern";
    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: isModern ? "#00b894" : "#10b981",
      downColor: isModern ? "#2563eb" : "#ef4444",
      borderVisible: false,
      wickUpColor: isModern ? "#00b894" : "#10b981",
      wickDownColor: isModern ? "#2563eb" : "#ef4444",
    });
    candleSeriesRef.current = candleSeries;

    // Volume Series
    const volumeSeries = chart.addSeries(HistogramSeries, {
      color: "#93c5fd",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "",
    });
    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.82,
        bottom: 0,
      },
    });
    volumeSeriesRef.current = volumeSeries;

    // Moving Average (MA 20) Line Series
    const maSeries = chart.addSeries(LineSeries, {
      color: "#f59e0b",
      lineWidth: 2,
      lineStyle: 0,
      title: "MA 20",
      visible: layers.ma,
    });
    maSeriesRef.current = maSeries;

    // Load initial data
    const { candles, volumes } = generateHistoricalCandles(
      tickerPriceRef.current || 63245,
    );
    candleSeries.setData(candles);
    volumeSeries.setData(volumes);

    // Calculate MA 20
    const maData = [];
    for (let i = 0; i < candles.length; i++) {
      if (i >= 19) {
        let sum = 0;
        for (let j = 0; j < 20; j++) {
          sum += candles[i - j].close;
        }
        maData.push({ time: candles[i].time, value: sum / 20 });
      }
    }
    maSeries.setData(maData);

    // Crosshair listener for OHLC
    chart.subscribeCrosshairMove((param) => {
      if (param.time) {
        const data = param.seriesData.get(candleSeries);
        if (data) {
          const chg = data.close - data.open;
          const chgPct = (chg / data.open) * 100;
          setOhlc({
            open: data.open,
            high: data.high,
            low: data.low,
            close: data.close,
            change: chg,
            changePercent: chgPct,
            volume:
              (param.seriesData.get(volumeSeries)?.value / 1000).toFixed(2) +
              "K",
          });
        }
      }
    });

    // Auto-resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries.length === 0 || !entries[0].contentRect) return;
      const { width, height } = entries[0].contentRect;
      chart.applyOptions({ width, height });
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update theme colors when changed
  useEffect(() => {
    if (!candleSeriesRef.current) return;
    const isModern = colorTheme === "modern";
    candleSeriesRef.current.applyOptions({
      upColor: isModern ? "#00b894" : "#10b981",
      downColor: isModern ? "#2563eb" : "#ef4444",
      wickUpColor: isModern ? "#00b894" : "#10b981",
      wickDownColor: isModern ? "#2563eb" : "#ef4444",
    });
  }, [colorTheme]);

  // Update layer visibility
  useEffect(() => {
    if (candleSeriesRef.current) {
      candleSeriesRef.current.applyOptions({ visible: layers.candles });
    }
    if (volumeSeriesRef.current) {
      volumeSeriesRef.current.applyOptions({ visible: layers.volume });
    }
    if (maSeriesRef.current) {
      maSeriesRef.current.applyOptions({ visible: layers.ma });
    }
  }, [layers]);

  // Update latest candle on live WebSocket tick
  useEffect(() => {
    if (!candleSeriesRef.current || !ticker.price) return;

    try {
      const now = Math.floor(Date.now() / 1000);
      const hour = 3600;
      const currentHourTime = Math.floor(now / hour) * hour;

      const p = ticker.price;
      const open = ohlc.open || p - 50;
      const high = Math.max(ohlc.high || p, p);
      const low = Math.min(ohlc.low || p, p);

      candleSeriesRef.current.update({
        time: currentHourTime,
        open,
        high,
        low,
        close: p,
      });

      const timer = setTimeout(() => {
        setOhlc((prev) => ({
          ...prev,
          high,
          low,
          close: p,
          change: p - open,
          changePercent: ((p - open) / open) * 100,
        }));
      }, 0);

      return () => clearTimeout(timer);
    } catch {
      // ignore
    }
  }, [ticker.price, ohlc.open, ohlc.high, ohlc.low]);

  // Handle Tool Click
  const handleToolClick = (toolId) => {
    setActiveTool(toolId);

    if (toolId === "menu") {
      setShowMenuModal((prev) => !prev);
      return;
    }
    setShowMenuModal(false);

    if (toolId === "zoom") {
      if (chartRef.current) {
        try {
          const timeScale = chartRef.current.timeScale();
          const range = timeScale.getVisibleLogicalRange();
          if (range) {
            const delta = (range.to - range.from) * 0.2;
            timeScale.setVisibleLogicalRange({
              from: range.from + delta,
              to: range.to - delta,
            });
          }
          showToast("بزرگ‌نمایی انجام شد (+)");
        } catch {
          // ignore
        }
      }
      return;
    }

    if (toolId === "pitchfork") {
      setShowFibModal((prev) => !prev);
      return;
    }
    setShowFibModal(false);

    if (toolId === "layers") {
      setShowLayersModal((prev) => !prev);
      return;
    }
    setShowLayersModal(false);

    if (toolId === "icons") {
      setShowEmojiPicker((prev) => !prev);
      return;
    }
    setShowEmojiPicker(false);

    if (toolId === "magnet") {
      setMagnetEnabled((prev) => {
        const next = !prev;
        showToast(
          next
            ? "حالت آهن‌ربا فعال شد (جذب به کندل‌ها)"
            : "حالت آهن‌ربا غیرفعال شد",
        );
        return next;
      });
      return;
    }

    if (toolId === "trash") {
      setLines([]);
      setFreehandPaths([]);
      setTextNotes([]);
      setEmojis([]);
      setMeasureResult(null);
      setMeasurePoints(null);
      setLayers((prev) => ({ ...prev, fibonacci: false }));
      if (chartRef.current) {
        chartRef.current.timeScale().resetTimeScale();
      }
      showToast("همه ترسیم‌ها و ابزارها پاکسازی شدند");
      setActiveTool("cursor");
      return;
    }

    if (toolId === "trend") {
      showToast("روی دو نقطه از نمودار کلیک کنید تا خط روند رسم شود");
    } else if (toolId === "brush") {
      showToast("با موس یا لمس روی نمودار نقاشی و طراحی کنید");
    } else if (toolId === "text") {
      showToast(
        "روی نقطه دلخواه از نمودار کلیک کنید تا یادداشت متنی اضافه شود",
      );
    } else if (toolId === "measure") {
      showToast("دو نقطه را انتخاب کنید تا فاصله قیمت، درصد و زمان محاسبه شود");
    }
  };

  // SVG Overlay Mouse Events for interactive drawing
  const handleOverlayMouseDown = (e) => {
    if (!svgOverlayRef.current) return;
    const rect = svgOverlayRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (activeTool === "brush") {
      setCurrentFreehand([{ x, y }]);
    } else if (activeTool === "trend") {
      if (!activeDrawingLine) {
        setActiveDrawingLine({ x1: x, y1: y });
      } else {
        setLines((prev) => [
          ...prev,
          {
            id: Date.now(),
            x1: activeDrawingLine.x1,
            y1: activeDrawingLine.y1,
            x2: x,
            y2: y,
            color: "#2563eb",
          },
        ]);
        setActiveDrawingLine(null);
        showToast("خط روند با موفقیت اضافه شد");
      }
    } else if (activeTool === "measure") {
      if (!measurePoints) {
        setMeasurePoints({ p1: { x, y } });
      } else {
        const p1 = measurePoints.p1;
        const p2 = { x, y };
        const priceDiff = Math.abs(ohlc.close * 0.002 * (p1.y - p2.y));
        const pctDiff = ((priceDiff / ohlc.close) * 100).toFixed(2);
        setMeasureResult({
          x: (p1.x + p2.x) / 2,
          y: Math.min(p1.y, p2.y) - 15,
          diff: priceDiff.toFixed(2),
          pct: pctDiff,
          bars: Math.max(1, Math.round(Math.abs(p2.x - p1.x) / 12)),
        });
        setMeasurePoints(null);
        showToast(`اندازه‌گیری: ${priceDiff.toFixed(2)}$ (${pctDiff}%)`);
      }
    } else if (activeTool === "text") {
      const note = prompt("متن یادداشت روی نمودار را وارد کنید:", "هدف قیمتی");
      if (note) {
        setTextNotes((prev) => [...prev, { id: Date.now(), x, y, text: note }]);
        showToast("یادداشت متنی روی نمودار قرار گرفت");
      }
    }
  };

  const handleOverlayMouseMove = (e) => {
    if (activeTool === "brush" && currentFreehand) {
      const rect = svgOverlayRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCurrentFreehand((prev) => [...prev, { x, y }]);
    }
  };

  const handleOverlayMouseUp = () => {
    if (activeTool === "brush" && currentFreehand) {
      setFreehandPaths((prev) => [...prev, currentFreehand]);
      setCurrentFreehand(null);
    }
  };

  const addEmojiToChart = (char) => {
    setEmojis((prev) => [
      ...prev,
      {
        id: Date.now(),
        x: 220 + Math.random() * 200,
        y: 140 + Math.random() * 120,
        char,
      },
    ]);
    setShowEmojiPicker(false);
    showToast(`ایموجی ${char} به نمودار اضافه شد`);
  };

  const isUp = ohlc.change >= 0;

  // 12 Tools matching the user's design image
  const tools = useMemo(
    () => [
      { id: "menu", icon: FiMenu, label: "منو و تنظیمات نمایش" },
      { id: "cursor", icon: FiMove, label: "نشانگر و جابجایی" },
      { id: "trend", icon: BiTrendingUp, label: "خط روند و حمایت/مقاومت" },
      { id: "pitchfork", icon: FiSliders, label: "فیبوناچی و اندیکاتورها" },
      { id: "brush", icon: TbVectorTriangle, label: "قلم و ترسیم آزاد" },
      { id: "text", icon: FiType, label: "متن و برچسب" },
      { id: "icons", icon: FiSmile, label: "ایموجی و نمادها" },
      { id: "measure", icon: BiRuler, label: "خط‌کش اندازه‌گیری" },
      { id: "zoom", icon: FiZoomIn, label: "بزرگ‌نمایی (+)" },
      { id: "magnet", icon: TbMagnet, label: "آهن‌ربا (جذب به کندل‌ها)" },
      { id: "trash", icon: FiTrash2, label: "پاک کردن همه ترسیم‌ها" },
      { id: "layers", icon: FiLayers, label: "مدیریت لایه‌ها و اندیکاتورها" },
    ],
    [],
  );

  return (
    <div
      className="flex items-stretch gap-3 w-full h-full min-h-[480px] lg:min-h-[520px] relative select-none"
      dir="ltr"
    >
      {/* 12-Icon Vertical Toolbar on the Left (LTR layout places it on the far left) */}
      <aside
        className="w-12 sm:w-14 shrink-0 bg-white rounded-3xl py-3 border border-gray-100 shadow-xs flex flex-col items-center justify-between z-20"
        dir="ltr"
      >
        <div className="flex flex-col items-center gap-1.5 w-full px-1.5">
          {tools.slice(0, 7).map((tool) => {
            const Icon = tool.icon;
            const isActive =
              activeTool === tool.id ||
              (tool.id === "magnet" && magnetEnabled) ||
              (tool.id === "layers" && showLayersModal) ||
              (tool.id === "pitchfork" && (showFibModal || layers.fibonacci));

            return (
              <button
                key={tool.id}
                onClick={() => handleToolClick(tool.id)}
                title={tool.label}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-blue-50 text-primary font-bold shadow-xs scale-105"
                    : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="size-4.5" />
              </button>
            );
          })}
        </div>

        <div className="w-6 h-px bg-gray-100 my-1" />

        <div className="flex flex-col items-center gap-1.5 w-full px-1.5">
          {tools.slice(7).map((tool) => {
            const Icon = tool.icon;
            const isActive =
              activeTool === tool.id ||
              (tool.id === "magnet" && magnetEnabled) ||
              (tool.id === "layers" && showLayersModal);

            return (
              <button
                key={tool.id}
                onClick={() => handleToolClick(tool.id)}
                title={tool.label}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-blue-50 text-primary font-bold shadow-xs scale-105"
                    : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="size-4.5" />
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main Candlestick Chart Card (placed to the right of the toolbar) */}
      <div className="flex-1 bg-white rounded-3xl p-4 border border-gray-100 shadow-xs flex flex-col justify-between overflow-hidden relative">
        {/* Toast / Notification Banner */}
        {statusNotification && (
          <div
            className="absolute top-16 left-1/2 -translate-x-1/2 z-40 bg-gray-900/90 text-white text-xs px-4 py-1.5 rounded-full shadow-lg backdrop-blur-sm transition-all animate-bounce"
            dir="rtl"
          >
            {statusNotification}
          </div>
        )}

        {/* Floating Modals for Tools */}
        {/* 1. Menu Modal */}
        {showMenuModal && (
          <div
            className="absolute top-14 left-4 z-30 bg-white border border-gray-100 rounded-2xl shadow-xl p-3 w-60 text-xs"
            dir="rtl"
          >
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 font-bold text-gray-800">
              <span>تنظیمات نمودار</span>
              <button
                onClick={() => setShowMenuModal(false)}
                className="text-gray-400 hover:text-gray-700"
              >
                <FiX className="size-4" />
              </button>
            </div>
            <div className="space-y-2 mt-2">
              <p className="text-[11px] text-gray-500 font-medium">
                پالت رنگ کندل‌ها:
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setColorTheme("modern")}
                  className={`flex-1 py-1.5 rounded-xl border text-[11px] transition ${
                    colorTheme === "modern"
                      ? "border-primary bg-blue-50 text-primary font-bold"
                      : "border-gray-200 text-gray-600"
                  }`}
                >
                  آبی / سبز (مدرن)
                </button>
                <button
                  onClick={() => setColorTheme("classic")}
                  className={`flex-1 py-1.5 rounded-xl border text-[11px] transition ${
                    colorTheme === "classic"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700 font-bold"
                      : "border-gray-200 text-gray-600"
                  }`}
                >
                  قرمز / سبز (کلاسیک)
                </button>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <button
                  onClick={() => {
                    if (chartRef.current)
                      chartRef.current.timeScale().resetTimeScale();
                    setShowMenuModal(false);
                    showToast("مقیاس زمان بازنشانی شد");
                  }}
                  className="w-full text-right py-1 text-gray-600 hover:text-primary transition"
                >
                  بازنشانی بزرگ‌نمایی به حالت اولیه
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. Fibonacci & Technical Modal */}
        {showFibModal && (
          <div
            className="absolute top-28 left-4 z-30 bg-white border border-gray-100 rounded-2xl shadow-xl p-3 w-64 text-xs"
            dir="rtl"
          >
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 font-bold text-gray-800">
              <span>ابزار فیبوناچی و اندیکاتورها</span>
              <button
                onClick={() => setShowFibModal(false)}
                className="text-gray-400 hover:text-gray-700"
              >
                <FiX className="size-4" />
              </button>
            </div>
            <div className="space-y-2 mt-2.5">
              <label className="flex items-center justify-between p-1.5 hover:bg-gray-50 rounded-xl cursor-pointer">
                <span>سطوح اصلاحی فیبوناچی (Fib Retracement)</span>
                <input
                  type="checkbox"
                  checked={layers.fibonacci}
                  onChange={(e) => {
                    setLayers((prev) => ({
                      ...prev,
                      fibonacci: e.target.checked,
                    }));
                    showToast(
                      e.target.checked
                        ? "سطوح فیبوناچی فعال شد"
                        : "سطوح فیبوناچی پنهان شد",
                    );
                  }}
                  className="accent-primary size-4"
                />
              </label>
              <label className="flex items-center justify-between p-1.5 hover:bg-gray-50 rounded-xl cursor-pointer">
                <span>میانگین متحرک ساده (MA 20)</span>
                <input
                  type="checkbox"
                  checked={layers.ma}
                  onChange={(e) => {
                    setLayers((prev) => ({ ...prev, ma: e.target.checked }));
                    showToast(
                      e.target.checked
                        ? "اندیکاتور MA 20 فعال شد"
                        : "اندیکاتور MA 20 پنهان شد",
                    );
                  }}
                  className="accent-primary size-4"
                />
              </label>
            </div>
          </div>
        )}

        {/* 3. Emoji / Signals Picker */}
        {showEmojiPicker && (
          <div
            className="absolute top-52 left-4 z-30 bg-white border border-gray-100 rounded-2xl shadow-xl p-3 w-56 text-xs"
            dir="rtl"
          >
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 font-bold text-gray-800">
              <span>افزودن استیکر / سیگنال</span>
              <button
                onClick={() => setShowEmojiPicker(false)}
                className="text-gray-400 hover:text-gray-700"
              >
                <FiX className="size-4" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-2 text-xl text-center">
              {["🚀", "📈", "📉", "🎯", "⭐", "💰", "🔥", "⚠️"].map((char) => (
                <button
                  key={char}
                  onClick={() => addEmojiToChart(char)}
                  className="p-2 hover:bg-gray-100 rounded-xl cursor-pointer transition active:scale-95"
                >
                  {char}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 4. Layers Visibility Modal */}
        {showLayersModal && (
          <div
            className="absolute bottom-12 left-4 z-30 bg-white border border-gray-100 rounded-2xl shadow-xl p-3 w-56 text-xs"
            dir="rtl"
          >
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 font-bold text-gray-800">
              <span>لایه‌های نمودار</span>
              <button
                onClick={() => setShowLayersModal(false)}
                className="text-gray-400 hover:text-gray-700"
              >
                <FiX className="size-4" />
              </button>
            </div>
            <div className="space-y-2 mt-2">
              <label className="flex items-center justify-between cursor-pointer">
                <span>کندل‌های قیمتی</span>
                <input
                  type="checkbox"
                  checked={layers.candles}
                  onChange={(e) =>
                    setLayers((prev) => ({
                      ...prev,
                      candles: e.target.checked,
                    }))
                  }
                  className="accent-primary size-4"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span>نمودار حجم معاملات</span>
                <input
                  type="checkbox"
                  checked={layers.volume}
                  onChange={(e) =>
                    setLayers((prev) => ({ ...prev, volume: e.target.checked }))
                  }
                  className="accent-primary size-4"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span>ترسیم‌ها و خطوط کاربر</span>
                <input
                  type="checkbox"
                  checked={layers.drawings}
                  onChange={(e) =>
                    setLayers((prev) => ({
                      ...prev,
                      drawings: e.target.checked,
                    }))
                  }
                  className="accent-primary size-4"
                />
              </label>
            </div>
          </div>
        )}

        {/* Top Header: Symbol, Timeframes & Live OHLC stats */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100 text-xs select-none">
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-800 text-sm tracking-wide">
              BTC / USDT
            </span>
            <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-100">
              {intervals.map((intv) => (
                <button
                  key={intv}
                  onClick={() => setActiveInterval(intv)}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-medium transition cursor-pointer ${
                    activeInterval === intv
                      ? "bg-primary text-white shadow-xs"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {intv}
                </button>
              ))}
            </div>
          </div>

          {/* OHLC Bar */}
          <div
            className="flex items-center gap-2 sm:gap-3 text-[11px] font-mono text-gray-500 overflow-x-auto"
            dir="ltr"
          >
            <span>
              O{" "}
              <strong className="text-gray-700 font-semibold">
                {formatEnglishNumber(ohlc.open, 2)}
              </strong>
            </span>
            <span>
              H{" "}
              <strong className="text-gray-700 font-semibold">
                {formatEnglishNumber(ohlc.high, 2)}
              </strong>
            </span>
            <span>
              L{" "}
              <strong className="text-gray-700 font-semibold">
                {formatEnglishNumber(ohlc.low, 2)}
              </strong>
            </span>
            <span>
              C{" "}
              <strong
                className={
                  isUp
                    ? colorTheme === "modern"
                      ? "text-emerald-600 font-bold"
                      : "text-emerald-600 font-bold"
                    : colorTheme === "modern"
                      ? "text-blue-600 font-bold"
                      : "text-rose-600 font-bold"
                }
              >
                {formatEnglishNumber(ohlc.close, 2)}
              </strong>
            </span>
            <span
              className={
                isUp
                  ? "text-emerald-600 font-semibold"
                  : colorTheme === "modern"
                    ? "text-blue-600 font-semibold"
                    : "text-rose-600 font-semibold"
              }
            >
              {isUp ? "+" : ""}
              {formatEnglishNumber(ohlc.change, 2)} ({isUp ? "+" : ""}
              {formatEnglishNumber(ohlc.changePercent, 2)}%)
            </span>
            <span className="text-gray-400 border-l border-gray-200 pl-2">
              Vol: {ohlc.volume}
            </span>
          </div>
        </div>

        {/* Chart Viewport with Interactive SVG Overlay for Tools */}
        <div className="relative w-full flex-1 min-h-[380px] my-2">
          {/* Lightweight Candlestick Canvas Container */}
          <div
            ref={chartContainerRef}
            className="w-full h-full cursor-crosshair"
            dir="ltr"
          />

          {/* Interactive SVG Drawing Layer */}
          {layers.drawings && (
            <svg
              ref={svgOverlayRef}
              onMouseDown={handleOverlayMouseDown}
              onMouseMove={handleOverlayMouseMove}
              onMouseUp={handleOverlayMouseUp}
              className={`absolute inset-0 w-full h-full z-10 ${
                activeTool === "cursor"
                  ? "pointer-events-none"
                  : "pointer-events-auto cursor-crosshair"
              }`}
            >
              {/* Fibonacci Retracement Overlay Lines */}
              {layers.fibonacci && (
                <g className="fib-lines opacity-80 pointer-events-none">
                  {[
                    { ratio: "1.000", y: 40, color: "#94a3b8" },
                    { ratio: "0.786", y: 90, color: "#818cf8" },
                    { ratio: "0.618", y: 140, color: "#f59e0b" },
                    { ratio: "0.500", y: 180, color: "#10b981" },
                    { ratio: "0.382", y: 220, color: "#06b6d4" },
                    { ratio: "0.236", y: 260, color: "#ec4899" },
                    { ratio: "0.000", y: 310, color: "#94a3b8" },
                  ].map((fib) => (
                    <g key={fib.ratio}>
                      <line
                        x1="0"
                        y1={fib.y}
                        x2="100%"
                        y2={fib.y}
                        stroke={fib.color}
                        strokeWidth="1.2"
                        strokeDasharray="4 4"
                      />
                      <text
                        x="10"
                        y={fib.y - 4}
                        fill={fib.color}
                        fontSize="10"
                        fontFamily="monospace"
                      >
                        Fib {fib.ratio}
                      </text>
                    </g>
                  ))}
                </g>
              )}

              {/* User Trend Lines */}
              {lines.map((line) => (
                <g key={line.id}>
                  <line
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke={line.color || "#2563eb"}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx={line.x1} cy={line.y1} r="3.5" fill="#2563eb" />
                  <circle cx={line.x2} cy={line.y2} r="3.5" fill="#2563eb" />
                </g>
              ))}

              {/* Freehand Brush Paths */}
              {freehandPaths.map((path, idx) => (
                <path
                  key={idx}
                  d={`M ${path.map((p) => `${p.x} ${p.y}`).join(" L ")}`}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}

              {/* Current Freehand in progress */}
              {currentFreehand && (
                <path
                  d={`M ${currentFreehand.map((p) => `${p.x} ${p.y}`).join(" L ")}`}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              )}

              {/* Text Notes */}
              {textNotes.map((note) => (
                <g key={note.id} transform={`translate(${note.x}, ${note.y})`}>
                  <rect
                    x="-6"
                    y="-16"
                    width={note.text.length * 9 + 16}
                    height="22"
                    rx="6"
                    fill="#1e293b"
                    opacity="0.85"
                  />
                  <text
                    x="2"
                    y="-2"
                    fill="#ffffff"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    {note.text}
                  </text>
                </g>
              ))}

              {/* Placed Emojis */}
              {emojis.map((em) => (
                <text
                  key={em.id}
                  x={em.x}
                  y={em.y}
                  fontSize="22"
                  className="select-none"
                >
                  {em.char}
                </text>
              ))}

              {/* Measurement Result Box */}
              {measureResult && (
                <g
                  transform={`translate(${measureResult.x}, ${measureResult.y})`}
                >
                  <rect
                    x="-55"
                    y="-22"
                    width="110"
                    height="32"
                    rx="8"
                    fill="#0f172a"
                    opacity="0.9"
                  />
                  <text
                    x="0"
                    y="-4"
                    textAnchor="middle"
                    fill="#38bdf8"
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    Δ ${measureResult.diff} ({measureResult.pct}%)
                  </text>
                  <text
                    x="0"
                    y="7"
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    {measureResult.bars} bars
                  </text>
                </g>
              )}
            </svg>
          )}
        </div>

        {/* Bottom Bar / TradingView watermark indicator */}
        <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-gray-100 select-none">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-gray-100 font-black text-[9px] text-gray-600">
              TV
            </span>
            <span>TradingView Lightweight Engine</span>
            {activeTool !== "cursor" && (
              <span className="text-primary font-medium bg-blue-50 px-2 py-0.5 rounded-full ml-2">
                ابزار فعال: {tools.find((t) => t.id === activeTool)?.label}
              </span>
            )}
          </div>
          <span className="font-mono text-gray-400">UTC+3:30 (Tehran)</span>
        </div>
      </div>
    </div>
  );
}

export default TradingChart;
