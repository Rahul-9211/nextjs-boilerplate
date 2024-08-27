import { StaticImageData } from "next/image";
import {
  Company,
  ImageProps,
  Member,
  NavNames,
  OrderBannerStats,
  OrderFilter,
  Profile,
  SignInUser,
  TNAdata,
  TableItems,
} from "../types";

import {
  SVGavatar,
  SVGfaq,
  SVGorderHistory,
  SVGorders,
  SVGprivacyPolicy,
  SVGsampling,
  SVGsignOut,
  SVGtermOfService,
} from "@/utils/images/svg";


const INVALIDEMAIL = "Invalid emails. Please correct them.";
const EMAILEXISTS = "Email already exists";
const DefaultFullName = "Temp Name";


const OrderStatus = {
  DELAYED: "Delayed",
  ONTIME: "On-time",
};

const progressStatus = {
  INPROGRESS: "Inprogress",
  NOTSTARTED: "Not Started",
  COMPLETED: "Completed",
  OPEN : "Open"
};

const progressStatusFilterArray = [
  progressStatus.INPROGRESS,
  progressStatus.COMPLETED,
  progressStatus.NOTSTARTED,
];

const orderStatusFilterArray = [OrderStatus.DELAYED, OrderStatus.ONTIME];

const AccordionTnaStatus = {
  INPROGRESS: "Inprogress",
  NOTSTARTED: "Open",
  COMPLETED: "Completed",
};

const tableItems: TableItems[] = [
  {
    id: "1",
    avatar:
      "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
    styleNumber:
      "140s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23...",
    poNumber: "WH/PO/ 23-24-000014",
    styleQty: "2200002",
    orderDate: "12/01/24",
    deliveryDate: "12/01/24",
    progressStatus: "Not Started",
    currentTNAstage: "14: Fabric Dispatch to Garment Factory",
    orderStatus: {
      status: "Delayed",
      days: "120 days",
    },
    lastUpdated: {
      date: "22/5/24",
      time: "15:27:52",
    },
  },
  {
    id: "2",
    avatar:
      "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
    styleNumber:
      "240s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23...",
    poNumber: "WH/PO/ 23-24-000014",
    styleQty: "2200002",
    orderDate: "12/01/24",
    deliveryDate: "12/01/24",
    progressStatus: "In-Progress",
    currentTNAstage: "14: Fabric Dispatch to Garment Factory",
    orderStatus: {
      status: "On-Time",
      days: "",
    },
    lastUpdated: {
      date: "22/5/24",
      time: "15:27:52",
    },
  },
  {
    id: "3",
    avatar:
      "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
    styleNumber: "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23...",
    poNumber: "WH/PO/ 23-24-000014",
    styleQty: "2200002",
    orderDate: "12/01/24",
    deliveryDate: "12/01/24",
    progressStatus: "Completed",
    currentTNAstage: "14: Fabric Dispatch to Garment Factory",
    orderStatus: {
      status: "Delayed",
      days: "120 days",
    },
    lastUpdated: {
      date: "22/5/24",
      time: "15:27:52",
    },
  },
  {
    id: "4",
    avatar:
      "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
    styleNumber: "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23...",
    poNumber: "WH/PO/ 23-24-000014",
    styleQty: "2200002",
    orderDate: "12/01/24",
    deliveryDate: "12/01/24",
    progressStatus: "Not Started",
    currentTNAstage: "14: Fabric Dispatch to Garment Factory",
    orderStatus: {
      status: "Delayed",
      days: "120 days",
    },
    lastUpdated: {
      date: "22/5/24",
      time: "15:27:52",
    },
  },
  {
    id: "4",
    avatar:
      "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
    styleNumber: "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23...",
    poNumber: "WH/PO/ 23-24-000014",
    styleQty: "2200002",
    orderDate: "12/01/24",
    deliveryDate: "12/01/24",
    progressStatus: "Not Started",
    currentTNAstage: "14: Fabric Dispatch to Garment Factory",
    orderStatus: {
      status: "Delayed",
      days: "120 days",
    },
    lastUpdated: {
      date: "22/5/24",
      time: "15:27:52",
    },
  },
  {
    id: "5",
    avatar:
      "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
    styleNumber: "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23...",
    poNumber: "WH/PO/ 23-24-000014",
    styleQty: "2200002",
    orderDate: "12/01/24",
    deliveryDate: "12/01/24",
    progressStatus: "Not Started",
    currentTNAstage: "14: Fabric Dispatch to Garment Factory",
    orderStatus: {
      status: "Delayed",
      days: "120 days",
    },
    lastUpdated: {
      date: "22/5/24",
      time: "15:27:52",
    },
  },
  {
    id: "23",
    avatar:
      "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
    styleNumber: "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23...",
    poNumber: "WH/PO/ 23-24-000014",
    styleQty: "2200002",
    orderDate: "12/01/24",
    deliveryDate: "12/01/24",
    progressStatus: "Not Started",
    currentTNAstage: "14: Fabric Dispatch to Garment Factory",
    orderStatus: {
      status: "Delayed",
      days: "120 days",
    },
    lastUpdated: {
      date: "22/5/24",
      time: "15:27:52",
    },
  },
  {
    id: "23",
    avatar:
      "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
    styleNumber: "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23...",
    poNumber: "WH/PO/ 23-24-000014",
    styleQty: "2200002",
    orderDate: "12/01/24",
    deliveryDate: "12/01/24",
    progressStatus: "Not Started",
    currentTNAstage: "14: Fabric Dispatch to Garment Factory",
    orderStatus: {
      status: "Delayed",
      days: "120 days",
    },
    lastUpdated: {
      date: "22/5/24",
      time: "15:27:52",
    },
  },
  {
    id: "23",
    avatar:
      "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
    styleNumber: "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23...",
    poNumber: "WH/PO/ 23-24-000014",
    styleQty: "2200002",
    orderDate: "12/01/24",
    deliveryDate: "12/01/24",
    progressStatus: "Not Started",
    currentTNAstage: "14: Fabric Dispatch to Garment Factory",
    orderStatus: {
      status: "Delayed",
      days: "120 days",
    },
    lastUpdated: {
      date: "22/5/24",
      time: "15:27:52",
    },
  },
  {
    id: "23",
    avatar:
      "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
    styleNumber: "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23...",
    poNumber: "WH/PO/ 23-24-000014",
    styleQty: "2200002",
    orderDate: "12/01/24",
    deliveryDate: "12/01/24",
    progressStatus: "Not Started",
    currentTNAstage: "14: Fabric Dispatch to Garment Factory",
    orderStatus: {
      status: "Delayed",
      days: "120 days",
    },
    lastUpdated: {
      date: "22/5/24",
      time: "15:27:52",
    },
  },
  {
    id: "23",
    avatar:
      "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
    styleNumber: "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23...",
    poNumber: "WH/PO/ 23-24-000014",
    styleQty: "2200002",
    orderDate: "12/01/24",
    deliveryDate: "12/01/24",
    progressStatus: "Not Started",
    currentTNAstage: "14: Fabric Dispatch to Garment Factory",
    orderStatus: {
      status: "Delayed",
      days: "120 days",
    },
    lastUpdated: {
      date: "22/5/24",
      time: "15:27:52",
    },
  },
];

