"use client";
import { totalSkuBannerData } from "@/utils/constant";
import { localStorageDataType, localStorageKeys, queryPararms} from "@/utils/types";
import { getFromLocalStorage } from "@/utils/functions/function";
import {  MorderBannerStats } from "@/utils/mapper/orderList";
import { OrderBannerStats, OrderStats } from "@/utils/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CountBanner = () => {
  const searchParams = useSearchParams();
  const [data , setData] = useState<OrderBannerStats>(totalSkuBannerData);
  

  useEffect(() => {
    const getData = async () => {
      const retrievedUser = getFromLocalStorage<Map<string, OrderStats>>(
        localStorageKeys.ORDERSTATS,
        localStorageDataType.MAP
      );
      const brandId = searchParams.get(queryPararms.BRANDID) || "";
      // console.log("🚀 ~ getData ~ retrievedUser:", retrievedUser?.get(brandId));
      const mappedStats = MorderBannerStats( retrievedUser?.get(brandId));
      setData(mappedStats)
    };

    getData();
  }, []);

  return (
    <div className="flex">
      <div className="flex flex-col flex-[8%]">
        <h3 className="text-lg text-neutral-2 uppercase font-semibold pb-1 pl-2">
          {data.orders.title}
        </h3>
        <div className="p-3 bg-decorative-9 max-w-[124px] rounded-2xl">
          <div className="p-3">
            <h4 className="text-sm font-normal text-decorative-4 uppercase">
              Total
            </h4>
            <span className="text-2xl font-semibold text-decorative-2">
              {data.orders.total}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-[86%]">
        <div className="flex justify-between items-end">
          <h3 className="text-lg text-neutral-2 uppercase font-semibold pb-1 pl-2">
            {data.skus.title}
          </h3>
          <p>Last updated: {data.skus.lastUpdated}</p>
        </div>
        <div className="p-3 bg-decorative-9 rounded-2xl">
          <div className="flex justify-between">
            <div className="p-3 flex flex-[8%]">
              <div>
                <h4 className="text-sm font-normal text-decorative-4 uppercase">
                  Total
                </h4>
                <span className="text-2xl font-semibold text-decorative-2">
                  {data.skus.total}
                </span>
              </div>
            </div>
            <div className="bg-decorative-9.5 flex p-3 rounded-lg flex-[37%] mr-3">
              <div className="flex w-[100%]">
                <div className="flex-[40%] pr-8 border-r-[2px] border-[#C4B5E3]">
                  <h4 className="text-sm font-normal text-decorative-4 uppercase">
                    IN-PROGRESS
                  </h4>
                  <span className="text-2xl font-semibold text-decorative-2">
                    {data.skus.inProgress.total}
                  </span>
                </div>
                <div className="flex flex-[60%] pl-8 justify-between">
                  <div className="flex-[40%]">
                    <h4 className="text-sm font-normal text-decorative-4 uppercase">
                      on-time
                    </h4>
                    <span className="text-base font-semibold text-decorative-2">
                      {data.skus.inProgress.onTime}
                    </span>
                  </div>
                  <div className="flex-[60%]">
                    <h4 className="text-sm font-normal text-decorative-4 uppercase">
                      delay
                    </h4>
                    <span className="text-base font-semibold text-decorative-2">
                      {data.skus.inProgress.delay}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-decorative-9.5 flex p-3 rounded-lg flex-[37%] mr-3">
              <div className="flex w-[100%]">
                <div className="flex-[36%] pr-8 border-r-[2px] border-[#C4B5E3]">
                  <h4 className="text-sm font-normal text-decorative-4 uppercase">
                    completed
                  </h4>
                  <span className="text-2xl font-semibold text-decorative-2">
                    {data.skus.completed.total}
                  </span>
                </div>
                <div className="flex flex-[60%] pl-8 justify-between">
                  <div className="flex-[40%]">
                    <h4 className="text-sm font-normal text-decorative-4 uppercase">
                      on-time
                    </h4>
                    <span className="text-base font-semibold text-decorative-2">
                      {data.skus.completed.onTime}
                    </span>
                  </div>
                  <div className="flex-[60%]">
                    <h4 className="text-sm font-normal text-decorative-4 uppercase">
                      delay
                    </h4>
                    <span className="text-base font-semibold text-decorative-2">
                      {data.skus.completed.delay}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-decorative-9.5 flex p-3 rounded-lg flex-[12%]">
              <div>
                <h4 className="text-sm font-normal text-decorative-4 uppercase">
                  Not Started
                </h4>
                <span className="text-2xl font-semibold text-decorative-2">
                  {data.skus.notStarted}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountBanner;
