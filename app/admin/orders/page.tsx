"use client";
import CountBanner from "@/components/Banner/OrderBanner";
import BanterLoader from "@/components/Loader/BanterLoader";
import OrdersTable from "@/components/tables/OrdersTable";
import { fetchOrdersData, verifyTokenStatus } from "@/utils/api";
import {   totalSkuBannerData } from "@/utils/constant";
import { IDimageList, localStorageDataType, localStorageKeys, queryPararms, } from "@/utils/types";
import { getFromLocalStorage, redirectToLoginHome } from "@/utils/functions/function";
import { TableItems, Tokens } from "@/utils/types";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { addItem, getItems } from "@/components/indexDB/indexDb";

// app/admin/orders/page.tsx
const Orders = () => {
  const [isUserValidated, setIsUserValidated] = useState(false);
  const [orders, setOrders] = useState<TableItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const [brandId, setBrandId] = useState<string>("");
  const [imageData, setImageData] = useState<IDimageList[]>([]);
  const router = useRouter();

  useEffect(() => {
    // console.log(" ic asldasdasd")
    const tokens = getFromLocalStorage<Tokens>(localStorageKeys.TOKENS, localStorageDataType.OBJECT);

    const validateUser = async () => {
      if (tokens && tokens.accessToken) {
        const tokenStatus = await verifyTokenStatus(tokens.accessToken);
        if (tokenStatus) {
          setIsUserValidated(true);
        } else {
          // router.push("/signin");
        }
      } else {
        // router.push("/signin");
      }
    };

    const getData = async () => {
      // await clearDatabase(); // clear indexDb data 
      const tokens = getFromLocalStorage<Tokens>(localStorageKeys.TOKENS, localStorageDataType.OBJECT);

      if (!tokens) {
        console.error("No tokens found in localStorage");
        return;
      }

      if (tokens && tokens?.accessToken) {
        const accessToken = tokens?.accessToken;
        const urlBrandId = searchParams.get(queryPararms.BRANDID) || "";

        if (!urlBrandId) {
          const intialBrandId = redirectToLoginHome(); // returns brandID
          if (intialBrandId != null) {
            router.push(`/admin/orders?brandId=${intialBrandId}`);
            setBrandId(intialBrandId);
          }
          console.error("AccessToken or BrandId is missing");
          // return;
        }

        try {
          const data = await fetchOrdersData({
            brandId: urlBrandId,
            accessToken,
          });
          setOrders(data);
          const allItems = await getItems()
         const mapItem =  allItems.filter((ele)=> ele.brandId === urlBrandId)
          setImageData(mapItem);
          setLoading(false);
        } catch (error) {
          // setError(error); const intialBrandId = redirectToLoginHome() ;
          const intialBrandId = redirectToLoginHome();
          // console.log("🚀 ~ getData ~ intialBrandId:", intialBrandId)
          if (intialBrandId != null) {
            router.push(`/admin/orders?brandId=${intialBrandId}`);
            setBrandId(intialBrandId);
          }
          setLoading(false);
        }
      }
    };

    validateUser();
    getData();
  }, []);
  if (!isUserValidated) {
    return <BanterLoader/>;
  }
  if (loading) {
    return <BanterLoader/>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const data = totalSkuBannerData;
  return (
    // decorative bar


    <div className="p-6 font-workSans">
      <Suspense fallback={<BanterLoader/>}>
        <CountBanner />
      </Suspense>

      {/* tables  */}
      <div className="mt-10">
        <Suspense fallback={<BanterLoader/>}>
          <OrdersTable data={orders} imageDataList = {imageData[0]} />
        </Suspense>
      </div>
    </div>
  );
};

export default Orders;
