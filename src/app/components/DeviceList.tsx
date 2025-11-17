"use client";

import { Device, useDevices } from "../context/DeviceContext";
import { FiRefreshCw } from "react-icons/fi";

interface DeviceListProps {
  devices: Device[];
  onRefresh: () => void;
}

export default function DeviceList({
  devices,
  onRefresh,
}: DeviceListProps) {
  const { selectedDevice, setSelectedDevice } = useDevices();

  return (
    <div className="flex flex-col gap-3 w-full lg:w-2/5 bg-[#1E1E1E] p-4 rounded-xl max-h-[600px] overflow-y-auto">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-white text-xl">Dispositivos Registrados</h2>
        <button
          onClick={onRefresh}
          className="px-2 py-1 bg-[#7398B7] rounded-lg flex items-center justify-center transition"
        >
          <FiRefreshCw
            size={20}
            color="white"
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
                    <strong>{device.online ? "Online" : "Offline"}</strong>
                  </span>
                  <span>Bateria: {device.battery ?? "N/A"}%</span>
                  <span>
                    Última atualização:{" "}
                    {new Date(device.timestamp).toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </span>
                </div>

                {device.online ? (
                  <span
                    className={`px-3 py-1 rounded-lg font-bold transition-colors duration-200
                      ${
                        isSelected
                          ? "bg-gray-200 text-black"
                          : "bg-gray-800 text-white hover:bg-gray-700"
                      }`}
                  >
                    {isSelected ? "Selecionado" : "Selecionar"}
                  </span>
                ) : (
                  <span className="text-gray-300 italic text-sm">Offline</span>
                )}
              </div>
            );
          })
      )}
    </div>
  );
}
