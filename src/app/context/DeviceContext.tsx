"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { toast } from "react-toastify";

export interface Device {
  id: string;
  online: boolean;
  battery: number | null;
  timestamp: string;
}

interface DevicesContextValue {
  selectedDevice: Device | null;
  setSelectedDevice: (d: Device | null) => void;
  devices: Device[];
  fetchDevices: () => Promise<void>;
}

const DevicesContext = createContext<DevicesContextValue>({
  selectedDevice: null,
  setSelectedDevice: () => {},
  devices: [],
  fetchDevices: async () => {},
});

export const DevicesProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);

  const fetchDevices = async () => {
    try {
      const response = await fetch("http://localhost:8000/devices");
      const data = await response.json();

      const devicesArray: Device[] = Object.entries(data).map(
        ([id, device]: [string, any]) => ({ id, ...device })
      );

      setDevices(devicesArray);

      setSelectedDevice((prev) => {
        if (!prev) return null;
        const updated = devicesArray.find((d) => d.id === prev.id);
        if (!updated || !updated.online) {
          toast.warning(`Dispositivo ${prev.id} ficou offline`);
          return null;
        }
        return updated;
      });
    } catch (err: any) {
      console.error("Erro ao buscar dispositivos:", err);
      toast.error(`Erro ao buscar dispositivos: ${err.message || err}`);
    }
  };

  useEffect(() => {
    fetchDevices();
    const interval = setInterval(fetchDevices, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <DevicesContext.Provider
      value={{ selectedDevice, setSelectedDevice, devices, fetchDevices }}
    >
      {children}
    </DevicesContext.Provider>
  );
};

export const useDevices = () => useContext(DevicesContext);
