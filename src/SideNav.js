import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { BsChevronDoubleLeft } from "react-icons/bs";
import { BsPlusLg } from "react-icons/bs";
const SideNav = () => {
    const [open,setOpen] = useState(false);


    return(
            
        <div className={`bg-dark-white h-screen z-200 p-5 pt-8 ${open ? "w-80" : "w-20"} duration-300 sticky top-0`}>
        <BsChevronDoubleLeft className={`text-black text-xl font-bold absolute cursor-pointer top-9 ${
            open ? "right-6" : "left-1/2 transform -translate-x-1/2 rotate-180"}`} onClick={() => setOpen(!open)} />
        <div className={`rounded-full mt-20 border bg-max-dark-white items-center p-2 transition-all duration-300 ${open ? "inline-flex" : "flex justify-center"}`}>
            <BsPlusLg className="text-lg text-[#7e7f81] font-bold transition-all duration-300" />
            <div className={`overflow-hidden transition-all duration-300 ${open ? "max-w-full opacity-100 ml-2 pr-5" : "max-w-0 opacity-0"}`}>
                {open && (
                <button className="text-lg text-[#7e7f81] font-medium">
                    New Text
                </button>
                )}
            </div>
        </div>
    </div>
    
            
        
    );

};

export default SideNav;