"use client";


import { useState } from "react";
import Header from "@/app/components/Header";
import SideBar from "@/app/components/SideBar";
import { RouteBox } from "@/app/components/RouteBox";

export default function Routes() {
        const [sideBar, setSideBar] = useState(false);
    
        const handleClick = () => {
            setSideBar(!sideBar);
        }
    
        const size = 10;
        const routes = Array(size);
        for(let i = 0; i < size; i++) {
            routes[i] = i+1;
        }

    return(
        <div>
            {sideBar ? 
                        (<SideBar onClick={handleClick} routes={true}/>) 
                        : 
                        (<div className="min-h-screen w-full bg-[#1E1E1E] flex flex-col items-center">
                            <Header onClick={handleClick}/>
                            <div className="h-5"/>
                            <div className="h-[630px] w-[900px] bg-[#7398B7] rounded-xl flex flex-col items-center">
                                <h1 className="text-white text-center pt-2.5 font-bold">PERCURSOS</h1>
                                <div className=" h-[580px] overflow-y-auto">
                                    {routes.map((value, index) => (
                                        <div key={index} className="py-1.5 px-3">
                                            <RouteBox  index={value}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>)}
        </div>
    );
}