"use client";

import { useState, useEffect, use, useRef } from "react"; // Adicione useRef
import axios from "axios";
import SideBar from "@/app/components/SideBar";
import Header from "@/app/components/Header";
import Details from "@/app/components/Details";
import Map from "@/app/components/Map";
import Button from "@/app/components/Button";
import { Trajeto } from "@/app/types/trajeto";
import { comandosToMarkdown, parseComandos } from "@/app/utils/commandsUtils";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [sideBar, setSideBar] = useState(false);
  const [trajeto, setTrajeto] = useState<Trajeto | null>(null);
  
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  const handleClick = () => setSideBar(!sideBar);

  const handleAtualizarTrajeto = async () => {
    try {
      const response = await axios.get(`${API_URL}/trajetos/${id}`);
      const dados = response.data;
      
      setTrajeto(dados);

      if (dados.status !== null && dados.status !== undefined) {
        if (pollingRef.current) {
          clearInterval(pollingRef.current);
          pollingRef.current = null;
        }
      }
    } catch (error) {
      console.error("Erro ao atualizar trajeto:", error);
    }
  };

  useEffect(() => {
    handleAtualizarTrajeto();

    pollingRef.current = setInterval(() => {
      handleAtualizarTrajeto();
    }, 2000);

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, [id]);

  const downloadRelatorio = async (comandos: string, nomeArquivo: string) => {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    const mapImage = canvas ? canvas.toDataURL("image/png") : null;
    const markdown = comandosToMarkdown(parseComandos(comandos));

    try {
      const res = await fetch(`/api`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markdown, mapImage }),
      });

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = nomeArquivo;
      a.click();
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
    }
  };

  return (
    <div>
      {sideBar ? (
        <SideBar onClick={handleClick} instruction={true} />
      ) : (
        <div className="min-h-screen w-full bg-[#1E1E1E] flex flex-col items-center">
          <Header onClick={handleClick} />

          <div className="flex flex-col lg:flex-row items-center lg:items-stretch mt-5 h-full w-full gap-3">
            <div className="lg:ml-5 h-[250px] w-[300px] lg:h-[540px] lg:w-[370px] xl:w-[700px] 2xl:h-[625px] 2xl:w-[900px] bg-[#7398B7] rounded-xl flex flex-col items-center">
              <h2 className="mt-2.5 text-white font-bold text-center">
                DETALHES DA TRAJETÓRIA
              </h2>
              {trajeto && (
                <Details trajeto={trajeto} />
              )}
            </div>
            
             <div className="flex flex-col items-center h-auto w-[300px] lg:h-[625px] lg:w-[600px] lg:mr-5">
              <div className="flex flex-col h-[225px] w-[300px] lg:h-[400px] lg:w-[600px] rounded-xl justify items-center">
                <Map
                  comandosEnviados={trajeto?.comandosEnviados}
                  comandosExecutados={trajeto?.comandosExecutados}
                />
              </div>
              <div className="h-6 lg:h-10" />
              {trajeto && (
                <Button
                  onClick={() => {
                    const nomeArquivo = trajeto.idTrajeto
                      ? `relatorio_${trajeto.idTrajeto}.pdf`
                      : "relatorio.pdf";
                    downloadRelatorio(trajeto.comandosEnviados, nomeArquivo);
                  }}
                  className="h-[50px]-important"
                >
                  BAIXAR RELATÓRIO
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}