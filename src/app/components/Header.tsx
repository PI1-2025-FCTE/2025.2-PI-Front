"use client";

import { SlMenu } from "react-icons/sl";
import { FiCircle } from "react-icons/fi";
import { useDevices } from "../context/DeviceContext";

interface HeaderProps {
  onClick: () => void;
}

export default function Header({ onClick }: HeaderProps) {
  const { selectedDevice } = useDevices();

  const BatteryIcon = ({ level }: { level: number | null }) => {
    const fillPercent = level !== null ? Math.max(0, Math.min(100, level)) : 0;

    return (
      <div data-testid="battery-icon" className="relative w-6 h-3 border border-gray-400 rounded-sm max-sm:w-5 max-sm:h-2.5">
        <div
          data-testid="battery-fill"
          className="absolute top-0 left-0 h-full rounded-sm"
          style={{
            width: `${fillPercent}%`,
            backgroundColor:
              fillPercent < 20
                ? "#f87171"
                : fillPercent < 60
                ? "#facc15"
                : "#34d399",
          }}
        />
        <div className="absolute top-[25%] right-[-2px] w-[2px] h-[50%] bg-gray-400 rounded-sm" />
      </div>
    );
  };

  return (
    <header className="h-[60px] w-full bg-[#446784] flex items-center px-4 max-sm:px-2">
      <button
        onClick={onClick}
        className="px-4 md:px-7 transition hover:scale-110 max-sm:px-2"
      >
        <SlMenu className="text-[#D9D9D9] text-[35px] max-sm:text-[28px]" />
      </button>

      <div className="flex items-center justify-between h-11 bg-[#F6F7FA] rounded-xl px-4 flex-1 max-sm:px-2">
        <div className="flex items-center gap-2 max-sm:gap-1">
          <img src="/image.png" alt="Conector" className="h-10 max-sm:h-8" />
          <h1 className="font-bold text-gray-800 max-sm:text-xs">
            Conector do Carrinho
          </h1>
        </div>

        {/* Info do dispositivo */}
        <div className="flex items-center gap-3 max-sm:gap-1">
          {selectedDevice ? (
            <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-3 py-1 shadow-md max-sm:px-2 max-sm:py-1 max-sm:gap-1">
              <div className="flex items-center gap-2 max-sm:gap-1">
                <FiCircle
                  data-testid={selectedDevice.online ? "status-online" : "status-offline"}
                  className={`${
                    selectedDevice.online ? "text-green-500" : "text-red-500"
                  } max-sm:text-xs`}
                />
                <span className="font-semibold text-gray-800 truncate max-sm:text-xs">
                  {selectedDevice.id}
                </span>
              </div>

              <span
                className={`px-2 py-0.5 rounded-full text-xs font-semibold max-sm:text-[10px] max-sm:px-1 ${
                  selectedDevice.online
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {selectedDevice.online ? "Online" : "Offline"}
              </span>

              <div className="flex items-center gap-1 text-gray-700 max-sm:gap-0.5">
                <BatteryIcon level={selectedDevice.battery} />
                <span className="text-sm max-sm:text-xs">
                  {selectedDevice.battery ?? "N/A"}%
                </span>
              </div>
            </div>
          ) : (
            <span className="font-semibold text-gray-600 text-sm max-sm:text-xs">
              Nenhum dispositivo conectado
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
