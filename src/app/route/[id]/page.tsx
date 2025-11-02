"use client";

import { useState } from "react";
import SideBar from "@/app/components/SideBar";
import Header from "@/app/components/Header";
import Details from "@/app/components/Details";
import Graph from "@/app/components/Graph";
import DownloadButton from "@/app/components/DownloadButton";

export default function Route() {
    const [sideBar, setSideBar] = useState(false);
    
        const handleClick = () => {
            setSideBar(!sideBar);
        }

    const lorem = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi eligendi eum assumenda inventore odio eius fugiat temporibus minus? Sequi quo consectetur rem repellendus minima iste aliquam esse dicta nulla iure? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil odio nisi cum officia atque veniam explicabo vitae esse blanditiis consectetur. Natus earum aspernatur consequuntur inventore adipisci ut laboriosam nulla voluptatibus. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi eligendi eum assumenda inventore odio eius fugiat temporibus minus? Sequi quo consectetur rem repellendus minima iste aliquam esse dicta nulla iure? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil odio nisi cum officia atque veniam explicabo vitae esse blanditiis consectetur. Natus earum aspernatur consequuntur inventore adipisci ut laboriosam nulla voluptatibus. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi eligendi eum assumenda inventore odio eius fugiat temporibus minus? Sequi quo consectetur rem repellendus minima iste aliquam esse dicta nulla iure? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil odio nisi cum officia atque veniam explicabo vitae esse blanditiis consectetur. Natus earum aspernatur consequuntur inventore adipisci ut laboriosam nulla voluptatibus. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi eligendi eum assumenda inventore odio eius fugiat temporibus minus? Sequi quo consectetur rem repellendus minima iste aliquam esse dicta nulla iure? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil odio nisi cum officia atque veniam explicabo vitae esse blanditiis consectetur. Natus earum aspernatur consequuntur inventore adipisci ut laboriosam nulla voluptatibus. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi eligendi eum assumenda inventore odio eius fugiat temporibus minus? Sequi quo consectetur rem repellendus minima iste aliquam esse dicta nulla iure? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil odio nisi cum officia atque veniam explicabo vitae esse blanditiis consectetur. Natus earum aspernatur consequuntur inventore adipisci ut laboriosam nulla voluptatibus. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi eligendi eum assumenda inventore odio eius fugiat temporibus minus? Sequi quo consectetur rem repellendus minima iste aliquam esse dicta nulla iure? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil odio nisi cum officia atque veniam explicabo vitae esse blanditiis consectetur. Natus earum aspernatur consequuntur inventore adipisci ut laboriosam nulla voluptatibus. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi eligendi eum assumenda inventore odio eius fugiat temporibus minus? Sequi quo consectetur rem repellendus minima iste aliquam esse dicta nulla iure? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil odio nisi cum officia atque veniam explicabo vitae esse blanditiis consectetur. Natus earum aspernatur consequuntur inventore adipisci ut laboriosam nulla voluptatibus.";

    return(
        <div>
            {sideBar ? 
                (<SideBar onClick={handleClick} instruction={true}/>) 
                : 
                (<div className="min-h-screen w-full bg-[#1E1E1E] flex flex-col items-center">
                    <Header onClick={handleClick}/>
                    <div className="flex flex-col lg:flex-row items-center lg:items-stretch mt-5 h-full w-full gap-3">
                        <div className="lg:ml-5 h-[250px] w-[300px] lg:h-[540px] lg:w-[370px] xl:w-[700px] 2xl:h-[625px] 2xl:w-[900px] bg-[#7398B7] rounded-xl flex flex-col items-center">
                            <h1 className="mt-2.5 text-white font-bold text-center">DETALHES DA TRAJETÓRIA</h1>
                            <Details text={lorem}/>
                        </div>
                        <div className="flex flex-col items-center h-auto w-[300px] lg:h-[625px] lg:w-[600px] lg:mr-5">
                            <div className="flex flex-col h-[225px] w-[300px] lg:h-[400px] lg:w-[600px] bg-[#7398B7] rounded-xl justify items-center">
                                <h1 className="pt-2.5 text-center text-white font-bold">GRÁFICO DE DESEMPENHO</h1>
                                <div className="w-[300px] lg:w-[550px] pt-5">
                                    <Graph/>
                                </div>
                            </div>
                            <div className="h-3 lg:h-10"/>
                            <DownloadButton text="BAIXAR RELATÓRIO"/>
                        </div>
                    </div>
                </div>)}
        </div>
    ); 
}