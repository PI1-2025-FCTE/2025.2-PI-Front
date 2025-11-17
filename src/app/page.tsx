"use client";

import { useState } from "react";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import DeviceList from "./components/DeviceList";
import CommandPanel from "./components/CommandPanel";
import { useDevices } from "./context/DeviceContext";

export default function Home() {
  const [sideBar, setSideBar] = useState(false);
  const { devices, fetchDevices } = useDevices();

  const handleClick = () => setSideBar(!sideBar);

  return (
    <>
      {sideBar ? (
        <SideBar onClick={handleClick} />
      ) : (
        <div className="min-h-screen w-full bg-[#1E1E1E]">
          <Header onClick={handleClick} />
          <div className="flex flex-col my-10 mx-10 gap-5 lg:flex-row">
            <DeviceList
              devices={devices}
              onRefresh={fetchDevices}
            />
            <CommandPanel />
          </div>
        </div>
      )}
    </>
  );
}