const filterMapData: [string, string[]][] = [
  [
    "Style Numbers",
    [
      "140s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Style Numbers 1)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Style Numbers 2)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Style Numbers 3)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Style Numbers 4)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Style Numbers 5)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Style Numbers 6)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Style Numbers 7)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Style Numbers 8)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Style Numbers 9)",
    ],
  ],
  [
    "Order ID",
    [
      "240s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Order ID 1)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Order ID 2)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Order ID 3)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Order ID 4)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Order ID 5)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Order ID 6)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Order ID 7)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Order ID 8)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Order ID 9)",
    ],
  ],
  [
    "Progress Status",
    [
      "340s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Progress Status 1)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Progress Status 2)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Progress Status 3)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Progress Status 4)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Progress Status 5)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Progress Status 6)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Progress Status 7)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Progress Status 8)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Progress Status 9)",
    ],
  ],
  [
    "Order Status",
    [
      "440s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Order Status 1)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Order Status 2)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Order Status 3)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Order Status 4)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Order Status 5)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Order Status 6)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Order Status 7)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Order Status 8)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (Order Status 9)",
    ],
  ],
  [
    "PO Numbers",
    [
      "540s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (PO Numbers 1)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (PO Numbers 2)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (PO Numbers 3)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (PO Numbers 4)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (PO Numbers 5)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (PO Numbers 6)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (PO Numbers 7)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (PO Numbers 8)",
      "40s Poplin BirdWave Half sleeve shirt-Regular Size Dec 23 Reorder (PO Numbers 9)",
    ],
  ],
];

