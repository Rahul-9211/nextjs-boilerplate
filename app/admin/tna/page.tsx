"use client";
import React, { useEffect, useState } from "react";
import Accordion from "@/components/Accordion/Accordion";
import TnaDetailTableList from "@/components/tables/TnaDetailTableList";
import {  IDimageList, SingleImage, localStorageDataType, localStorageKeys, queryPararms } from "@/utils/types";
import { SVGtnaBackButton } from "@/utils/images/svg";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchOrderListMap, getFromLocalStorage, redirectToLoginHome } from "@/utils/functions/function";
import { fetchOrdersData, fetchTnaDetail, verifyTokenStatus } from "@/utils/api";
import {  OrderItemMap, TNAdata, Tokens } from "@/utils/types";
import { MapiDataToAccordion } from "@/utils/mapper/orderList";
import BanterLoader from "@/components/Loader/BanterLoader";
import { getItems } from "@/components/indexDB/indexDb";

const OrderDetailPage: React.FC = () => {
  const [isUserValidated, setIsUserValidated] = useState(false);
  const [TnaDetailStages, setTnaDetailStages] = useState<TNAdata>();
  const [singleOrderDetail, setSingleOrderDetail] = useState<OrderItemMap | null>(null);
  const [imageData, setImageData] = useState<IDimageList[]>([]);
  const [imageDataMap, setImageDataMap] = useState<SingleImage | undefined>(undefined);
  const [tnaDetailImageUrl, settnaDetailImageUrl] = useState<string>("");
  const [isAccordianLoader, setisAccordianLoader] = useState(true);
  const searchParams = useSearchParams();
  const orderId = searchParams.get(queryPararms.ORDERID);
  const brandId = searchParams.get(queryPararms.BRANDID);
  const router = useRouter();

  useEffect(() => {
    // setNewBrandId()
    const tokens = getFromLocalStorage<Tokens>(localStorageKeys.TOKENS, localStorageDataType.OBJECT);

    const validateUser = async () => {
      if (tokens && tokens.accessToken) {
        const tokenStatus = await verifyTokenStatus(tokens.accessToken);
        if (tokenStatus) {
          setIsUserValidated(true);
        } else {
          router.push("/signin");
        }
      } else {
        router.push("/signin");
      }
    };

    const saveOrderList = async () => {
      if (tokens && tokens.accessToken && brandId) {
        const orderList = await fetchOrdersData({ brandId, accessToken: tokens?.accessToken });
        const singleRow = orderList.filter((item) => item.id == orderId);

        const allItems = await getItems()
        const mapItem =  allItems.filter((ele)=> ele.brandId === brandId)
         setImageData(mapItem);

         const imageMap: SingleImage = {}; // Initialize as an empty object
  
         for (let i = 0; i < mapItem[0]?.items?.length; i++) {
           const item = mapItem[0]?.items[i];
           imageMap[item.id] = item.url; // Map id to url
         }
       
        //  console.log("🚀 ~ useEffect ~ imageMap:", imageMap);
       
         if (Object.keys(imageMap).length > 0) { // Check if the map has any data
           setImageDataMap(imageMap);
         }
        //  if(imageMap[orderId])
      }
    };

    const getData = async () => {
      // console.log("################################", imageDataMap)
      if (brandId && orderId && tokens?.accessToken) {
        const data = await fetchTnaDetail({ brandId, tnaID: orderId, accessToken: tokens?.accessToken });
        const mappedData = MapiDataToAccordion(data);
        setTnaDetailStages(mappedData);
        setisAccordianLoader(false)
      } else {
        // router.push("/signin");
        const intialBrandId = redirectToLoginHome() ;
        if(intialBrandId != null){
          router.push(`/admin/orders?brandId=${intialBrandId}`);
          // setNewBrandId(intialBrandId)
        }
      }
    };

    const fetchSingleOrderDetailFromStorage = () => {
      const singleOrderDetailFromStorage = fetchOrderListMap();
      setSingleOrderDetail(singleOrderDetailFromStorage);
    };

    validateUser();
    saveOrderList();
    getData();
    fetchSingleOrderDetailFromStorage();
  }, [router]);

  if (!isUserValidated) {
    return <BanterLoader/>;
  }

  if (!orderId || !brandId) {
    return <BanterLoader/>;
  }

  return (
    <div className="p-6 font-workSans">
      <div className="flex items-center mb-[18px]">
        <button className="p-[6px] rounded-full border-[1px] border-neutral-9 mr-4" onClick={()=>router.push(`/admin/orders?brandId=${brandId}`)}>
          {SVGtnaBackButton.active}
        </button>
        <h3 className="text-base text-neutral-3 font-medium">TNA Tracking</h3>
    
      </div>
      <div className="flex mb-8">
        <div className="mb-1 mr-8">
          <h3 className="text-neutral-2 text-base font-semibold">Style Number</h3>
          <p className="text-neutral-4 text-base font-normal">
            {singleOrderDetail?.get(orderId)?.styleNumber || "-"}
          </p>
        </div>
        <div>
          <h3 className="text-neutral-2 text-base font-semibold">Delivery Date</h3>
          <p className="text-neutral-4 text-base font-normal">
            {singleOrderDetail?.get(orderId)?.deliveryDate || "-"}
          </p>
        </div>
      </div>
      {singleOrderDetail && singleOrderDetail.has(orderId) && (
        <TnaDetailTableList tableItem={singleOrderDetail.get(orderId)!}  tnaDetailImageUrl={imageDataMap && imageDataMap[orderId] ? imageDataMap[orderId] : ""}/>
      )}
     {TnaDetailStages ? <div className="mt-8">
        {TnaDetailStages?.stages.map((ele, index) => (
          <Accordion key={index} id={`faqs-${index}`} ele={ele} />
        ))}
      </div> : <BanterLoader/>} 
    </div>
  );
};

export default OrderDetailPage;
