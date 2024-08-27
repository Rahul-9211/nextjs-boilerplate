import React from "react";

const SkeletonTable: React.FC = () => {
  return (
    <div className="max-w-screen-2xl mx-auto ">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg flex items-center">
          <div className="w-48 h-10 bg-gray-200 animate-pulse rounded-md"></div>
        </div>
        <div className="mt-3 md:mt-0">
          <div className="w-32 h-10 bg-gray-200 animate-pulse rounded-md"></div>
        </div>
      </div>
      <div className="mt-1 rounded-lg overflow-x-auto h-[658px]">
        <table className="w-full table-auto text-sm text-left">
          <thead className="border-b sticky top-0 bg-primary-9.8 overflow-hidden z-10">
            <tr className="w-full">
            <th  className="py-4 px-2 text-neutral-4 text-sm font-normal w-full">
                    <div className="w-full h-10 bg-gray-200 animate-pulse rounded-md "></div>
                  </th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {Array(10)
              .fill(null)
              .map((_, idx) => (
                <tr key={idx} className="text-neutral-3 text-sm font-normal">
                  {Array(10)
                    .fill(null)
                    .map((_, cellIdx) => (
                      <td key={cellIdx} className="px-2 py-4">
                        <div className="w-32 h-6 bg-gray-200 animate-pulse rounded-md"></div>
                      </td>
                    ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SkeletonTable;