const TNAdetailData: TNAdata = {
  stages: [
    {
      stage: "sourcing",
      subStages: [
        {
          seq: 1,

          delay: null,
          stageId: "greigeFabricOrder",
          displayText: "Greige Fabric Order",
          status: "Completed",
          expectedDate: "07-Jun-2024",
          actualDate: "27-Jun-2024",
          lastModifiedDateTime: "17-Jul-2024 19:42:58",
          greigeFabricQuantityOrdered: 600,
        },
        {
          seq: 2,

          delay: null,
          stageId: "greigeFabricInHouse",
          displayText: "Greige Fabric In-house",
          status: "Completed",
          expectedDate: "17-Jun-2024",
          actualDate: "28-Jun-2024",
          lastModifiedDateTime: "17-Jul-2024 19:43:16",
          cumulativeQuantityGreigeFabricInHouse: 717,
        },
        {
          seq: 3,

          delay: null,
          stageId: "fabricProcessingStart",
          displayText: "Fabric Processing Start",
          status: "Completed",
          expectedDate: "18-Jun-2024",
          actualDate: "04-Jul-2024",
          lastModifiedDateTime: "17-Jul-2024 19:44:07",
          processedFabricQuantity: 525,
        },
        {
          seq: 4,

          delay: null,
          stageId: "strikeOffLabDipDeskLoom",
          displayText: "Strike-off/Lab-dip/Desk-loom",
          status: "Open",
          expectedDate: "16-Jun-2024",
          actualDate: "",
          lastModifiedDateTime: "",
        },
        {
          seq: 5,

          delay: null,
          stageId: "yardagesInHouse",
          displayText: "Yardages In-house",
          status: "Open",
          expectedDate: "17-Jun-2024",
          actualDate: "",
          lastModifiedDateTime: "",
        },
        {
          seq: 6,

          delay: null,
          stageId: "processedFabricInHouse",
          displayText: "Processed Fabric In-house",
          status: "Inprogress",
          expectedDate: "26-Jun-2024",
          actualDate: "16-Jul-2024",
          lastModifiedDateTime: "17-Jul-2024 19:44:19",
          cumulativeQuantityProcessedFabricInHouse: 482.5,
        },
        {
          seq: 7,

          delay: null,
          stageId: "processedFabricQC",
          displayText: "Processed Fabric QC",
          status: "Completed",
          expectedDate: "27-Jun-2024",
          actualDate: "17-Jul-2024",
          lastModifiedDateTime: "17-Jul-2024 19:48:00",
          cumulativeQuantityProcessedFabricQC: 482.5,
        },
        {
          seq: 8,

          delay: null,
          stageId: "trimsOrder",
          displayText: "Trims Order",
          status: "Open",
          expectedDate: "10-Jun-2024",
          actualDate: "",
          lastModifiedDateTime: "",
        },
        {
          seq: 9,

          delay: null,
          stageId: "trimsInHouse",
          displayText: "Trims In-house",
          status: "Open",
          expectedDate: "28-Jun-2024",
          actualDate: "",
          lastModifiedDateTime: "",
        },
        {
          seq: 10,

          delay: null,
          stageId: "fullKitApproval",
          displayText: "Full Kit Approval",
          status: "Open",
          expectedDate: "28-Jun-2024",
          actualDate: "",
          lastModifiedDateTime: "",
        },
        {
          seq: 11,

          delay: null,
          stageId: "ppSampleCompletion",
          displayText: "PP Sample Completion",
          status: "N/A",
          expectedDate: "",
          actualDate: "",
          lastModifiedDateTime: "",
        },
      ],
      status: "Completed",
    },
    {
      stage: "production",
      subStages: [
        {
          seq: 12,
          delay: null,
          stageId: "fabricDispatchToGarmentFactory",
          displayText: "Fabric Dispatch to Garment Factory",
          status: "Open",
          expectedDate: "28-Jun-2024",
          actualDate: "",
          lastModifiedDateTime: "",
          cumulativeFabricSentToGarmentFactory: null,
        },
        {
          seq: 13,

          delay: null,
          stageId: "productionStart",
          displayText: "Production Start",
          status: "Open",
          expectedDate: "30-Jun-2024",
          actualDate: "",
          lastModifiedDateTime: "",
          poQuantityProductionStart: null,
        },
        {
          seq: 14,

          delay: null,
          stageId: "productionEnd",
          displayText: "Production End",
          status: "Open",
          expectedDate: "20-Jul-2024",
          actualDate: "",
          lastModifiedDateTime: "",
        },
      ],
      status: "Open",
      totalQuantity: 10,
      producedQuantity: 3,
    },
    {
      stage: "qualityCheck",
      subStages: [
        {
          seq: 15,

          delay: null,
          stageId: "garmentQC",
          displayText: "Garment QC",
          status: "Open",
          expectedDate: "21-Jul-2024",
          actualDate: "",
          lastModifiedDateTime: "",
          totalGarmentQuantity: null,
          cumulativeApprovedQuantity: null,
        },
      ],
    },
    {
      stage: "delivery",
      subStages: [
        {
          seq: 16,

          delay: null,
          stageId: "finalGrn",
          displayText: "Final GRN",
          status: "Open",
          expectedDate: "21-Jul-2024",
          actualDate: "",
          lastModifiedDateTime: "",
          totalGarmentQuantityFinalGrn: null,
          cumulativeQuantityFinalGrn: null,
        },
        {
          seq: 17,

          delay: null,
          stageId: "finalDispatchToBuyer",
          displayText: "Final Dispatch to Buyer",
          status: "Open",
          expectedDate: "25-Jul-2024",
          actualDate: "",
          lastModifiedDateTime: "",
        },
        {
          seq: 18,

          delay: null,
          stageId: "shipmentDelivery",
          displayText: "Shipment Delivery",
          status: "Open",
          expectedDate: "25-Aug-2024",
          actualDate: "",
          lastModifiedDateTime: "",
        },
      ],
    },
  ],
};

