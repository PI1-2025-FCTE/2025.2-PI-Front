"use client";

import { useEffect, useRef } from "react";

interface MapProps {
  comandosEnviados?: string;
  comandosExecutados?: string;
}

interface Point {
  x: number;
  y: number;
}

export default function Map({
  comandosEnviados,
  comandosExecutados,
}: MapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    if (
      (!comandosEnviados || comandosEnviados.trim() === "") &&
      (!comandosExecutados || comandosExecutados.trim() === "")
    ) {
      ctx.fillStyle = "#888";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Nenhum trajeto registrado", width / 2, height / 2);
      return;
    }

    const pathEnviado = comandosEnviados ? buildPath(comandosEnviados) : null;
    const pathExecutado = comandosExecutados
      ? buildPath(comandosExecutados)
      : null;

    if (
      (!pathEnviado || pathEnviado.length === 1) &&
      (!pathExecutado || pathExecutado.length === 1)
    ) {
      ctx.fillStyle = "#888";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Nenhum movimento detectado", width / 2, height / 2);
      return;
    }

    const allPoints = [...(pathEnviado || []), ...(pathExecutado || [])];
    let maxX = -Infinity,
      minX = Infinity,
      maxY = -Infinity,
      minY = Infinity;

    allPoints.forEach((p) => {
      maxX = Math.max(maxX, p.x);
      minX = Math.min(minX, p.x);
      maxY = Math.max(maxY, p.y);
      minY = Math.min(minY, p.y);
    });

    if (!isFinite(maxX)) maxX = 0;
    if (!isFinite(minX)) minX = 0;
    if (!isFinite(maxY)) maxY = 0;
    if (!isFinite(minY)) minY = 0;

    const paddingX = 40;
    const paddingYTop = 40;
    const paddingYBottom = 60;

    const pathWidth = maxX - minX || 1;
    const pathHeight = maxY - minY || 1;

    const scale = Math.min(
      (width - 2 * paddingX) / pathWidth,
      (height - (paddingYTop + paddingYBottom)) / pathHeight
    );

    const offsetX = (width - pathWidth * scale) / 2 - minX * scale;
    const availableHeight = height - paddingYBottom;
    const offsetY = (availableHeight - pathHeight * scale) / 2 - minY * scale;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (pathEnviado && pathEnviado.length > 1) {
      ctx.strokeStyle = "#4CAF50";
      ctx.lineWidth = 3;
      ctx.beginPath();
      pathEnviado.forEach((point, index) => {
        const px = point.x * scale + offsetX;
        const py = point.y * scale + offsetY;
        if (index === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();
    }

    if (pathExecutado && pathExecutado.length > 1) {
      ctx.strokeStyle = "#FF6B6B";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      pathExecutado.forEach((point, index) => {
        const px = point.x * scale + offsetX;
        const py = point.y * scale + offsetY;
        if (index === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();
      ctx.setLineDash([]);
    }

    const startPoint = pathEnviado ? pathEnviado[0] : pathExecutado![0];
    ctx.fillStyle = "#2196F3";
    ctx.beginPath();
    ctx.arc(
      startPoint.x * scale + offsetX,
      startPoint.y * scale + offsetY,
      6,
      0,
      2 * Math.PI
    );
    ctx.fill();

    const lastPointEnviado = pathEnviado
      ? pathEnviado[pathEnviado.length - 1]
      : null;
    const lastPointExecutado = pathExecutado
      ? pathExecutado[pathExecutado.length - 1]
      : null;

    const endPoint = lastPointExecutado || lastPointEnviado;

    if (endPoint) {
      ctx.fillStyle = "#FF6B6B";
      ctx.beginPath();
      ctx.arc(
        endPoint.x * scale + offsetX,
        endPoint.y * scale + offsetY,
        6,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }

    const legendY = height - 25;
    let currentX = 30;
    const itemGap = 40;
    const iconGap = 12;

    ctx.font = "bold 16px Arial";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

    const drawText = (text: string) => {
      ctx.fillStyle = "#ddd";
      ctx.fillText(text, currentX, legendY);
      const textWidth = ctx.measureText(text).width;
      currentX += textWidth + itemGap;
    };

    ctx.fillStyle = "#2196F3";
    ctx.beginPath();
    ctx.arc(currentX + 5, legendY, 5, 0, Math.PI * 2);
    ctx.fill();
    currentX += 14 + iconGap;
    drawText("Início");

    ctx.fillStyle = "#FF6B6B";
    ctx.beginPath();
    ctx.arc(currentX + 5, legendY, 5, 0, Math.PI * 2);
    ctx.fill();
    currentX += 14 + iconGap;
    drawText("Destino");
    
    if (comandosEnviados) {
      ctx.strokeStyle = "#4CAF50";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(currentX, legendY);
      ctx.lineTo(currentX + 25, legendY);
      ctx.stroke();
      currentX += 25 + iconGap;
      drawText("Enviado");
    }
    
    if (comandosExecutados) {
      ctx.strokeStyle = "#FF6B6B";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(currentX, legendY);
      ctx.lineTo(currentX + 25, legendY);
      ctx.stroke();
      ctx.setLineDash([]);
      currentX += 25 + iconGap;
      drawText("Executado");
    }
  }, [comandosEnviados, comandosExecutados]);

  return (
    <div className="bg-[#7398B7] rounded-xl p-4">
      <h3 className="text-xl font-semibold mb-3 text-center text-white">
        MAPA DO TRAJETO
      </h3>
      <div className="bg-[#2B2B2B] rounded-lg">  
            <div className="w-full h-full flex items-center justify-center">
                <canvas
                    ref={canvasRef}
                    width={800}
                    height={500}
                    className="max-w-full max-h-full"
                    style={{ width: "100%", height: "auto" }}
                />
            </div>
        </div>
    </div>
  );
}

function buildPath(comandos: string): Point[] {
  let x = 0;
  let y = 0;
  let angle = -90;
  const path: Point[] = [{ x, y }];
  const commands = parseCommands(comandos);
  commands.forEach((cmd) => {
    if (cmd.type === "a") {
      const distance = cmd.value / 10;
      const rad = (angle * Math.PI) / 180;
      x += distance * Math.cos(rad);
      y += distance * Math.sin(rad);
      path.push({ x, y });
    } else if (cmd.type === "d") {
      angle += 90;
    } else if (cmd.type === "e") {
      angle -= 90;
    }
  });
  return path;
}

function parseCommands(
  comandos: string
): Array<{ type: string; value: number }> {
  const result: Array<{ type: string; value: number }> = [];
  let i = 0;
  while (i < comandos.length) {
    const char = comandos[i];
    if (char === "a") {
      const distStr = comandos.substring(i + 1, i + 5);
      const dist = parseInt(distStr, 10);
      if (!isNaN(dist)) {
        result.push({ type: "a", value: dist });
        i += 5;
      } else {
        i++;
      }
    } else if (char === "d") {
      result.push({ type: "d", value: 90 });
      i++;
    } else if (char === "e") {
      result.push({ type: "e", value: -90 });
      i++;
    } else if (char === "t") {
      const timeStr = comandos.substring(i + 1, i + 5);
      const time = parseInt(timeStr, 10);
      if (!isNaN(time)) {
        result.push({ type: "t", value: time });
        i += 5;
      } else {
        i++;
      }
    } else {
      i++;
    }
  }

  return result;
}
