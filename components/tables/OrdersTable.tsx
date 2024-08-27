"use client";
import { OrderStatus, progressStatus } from "@/utils/constant";
import { SVGarrowRight, SVGarrowleft } from "@/utils/images/svg";
import AnimatedButton from "../buttons/AnimatedLiquidButton";
import TableFilter from "../Filters/TableFilter/TableFilter";
import React, { useState, useMemo, useEffect, Suspense } from "react";
import { OrderListImage, SingleImage, SortKey, TableItems, TableProps } from "@/utils/types";
import SkeletonTable from "./TableS";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import { deafultRowImage } from "@/utils/images";
import BanterLoader from "../Loader/BanterLoader";
import Image from "next/image";

const OrdersTable: React.FC<TableProps> = ({ data , imageDataList}) => {
  // console.log("🚀 ~ imageDataList:", imageDataList)
  // console.log("🚀 ~ data:", data)
  const router = useRouter();
  const searhParams = useSearchParams();
  const handleRowClick = (item: TableItems) => {
    // console.log("item-> ", item);
    const brandId = searhParams.get("brandId");
    router.push(`/admin/tna?brandId=${brandId}&orderId=${item.id}`);
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  const [filteredData, setFilteredData] = useState<TableItems[]>(data);
  const [appliedFilters, setAppliedFilters] = useState<[string, string[]][]>(
    []
  );
  const [sortKey, setSortKey] = useState<SortKey>("styleQty");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [imageDataMap, setImageDataMap] = useState<SingleImage | undefined>(undefined);


  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleApplyFilters = (filters: [string, string[]][]) => {
    // console.log("Filtered Data:", filters);
    setAppliedFilters(filters);
  };

  const filterData = (data: TableItems[], filters: [string, string[]][]) => {
    if (filters.length === 0) return data;
    return data.filter((item) => {
      return filters.every(([key, values]) => {
        switch (key) {
          case "PO Numbers":
            return values.includes(item.poNumber);
          case "Style Numbers":
            return values.includes(item.styleNumber);
          case "Order Status":
            return values.includes(item.orderStatus.status);
          case "Order ID":
            return values.includes(String(item.id));
          case "Progress Status":
            return values.includes(item.progressStatus);
          // Add more cases for other filters
          default:
            return true;
        }
      });
    });
  };

  // SortKey = keyof TableItems;

  const parseDateString = (dateString: string) => {
    const [day, month, year] = dateString.split("-");
    const monthIndex = new Date(`${month} 1, 2000`).getMonth();
    return new Date(parseInt(year, 10), monthIndex, parseInt(day, 10));
  };
  
  const isDateString = (value: any): value is string => {
    return typeof value === "string" && /^\d{2}-[A-Za-z]{3}-\d{4}$/.test(value);
  };
  
  const sortData = (
    data: TableItems[],
    sortKey: SortKey,
    order: "asc" | "desc"
  ) => {
    return [...data].sort((a, b) => {
      const valueA = a[sortKey];
      const valueB = b[sortKey];
  
      if (isDateString(valueA) && isDateString(valueB)) {
        const dateA = parseDateString(valueA);
        const dateB = parseDateString(valueB);
  
        if (order === "asc") {
          return dateA > dateB ? 1 : -1;
        } else {
          console.log("desc")
          return dateA < dateB ? 1 : -1;
        }
      }
  
      if (order === "asc") {
        return Number(valueA) > Number(valueB) ? 1 : -1;
      } else {
        return Number(valueA) < Number(valueB) ? 1 : -1;
      }
    });
  };
  
  

  const handleSortChange = (key: SortKey) => {
    const newOrder = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortOrder(newOrder);
  };

  useEffect(() => {
    let filtered = filterData(data, appliedFilters);
    filtered = sortData(filtered, sortKey, sortOrder);
    // console.log("🚀 ~ useEffect ~ filtered:", filtered);
    setFilteredData(filtered);
  }, [appliedFilters, sortKey, sortOrder, data]);

  useEffect(() => {
    const imageMap: SingleImage = {}; // Initialize as an empty object
  
    for (let i = 0; i < imageDataList?.items?.length; i++) {
      const item = imageDataList?.items[i];
      imageMap[item.id] = item.url; // Map id to url
    }
  
    // console.log("🚀 ~ useEffect ~ imageMap:", imageMap);
  
    if (Object.keys(imageMap).length > 0) { // Check if the map has any data
      setImageDataMap(imageMap);
    }
  }, [imageDataList]);
  

  if (!data || data == null) {
    return (
      <>
        <SkeletonTheme baseColor="#f8f9fc" highlightColor="#e3daf1">
          <p>
            <Skeleton height={200} />
            <Skeleton height={400} />
          </p>
        </SkeletonTheme>
      </>
    );
  } else {
    return (
      <div className="max-w-screen-2xl mx-auto">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg flex items-center">
            <h3 className="text-neutral-4 text-xl font-semibold sm:text-base pr-4 border-r-2 border-primary-8">
              All SKUs
            </h3>
            <Suspense fallback={<BanterLoader/>}>
              <TableFilter onApply={handleApplyFilters} />
            </Suspense>
          </div>
          <div className="mt-3 md:mt-0">
            <a
              href="#"
              className="flex items-center px-4 py-2 text-neutral-4 duration-150 font-medium rounded-lg  md:text-sm"
            >
              {`${startIndex + 1} - ${startIndex + currentData.length} of ${
                filteredData.length
              }`}{" "}
              <button
                className={`p-2 mx-1 ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                {"<"}
              </button>
              <button
                className={`p-2 mx-1 ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                {">"}
              </button>
              {/* {SVGarrowleft.active} {SVGarrowRight.active} */}
            </a>
          </div>
        </div>
        <div className="mt-1 rounded-lg overflow-x-auto h-[658px] cursor-pointer">
          <table className="w-full table-auto text-sm text-left">
            <thead className="border-b sticky top-0 bg-primary-9.8 overflow-hidden z-10">
              <tr>
                <th className="py-3 px-2 text-neutral-4 text-sm font-normal">
                  Style <br /> Images
                </th>
                <th
                  className="py-3 px-2 text-neutral-4 text-sm font-normal "
                  // onClick={() => handleSortChange("styleNumber")}
                >
                  Style <br /> Numbers{" "}
                  {sortKey === "styleNumber"
                    ? sortOrder === "asc"
                      ? ""
                      : ""
                    : ""}
                </th>
                <th
                  className="py-3 px-2 text-neutral-4 text-sm font-normal"
                  // onClick={() => handleSortChange("poNumber")}
                >
                  PO <br /> Number{" "}
                  {sortKey === "poNumber"
                    ? sortOrder === "asc"
                      ? ""
                      : ""
                    : ""}
                </th>
                <th
                  className="py-3 px-2 text-neutral-4 text-sm font-normal"
                  // onClick={() => handleSortChange("styleQty")}
                >
                  Style <br /> Qty{" "}
                  {sortKey === "styleQty"
                    ? sortOrder === "asc"
                      ? ""
                      : ""
                    : ""}
                </th>
                <th
                  className="py-3 px-2 text-neutral-4 text-sm font-normal"
                  // onClick={() => handleSortChange("orderDate")}
                >
                  Order <br /> Date{" "}
                  {sortKey === "orderDate"
                    ? sortOrder === "asc"
                      ? ""
                      : ""
                    : ""}
                </th>
                <th className="py-3 px-2 text-neutral-4 text-sm font-normal"
                onClick={() => handleSortChange("deliveryDate")}
                >
                  Delivery <br /> Date {" "}
                  {sortKey === "deliveryDate"
                    ? sortOrder === "asc"
                      ? "↓"
                      : "↑"
                    : "↑"}
                </th>
                <th className="py-3 px-2 text-neutral-4 text-sm font-normal ">
                  Progress <br /> Status
                </th>
                <th className="py-3 px-2 text-neutral-4 text-sm font-normal">
                  Current <br /> TNA Stage
                </th>
                <th className="py-3 px-2 text-neutral-4 text-sm font-normal">
                  Order <br /> Status
                </th>
                <th className="py-3 px-2 text-neutral-4 text-sm font-normal">
                  Last <br /> Update
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {currentData.map((item, idx) => (
                <tr
                  key={idx}
                  className="text-neutral-3 text-sm font-normal"
                  onClick={() => {
                    handleRowClick(item);
                  }}
                >
                  <td className="flex items-center py-3 px-2">
                    <Image
                      // src={item?.avatar}
                      src={ imageDataMap && imageDataMap[item?.id] ? imageDataMap[item?.id] : item?.avatar}
                      className="rounded-lg h-14"
                      width={56}
                      height={56}
                      alt="Style"
                      onError={(e) => (e.currentTarget.src = deafultRowImage)}
                    />
                  </td>
                  <td className="px-2 py-2 max-w-[200px]">
                    <div>
                      <span className="block text-wrap line-clamp-3">
                        {item?.styleNumber}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 py-2 max-w-[70px]">{item?.poNumber}</td>
                  <td className="px-2 py-2 max-w-[58px]">{item?.styleQty}</td>
                  <td className="px-2 py-2 max-w-[58px]">{item?.orderDate}</td>
                  <td className="px-2 py-2 max-w-[58px]">
                    {item?.deliveryDate}
                  </td>
                  <td className="px-2 py-2 max-w-[95px]">
                    {item?.progressStatus == progressStatus.INPROGRESS && (
                      <AnimatedButton status={progressStatus.INPROGRESS} />
                    )}
                    {item?.progressStatus == progressStatus.NOTSTARTED && (
                      <button className="p-2 bg-neutral-9.5 border-[1px] border-neutral-8 text-neutral-4 rounded-lg">
                        {progressStatus.NOTSTARTED}
                      </button>
                    )}
                    {item?.progressStatus == progressStatus.COMPLETED && (
                      <button className="p-2 bg-success-8  border-[1px] border-success-4 text-success-3 rounded-lg">
                        {item?.progressStatus}
                      </button>
                    )}
                    {item?.progressStatus == "-" && <span>-</span>}
                  </td>
                  <td className="px-2 py-2 max-w-[154px]">
                    {item?.currentTNAstage}
                  </td>
                  <td
                    className={`px-2 py-2 max-w-[76px] ${
                      item?.orderStatus?.status == OrderStatus.DELAYED
                        ? "text-error-4"
                        : "text-success-3"
                    }`}
                  >
                    {item?.orderStatus?.status} <br />{" "}
                    <span className="text-neutral-4">
                      {item?.orderStatus?.days != "-" ? item?.orderStatus?.days + " days" : item?.orderStatus?.days}
                    </span>
                  </td>
                  <td className="px-2 py-2 max-w-[76px]">
                    {item?.lastUpdated?.date} <br />{" "}
                    <span className="text-neutral-4">
                      {item?.lastUpdated?.time}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default OrdersTable;
