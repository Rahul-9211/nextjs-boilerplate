import { FilterKeys, orderStatusFilterArray, progressStatus, progressStatusFilterArray } from "../constant";
import { deafultRowImage } from "../images";
import {
  IorderListApiData,
  TableItems,
  OrderBannerStats,
  TNAdata,
  AccordionStage,
  orderListFilter,
  FilterMap,
  TNAapiStageData,
  OrderListImage,
} from "../types";

const MorderList = (data: IorderListApiData[]): TableItems[] => {
  // console.log("🚀 ~ MorderList ~ data:", data , data.length)
  const tempSet = new Set<String>();

  const cleanedData = data.map((item, idx) => {
    const [date, time] = item?.lastUpdated
      ? item.lastUpdated.split(" ")
      : ["-", "-"];

    const tableItem: TableItems = {
      id: item?.tnaId ? String(item.tnaId).trim() : String(idx), // Use idx as fallback id if tnaId is missing
      avatar:deafultRowImage || "-",
      styleNumber: item?.styleNumber?.styleNumber || "-",
      poNumber: item?.poNumber || "-",
      styleQty: item?.styleQty?.toString() || "-",
      orderDate: item?.orderDate || "-",
      deliveryDate: item?.deliveryDate || "-",
      progressStatus:  item?.currentSubStage?.subStage ? item?.currentSubStage?.subStage.status == progressStatus.OPEN  ? progressStatus.NOTSTARTED  :  item?.currentSubStage?.subStage.status : "-",
      // progressStatus: item?.currentSubStage?.subStage
      //   ? item?.currentSubStage?.subStage.status
      //   : "-",
      currentTNAstage: item?.currentSubStage?.subStage?.displayText || "-",
      orderStatus: {
        status: item?.currentSubStage?.subStage?.delay?.displayText || "-",
        days:
          item?.currentSubStage?.subStage?.delay?.daysOfDelay?.toString() ||
          "-",
      },
      lastUpdated: {
        date: date || "-",
        time: time || "-",
      },
    };

    // Print the id to check for duplicates

    return tableItem;
  });
  // console.log("🚀 ~ cleanedData ~ cleanedData:", cleanedData)


  // Filter out duplicates
  // const uniqueData = cleanedData.filter((item) => {
  //   if (!tempSet.has(item.id)) {
  //     tempSet.add(item.id);
  //     return true;
  //   } else {
  //     console.error("Duplicate ID:", item.id);
  //     return false;
  //   }
  // });

  return cleanedData;
};
const MorderListImage = (data: IorderListApiData[]): OrderListImage[] => {
  // console.log("🚀 ~ MorderList ~ data:", data , data.length)
  const tempSet = new Set<String>();

  const cleanedData = data.map((item, idx) => {
    const [date, time] = item?.lastUpdated
      ? item.lastUpdated.split(" ")
      : ["-", "-"];

    const tableItem: OrderListImage = {
      id: item?.tnaId ? String(item.tnaId).trim() : String(idx), // Use idx as fallback id if tnaId is missing
      url  : item?.productImage,
      // styleNumber: item?.styleNumber?.styleNumber || "-",
      // poNumber: item?.poNumber || "-",
      // styleQty: item?.styleQty?.toString() || "-",
      // orderDate: item?.orderDate || "-",
      // deliveryDate: item?.deliveryDate || "-",
      // progressStatus:  item?.currentSubStage?.subStage ? item?.currentSubStage?.subStage.status == progressStatus.OPEN  ? progressStatus.NOTSTARTED  :  item?.currentSubStage?.subStage.status : "-",
      // // progressStatus: item?.currentSubStage?.subStage
      // //   ? item?.currentSubStage?.subStage.status
      // //   : "-",
      // currentTNAstage: item?.currentSubStage?.subStage?.displayText || "-",
      // orderStatus: {
      //   status: item?.currentSubStage?.subStage?.delay?.displayText || "-",
      //   days:
      //     item?.currentSubStage?.subStage?.delay?.daysOfDelay?.toString() ||
      //     "-",
      // },
      // lastUpdated: {
      //   date: date || "-",
      //   time: time || "-",
      // },
    };

    // Print the id to check for duplicates

    return tableItem;
  });
  // console.log("🚀 ~ cleanedData ~ cleanedData:", cleanedData)


  // Filter out duplicates
  // const uniqueData = cleanedData.filter((item) => {
  //   if (!tempSet.has(item.id)) {
  //     tempSet.add(item.id);
  //     return true;
  //   } else {
  //     console.error("Duplicate ID:", item.id);
  //     return false;
  //   }
  // });

  return cleanedData;
};

