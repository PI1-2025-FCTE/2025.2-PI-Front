"use client";

import { useState } from "react";
import { useDevices } from "../context/DeviceContext";
import { toast } from "react-toastify";

export default function CommandPanel() {
  const { selectedDevice } = useDevices();
  const [commandText, setCommandText] = useState("");

  const sendInstruction = async () => {
    if (!selectedDevice || !commandText.trim()) return;

    const payload = { comandosEnviados: commandText.trim() };

    try {
      const response = await fetch(
        `http://localhost:8000/trajetos/${selectedDevice.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        toast.error(`Erro: ${data.detail || "Falha ao enviar comando"}`);
        return;
      }

      const data = await response.json();
      toast.success(`Comando enviado com sucesso para ${selectedDevice.id}`);
      setCommandText("");
    } catch (err: any) {
      toast.error(`Erro ao enviar comando: ${err.message || err}`);
    }
  };

  return (
    <div className="w-full lg:w-3/5 bg-[#7398B7] rounded-xl flex flex-col justify-center items-center p-4">
      <textarea
        className="h-64 w-full lg:h-72 lg:w-full 2xl:h-96 2xl:w-full p-5 bg-[#434343] text-white rounded-xl"
        placeholder={selectedDevice ? `Enviar instrução para ${selectedDevice.id}...` : "Selecione um dispositivo para enviar instrução"}
        value={commandText}
        onChange={(e) => setCommandText(e.target.value)}
      />
      <div className="h-5" />
      <button
        onClick={sendInstruction}
        disabled={!selectedDevice || !selectedDevice.online || !commandText.trim()}
        className={`h-10 w-32 rounded-xl text-white transition
          ${selectedDevice && selectedDevice.online ? "bg-gray-800 hover:bg-gray-700 cursor-pointer" : "bg-gray-600 cursor-not-allowed"}`}
      >
        Enviar
      </button>
    </div>
  );
}
