"use client";

import { useState } from "react";
import { useDevices } from "../context/DeviceContext";
import { toast } from "react-toastify";
import Link from "next/link";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { validateCommandString } from "../utils/commandsUtils";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type BlockType = "direita" | "esquerda" | "avancar";

interface CommandBlock {
  type: BlockType;
  value?: number;
}

export default function CommandPanel() {
  const { selectedDevice } = useDevices();
  const [commandBlocks, setCommandBlocks] = useState<CommandBlock[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);

  const addBlock = (type: BlockType, value?: number) => {
    setCommandBlocks((prev) => [...prev, { type, value }]);
  };

  const removeBlock = (index: number) => {
    setCommandBlocks((prev) => prev.filter((_, i) => i !== index));
  };

  const updateBlockValue = (index: number, value: number) => {
    if (value < 0) value = 0;
    if (value > 9999) value = 9999;
    setCommandBlocks((prev) => {
      const copy = [...prev];
      copy[index].value = value;
      return copy;
    });
  };

  const sendInstruction = async () => {
    if (!selectedDevice || commandBlocks.length === 0) return;

    const commandString = commandBlocks
      .map((block) => {
        switch (block.type) {
          case "direita":
            return "d";
          case "esquerda":
            return "e";
          case "avancar":
            return `a${block.value?.toString().padStart(4, "0")}`;
        }
      })
      .join("");

    if (!validateCommandString(commandString)) {
      toast.error("Comando inválido!");
      return;
    }

    setIsExecuting(true);
    setCommandBlocks([]);

    try {
      const response = await fetch(
        `${API_URL}/trajetos/${selectedDevice.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ comandosEnviados: commandString }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        toast.error(`Erro: ${data.detail || "Falha ao enviar comando"}`);
        setIsExecuting(false);
        return;
      }

      const data = await response.json();
      const trajetoId = data.idTrajeto;

      toast.success(
        <div className="flex flex-col items-start">
          <span>Trajeto criado com sucesso.</span>

          <Link
            href={`/route/${trajetoId}`}
            className="mt-1 text-sm text-gray-700 underline underline-offset-2 hover:text-gray-900 transition flex items-center gap-1"
          >
            Ver trajeto
            <HiOutlineArrowNarrowRight size={16} />
          </Link>
        </div>
      );
    } catch (err: any) {
      toast.error(`Erro ao enviar comando: ${err.message || err}`);
      setIsExecuting(false);
    }
  };

  const handleSendOrStop = async () => {
    if (isExecuting) {
      if (!selectedDevice) return;
      setIsExecuting(false);
      await fetch(`${API_URL}/devices/${selectedDevice.id}/stop`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } else {
      await sendInstruction();
    }
  };

  return (
    <div 
      className="w-full lg:w-3/5 bg-[#7398B7] rounded-xl flex flex-col p-4 h-[500px] lg:h-[600px]"
    >
      <div className="flex gap-2 mb-4 flex-wrap flex-none justify-center">
        <button
          onClick={() => addBlock("avancar", 100)}
          className="bg-gray-800 px-4 py-2 rounded-xl text-white hover:bg-gray-700"
        >
          Avançar
        </button>
        <button
          onClick={() => addBlock("direita")}
          className="bg-gray-800 px-4 py-2 rounded-xl text-white hover:bg-gray-700"
        >
          Virar à direita
        </button>
        <button
          onClick={() => addBlock("esquerda")}
          className="bg-gray-800 px-4 py-2 rounded-xl text-white hover:bg-gray-700"
        >
          Virar à esquerda
        </button>
      </div>
      <div className="w-full flex-1 min-h-0 p-5 bg-[#434343] rounded-xl overflow-y-auto flex flex-col gap-2 shadow-inner">
        {commandBlocks.length === 0 && (
          <div className="text-gray-400 text-center mt-10">
            Clique nos botões acima para montar o comando...
          </div>
        )}
        {commandBlocks.map((block, index) => (
          <div
            key={index}
            data-testid={`command-block-${block.type}-${index}`}
            className={`px-4 py-2 rounded-xl text-white flex items-center justify-between w-full max-w-[240px] flex-none ${
              block.type === "direita"
                ? "bg-green-600"
                : block.type === "esquerda"
                ? "bg-blue-600"
                : "bg-yellow-600"
            }`}
          >
            <div className="flex items-center gap-2">
              {block.type === "avancar" ? (
                <>
                  <span>Avançar</span>
                  <input
                    type="number"
                    min={0}
                    max={9999}
                    value={block.value}
                    onChange={(e) =>
                      updateBlockValue(index, Number(e.target.value))
                    }
                    className="w-20 px-1 rounded text-black"
                  />
                  <span>cm</span>
                </>
              ) : block.type === "direita" ? (
                "Virar à direita"
              ) : (
                "Virar à esquerda"
              )}
            </div>

            <button
              onClick={() => removeBlock(index)}
              className="ml-2 text-gray-800 font-bold hover:text-red-600"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="w-full flex justify-center mt-4 flex-none">
        <button
          onClick={handleSendOrStop}
          className={`h-12 w-40 rounded-xl text-white font-bold text-lg ${
            isExecuting
              ? "bg-red-600"
              : selectedDevice
              ? "bg-gray-800 hover:bg-gray-700"
              : "bg-gray-500 cursor-not-allowed"
          }`}
        >
          {isExecuting ? "Parar" : "Enviar"}
        </button>
      </div>
    </div>
  );
}
