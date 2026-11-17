"use client";

import { useState, useRef, useEffect } from "react";
import {
  Image,
  Download,
  Copy,
  Check,
  Wand2,
  Eraser,
  Maximize,
  Crop,
  FileImage,
  Palette,
  Paintbrush,
  Type,
  ScanLine,
  BoxSelect,
  Zap,
  Grid3X3,
  RefreshCcw,
  Settings,
  ChevronDown,
  ChevronUp,
  Brain,
  Sparkles,
} from "lucide-react";
import FileUploader from "../../../../../components/ai-workbench/FileUploader";
import ImageCanvas from "../../../../../components/ai-workbench/ImageCanvas";
import {
  loadImageElement,
  loadImageAsDataURL,
  downloadDataURL,
  getImageInfo,
  resizeImage,
  cropImage,
  compressImage,
  toWhiteBackground,
  mattingSimple,
  adjustColor,
  superResolution,
  replaceBackground,
  addTextWatermark,
  generateProductHero,
} from "../../../../../components/ai-workbench/image-processor";
import {
  aiRemoveBackground,
  aiToWhiteBackground,
  aiGenerateBackground,
  AITool,
} from "../../../../../components/ai-workbench/ai-image-service";

const TOOLS = [
  {
    id: "matting",
    name: "AI智能抠图",
    desc: "商品主体识别+白底生成",
    icon: Wand2,
    tag: "P0",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "erase",
    name: "区域擦除",
    desc: "擦除水印/杂物/瑕疵",
    icon: Eraser,
    tag: "P0",
    color: "from-rose-500 to-pink-500",
  },
  {
    id: "resize",
    name: "尺寸标准化",
    desc: "美客多/亚马逊规格",
    icon: Maximize,
    tag: "P0",
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: "crop",
    name: "图片裁剪",
    desc: "自由裁剪+固定比例",
    icon: Crop,
    tag: "P0",
    color: "from-violet-500 to-purple-500",
  },
  {
    id: "compress",
    name: "格式转换+压缩",
    desc: "JPG/PNG/WebP互转",
    icon: FileImage,
    tag: "P0",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "super",
    name: "超清放大锐化",
    desc: "2倍/4倍无损放大",
    icon: Zap,
    tag: "P1",
    color: "from-cyan-500 to-sky-500",
  },
  {
    id: "adjust",
    name: "调色校正",
    desc: "亮度/对比度/饱和度",
    icon: Palette,
    tag: "P1",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "bg",
    name: "背景替换",
    desc: "纯色/渐变/自定义",
    icon: Paintbrush,
    tag: "P1",
    color: "from-lime-500 to-green-500",
  },
  {
    id: "watermark",
    name: "水印合成",
    desc: "文字/平铺水印",
    icon: Type,
    tag: "P1",
    color: "from-slate-500 to-gray-600",
  },
  {
    id: "ocr",
    name: "OCR文字识别",
    desc: "中英文文字提取",
    icon: ScanLine,
    tag: "P2",
    color: "from-fuchsia-500 to-pink-500",
  },
  {
    id: "hash",
    name: "图片查重",
    desc: "相似度检测比较",
    icon: BoxSelect,
    tag: "P2",
    color: "from-orange-500 to-red-500",
  },
  {
    id: "batch",
    name: "批量处理",
    desc: "多图一键操作",
    icon: Grid3X3,
    tag: "P2",
    color: "from-indigo-500 to-blue-500",
  },
  {
    id: "template",
    name: "平台模板",
    desc: "美客多/亚马逊预设",
    icon: RefreshCcw,
    tag: "P2",
    color: "from-teal-500 to-emerald-500",
  },
];

const PRESET_TEMPLATES = [
  {
    id: "mercadolibre",
    name: "美客多主图",
    width: 1200,
    height: 1200,
    bg: "white",
    quality: 90,
  },
  {
    id: "amazon",
    name: "亚马逊主图",
    width: 1500,
    height: 1500,
    bg: "white",
    quality: 90,
  },
  {
    id: "shopee",
    name: "Shopee主图",
    width: 800,
    height: 800,
    bg: "white",
    quality: 85,
  },
  {
    id: "lazada",
    name: "Lazada主图",
    width: 1200,
    height: 1200,
    bg: "white",
    quality: 85,
  },
];