const totalSkuBannerData: OrderBannerStats = {
  orders: {
    title: "Orders",
    total: 0,
  },
  skus: {
    title: "SKUs",
    lastUpdated: "23/05/24",
    total: 0,
    inProgress: {
      total: 0,
      onTime: 0,
      delay: 0,
    },
    completed: {
      total: 0,
      onTime: 0,
      delay: 0,
    },
    notStarted: 0,
  },
};

const navigationSidebar = [
  {
    href: "#",
    name: NavNames.Orders,
    active: SVGorders.active,
    hovered: SVGorders.hovered,
  },
  // {
  //   href: "#",
  //   name: NavNames.Sampling,
  //   active: SVGsampling.active,
  //   hovered: SVGsampling.hovered,
  // },
  // {
  //   href: "#",
  //   name: NavNames.OrderHistory,
  //   active: SVGorderHistory.active,
  //   hovered: SVGorderHistory.hovered,
  // },
];

const navsFooter = [
  {
    href: "https://www.lal10.com/faqs",
    name: NavNames.FAQs,
    active: SVGfaq.active,
    hovered: SVGfaq.hovered,
  },
  // {
  //   href: "#",
  //   name: NavNames.TermsOfService,
  //   active: SVGtermOfService.active,
  //   hovered: SVGtermOfService.hovered,
  // },
  {
    href: "https://www.lal10.com/privacy-policy",
    name: NavNames.PrivacyPolicy,
    active: SVGprivacyPolicy.active,
    hovered: SVGprivacyPolicy.hovered,
  },
  {
    href: "#",
    name: NavNames.SignOut,
    active: SVGsignOut.active,
    hovered: SVGsignOut.hovered,
  },
];
const getImageProps = (
  src: StaticImageData,
  alt: string,
  width: number = 80,
  height: number = 80
): ImageProps => {
  return {
    src: src,
    alt: alt,
    width: width,
    height: height,
  };
};

const defaultProfile: Profile = {
  fullName: "Test Name",
  email: "test@gmail.com",
  mobile: "8765431234",
};

const defaultCompany: Company = {
  type: "Domestic",
  name: "Test Fashions Private Limited",
  gstNumber: "22123456789TTZT",
  address: [],
  // {
  //   billingAddress : "House of Lal10, Eccosphere, B-70, Block B, Sector 67, Noida, Uttar Pradesh 201301",
  //   shippingAddress: "House of Lal10, Eccosphere, B-70, Block B, Sector 67, Noida, Uttar Pradesh 201301",
  //   branchAddress : "House of Lal10, Eccosphere, B-70, Block B, Sector 67, Noida, Uttar Pradesh 201301"
  // }
};

const defaultMembers: Member[] = [];

const defaultuserData: SignInUser = {
  email: "om@lal10.com",
  role: "spoc",
  fullName: "Temp Name",
  mobileNumber: "4567890-9876",
  associatedBrands: [],
};

const FilterKeys: OrderFilter = {
  STYLENUMBER: "Style Numbers",
  ORDERID: "Order ID",
  PROGRESSSTATUS: "Progress Status",
  ORDERSTATUS: "Order Status",
  PONUMBER: "PO Numbers",
};

const responseStatus = {
  SUCCESS: "Success",
  FAILURE: "Failure",
  ERROR : "Error"
}
export {responseStatus , 
  defaultProfile,
  defaultuserData,
  defaultMembers,
  defaultCompany,
  getImageProps,
  progressStatusFilterArray,
  orderStatusFilterArray,
  FilterKeys,
  INVALIDEMAIL,
  EMAILEXISTS,
  DefaultFullName,
  navigationSidebar,
  navsFooter,
  OrderStatus,
  progressStatus,
  filterMapData,
  TNAdetailData,
  AccordionTnaStatus,
  totalSkuBannerData,
  tableItems,
};