const MorderBannerStats = (data: any): OrderBannerStats => {
  return {
    orders: {
      title: "Orders",
      total: data?.totalOrders,
    },
    skus: {
      title: "SKUs",
      lastUpdated: data?.lastUpdated,
      total: data?.totalSkus,
      inProgress: {
        total: data?.inProgress,
        onTime: data?.onTimeInProgress,
        delay: data?.delayedInProgress,
      },
      completed: {
        total: data?.completed,
        onTime: data?.onTimeCompleted,
        delay: data?.delayedCompleted,
      },
      notStarted: data?.notStarted,
    },
  };
};

const McreateOrderFilter = (data: IorderListApiData[]): FilterMap => {
  // Helper function to filter out empty or undefined values and keep unique values
  const filterUniqueValues = (
    values: (string | undefined | null)[]
  ): string[] => {
    return Array.from(
      new Set(
        values.filter(
          (value) => value !== "" && value !== undefined && value !== null
        ) as string[]
      )
    );
  };

  const styleNumbers = filterUniqueValues(
    data.map((item) => item.styleNumber?.displayValue)
  );
  const orderID = filterUniqueValues(data.map((item) => item.tnaId));
  const poNumbers = filterUniqueValues(data.map((item) => item.poNumber));
  // const progressStatuses = filterUniqueValues(
  //   data.map((item) =>
  //     item?.currentSubStage?.subStage
  //       ? item?.currentSubStage?.subStage.status
  //       : ""
  //   )
  // );
  const progressStatuses = progressStatusFilterArray;
  // const orderStatuses = filterUniqueValues(
  //   data.map((item) =>
  //     item.currentSubStage?.subStage?.delay?.displayText
  //       ? item.currentSubStage?.subStage?.delay?.displayText
  //       : ""
  //   )
  // );
  const orderStatuses = orderStatusFilterArray;
  const styleQtys = filterUniqueValues(data.map((item) => item.styleQty));

  const result: [string, string[]][] = [];

  if (styleNumbers.length > 0) result.push([FilterKeys.STYLENUMBER, styleNumbers]);
  if (orderID.length > 0) result.push([FilterKeys.ORDERID, orderID]);
  if (progressStatuses.length > 0)
    result.push([FilterKeys.PROGRESSSTATUS, progressStatuses]);
  if (orderStatuses.length > 0) result.push([FilterKeys.ORDERSTATUS, orderStatuses]);
  if (styleQtys.length > 0) result.push([FilterKeys.PONUMBER, poNumbers]);
  // console.log("🚀 ~ McreateOrderFilter ~ result:", result)
  return result;
};


// Mapper function
function MapiDataToAccordion(apiData: TNAapiStageData[]): TNAdata {
  const mappedStages: AccordionStage[] = apiData.map((stage) => ({
    stage: stage.stage,
    subStages: stage.subStages.map((subStage) => ({
      seq: subStage.seq,
      delay: subStage.delay,
      stageId: subStage.stageId,
      displayText: subStage.displayText,
      status: subStage.status == progressStatus.OPEN ? progressStatus.NOTSTARTED : subStage.status ,
      expectedDate: subStage.expectedDate,
      actualDate: subStage.actualDate,
      lastModifiedDateTime: subStage.lastModifiedDateTime,
      greigeFabricQuantityOrdered: subStage.greigeFabricQuantityOrdered,
      cumulativeQuantityGreigeFabricInHouse:
        subStage.cumulativeQuantityGreigeFabricInHouse,
      processedFabricQuantity: subStage.processedFabricQuantity,
      cumulativeQuantityProcessedFabricInHouse:
        subStage.cumulativeQuantityProcessedFabricInHouse,
      cumulativeQuantityProcessedFabricQC:
        subStage.cumulativeQuantityProcessedFabricQC,
      cumulativeFabricSentToGarmentFactory:
        subStage.cumulativeFabricSentToGarmentFactory,
      poQuantityProductionStart: subStage.poQuantityProductionStart,
      totalGarmentQuantity: subStage.totalGarmentQuantity,
      cumulativeApprovedQuantity: subStage.cumulativeApprovedQuantity,
      totalGarmentQuantityFinalGrn: subStage.totalGarmentQuantityFinalGrn,
      cumulativeQuantityFinalGrn: subStage.cumulativeQuantityFinalGrn,
    })),
    status: stage.status == progressStatus.OPEN ? progressStatus.NOTSTARTED : stage.status,
    totalQuantity: stage.totalQuantity,
    producedQuantity: stage.producedQuantity,
  }));

  return { stages: mappedStages };
}

export {MorderListImage , 
  MorderList,
  MorderBannerStats,
  McreateOrderFilter,
  MapiDataToAccordion,
};
