"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ZoomIn, ZoomOut, RotateCw, RotateCcw, FlipHorizontal, FlipVertical, Crop, Move, Eraser, Undo2, Redo2, Download } from "lucide-react";

export default function ImageCanvas({
  imageSrc,
  tool = "move",
  brushSize = 20,
  onImageProcessed,
  initialCanvas = null,
  onStateChange,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [cropMode, setCropMode] = useState(false);
  const [cropRect, setCropRect] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [imageEl, setImageEl] = useState(null);
  const [naturalSize, setNaturalSize] = useState({ w: 0, h: 0 });
  const canvasSize = useRef({ w: 0, h: 0 });

  const saveState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const snapshot = canvas.toDataURL("image/png");
    const newHistory = history.slice(0, historyIdx + 1);
    newHistory.push(snapshot);
    if (newHistory.length > 50) newHistory.shift();
    setHistory(newHistory);
    setHistoryIdx(newHistory.length - 1);
  }, [history, historyIdx]);

  const restoreState = useCallback((idx) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || idx < 0 || idx >= history.length) return;
    const img = new Image();
    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvasSize.current = { w: img.naturalWidth, h: img.naturalHeight };
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      setHistoryIdx(idx);
      onImageProcessed && onImageProcessed(canvas.toDataURL("image/png"));
    };
    img.src = history[idx];
  }, [history, onImageProcessed]);

  useEffect(() => {
    if (!imageSrc) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      setImageEl(img);
      setNaturalSize({ w: img.naturalWidth, h: img.naturalHeight });
      const canvas = canvasRef.current;
      if (!canvas) return;
      const maxW = 900;
      const maxH = 600;
      let w = img.naturalWidth;
      let h = img.naturalHeight;
      const r = Math.min(maxW / w, maxH / h, 1);
      canvas.width = w * r;
      canvas.height = h * r;
      canvasSize.current = { w: canvas.width, h: canvas.height };
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      setHistory([canvas.toDataURL("image/png")]);
      setHistoryIdx(0);
      setScale(1);
      setOffset({ x: 0, y: 0 });
      setRotation(0);
      setFlipH(false);
      setFlipV(false);
      onImageProcessed && onImageProcessed(canvas.toDataURL("image/png"));
    };
    img.src = imageSrc;
  }, [imageSrc]);

  useEffect(() => {
    if (initialCanvas && canvasRef.current && imageEl) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = initialCanvas.width;
      canvas.height = initialCanvas.height;
      canvasSize.current = { w: initialCanvas.width, h: initialCanvas.height };
      ctx.drawImage(initialCanvas, 0, 0);
    }
  }, [initialCanvas, imageEl]);

  const getCanvasPos = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0].clientX);
    const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0].clientY);
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const eraseAt = (x, y, size, lastX = null, lastY = null) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "rgba(0,0,0,1)";
    if (lastX !== null && lastY !== null) {
      ctx.lineWidth = size * 2;
      ctx.lineCap = "round";
      ctx.strokeStyle = "rgba(0,0,0,1)";
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  };

  const handleMouseDown = (e) => {
    const pos = getCanvasPos(e);
    if (tool === "erase") {
      setIsDrawing(true);
      eraseAt(pos.x, pos.y, brushSize);
      setDragStart({ x: pos.x, y: pos.y });
    } else if (tool === "crop") {
      setCropRect({ x: pos.x, y: pos.y, w: 0, h: 0 });
      setDragStart({ x: pos.x, y: pos.y });
      setIsDrawing(true);
    } else if (tool === "move") {
      setIsDragging(true);
      const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0].clientX);
      const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0].clientY);
      setDragStart({ x: clientX - offset.x, y: clientY - offset.y });
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging && !isDrawing) return;
    const pos = getCanvasPos(e);
    if (tool === "erase" && isDrawing) {
      eraseAt(pos.x, pos.y, brushSize, dragStart.x, dragStart.y);
      setDragStart({ x: pos.x, y: pos.y });
    } else if (tool === "crop" && isDrawing) {
      setCropRect({
        x: Math.min(dragStart.x, pos.x),
        y: Math.min(dragStart.y, pos.y),
        w: Math.abs(pos.x - dragStart.x),
        h: Math.abs(pos.y - dragStart.y),
      });
    } else if (tool === "move" && isDragging) {
      const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0].clientX);
      const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0].clientY);
      setOffset({ x: clientX - dragStart.x, y: clientY - dragStart.y });
    }
  };

  const handleMouseUp = () => {
    if (isDragging) setIsDragging(false);
    if (isDrawing) {
      setIsDrawing(false);
      if (tool === "crop" && cropRect && cropRect.w > 10 && cropRect.h > 10) {
        applyCrop();
      } else if (tool === "erase") {
        saveState();
        onImageProcessed && onImageProcessed(canvasRef.current.toDataURL("image/png"));
      }
      setCropRect(null);
    }
  };

  const applyCrop = () => {
    if (!cropRect || cropRect.w < 10 || cropRect.h < 10) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const cropped = ctx.getImageData(cropRect.x, cropRect.y, cropRect.w, cropRect.h);
    canvas.width = cropRect.w;
    canvas.height = cropRect.h;
    canvasSize.current = { w: cropRect.w, h: cropRect.h };
    ctx.putImageData(cropped, 0, 0);
    saveState();
    onImageProcessed && onImageProcessed(canvas.toDataURL("image/png"));
  };

  const rotate = (angle) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const tmp = document.createElement("canvas");
    const tctx = tmp.getContext("2d");
    tmp.width = canvas.width;
    tmp.height = canvas.height;
    tctx.putImageData(imgData, 0, 0);
    if (angle > 0) {
      canvas.width = tmp.height;
      canvas.height = tmp.width;
    } else {
      canvas.width = tmp.height;
      canvas.height = tmp.width;
    }
    canvasSize.current = { w: canvas.width, h: canvas.height };
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.drawImage(tmp, -tmp.width / 2, -tmp.height / 2);
    setRotation(rotation + angle);
    saveState();
    onImageProcessed && onImageProcessed(canvas.toDataURL("image/png"));
  };

  const flip = (axis) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const tmp = document.createElement("canvas");
    const tctx = tmp.getContext("2d");
    tmp.width = canvas.width;
    tmp.height = canvas.height;
    tctx.putImageData(imgData, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    if (axis === "h") {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      setFlipH(!flipH);
    } else {
      ctx.translate(0, canvas.height);
      ctx.scale(1, -1);
      setFlipV(!flipV);
    }
    ctx.drawImage(tmp, 0, 0);
    ctx.restore();
    saveState();
    onImageProcessed && onImageProcessed(canvas.toDataURL("image/png"));
  };

  const applyExternalProcess = (processFn) => {
    return new Promise((resolve) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        resolve(null);
        return;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(null);
        return;
      }
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const tmp = document.createElement("canvas");
      tmp.width = canvas.width;
      tmp.height = canvas.height;
      const tctx = tmp.getContext("2d");
      if (tctx) tctx.putImageData(imgData, 0, 0);
      const img = new Image();
      img.onload = () => {
        const resultCanvas = processFn(img);
        if (resultCanvas && resultCanvas.getContext) {
          canvas.width = resultCanvas.width;
          canvas.height = resultCanvas.height;
          canvasSize.current = { w: resultCanvas.width, h: resultCanvas.height };
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(resultCanvas, 0, 0);
          saveState();
          const outURL = canvas.toDataURL("image/png");
          onImageProcessed && onImageProcessed(outURL);
          resolve(outURL);
        } else {
          resolve(null);
        }
      };
      img.onerror = () => resolve(null);
      img.src = tmp.toDataURL("image/png");
    });
  };

  const getCurrentDataURL = () => canvasRef.current?.toDataURL("image/png") || "";
  const getCurrentCanvas = () => canvasRef.current;
  const setCanvasSize = (w, h) => {
    if (canvasRef.current) {
      canvasSize.current = { w, h };
    }
  };

  useEffect(() => {
    onStateChange && onStateChange({
      getCurrentDataURL,
      getCurrentCanvas,
      applyExternalProcess,
      saveState,
      setCanvasSize,
      undo: () => restoreState(historyIdx - 1),
      redo: () => restoreState(historyIdx + 1),
      canUndo: historyIdx > 0,
      canRedo: historyIdx < history.length - 1,
    });
  }, [historyIdx, history.length]);

  if (!imageSrc) {
    return (
      <div
        ref={containerRef}
        className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400"
        style={{ minHeight: "400px" }}
      >
        <div className="text-center">
          <div className="text-6xl mb-3">🖼️</div>
          <p className="text-sm">请先上传图片开始处理</p>
        </div>
      </div>
    );
  }

  const cursorClass = tool === "erase" ? "cursor-crosshair" : tool === "crop" ? "cursor-crosshair" : "cursor-grab";

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 bg-white rounded-xl border border-gray-200 p-2">
        <div className="flex items-center gap-1 pr-2 border-r border-gray-200">
          <button onClick={() => setScale(Math.max(0.1, scale - 0.1))} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs text-gray-500 w-12 text-center">{Math.round(scale * 100)}%</span>
          <button onClick={() => setScale(Math.min(3, scale + 0.1))} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-1 pr-2 border-r border-gray-200">
          <button onClick={() => rotate(-90)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600" title="逆时针旋转">
            <RotateCcw className="w-4 h-4" />
          </button>
          <button onClick={() => rotate(90)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600" title="顺时针旋转">
            <RotateCw className="w-4 h-4" />
          </button>
          <button onClick={() => flip("h")} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600" title="水平翻转">
            <FlipHorizontal className="w-4 h-4" />
          </button>
          <button onClick={() => flip("v")} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600" title="垂直翻转">
            <FlipVertical className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-1 pr-2 border-r border-gray-200">
          <button
            onClick={() => restoreState(historyIdx - 1)}
            disabled={historyIdx <= 0}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 disabled:opacity-30"
            title="撤销"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => restoreState(historyIdx + 1)}
            disabled={historyIdx >= history.length - 1}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 disabled:opacity-30"
            title="重做"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500">尺寸: {naturalSize.w}×{naturalSize.h}</span>
          <span className="text-xs text-gray-400 ml-2">画布: {canvasSize.current.w}×{canvasSize.current.h}</span>
        </div>
      </div>

      <div
        ref={containerRef}
        className="bg-[#e5e7eb] rounded-2xl border border-gray-200 overflow-hidden"
        style={{ minHeight: "400px", position: "relative" }}
      >
        <div
          className="overflow-auto"
          style={{
            height: "500px",
            backgroundImage: "linear-gradient(45deg, #d1d5db 25%, transparent 25%), linear-gradient(-45deg, #d1d5db 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #d1d5db 75%), linear-gradient(-45deg, transparent 75%, #d1d5db 75%)",
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
            backgroundColor: "#f3f4f6",
          }}
        >
          <div style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`, transformOrigin: "center", display: "inline-block", padding: "20px" }}>
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleMouseDown}
              onTouchMove={handleMouseMove}
              onTouchEnd={handleMouseUp}
              className={`shadow-2xl ${cursorClass} ${isDragging ? "cursor-grabbing" : ""}`}
              style={{ display: "block", maxWidth: "none" }}
            />
          </div>
        </div>

        {cropRect && cropRect.w > 0 && (
          <div
            className="pointer-events-none absolute border-2 border-dashed border-amber-500 bg-amber-500/10"
            style={{
              left: `${(cropRect.x / canvasSize.current.w) * 100}%`,
              top: `${(cropRect.y / canvasSize.current.h) * 100}%`,
              width: `${(cropRect.w / canvasSize.current.w) * 100}%`,
              height: `${(cropRect.h / canvasSize.current.h) * 100}%`,
            }}
          />
        )}
      </div>
    </div>
  );
}