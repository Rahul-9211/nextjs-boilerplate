"use client";
import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import logo from "../../public/logo.png";
import { SVGavatar } from "@/utils/images/svg";
import { useRouter, useSearchParams } from "next/navigation";
import { NavNames, SignInUser } from "@/utils/types";
import { clearLocalStorage, getFromLocalStorage, getNameFromEmail } from "@/utils/functions/function";
import {  navigationSidebar, navsFooter } from "@/utils/constant";
import { localStorageDataType, localStorageKeys, queryPararms } from "@/utils/types";
import { clearDatabase } from "../indexDB/indexDb";

const Sidebar = React.memo(() => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [navHeaderHoveredIndex, setNavHeaderHoveredIndex] = useState<number | null>(null);
  const [navFooterHoveredIndex, setNavFooterHoveredIndex] = useState<number | null>(null);
  const [avatarHover, setAvatarHover] = useState<boolean>(false);
  
  const [userData , setUserData] = useState<SignInUser | null>(null)
  // const userData = getFromLocalStorage<SignInUser>(localStorageKeys.USERDATA, localStorageDataType.OBJECT);
 
  const role = "Admin";
useEffect(()=>{
  const data = getFromLocalStorage<SignInUser>(localStorageKeys.USERDATA, localStorageDataType.OBJECT);
  setUserData(data)
},[])
  const handleUserClick = useCallback(() => {
    const brandId = searchParams.get(queryPararms.BRANDID) || "";
    if (brandId) {
      router.push(`/admin/user?brandId=${brandId}`);
    }
  }, [router, searchParams]);

  const handleNavFooterOnClick = (  action: string , href : string) => {
    if (action === NavNames.SignOut) {
      clearLocalStorage();
      clearDatabase();
      router.push("/signin");
    }else   window.open(href , '_blank');
  };

  const handleNavigationSidebarOnClick = (action: string) => {
    const brandId = searchParams.get(queryPararms.BRANDID) || "";
    // console.log("🚀 ~ handleNavFooterOnClick ~ action:", action);
    if (action === NavNames.Orders) {
      // clearLocalStorage();
      router.push(`/admin/orders?brandId=${brandId}`);
    }
  };

  return (
    <nav className="h-[100vh] w-full border-r bg-white space-y-8 font-workSans">
      <div className="flex flex-col h-full">
        <div className="flex items-center p-[12px] md:flex border-primary-9.5">
          <a href="#">
            <Image src={logo} width={33} height={44} alt="Float UI logo" />
          </a>
          <a className="pl-2 text-base leading-6 text-neutral-2 font-semibold">
            Buyer Dashboard
          </a>
        </div>
        <div className="flex-1 flex flex-col h-full overflow-auto mt-7">
          <ul className="px-3 text-sm font-medium flex-1">
            {navigationSidebar.map((item, idx) => (
              <li key={idx}>
                <a
                  href={item.href}
                  onMouseEnter={() => setNavHeaderHoveredIndex(idx)}
                  onMouseLeave={() => setNavHeaderHoveredIndex(null)}
                  onClick={() => handleNavigationSidebarOnClick(item.name)}
                  className={`flex items-center gap-x-2 py-2 px-4 rounded-3xl hover:bg-neutral-9.5 duration-150 cursor-pointer ${
                    navHeaderHoveredIndex === idx ? "text-neutral-2" : "text-neutral-4"
                  }`}
                >
                  <div className="cursor-pointer">
                    {navHeaderHoveredIndex === idx ? item.hovered : item.active}
                  </div>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          <div>
            <ul className="px-3 text-sm font-medium flex-1 mb-6">
              {navsFooter.map((item, idx) => (
                <li key={idx}>
                  <a
                    onMouseEnter={() => setNavFooterHoveredIndex(idx)}
                    onMouseLeave={() => setNavFooterHoveredIndex(null)}
                    onClick={(e) => handleNavFooterOnClick( item.name ,item.href)}
                    className={`flex items-center gap-x-2 py-2 px-4 rounded-3xl hover:bg-neutral-9.5 duration-150 cursor-pointer ${
                      navFooterHoveredIndex === idx ? "text-neutral-2" : "text-neutral-4"
                    }`}
                  >
                    <div className="cursor-pointer">
                      {navFooterHoveredIndex === idx ? item.hovered : item.active}
                    </div>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="px-3" onClick={handleUserClick}>
              <div
                className="flex items-center gap-x-4 border-[1px] p-2 rounded-full cursor-pointer hover:bg-neutral-9.5"
                onMouseEnter={() => setAvatarHover(true)}
                onMouseLeave={() => setAvatarHover(false)}
              >
                <div>
                  {avatarHover ? SVGavatar.hovered : SVGavatar.active}
                </div>
                <div>
                  {userData &&   <span
                    className={`block text-sm font-medium ${
                      avatarHover ? "text-neutral-2" : "text-neutral-4"
                    }`}
                  >
                    {userData?.fullName ? userData?.fullName :  getNameFromEmail(userData?.email)}
                  </span>}
                
                  <a href="#" className="block mt-px text-neutral-4 text-xs">
                    {role}
                  </a>
                </div>
              </div>
            </div>
            <div className="px-3 mt-4">
              <div className="p-2 pb-3 text-center text-neutral-5">
                Powered by Lal10
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
});

// Set display name for the component
Sidebar.displayName = "Sidebar";

export default Sidebar;
