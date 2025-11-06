"use client";

import { useState, useEffect } from "react";
import SideBar from "@/app/components/SideBar";
import Header from "@/app/components/Header";
import { FiRefreshCw } from "react-icons/fi";

interface Device {
  id: string;
  online: boolean;
  battery: number;
  timestamp: string;
}

export default function Home() {
  const [sideBar, setSideBar] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false); 
  const [commandText, setCommandText] = useState("");

  const handleClick = () => setSideBar(!sideBar);

  const fetchDevices = async () => {
    try {
      const response = await fetch("http://localhost:8000/devices");
      if (!response.ok) throw new Error("Erro ao buscar dispositivos");

      const data = await response.json();
      const devicesArray: Device[] = Object.entries(data).map(
        ([id, device]: [string, any]) => ({
          id,
          ...device,
        })
      );

      setDevices(devicesArray);
    } catch (err) {
      console.error("Erro ao buscar dispositivos:", err);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchDevices();
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const sendInstruction = async () => {
    if (!selectedDevice || !commandText.trim()) return;

    const payload = {
      comandosEnviados: commandText.trim(),
    };

    try {
      const response = await fetch(
        `http://localhost:8000/trajetos/${selectedDevice.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Falha ao enviar comando");
      }

      const data = await response.json();
      console.log("Comando enviado com sucesso:", data);

      // Limpa textarea
      setCommandText("");
    } catch (err) {
      console.error("Erro ao enviar comando:", err);
    }
  };

  return (
    <div>
      {sideBar ? (
        <SideBar onClick={handleClick} />
      ) : (
        <div className="min-h-screen w-full bg-[#1E1E1E]">
          <Header onClick={handleClick} />

          <div className="flex flex-col my-10 mx-10 gap-5">
            <div className="flex flex-col lg:flex-row gap-5">
              <div className="flex flex-col gap-3 w-full lg:w-2/5 bg-[#1E1E1E] p-4 rounded-xl max-h-[600px] overflow-y-auto">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-white text-xl">
                    Dispositivos Registrados
                  </h2>
                  <button
                    onClick={handleRefresh}
                    className="px-2 py-1 bg-[#7398B7] rounded-lg flex items-center justify-center transition"
                  >
                    <FiRefreshCw
                      size={24}
                      color="white"
                      className={isRefreshing ? "animate-spin" : ""}
                    />
                  </button>
                </div>

                {devices.length === 0 ? (
                  <div className="text-center text-gray-300 p-5 bg-gray-800 rounded-lg">
                    Nenhum dispositivo cadastrado
                  </div>
                ) : (
                  devices
                    .sort((a, b) => Number(b.online) - Number(a.online))
                    .map((device) => {
                      const isSelected = selectedDevice?.id === device.id;

                      return (
                        <div
                          key={device.id}
                          className={`flex justify-between items-center p-3 rounded-lg transition cursor-pointer
                ${
                  device.online
                    ? "bg-green-600"
                    : "bg-gray-700 opacity-60 cursor-default"
                }`}
                          onClick={() => {
                            if (!device.online) return;
                            setSelectedDevice(isSelected ? null : device);
                          }}
                        >
                          <div className="flex flex-col text-white text-sm">
                            <span>{device.id}</span>
                            <span>
                              Status:{" "}
                              <strong>
                                {device.online ? "Online" : "Offline"}
                              </strong>
                            </span>
                            <span>Bateria: {device.battery}%</span>
                            <span>
                              Última atualização:{" "}
                              {new Date(device.timestamp).toLocaleString(
                                "pt-BR",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                }
                              )}
                            </span>
                          </div>

                          {device.online ? (
                            <span
                              className={`px-3 py-1 rounded-lg font-bold transition
                    ${isSelected ? "bg-green-800" : "bg-blue-600"}`}
                            >
                              {isSelected ? "Selecionado" : "Selecionar"}
                            </span>
                          ) : (
                            <span className="text-gray-300 italic text-sm">
                              Offline
                            </span>
                          )}
                        </div>
                      );
                    })
                )}
              </div>

              <div className="w-full lg:w-3/5 bg-[#7398B7] rounded-xl flex flex-col justify-center items-center p-4">
                <textarea
                  className="h-64 w-full lg:h-72 lg:w-full 2xl:h-96 2xl:w-full p-5 bg-[#434343] text-white rounded-xl"
                  placeholder={
                    selectedDevice
                      ? `Enviar instrução para ${selectedDevice.id}...`
                      : "Selecione um dispositivo para enviar instrução"
                  }
                  value={commandText}
                  onChange={(e) => setCommandText(e.target.value)}
                />
                <div className="h-5" />
                <button
                  onClick={sendInstruction}
                  disabled={!selectedDevice || !selectedDevice.online || !commandText.trim()}
                  className={`h-10 w-32 rounded-xl text-white transition
        ${
          selectedDevice && selectedDevice.online
            ? "bg-blue-600 hover:scale-110 cursor-pointer"
            : "bg-gray-600 cursor-not-allowed"
        }`}
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
