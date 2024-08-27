import { useMemo, useState, useEffect } from "react";
import { getFromLocalStorage } from "@/utils/functions/function";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { useSearchParams } from "next/navigation";
import { OrderFilterMap } from "@/utils/types";
import { SVGfilterSort } from "@/utils/images/svg";
import { localStorageDataType, localStorageKeys, queryPararms } from "@/utils/types";

interface TableFilterProps {
  onApply: (filteredData: [string, string[]][]) => void;
}


export default function TableFilter({ onApply }: TableFilterProps) {
  const [selectedFilterKey, setSelectedFilterKey] = useState<string>("PO Numbers");
  const [selectedItemsByFilterKey, setSelectedItemsByFilterKey] = useState<Record<string, string[]>>({});
  const [structuredSelectedItems, setStructuredSelectedItems] = useState<[string, string[]][]>([]);

  const searchParams = useSearchParams();

  // Memoize filterMap to avoid unnecessary recalculations
  const filterMap = useMemo(() => {
    const storedFilterMap = getFromLocalStorage<OrderFilterMap>(localStorageKeys.ORDERFILTER, localStorageDataType.MAP);
    // console.log("🚀 ~ storedFilterMap:", storedFilterMap);

    const brandId = searchParams.get(queryPararms.BRANDID) || "";
    return storedFilterMap ? storedFilterMap.get(brandId) || [] : [];
  }, [searchParams]);

  const filterMapKeys = useMemo(() => {
    // Ensure filterMap is not empty and is an array before trying to get its keys
    if (Array.isArray(filterMap)) {
      return filterMap.map(([key]) => key);
    }
    return [];
  }, [filterMap]);

  // console.log("🚀 ~ filterMapKeys:", filterMapKeys);

  useEffect(() => {
    // Initialize selected items for initial key
    setSelectedItemsByFilterKey(prev => ({
      ...prev,
      [selectedFilterKey]: prev[selectedFilterKey] || [],
    }));
  }, [selectedFilterKey]);

  const handleCheckboxChange = (item: string, isChecked: boolean) => {
    const currentItems = selectedItemsByFilterKey[selectedFilterKey] || [];

    if (isChecked) {
      const updatedItems = [...currentItems, item];
      setSelectedItemsByFilterKey(prev => ({
        ...prev,
        [selectedFilterKey]: updatedItems,
      }));
    } else {
      const updatedItems = currentItems.filter(selectedItem => selectedItem !== item);
      setSelectedItemsByFilterKey(prev => ({
        ...prev,
        [selectedFilterKey]: updatedItems,
      }));
    }
  };

  const handleFilterKeyChange = (key: string) => {
    setSelectedFilterKey(key);
    const selectedFilter = filterMap.find(([filterKey]) => filterKey === key);
    setSelectedItemsByFilterKey(prev => ({
      ...prev,
      [key]: prev[key] || [],
    }));
  };

  const handleButtonClick = () => {
    const selectedItems = Object.entries(selectedItemsByFilterKey)
      .filter(([key, items]) => items.length > 0);

    setStructuredSelectedItems(selectedItems);
    onApply(selectedItems);
    console.log("Selected Items with Keys:", selectedItems);
  };

  const handleResetAll = () => {
    setSelectedItemsByFilterKey({});
    setStructuredSelectedItems([]);
    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
  };

  return (
    <div className="w-52 z-20">
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton className="text-primary-5 ml-4 bg-primary-9.5 py-2 px-3 rounded-full cursor-pointer flex">
        {SVGfilterSort.active} {" "}  <span className="pl-2">Filter</span> {structuredSelectedItems?.length > 0 && (
            <p className="text-white bg-primary-5 rounded-full w-6 h-6 ml-3"> {structuredSelectedItems?.length}</p>
          )}
        </MenuButton>

        <MenuItems
          transition
          className="absolute left-4 font-workSans z-10 mt-2 w-[504px] origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="px-4 pt-4 flex justify-between items-center border-[1px] border-b-neutral-9.5 font-normal rounded-lg">
            <p className="text-sm text-neutral-2 border-b-[2px] border-[#4D5EB2] pb-4">Filter</p>
            <button className="text-neutral-6 pb-4 text-sm" onClick={handleResetAll}>Clear</button>
          </div>
          <div className="h-[300px] overflow-hidden overflow-x-auto">
            <div>
              <div className="flex">
                <ul className="text-sm font-medium text-gray-500 md:me-4 mb-4 md:mb-0">
                  {filterMapKeys.map(key => (
                    <li key={key}>
                      <div
                        onClick={() => handleFilterKeyChange(key)}
                        className={`cursor-pointer flex items-center justify-between py-[10px] px-4 hover:bg-neutral-9.5 ${
                          selectedFilterKey === key ? "bg-primary-9.5 text-primary-4" : "bg-neutral-9.8 text-neutral-4"
                        } border-b-[1px] border-primary-8 w-40 h-12`}
                      >
                        <p>{key}</p>
                        {selectedItemsByFilterKey[key] && selectedItemsByFilterKey[key].length > 0 && (
                          <p className="bg-white text-primary-4 rounded-full w-7 h-7 flex items-center justify-center">
                            {selectedItemsByFilterKey[key].length}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="pr-4 text-medium text-gray-500 w-full h-[300px] overflow-hidden overflow-y-auto font-workSans">
                  <ul>
                    {filterMap.find(([key]) => key === selectedFilterKey)?.[1].map((item, index) => (
                      <li key={item}>
                        <div className="flex py-2 pl-1 items-center border-b-[1px] cursor-pointer">
                          <div className="flex items-center h-5">
                            <input
                              id={`helper-checkbox-${selectedFilterKey}-${index}`}
                              aria-describedby={`helper-checkbox-text-${selectedFilterKey}-${index}`}
                              type="checkbox"
                              value={item}
                              className="w-4 h-4 rounded-sm outline-none border-2 border-primary-6 checked:border-primary-9 hover:border-primary-7 focus:border-primary-8"
                              onChange={(e) => handleCheckboxChange(item, e.target.checked)}
                              checked={selectedItemsByFilterKey[selectedFilterKey]?.includes(item)}
                            />
                          </div>
                          <div className="ms-2 text-sm pl-1">
                            <label
                              htmlFor={`helper-checkbox-${selectedFilterKey}-${index}`}
                              className="font-medium text-gray-900 dark:text-gray-300"
                            >
                              <p
                                id={`helper-checkbox-text-${selectedFilterKey}-${index}`}
                                className="font-normal text-neutral-4 text-sm"
                              >
                                {item}
                              </p>
                            </label>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 flex justify-end font-semibold border-[1px] border-t-neutral-9.5">
            <button className="py-3 px-6 text-primary-5 text-base border-[1px] rounded-lg" onClick={handleResetAll}>Reset All</button>
            <button
              onClick={handleButtonClick}
              className="py-3 px-6 text-primary-9.8 text-base bg-primary-5 rounded-lg ml-4"
            >
              Apply
            </button>
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
}
