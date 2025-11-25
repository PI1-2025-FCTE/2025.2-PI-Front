"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { SlArrowLeft } from "react-icons/sl";
import Link from "next/link";
import Button from "./Button";
import { RouteBox } from "./RouteBox";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Trajeto = {
  idTrajeto: number;
  comandosEnviados: string;
  comandosExecutados: string | null;
  status: string | null;
  tempo: string | null;
};

type SideBarProps = {
  onClick: () => void;
  instruction?: boolean;
};

export default function SideBar({ onClick, instruction }: SideBarProps) {
  const [trajetos, setTrajetos] = useState<Trajeto[]>([]);

  useEffect(() => {
    async function fetchRoutes() {
      try {
        const response = await axios.get<Trajeto[]>(
          `${API_URL}/trajetos/`
        );
        setTrajetos(response.data);
      } catch (error) {
        console.error("Erro ao buscar trajetos:", error);
      }
    }

    fetchRoutes();
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#7398B7]">
      <div className="min-h-screen w-full md:w-[450px] bg-[#446784] flex flex-col items-center">
        {/* Botão Voltar */}
        <div className="flex h-[100px] w-full md:w-[400px] justify-end pr-2 md:pr-0">
          <button>
            <SlArrowLeft
              onClick={onClick}
              className="text-[#D9D9D9] text-[35px] font-bold transition hover:scale-110"
            />
          </button>
        </div>

        {/* Lista de trajetos */}
        <div
          className={`mt-10 ${
            instruction
              ? "h-[350px] [@media(min-width:380px)]:h-[440px]"
              : "h-[440px] [@media(min-width:380px)]:h-[530px] md:h-[525px]"
          } w-full md:w-[440px] overflow-auto bg-[#446784] rounded-xl`}
        >
          {trajetos.map((trajeto) => (
            <div key={trajeto.idTrajeto} className="px-2 md:px-0 md:pl-5 py-1">
              <RouteBox
                index={trajeto.idTrajeto}
              />
            </div>
          ))}
        </div>

        {/* Botão de instrução */}
        {instruction && (
          <div className="mt-10">
            <Link href={"/"}>
              <Button text="INSTRUÇÃO" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
