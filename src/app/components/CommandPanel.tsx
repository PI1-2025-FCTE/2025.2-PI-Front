"use client";

import { useState } from "react";
import { useDevices } from "../context/DeviceContext";
import { toast } from "react-toastify";

function validateCommandString(commandString: string): boolean {
  if (!commandString || commandString.trim().length === 0) {
    return false;
  }

  const trimmed = commandString.trim();
  let i = 0;

  while (i < trimmed.length) {
    const char = trimmed[i];

    if (char === 'd' || char === 'e') {
      i++;
    } else if (char === 'a') {
      if (i + 4 >= trimmed.length) {
        
        return false;
      }

      
      const fourDigits = trimmed.substring(i + 1, i + 5);
      if (!/^\d{4}$/.test(fourDigits)) {
        return false;
      }

      i += 5;
    } else {
      return false;
    }
  }

  return true;
}

export default function CommandPanel() {
  const { selectedDevice } = useDevices();
  const [commandText, setCommandText] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleCommandChange = (value: string) => {
    setCommandText(value);
    
    if (validationError) {
      setValidationError(null);
    }
  };

  const sendInstruction = async () => {
    if (!selectedDevice || !commandText.trim()) return;

    const trimmedCommand = commandText.trim();

    if (!validateCommandString(trimmedCommand)) {
      const errorMsg = "Comando inválido! Use: 'd' (direita), 'e' (esquerda), ou 'a' seguido de 4 dígitos (ex: a1000)";
      setValidationError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    const payload = { comandosEnviados: trimmedCommand };

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
      setValidationError(null);
    } catch (err: any) {
      toast.error(`Erro ao enviar comando: ${err.message || err}`);
    }
  };

  return (
    <div className="w-full lg:w-3/5 bg-[#7398B7] rounded-xl flex flex-col justify-center items-center p-4">
      <textarea
        className="h-64 w-full lg:h-72 lg:w-full 2xl:h-96 2xl:w-full p-5 bg-[#434343] text-white rounded-xl"
        placeholder={
          selectedDevice
            ? `Enviar instrução para ${selectedDevice.id}...`
            : "Selecione um dispositivo para enviar instrução"
        }
        value={commandText}
        onChange={(e) => handleCommandChange(e.target.value)}
      />
      <div className="h-5" />
      <button
        onClick={sendInstruction}
        disabled={!selectedDevice || !selectedDevice.online || !commandText.trim()}
        className={`h-10 w-32 rounded-xl text-white transition
          ${
            selectedDevice && selectedDevice.online
              ? "bg-gray-800 hover:bg-gray-700 cursor-pointer"
              : "bg-gray-600 cursor-not-allowed"
          }`}
      >
        Enviar
      </button>
    </div>
  );
}
