"use client"
import { useEffect, useState } from 'react'
import Image from 'next/image';
import logo from "@/public/logo.png"

const SignInNavbar = ()=>{
    const [state, setState] = useState(false)
// console.log("navabr")
    // Replace # paths with your paths
    const navigation = [
        { title: "Features", path: "#" },
        { title: "Integrations", path: "#" },
        { title: "Customers", path: "#" },
        { title: "Pricing", path: "#" }
    ]

    useEffect(() => {
        // document.onclick = (e) => {
        //     const target = e.target;
        //     if (!target.closest(".menu-btn")) setState(false);
        // };
    }, [])

    return (
        <nav className={`bg-[#FFF]  md:text-sm font-workSans border-b-[1px] `}>
            <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8 ">
                <div className="flex items-center justify-between py-[10px] md:flex border-primary-9.5">
                    <a href="#">
                        <Image
                            src={logo}
                            width={33}
                            height={44}
                            alt="Float UI logo"
                        />
                    </a>
                    <a className=" pl-2  text-base leading-6 text-neutral-2 font-semibold">Buyer Dashboard</a>
                    {/* <div className="md:hidden">
                        <button className="menu-btn text-gray-500 hover:text-gray-800"
                            onClick={() => setState(!state)}
                        >
                            {
                                state ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                )
                            }
                        </button>
                    </div> */}
                </div>
               
                <div className={`flex-1 items-center mt-8 md:mt-0 md:flex ${state ? 'block' : 'hidden'} `}>
                    {/* <ul className="justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                        {
                            navigation.map((item, idx) => {
                                return (
                                    <li key={idx} className="text-gray-700 hover:text-grey-900 ">
                                        <a href={item.path} className="block">
                                            {item.title}
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul> */}
                    <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0 font-medium text-base leading-6 text-primary-5">
                        <a href="https://play.google.com/store/apps/details?id=com.buyerapp&pli=1" target="_blank" className="block hover:font-semibold">
                          Download App
                        </a>
                        <a href="https://www.lal10.com/design" target="_blank" className="block hover:font-semibold">
                          View Catalogue
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default SignInNavbar;