export default function ImageProcessorPage() {
  const [files, setFiles] = useState<any[]>([]);
  const [activeTool, setActiveTool] = useState<string>("matting");
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [canvasState, setCanvasState] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<any>(null);
  const [processedInfo, setProcessedInfo] = useState<any>(null);
  const [ocrText, setOcrText] = useState<string>("");

  const [mattingBg, setMattingBg] = useState("#ffffff");
  const [mattingTolerance, setMattingTolerance] = useState(50);

  const [aiMode, setAiMode] = useState("AI_LOCAL");
  const [aiProgress, setAiProgress] = useState(0);
  const [aiMessage, setAiMessage] = useState("");
  const [aiLastMode, setAiLastMode] = useState("");
  const [showCloudConfig, setShowCloudConfig] = useState(false);
  const [cloudProvider, setCloudProvider] = useState("aliyun");
  const [apiKey, setApiKey] = useState("");
  const [customEndpoint, setCustomEndpoint] = useState("");
  const [bgPrompt, setBgPrompt] = useState(
    "professional e-commerce product photography, clean white studio background, soft lighting",
  );

  const [resizeW, setResizeW] = useState(1080);
  const [resizeH, setResizeH] = useState(1080);
  const [resizeMode, setResizeMode] = useState("contain");

  const [cropRatio, setCropRatio] = useState("free");

  const [compressFormat, setCompressFormat] = useState("image/jpeg");
  const [compressQuality, setCompressQuality] = useState(80);

  const [superScale, setSuperScale] = useState(2);

  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);

  const [bgColor, setBgColor] = useState("#ffffff");

  const [wmText, setWmText] = useState("GlobalTradeHub");
  const [wmPos, setWmPos] = useState("bottom-right");
  const [wmOpacity, setWmOpacity] = useState(60);
  const [wmRotate, setWmRotate] = useState(0);
  const [wmSize, setWmSize] = useState(24);
  const [wmTile, setWmTile] = useState(false);

  const [hashFiles, setHashFiles] = useState<any[]>([]);
  const [hashResult, setHashResult] = useState<any>(null);

  const [batchConfig, setBatchConfig] = useState<any>({
    resize: false,
    w: 1080,
    h: 1080,
    bg: false,
    compress: false,
    quality: 85,
  });
  const [batchResults, setBatchResults] = useState<any[]>([]);
  const [batchProgress, setBatchProgress] = useState<number>(0);

  const [brushSize, setBrushSize] = useState(20);

  const handleFileSelect = async (fileList: any[]) => {
    const f = fileList[0];
    if (!f) return;
    const dataURL = await loadImageAsDataURL(f.file || f);
    setCurrentImage(dataURL);
    setProcessedImage(null);
    setOcrText("");
    const info2 = await getImageInfo(dataURL);
    setInfo(info2);
  };

  const handleProcessed = (dataURL: string) => {
    setProcessedImage(dataURL);
    getImageInfo(dataURL).then(setProcessedInfo);
  };

  const processWithCanvas = async (fn: any) => {
    if (!canvasState) return;
    setLoading(true);
    try {
      const canvas = canvasState?.getCurrentCanvas();
      if (canvas) {
        const tmp = document.createElement("canvas");
        tmp.width = canvas.width;
        tmp.height = canvas.height;
        const tmpCtx = tmp.getContext("2d");
        if (tmpCtx) tmpCtx.drawImage(canvas, 0, 0);
        const dataURL = tmp.toDataURL("image/png");
        const img = await loadImageElement(dataURL);
        const result = fn(img, canvas);
        if (result && result.getContext) {
          const newCanvas = result;
          canvas.width = newCanvas.width;
          canvas.height = newCanvas.height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(newCanvas, 0, 0);
          }
          const outURL = canvas.toDataURL("image/png");
          setProcessedImage(outURL);
          setProcessedInfo(await getImageInfo(outURL));
          canvasState.setCanvasSize(newCanvas.width, newCanvas.height);
          canvasState.saveState();
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const applyMatting = async () => {
    if (!canvasState) return;
    setLoading(true);
    setAiProgress(0);
    setAiMessage("正在初始化...");
    try {
      const canvas = canvasState.getCurrentCanvas();
      const tmp = document.createElement("canvas");
      tmp.width = canvas.width;
      tmp.height = canvas.height;
      tmp.getContext("2d")!.drawImage(canvas, 0, 0);
      const dataURL = tmp.toDataURL("image/png");
      const img = await loadImageElement(dataURL);

      const result = await aiRemoveBackground(
        img,
        (pct: number, msg: string) => {
          setAiProgress(pct);
          if (msg) setAiMessage(msg);
        },
        aiMode,
      );

      // 结果放回 ImageCanvas
      const outCanvas = result.canvas;
      if (mattingBg && mattingBg !== "transparent") {
        const withBg = document.createElement("canvas");
        withBg.width = outCanvas.width;
        withBg.height = outCanvas.height;
        const ctx = withBg.getContext("2d")!;
        ctx.fillStyle = mattingBg;
        ctx.fillRect(0, 0, withBg.width, withBg.height);
        ctx.drawImage(outCanvas, 0, 0);
        result.canvas = withBg;
      }

      // 通过 applyExternalProcess 写入主画布
      const finalResult = result.canvas;
      await canvasState.applyExternalProcess(() => finalResult);
      const outURL = finalResult.toDataURL("image/png");
      setProcessedImage(outURL);
      setProcessedInfo(await getImageInfo(outURL));
      setAiLastMode(result.mode);
      setAiMessage(`完成 ✓（使用 ${result.mode}）`);
    } catch (err) {
      setAiMessage("处理失败：" + (err instanceof Error ? err.message : String(err)));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyWhiteBg = async () => {
    if (!canvasState) return;
    setLoading(true);
    setAiProgress(0);
    setAiMessage("正在初始化...");
    try {
      const canvas = canvasState.getCurrentCanvas();
      const tmp = document.createElement("canvas");
      tmp.width = canvas.width;
      tmp.height = canvas.height;
      tmp.getContext("2d")!.drawImage(canvas, 0, 0);
      const dataURL = tmp.toDataURL("image/png");
      const img = await loadImageElement(dataURL);

      const result = await aiToWhiteBackground(
        img,
        (pct: number, msg: string) => {
          setAiProgress(pct);
          if (msg) setAiMessage(msg);
        },
        aiMode,
      );

      const finalResult = result.canvas;
      await canvasState.applyExternalProcess(() => finalResult);
      const outURL = finalResult.toDataURL("image/png");
      setProcessedImage(outURL);
      setProcessedInfo(await getImageInfo(outURL));
      setAiLastMode(result.mode);
      setAiMessage(`完成 ✓（使用 ${result.mode}）`);
    } catch (err) {
      setAiMessage("处理失败：" + (err instanceof Error ? err.message : String(err)));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyGenerateBg = async () => {
    if (!canvasState) return;
    if (!apiKey && aiMode === "AI_CLOUD") {
      setAiMessage("请先在下方展开配置，填写 API Key");
      return;
    }
    setLoading(true);
    setAiProgress(0);
    setAiMessage("1/2 抠图中...");
    try {
      const canvas = canvasState.getCurrentCanvas();
      const tmp = document.createElement("canvas");
      tmp.width = canvas.width;
      tmp.height = canvas.height;
      tmp.getContext("2d")!.drawImage(canvas, 0, 0);
      const dataURL = tmp.toDataURL("image/png");
      const img = await loadImageElement(dataURL);

      const matted = await aiRemoveBackground(
        img,
        (pct: number) => setAiProgress(Math.floor(pct * 0.5)),
        aiMode,
      );
      setAiMessage("2/2 生成背景中...");
      setAiProgress(55);

      const finalCanvas = await aiGenerateBackground(matted.canvas, bgPrompt, {
        mode: aiMode,
        cloudProvider,
        apiKey,
        customEndpoint,
      });

      await canvasState.applyExternalProcess(() => finalCanvas);
      const outURL = finalCanvas.toDataURL("image/png");
      setProcessedImage(outURL);
      setProcessedInfo(await getImageInfo(outURL));
      setAiMessage("完成 ✓（AI 生成背景）");
      setAiProgress(100);
    } catch (err) {
      setAiMessage("处理失败：" + (err instanceof Error ? err.message : String(err)));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyResize = async () => {
    if (!canvasState) return;
    setLoading(true);
    try {
      const outURL = await canvasState.applyExternalProcess((img: any) => {
        return resizeImage(img, resizeW, resizeH, resizeMode, "#ffffff");
      });
      if (outURL) {
        setProcessedImage(outURL);
        setProcessedInfo(await getImageInfo(outURL));
      }
    } finally {
      setLoading(false);
    }
  };

  const applyCompress = async () => {
    if (!canvasState) return;
    setLoading(true);
    try {
      const outURL = await canvasState.applyExternalProcess((img: any) => {
        const resultCanvas = document.createElement("canvas");
        const rctx = resultCanvas.getContext("2d");
        if (!rctx) return img;
        resultCanvas.width = img.naturalWidth || img.width;
        resultCanvas.height = img.naturalHeight || img.height;
        if (compressFormat === "image/jpeg") {
          rctx.fillStyle = "#ffffff";
          rctx.fillRect(0, 0, resultCanvas.width, resultCanvas.height);
        }
        rctx.drawImage(img, 0, 0);
        return resultCanvas;
      });
      if (outURL) {
        const canvas = canvasState.getCurrentCanvas();
        const finalOutURL = canvas.toDataURL(
          compressFormat,
          compressQuality / 100,
        );
        setProcessedImage(finalOutURL);
        setProcessedInfo(await getImageInfo(finalOutURL));
      }
    } finally {
      setLoading(false);
    }
  };

  const applySuper = async () => {
    if (!canvasState) return;
    setLoading(true);
    try {
      const outURL = await canvasState.applyExternalProcess((img: any) => {
        return superResolution(img, superScale);
      });
      if (outURL) {
        setProcessedImage(outURL);
        setProcessedInfo(await getImageInfo(outURL));
      }
    } finally {
      setLoading(false);
    }
  };

  const applyAdjust = async () => {
    if (!canvasState) return;
    setLoading(true);
    try {
      const outURL = await canvasState.applyExternalProcess((img: any) => {
        return adjustColor(img, brightness, contrast, saturation);
      });
      if (outURL) {
        setProcessedImage(outURL);
        setProcessedInfo(await getImageInfo(outURL));
      }
    } finally {
      setLoading(false);
    }
  };

  const applyReplaceBg = async () => {
    if (!canvasState) return;
    setLoading(true);
    try {
      const outURL = await canvasState.applyExternalProcess((img: any) => {
        return replaceBackground(img, bgColor);
      });
      if (outURL) {
        setProcessedImage(outURL);
        setProcessedInfo(await getImageInfo(outURL));
      }
    } finally {
      setLoading(false);
    }
  };

  const applyWatermark = async () => {
    if (!canvasState) return;
    setLoading(true);
    try {
      const outURL = await canvasState.applyExternalProcess((img: any) => {
        return addTextWatermark(img, wmText, {
          position: wmTile ? "tile" : wmPos,
          opacity: wmOpacity / 100,
          rotate: wmRotate,
          fontSize: wmSize,
          color: "#000000",
        });
      });
      if (outURL) {
        setProcessedImage(outURL);
        setProcessedInfo(await getImageInfo(outURL));
      }
    } finally {
      setLoading(false);
    }
  };

  const applyOCR = async () => {
    if (!currentImage) return;
    setLoading(true);
    try {
      const mockText =
        `【图片OCR文字识别 - 本地模式】\n\n` +
        `图片尺寸: ${info?.width}×${info?.height}\n` +
        `文件大小: ${info?.sizeKB} KB\n\n` +
        `--- 识别到的文字 (模拟) ---\n\n` +
        `Product Description\n` +
        `Premium Quality Cross-border E-commerce Solution\n\n` +
        `产品特点:\n` +
        `• 高品质材质\n` +
        `• 符合平台规范\n` +
        `• 跨境电商专用\n\n` +
        `规格: Standard / Premium / Deluxe\n` +
        `价格: $19.99 - $99.99\n\n` +
        `★ 提示: 真实OCR识别需要接入 AI API (如百度OCR/腾讯OCR/Gemini Vision). 本地模式仅做结构预览.`;
      setOcrText(mockText);
    } finally {
      setLoading(false);
    }
  };

  const calculateHash = async (dataURL: string) => {
    const img = await loadImageElement(dataURL);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";
    canvas.width = 8;
    canvas.height = 8;
    ctx.drawImage(img, 0, 0, 8, 8);
    const imgData = ctx.getImageData(0, 0, 8, 8);
    const data = imgData.data;
    const grays: number[] = [];
    for (let i = 0; i < data.length; i += 4) {
      grays.push((data[i] + data[i + 1] + data[i + 2]) / 3);
    }
    const avg = grays.reduce((a, b) => a + b, 0) / grays.length;
    return grays.map((g) => (g >= avg ? "1" : "0")).join("");
  };

  const hammingDistance = (a: string, b: string) => {
    let d = 0;
    for (let i = 0; i < Math.min(a.length, b.length); i++)
      if (a[i] !== b[i]) d++;
    return d;
  };

  const applyHashCompare = async () => {
    if (hashFiles.length < 2) {
      alert("请至少上传2张图片进行对比");
      return;
    }
    setLoading(true);
    try {
      const hashes: any[] = [];
      for (const f of hashFiles) {
        const dataURL = await loadImageAsDataURL(f.file || f);
        const hash = await calculateHash(dataURL);
        hashes.push({ name: f.name || `图片${hashes.length + 1}`, hash });
      }
      const pairs: any[] = [];
      for (let i = 0; i < hashes.length; i++) {
        for (let j = i + 1; j < hashes.length; j++) {
          const dist = hammingDistance(hashes[i].hash, hashes[j].hash);
          const similarity = Math.round((1 - dist / 64) * 100);
          pairs.push({
            a: hashes[i].name,
            b: hashes[j].name,
            similarity,
            dist,
          });
        }
      }
      pairs.sort((a, b) => b.similarity - a.similarity);
      setHashResult(pairs);
    } finally {
      setLoading(false);
    }
  };

  const handleHashFileSelect = async (fileList: any[]) => {
    const loaded: any[] = [];
    for (const f of fileList) {
      loaded.push(f);
    }
    setHashFiles([...hashFiles, ...loaded]);
  };

  const handleBatchFiles = async (fileList: any[]) => {
    setFiles(fileList);
  };

  const applyBatch = async () => {
    if (!files || files.length === 0) {
      alert("请先上传图片");
      return;
    }
    setLoading(true);
    setBatchResults([]);
    try {
      const results: any[] = [];
      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        const dataURL = await loadImageAsDataURL(f.file || f);
        let img = await loadImageElement(dataURL);
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        if (!ctx) continue;
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);

        if (batchConfig.bg) {
          const tmp = document.createElement("canvas");
          tmp.width = canvas.width;
          tmp.height = canvas.height;
          const tmpCtx = tmp.getContext("2d");
          if (tmpCtx) {
            tmpCtx.drawImage(canvas, 0, 0);
            img = await loadImageElement(tmp.toDataURL("image/png"));
            const matted = mattingSimple(img, 60, "#ffffff");
            canvas.width = matted.width;
            canvas.height = matted.height;
            const mctx = canvas.getContext("2d");
            if (mctx) mctx.drawImage(matted, 0, 0);
          }
        }
        if (batchConfig.resize) {
          img = await loadImageElement(canvas.toDataURL("image/png"));
          const resized = resizeImage(
            img,
            batchConfig.w,
            batchConfig.h,
            "contain",
            "#ffffff",
          );
          canvas.width = resized.width;
          canvas.height = resized.height;
          const rctx = canvas.getContext("2d");
          if (rctx) rctx.drawImage(resized, 0, 0);
        }
        const format = "image/jpeg";
        const outURL = canvas.toDataURL(format, batchConfig.quality / 100);
        const info2 = await getImageInfo(outURL);
        results.push({
          name: f.name || `img${i + 1}.jpg`,
          dataURL: outURL,
          info: info2,
        });
        setBatchProgress(Math.round(((i + 1) / files.length) * 100));
        setBatchResults([...results]);
      }
    } finally {
      setLoading(false);
    }
  };

  const downloadBatch = () => {
    if (!batchResults) return;
    batchResults.forEach((r: any, i: number) => {
      setTimeout(() => {
        downloadDataURL(
          r.dataURL,
          `processed_${r.name.replace(/\.[^.]+$/, "")}.jpg`,
        );
      }, i * 300);
    });
  };

  const downloadResult = () => {
    if (!processedImage && !currentImage) return;
    const target = processedImage || currentImage;
    if (!target) return;
    const ext = target.includes("jpeg")
      ? "jpg"
      : target.includes("webp")
        ? "webp"
        : "png";
    downloadDataURL(target, `image_processed_${Date.now()}.${ext}`);
  };

  const resetEditor = () => {
    setCurrentImage(null);
    setProcessedImage(null);
    setInfo(null);
    setProcessedInfo(null);
    setOcrText("");
    setFiles([]);
  };

  const renderToolPanel = () => {
    switch (activeTool) {
      case "matting":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Brain className="inline-block w-4 h-4 mr-1" />
                AI 引擎
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    id: "AI_LOCAL",
                    name: "本地模型",
                    desc: "WASM",
                    icon: "🧠",
                  },
                  { id: "CLASSIC", name: "传统算法", desc: "即时", icon: "⚡" },
                  {
                    id: "AI_CLOUD",
                    name: "云端 API",
                    desc: "自备 Key",
                    icon: "☁️",
                  },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setAiMode(m.id)}
                    className={`px-2 py-2 rounded-xl text-sm border text-left transition ${
                      aiMode === m.id
                        ? "bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8f] text-white border-[#1e3a5f] shadow-md"
                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                    }`}
                  >
                    <div className="text-base">{m.icon}</div>
                    <div className="font-semibold text-xs mt-1">{m.name}</div>
                    <div
                      className={`text-[10px] ${aiMode === m.id ? "text-blue-100" : "text-gray-400"}`}
                    >
                      {m.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                背景颜色
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                <input
                  type="color"
                  value={mattingBg.startsWith("#") ? mattingBg : "#ffffff"}
                  onChange={(e) => setMattingBg(e.target.value)}
                  className="w-12 h-12 rounded-lg border border-gray-200 cursor-pointer"
                />
                <button
                  onClick={() => setMattingBg("transparent")}
                  className={`px-3 py-2 rounded-lg text-sm border ${mattingBg === "transparent" ? "bg-[#1e3a5f] text-white border-[#1e3a5f]" : "border-gray-200 hover:border-gray-300"}`}
                >
                  透明
                </button>
                <button
                  onClick={() => setMattingBg("#ffffff")}
                  className={`px-3 py-2 rounded-lg text-sm border ${mattingBg === "#ffffff" ? "bg-[#1e3a5f] text-white border-[#1e3a5f]" : "border-gray-200 hover:border-gray-300"}`}
                >
                  纯白底
                </button>
                <button
                  onClick={() => setMattingBg("#f3f4f6")}
                  className={`px-3 py-2 rounded-lg text-sm border ${mattingBg === "#f3f4f6" ? "bg-[#1e3a5f] text-white border-[#1e3a5f]" : "border-gray-200 hover:border-gray-300"}`}
                >
                  浅灰
                </button>
              </div>
            </div>

            {(loading || aiMessage) && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-blue-900 truncate">
                    {aiMessage || "正在处理..."}
                  </span>
                  {aiProgress > 0 && (
                    <span className="text-xs font-bold text-blue-700">
                      {aiProgress}%
                    </span>
                  )}
                </div>
                <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-200"
                    style={{
                      width: `${Math.max(aiProgress, loading ? 2 : 0)}%`,
                    }}
                  />
                </div>
                {aiMode === "AI_LOCAL" && aiProgress < 60 && loading && (
                  <p className="text-[10px] text-blue-700 mt-2">
                    💡 首次使用需要下载 ~40MB AI 模型，请耐心等待
                  </p>
                )}
              </div>
            )}

            {aiMode === "CLASSIC" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  识别容差: {mattingTolerance}
                </label>
                <input
                  type="range"
                  min="10"
                  max="120"
                  value={mattingTolerance}
                  onChange={(e) => setMattingTolerance(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  值越大,越多边缘背景被去除 (仅传统算法生效)
                </p>
              </div>
            )}

            <button
              onClick={applyMatting}
              disabled={!currentImage || loading}
              className="w-full px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 transition"
            >
              {loading ? (
                <>
                  <span className="inline-block animate-spin mr-2">⚙️</span>
                  处理中 {aiProgress}%
                </>
              ) : (
                <>✨ 一键智能抠图</>
              )}
            </button>
            <button
              onClick={applyWhiteBg}
              disabled={!currentImage || loading}
              className="w-full px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 transition"
            >
              {loading ? "处理中..." : "🎨 生成纯白电商主图"}
            </button>
            <button
              onClick={applyGenerateBg}
              disabled={!currentImage || loading}
              className="w-full px-5 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 transition"
            >
              <Sparkles className="inline-block w-4 h-4 mr-1" />
              AI 生成专业背景
            </button>

            <div>
              <button
                onClick={() => setShowCloudConfig(!showCloudConfig)}
                className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
              >
                <span className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  云端 API 配置
                </span>
                {showCloudConfig ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {showCloudConfig && (
                <div className="mt-3 space-y-3 p-3 bg-gray-50 rounded-xl text-xs">
                  <div>
                    <label className="block text-gray-600 mb-1">供应商</label>
                    <select
                      value={cloudProvider}
                      onChange={(e) => setCloudProvider(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                    >
                      <option value="aliyun">
                        阿里云视觉智能（SegmentBody）
                      </option>
                      <option value="tencent">腾讯云图像分割</option>
                      <option value="openai">OpenAI / 兼容接口</option>
                      <option value="custom">自定义后端转发</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">API Key</label>
                    <input
                      type="password"
                      placeholder="填入你的 Key（仅本地保存，不上传）"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">
                      自定义 Endpoint（可选）
                    </label>
                    <input
                      type="text"
                      placeholder="/api/ai/remove-bg 或 http://..."
                      value={customEndpoint}
                      onChange={(e) => setCustomEndpoint(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">
                      背景生成 Prompt
                    </label>
                    <textarea
                      rows={2}
                      value={bgPrompt}
                      onChange={(e) => setBgPrompt(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                    />
                  </div>
                  <p className="text-[10px] text-gray-500 leading-relaxed">
                    🔒 配置保存在浏览器 localStorage，不会上传到任何服务器。
                    <br />
                    💡 "云端 API" 模式下需要你自建后端转发（Next.js Route
                    Handler 示例见代码），避免 Key 暴露在前端。
                  </p>
                </div>
              )}
            </div>

            {aiLastMode && (
              <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100">
                上一次使用:{" "}
                <span className="font-semibold text-emerald-700">
                  {aiLastMode}
                </span>
              </div>
            )}
          </div>
        );

      case "erase":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                画笔大小: {brushSize}px
              </label>
              <input
                type="range"
                min="5"
                max="100"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              💡 使用方法: 在左侧画布上拖动鼠标,
              即可擦除不需要的区域(如水印、杂物、瑕疵). 擦除后背景会变透明,
              可在其他工具中填充颜色.
            </div>
            <p className="text-xs text-gray-500">支持撤销/重做操作</p>
          </div>
        );

      case "resize":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  宽度(px)
                </label>
                <input
                  type="number"
                  value={resizeW}
                  onChange={(e) => setResizeW(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  高度(px)
                </label>
                <input
                  type="number"
                  value={resizeH}
                  onChange={(e) => setResizeH(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                缩放模式
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "contain", name: "留白", desc: "等比+留白" },
                  { id: "cover", name: "裁剪", desc: "等比+裁剪" },
                  { id: "stretch", name: "拉伸", desc: "强制填充" },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setResizeMode(m.id)}
                    className={`px-3 py-2 rounded-lg text-sm border ${resizeMode === m.id ? "bg-[#1e3a5f] text-white border-[#1e3a5f]" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <div className="font-semibold">{m.name}</div>
                    <div className="text-xs opacity-70">{m.desc}</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {PRESET_TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setResizeW(t.width);
                    setResizeH(t.height);
                  }}
                  className="px-3 py-2 text-xs rounded-lg border border-gray-200 hover:border-[#1e3a5f] hover:bg-blue-50"
                >
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-gray-500">
                    {t.width}×{t.height}
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={applyResize}
              disabled={!currentImage || loading}
              className="w-full px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-50"
            >
              {loading ? "处理中..." : "📐 应用尺寸调整"}
            </button>
          </div>
        );

      case "crop":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                裁剪比例
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: "free", name: "自由" },
                  { id: "1:1", name: "1:1" },
                  { id: "4:3", name: "4:3" },
                  { id: "16:9", name: "16:9" },
                  { id: "3:4", name: "3:4" },
                  { id: "9:16", name: "9:16" },
                  { id: "3:2", name: "3:2" },
                  { id: "2:3", name: "2:3" },
                ].map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setCropRatio(r.id)}
                    className={`px-2 py-2 rounded-lg text-sm border ${cropRatio === r.id ? "bg-[#1e3a5f] text-white border-[#1e3a5f]" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    {r.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 text-sm text-violet-800">
              💡 使用方法: 在左侧画布上按住鼠标拖动,
              框选出需要保留的区域后释放鼠标, 即可完成裁剪. 支持撤销.
            </div>
          </div>
        );

      case "compress":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                输出格式
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "image/jpeg", name: "JPEG", desc: "体积小" },
                  { id: "image/png", name: "PNG", desc: "无损" },
                  { id: "image/webp", name: "WebP", desc: "现代格式" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setCompressFormat(f.id)}
                    className={`px-3 py-2 rounded-lg text-sm border ${compressFormat === f.id ? "bg-[#1e3a5f] text-white border-[#1e3a5f]" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <div className="font-semibold">{f.name}</div>
                    <div className="text-xs opacity-70">{f.desc}</div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                压缩质量: {compressQuality}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={compressQuality}
                onChange={(e) => setCompressQuality(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <button
              onClick={applyCompress}
              disabled={!currentImage || loading}
              className="w-full px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-50"
            >
              {loading ? "处理中..." : "🗜️ 压缩并转换格式"}
            </button>
          </div>
        );

      case "super":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                放大倍率
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 2, name: "2倍" },
                  { id: 3, name: "3倍" },
                  { id: 4, name: "4倍" },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSuperScale(s.id)}
                    className={`px-3 py-3 rounded-lg text-sm border ${superScale === s.id ? "bg-[#1e3a5f] text-white border-[#1e3a5f]" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <div className="font-semibold text-lg">{s.name}</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4 text-sm text-cyan-800">
              💡 使用双线性插值算法对图片进行无损放大, 保持清晰度同时提升分辨率.
              适合用于小图放大到平台要求尺寸.
            </div>
            <button
              onClick={applySuper}
              disabled={!currentImage || loading}
              className="w-full px-5 py-3 bg-gradient-to-r from-cyan-500 to-sky-500 text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-50"
            >
              {loading ? "处理中..." : "⚡ 超清放大"}
            </button>
          </div>
        );

      case "adjust":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                亮度: {brightness}
              </label>
              <input
                type="range"
                min="-100"
                max="100"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                对比度: {contrast}
              </label>
              <input
                type="range"
                min="-100"
                max="100"
                value={contrast}
                onChange={(e) => setContrast(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                饱和度: {saturation}
              </label>
              <input
                type="range"
                min="-100"
                max="100"
                value={saturation}
                onChange={(e) => setSaturation(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setBrightness(0);
                  setContrast(0);
                  setSaturation(0);
                }}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm hover:border-gray-300"
              >
                重置
              </button>
              <button
                onClick={() => {
                  setBrightness(10);
                  setContrast(15);
                  setSaturation(10);
                }}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm hover:border-gray-300"
              >
                自动增强
              </button>
            </div>
            <button
              onClick={applyAdjust}
              disabled={!currentImage || loading}
              className="w-full px-5 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-50"
            >
              {loading ? "处理中..." : "🎨 应用调色"}
            </button>
          </div>
        );

      case "bg":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                背景颜色
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                <input
                  type="color"
                  value={bgColor.startsWith("gradient") ? "#ffffff" : bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-12 h-12 rounded-lg border border-gray-200 cursor-pointer"
                />
                <button
                  onClick={() => setBgColor("#ffffff")}
                  className={`px-3 py-2 rounded-lg text-sm border ${bgColor === "#ffffff" ? "bg-[#1e3a5f] text-white border-[#1e3a5f]" : "border-gray-200"}`}
                >
                  纯白
                </button>
                <button
                  onClick={() => setBgColor("#f3f4f6")}
                  className={`px-3 py-2 rounded-lg text-sm border ${bgColor === "#f3f4f6" ? "bg-[#1e3a5f] text-white border-[#1e3a5f]" : "border-gray-200"}`}
                >
                  浅灰
                </button>
                <button
                  onClick={() => setBgColor("#1e3a5f")}
                  className={`px-3 py-2 rounded-lg text-sm border ${bgColor === "#1e3a5f" ? "bg-[#1e3a5f] text-white border-[#1e3a5f]" : "border-gray-200"}`}
                >
                  深蓝
                </button>
                <button
                  onClick={() => setBgColor("gradient:#ffffff|#e5e7eb")}
                  className="px-3 py-2 rounded-lg text-sm border border-gray-200"
                >
                  渐变1
                </button>
                <button
                  onClick={() => setBgColor("gradient:#fef3c7|#fbbf24")}
                  className="px-3 py-2 rounded-lg text-sm border border-gray-200"
                >
                  渐变2
                </button>
              </div>
            </div>
            <div className="bg-lime-50 border border-lime-200 rounded-xl p-4 text-sm text-lime-800">
              💡 提示: 此功能会在当前图片下方覆盖一层背景色,
              适合为透明背景的抠图结果填充颜色.
            </div>
            <button
              onClick={applyReplaceBg}
              disabled={!currentImage || loading}
              className="w-full px-5 py-3 bg-gradient-to-r from-lime-500 to-green-500 text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-50"
            >
              {loading ? "处理中..." : "🖌️ 应用背景"}
            </button>
          </div>
        );

      case "watermark":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                水印文字
              </label>
              <input
                type="text"
                value={wmText}
                onChange={(e) => setWmText(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200"
                placeholder="输入水印文字"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                字体大小: {wmSize}px
              </label>
              <input
                type="range"
                min="12"
                max="100"
                value={wmSize}
                onChange={(e) => setWmSize(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                不透明度: {wmOpacity}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={wmOpacity}
                onChange={(e) => setWmOpacity(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                位置
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  "top-left",
                  "top-right",
                  "bottom-left",
                  "bottom-right",
                  "center",
                ].map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setWmPos(p);
                      setWmTile(false);
                    }}
                    className={`px-3 py-2 rounded-lg text-xs border ${!wmTile && wmPos === p ? "bg-[#1e3a5f] text-white border-[#1e3a5f]" : "border-gray-200"}`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setWmTile(true)}
                  className={`px-3 py-2 rounded-lg text-xs border ${wmTile ? "bg-[#1e3a5f] text-white border-[#1e3a5f]" : "border-gray-200"}`}
                >
                  平铺
                </button>
              </div>
            </div>
            {wmTile && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  旋转角度: {wmRotate}°
                </label>
                <input
                  type="range"
                  min="-90"
                  max="90"
                  value={wmRotate}
                  onChange={(e) => setWmRotate(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            )}
            <button
              onClick={applyWatermark}
              disabled={!currentImage || loading || !wmText}
              className="w-full px-5 py-3 bg-gradient-to-r from-slate-600 to-gray-700 text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-50"
            >
              {loading ? "处理中..." : "📝 添加水印"}
            </button>
          </div>
        );

      case "ocr":
        return (
          <div className="space-y-4">
            <div>
              <FileUploader
                files={[]}
                onFilesChange={handleFileSelect}
                accept="image/*"
                multiple={false}
                maxFiles={1}
                maxSize={10}
              />
            </div>
            <button
              onClick={applyOCR}
              disabled={!currentImage || loading}
              className="w-full px-5 py-3 bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-50"
            >
              {loading ? "识别中..." : "🔍 识别图片文字"}
            </button>
            {ocrText && (
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  识别结果
                </h4>
                <pre className="text-xs text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
                  {ocrText}
                </pre>
                <button
                  onClick={() => navigator.clipboard.writeText(ocrText)}
                  className="mt-3 px-4 py-2 bg-[#1e3a5f] text-white rounded-lg text-sm hover:shadow-lg"
                >
                  复制文字
                </button>
              </div>
            )}
          </div>
        );

      case "hash":
        return (
          <div className="space-y-4">
            <div>
              <FileUploader
                files={hashFiles}
                onFilesChange={setHashFiles}
                accept="image/*"
                multiple={true}
                maxFiles={10}
                maxSize={10}
              />
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-sm text-orange-800">
              💡 上传多张图片,
              系统会使用感知哈希算法(pHash)计算每张图片的特征指纹,
              对比相似度找出重复/相似图片.
            </div>
            <button
              onClick={applyHashCompare}
              disabled={hashFiles.length < 2 || loading}
              className="w-full px-5 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-50"
            >
              {loading ? "分析中..." : `🔗 对比 ${hashFiles.length} 张图片`}
            </button>
            {hashResult && (
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 max-h-96 overflow-y-auto">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  相似度结果 (从高到低)
                </h4>
                {hashResult &&
                  hashResult.map((r: any, i: number) => (
                    <div
                      key={i}
                      className={`p-3 mb-2 rounded-lg ${r.similarity >= 90 ? "bg-red-100 border border-red-300" : r.similarity >= 70 ? "bg-amber-100 border border-amber-300" : "bg-white border border-gray-200"}`}
                    >
                      <div className="text-xs text-gray-600 mb-1">
                        {r.a} ↔ {r.b}
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-bold ${r.similarity >= 90 ? "text-red-700" : r.similarity >= 70 ? "text-amber-700" : "text-gray-700"}`}
                        >
                          {r.similarity}%
                        </span>
                        <span className="text-xs text-gray-500">
                          {r.similarity >= 90
                            ? "高度重复!"
                            : r.similarity >= 70
                              ? "较为相似"
                              : "差异较大"}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        );

      case "batch":
        return (
          <div className="space-y-4">
            <div>
              <FileUploader
                files={files}
                onFilesChange={handleBatchFiles}
                accept="image/*"
                multiple={true}
                maxFiles={50}
                maxSize={10}
              />
            </div>
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={batchConfig.bg}
                  onChange={(e) =>
                    setBatchConfig({ ...batchConfig, bg: e.target.checked })
                  }
                  className="rounded"
                />
                <span className="text-sm font-medium text-gray-700">
                  智能抠白底
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={batchConfig.resize}
                  onChange={(e) =>
                    setBatchConfig({ ...batchConfig, resize: e.target.checked })
                  }
                  className="rounded"
                />
                <span className="text-sm font-medium text-gray-700">
                  尺寸标准化
                </span>
                {batchConfig.resize && (
                  <div className="flex gap-1 ml-2">
                    <input
                      type="number"
                      value={batchConfig.w}
                      onChange={(e) =>
                        setBatchConfig({
                          ...batchConfig,
                          w: Number(e.target.value),
                        })
                      }
                      className="w-20 px-2 py-1 text-xs border border-gray-200 rounded"
                      placeholder="宽"
                    />
                    <input
                      type="number"
                      value={batchConfig.h}
                      onChange={(e) =>
                        setBatchConfig({
                          ...batchConfig,
                          h: Number(e.target.value),
                        })
                      }
                      className="w-20 px-2 py-1 text-xs border border-gray-200 rounded"
                      placeholder="高"
                    />
                  </div>
                )}
              </label>
              <label className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  压缩质量:
                </span>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={batchConfig.quality}
                  onChange={(e) =>
                    setBatchConfig({
                      ...batchConfig,
                      quality: Number(e.target.value),
                    })
                  }
                  className="w-32"
                />
                <span className="text-xs text-gray-500">
                  {batchConfig.quality}%
                </span>
              </label>
            </div>
            {batchProgress > 0 && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${batchProgress}%` }}
                />
              </div>
            )}
            <button
              onClick={applyBatch}
              disabled={!files.length || loading}
              className="w-full px-5 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-50"
            >
              {loading
                ? `处理中 ${batchProgress}%...`
                : `🚀 批量处理 ${files.length} 张图片`}
            </button>
            {batchResults.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">
                    处理完成 {batchResults.length} 张
                  </span>
                  <button
                    onClick={downloadBatch}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg text-sm hover:shadow-lg"
                  >
                    📥 批量下载
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                  {batchResults.map((r, i) => (
                    <div
                      key={i}
                      className="bg-white border border-gray-200 rounded-lg p-2 text-center"
                    >
                      <img
                        src={r.dataURL}
                        className="w-full h-20 object-cover rounded mb-1"
                      />
                      <div className="text-xs text-gray-600 truncate">
                        {r.name}
                      </div>
                      <div className="text-xs text-gray-400">
                        {r.info?.sizeKB}KB
                      </div>
                      <button
                        onClick={() =>
                          downloadDataURL(r.dataURL, `processed_${r.name}`)
                        }
                        className="mt-1 text-xs text-[#1e3a5f] hover:underline"
                      >
                        下载
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case "template":
        return (
          <div className="space-y-4">
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 text-sm text-teal-800">
              🔥 <b>一键生成电商主图</b>
              <br />
              系统会自动: 智能抠图 → 去除白边 → 自动裁切 → 居中留白 →
              自动色彩校正 → Unsharp Mask 锐化 → 生成 JPEG 主图.
            </div>
            <div className="grid gap-3">
              {PRESET_TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={async () => {
                    if (!currentImage) {
                      alert("请先上传图片");
                      return;
                    }
                    setLoading(true);
                    setAiProgress(0);
                    setAiMessage("正在初始化...");
                    try {
                      const canvas = canvasState?.getCurrentCanvas();
                      if (!canvas) return;
                      const dataURL = canvas.toDataURL("image/png");
                      const img = await loadImageElement(dataURL);
                      const result = generateProductHero(img, t.id, (p, m) => {
                        setAiProgress(Math.floor(p * 100));
                        if (m) setAiMessage(m);
                      });
                      const finalCanvas = result.canvas;
                      canvas.width = finalCanvas.width;
                      canvas.height = finalCanvas.height;
                      const ctx = canvas.getContext("2d");
                      if (!ctx) return;
                      ctx.clearRect(0, 0, canvas.width, canvas.height);
                      ctx.drawImage(finalCanvas, 0, 0);
                      const out = finalCanvas.toDataURL(
                        "image/jpeg",
                        t.quality / 100,
                      );
                      setProcessedImage(out);
                      setProcessedInfo(await getImageInfo(out));
                      canvasState?.setCanvasSize(
                        finalCanvas.width,
                        finalCanvas.height,
                      );
                      canvasState?.saveState();
                      setAiMessage("✅ 完成！已生成高质量主图");
                    } finally {
                      setLoading(false);
                    }
                  }}
                  disabled={!currentImage || loading}
                  className="p-4 bg-white border border-gray-200 rounded-xl hover:border-teal-500 hover:bg-teal-50 disabled:opacity-50 text-left flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold text-gray-800">{t.name}</div>
                    <div className="text-xs text-gray-500">
                      {t.width}×{t.height}px / JPEG / 质量 {t.quality}%
                    </div>
                  </div>
                  <span className="text-teal-600 text-sm font-semibold">
                    一键生成 →
                  </span>
                </button>
              ))}
            </div>
            {loading && (
              <div className="bg-white border border-gray-200 rounded-xl p-4 text-sm">
                <div className="font-medium text-gray-700 mb-2">
                  {aiMessage}
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all"
                    style={{ width: `${aiProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const getToolInfo = () => {
    const tool = TOOLS.find((t) => t.id === activeTool);
    return tool;
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur">
            <Image className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">图片处理&图文解析</h1>
            <p className="text-white/90 mt-1 text-sm">
              跨境电商图片一站式处理:
              AI抠图、去水印、尺寸标准化、压缩优化、OCR识别
            </p>
          </div>
          <div className="hidden md:block text-right">
            <div className="text-3xl font-bold">13</div>
            <div className="text-xs text-white/80">种工具</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">处理工具</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-2">
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`p-3 rounded-xl text-left transition-all ${isActive ? "bg-[#1e3a5f] text-white shadow-lg" : "border border-gray-200 hover:border-[#1e3a5f]/50 hover:bg-blue-50 bg-white"}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div
                    className={`w-8 h-8 rounded-lg ${isActive ? "bg-white/20" : `bg-gradient-to-br ${tool.color}`} flex items-center justify-center`}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded ${isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}
                  >
                    {tool.tag}
                  </span>
                </div>
                <div
                  className={`text-xs font-semibold ${isActive ? "text-white" : "text-gray-800"}`}
                >
                  {tool.name}
                </div>
                <div
                  className={`text-[11px] mt-0.5 ${isActive ? "text-white/80" : "text-gray-500"}`}
                >
                  {tool.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700">
                图片编辑器
              </h3>
              {currentImage && (
                <button
                  onClick={resetEditor}
                  className="text-xs text-gray-500 hover:text-red-500"
                >
                  重新上传
                </button>
              )}
            </div>
            {!currentImage && (
              <div className="mb-4">
                <FileUploader
                  files={files}
                  onFilesChange={handleFileSelect}
                  accept="image/*"
                  multiple={false}
                  maxFiles={1}
                  maxSize={20}
                />
              </div>
            )}
            <ImageCanvas
              imageSrc={currentImage}
              tool={
                activeTool === "erase"
                  ? "erase"
                  : activeTool === "crop"
                    ? "crop"
                    : "move"
              }
              brushSize={brushSize}
              onImageProcessed={handleProcessed}
              onStateChange={setCanvasState}
            />
          </div>

          {currentImage && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                  原始图片
                </h4>
                {info && (
                  <div className="text-sm space-y-1 text-gray-700">
                    <div>
                      尺寸: {info.width} × {info.height} px
                    </div>
                    <div>文件大小: ~{info.sizeKB} KB</div>
                    <div>格式: {info.format}</div>
                  </div>
                )}
              </div>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                  当前编辑结果
                </h4>
                {processedInfo ? (
                  <div className="text-sm space-y-1 text-gray-700">
                    <div>
                      尺寸: {processedInfo.width} × {processedInfo.height} px
                    </div>
                    <div>文件大小: ~{processedInfo.sizeKB} KB</div>
                    <div className="text-emerald-600 font-semibold">
                      ✓ 已处理
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-400">尚未应用处理</div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sticky top-4">
            <div className="flex items-center gap-2 mb-4">
              {(() => {
                const Icon = getToolInfo()?.icon || Image;
                return <Icon className="w-5 h-5 text-[#1e3a5f]" />;
              })()}
              <h3 className="text-base font-bold text-[#1e3a5f]">
                {getToolInfo()?.name}
              </h3>
            </div>
            {renderToolPanel()}

            {currentImage &&
              activeTool !== "ocr" &&
              activeTool !== "hash" &&
              activeTool !== "batch" && (
                <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
                  <button
                    onClick={downloadResult}
                    disabled={loading}
                    className="w-full px-5 py-3 bg-gradient-to-r from-[#1e3a5f] to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    下载处理后的图片
                  </button>
                  {processedImage && (
                    <button
                      onClick={() => {
                        if (processedImage && canvasState) {
                          const canvas = canvasState.getCurrentCanvas();
                          if (!canvas) return;
                          const img = new (window.Image as any)();
                          img.onload = () => {
                            canvas.width = img.naturalWidth;
                            canvas.height = img.naturalHeight;
                            const ctx = canvas.getContext("2d");
                            if (!ctx) return;
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            ctx.drawImage(img, 0, 0);
                            canvasState.setCanvasSize(
                              img.naturalWidth,
                              img.naturalHeight,
                            );
                            canvasState.saveState();
                          };
                          img.src = processedImage;
                        }
                      }}
                      disabled={loading}
                      className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm hover:bg-gray-200"
                    >
                      📥 载入当前结果继续编辑
                    </button>
                  )}
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
