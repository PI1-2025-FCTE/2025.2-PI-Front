"use client";

import { useState, useEffect, use } from "react";
import axios from "axios";
import SideBar from "@/app/components/SideBar";
import Header from "@/app/components/Header";
import Details from "@/app/components/Details";
import Map from "@/app/components/Map";
import DownloadButton from "@/app/components/DownloadButton";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [sideBar, setSideBar] = useState(false);
  const [trajeto, setTrajeto] = useState<any>(null);

  const handleClick = () => {
    setSideBar(!sideBar);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/trajetos/${id}`);
        setTrajeto(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [id]);

  const detalhes = trajeto
    ?  
        `ID do Trajeto: ${trajeto.idTrajeto}\n
        Comandos Enviados: ${trajeto.comandosEnviados ?? "N/A"}\n
        Comandos Executados: ${trajeto.comandosExecutados ?? "N/A"}\n
        Status: ${trajeto.status ?? "N/A"}\n
        Tempo: ${trajeto.tempo ?? "N/A"}\n`
    :   "Carregando detalhes...";

  return (
    <div>
      {sideBar ? (
        <SideBar onClick={handleClick} instruction={true} />
      ) : (
        <div className="min-h-screen w-full bg-[#1E1E1E] flex flex-col items-center">
          <Header onClick={handleClick} />
          <div className="flex flex-col lg:flex-row items-center lg:items-stretch mt-5 h-full w-full gap-3">
            <div className="lg:ml-5 h-[250px] w-[300px] lg:h-[540px] lg:w-[370px] xl:w-[700px] 2xl:h-[625px] 2xl:w-[900px] bg-[#7398B7] rounded-xl flex flex-col items-center">
              <h1 className="mt-2.5 text-white font-bold text-center">DETALHES DA TRAJETÓRIA</h1>
              {trajeto ? (<Details comandos={trajeto.comandosEnviados}/>) : (<></>)}
            </div>
            <div className="flex flex-col items-center h-auto w-[300px] lg:h-[625px] lg:w-[600px] lg:mr-5">
              <div className="flex flex-col h-[225px] w-[300px] lg:h-[400px] lg:w-[600px] rounded-xl justify items-center">
                <Map comandosEnviados={trajeto?.comandosEnviados} comandosExecutados={trajeto?.comandosExecutados} />
              </div>
              <div className="h-6 lg:h-10" />
              {trajeto ? (<DownloadButton text="BAIXAR RELATÓRIO" comandos={trajeto.comandosEnviados}/>) : (<></>)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}