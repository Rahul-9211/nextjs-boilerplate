"use client";
import { OrderStatus, progressStatus } from "@/utils/constant";
import { SVGarrowRight, SVGarrowleft } from "@/utils/images/svg";
import AnimatedButton from "../buttons/AnimatedLiquidButton";
import TableFilter from "../Filters/TableFilter/TableFilter";
import { OrderItemMap, TableItems } from "@/utils/types";
import React from "react";
import { deafultRowImage } from "@/utils/images";
import LineSpinner from "../Loader/LineSpinner/LineSpinner";
import Image from "next/image";
interface TnaDetailTableListProps {
  tableItem: TableItems;
  tnaDetailImageUrl: string;
}

const TnaDetailTableList: React.FC<TnaDetailTableListProps> = ({
  tableItem,
  tnaDetailImageUrl,
}) => {
  const tableItemsArray = [tableItem];

  const statusBtn = (status: string) => {
    switch (status) {
      case progressStatus.INPROGRESS:
        return <AnimatedButton status="Inprogress" />;
      case progressStatus.NOTSTARTED:
        return (
          <p className="p-2 bg-neutral-9.5 border-[1px] border-neutral-8 text-neutral-4 rounded-lg max-w-[100px]">
            Not Started
          </p>
        );
      case progressStatus.COMPLETED:
        return (
          <p className="p-2 bg-success-8  border-[1px] border-success-4 text-success-3 rounded-lg max-w-[100px]">
            Completed
          </p>
        );
      default:
        return "-";
    }
  };

  const orderStatusClasses = (status: string) => {
    return status === OrderStatus.DELAYED ? "text-red-600" : "text-green-600";
  };

  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="bg-white rounded-lg overflow-x-auto  cursor-pointer">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-white border-b sticky top-0 z-10">
            <tr>
              <th className="py-3 px-4 text-neutral-4 font-normal">
                Style <br /> Images
              </th>
              <th className="py-3 px-4 text-neutral-4 font-normal">
                Order <br /> ID
              </th>
              <th className="py-3 px-4 text-neutral-4 font-normal">
                Style <br /> Qty
              </th>
              <th className="py-3 px-4 text-neutral-4 font-normal">
                Progress <br /> Status
              </th>
              <th className="py-3 px-4 text-neutral-4 font-normal">
                Current <br /> TNA Stage
              </th>
              <th className="py-3 px-4 text-neutral-4 font-normal">
                Order <br /> Status
              </th>
              <th className="py-3 px-4 text-neutral-4 font-normal">
                Last <br /> Update
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {tableItemsArray.map((item, idx) => (
              <tr key={idx} className="border-b">
                <td className="flex items-center space-x-4 w-[56px] h-[56px] justify-center m-4 rounded-lg overflow-hidden bg-neutral-9.5">
                  {tnaDetailImageUrl ? (
                    <Image
                      src={tnaDetailImageUrl ? tnaDetailImageUrl : item.avatar}
                      alt="Style"
                      className="w-14 h-14 max-w-none"
                       width={56}
                      height={56}
                      onError={(e) => (e.currentTarget.src = deafultRowImage)}
                    />
                  ) : (
                    <LineSpinner />
                  )}
                </td>
                <td className="py-3 px-4">{item.id}</td>
                <td className="py-3 px-4">{item.styleQty}</td>
                <td className="py-3 px-4">
                  {/* <p className={`p-2 rounded-lg ${statusClasses(item.progressStatus)}`}>
                    {item.progressStatus}
                  </p> */}
                  {statusBtn(item.progressStatus)}
                </td>
                <td className="py-3 px-4">{item.currentTNAstage}</td>
                <td
                  className={`py-3 px-4 ${orderStatusClasses(
                    item.orderStatus?.status
                  )}`}
                >
                  {item.orderStatus?.status} <br />
                  <span className="text-neutral-4">
                    {item.orderStatus?.days}
                  </span>
                </td>
                <td className="py-3 px-4 max-w-[135px]">
                  <p className="p-2 bg-gray-100 border border-gray-300 text-gray-600 rounded-lg max-w-[178px]">
                    {item.lastUpdated?.date},{" "}
                    <span className="text-gray-500">
                      {item.lastUpdated?.time}
                    </span>
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TnaDetailTableList;
