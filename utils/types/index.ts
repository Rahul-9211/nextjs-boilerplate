import { StaticImageData } from "next/image";

export interface ImageProps {
  src: StaticImageData;
  alt: string;
  width?: number;
  height?: number;
}


export interface TNAsubStageDelay {
  daysOfDelay: number;
  displayText: string;
  status: string;
}
export type AccordianSubStage = {
  seq: number;
  stageId: string;
  delay: TNAsubStageDelay | null;
  displayText: string;
  status: string;
  expectedDate: string;
  actualDate: string;
  lastModifiedDateTime: string;
  greigeFabricQuantityOrdered?: number;
  cumulativeQuantityGreigeFabricInHouse?: number;
  processedFabricQuantity?: number;
  cumulativeQuantityProcessedFabricInHouse?: number;
  cumulativeQuantityProcessedFabricQC?: number;
  cumulativeFabricSentToGarmentFactory?: number | null;
  poQuantityProductionStart?: number | null;
  totalGarmentQuantity?: number | null;
  cumulativeApprovedQuantity?: number | null;
  totalGarmentQuantityFinalGrn?: number | null;
  cumulativeQuantityFinalGrn?: number | null;
};

export type AccordionStage = {
  stage: string;
  subStages: AccordianSubStage[];
  status?: string;
  totalQuantity?: number;
  producedQuantity?: number | null;
};

export type AccordionProps = {
  id: string;
  ele: AccordionStage;
};

export type TNAdata = {
  stages: AccordionStage[];
};

export interface StepperProps {
  steps: AccordianSubStage[];
}

export interface OrderStats {
  totalOrders: number;
  totalSkus: number;
  inProgress: number;
  onTimeInProgress: number;
  delayedInProgress: number;
  completed: number;
  onTimeCompleted: number;
  delayedCompleted: number;
  notStarted: number;
  lastUpdated: string; // You can use Date type if you convert the string to a Date object
}
export interface orderListFilter {
  string: string[];
}

export type FilterEntry = [string, string[]];
export type FilterMap = FilterEntry[];
export type OrderFilterMap = Map<string, FilterMap>;

interface OrderStatus {
  status: string;
  days: string;
}

interface LastUpdated {
  date: string;
  time: string;
}

export interface TableItems {
  id: string;
  avatar: string;
  styleNumber: string;
  poNumber: string;
  styleQty: string;
  orderDate: string;
  deliveryDate: string;
  progressStatus: string;
  currentTNAstage: string;
  orderStatus: OrderStatus;
  lastUpdated: LastUpdated;
}
export interface OrderListImage{
  id : string;
  url : string;
}


export interface IDimageList {
  brandId: string;
  items: OrderListImage[];
}
export interface TableProps {
  data: TableItems[];
  imageDataList : IDimageList;
}

export interface SingleImage{
  [id : string ] : string 
}

export type SortKey =
  | "styleQty"
  | "orderDate"
  | "poNumber"
  | "styleNumber"
  | "progressStatus"
  | "orderStatus"
  | "currentTNAstage"
  | "lastUpdated"
  | "deliveryDate";

export interface ShareDashboardProps {
  handleCloseRodal: () => void;
  membersProps?: Member[];
  handleEmailSent: () => void;
  
}

export type OrderItemMap = Map<string, TableItems>;

export interface Profile {
  fullName: string;
  email: string;
  mobile: string;
}

export type Address = {
  billingAddress: string;
  shippingAddress: string;
  branchAddress: string;
};
export interface Company {
  type: string;
  name: string;
  gstNumber: string;
  address: AddressType[];
}

export interface Member {
  email: string;
  id: string;
  brandIds: string[];
}

export interface IorderListApiData {
  productImage: string;
  styleNumber: {
    styleNumber: string;
    id: string;
    displayValue: string;
  };
  poNumber: string;
  styleQty: string;
  orderDate: string;
  deliveryDate: string;
  lastUpdated: string;
  currentSubStage: {
    stage: {
      stage: string;
      status: string;
    };
    subStage: {
      seq: number;
      stageId: string;
      displayText: string;
      status: string;
      expectedDate: string;
      actualDate: string;
      lastModifiedDateTime: string;
      delay: {
        status: string;
        displayText: string;
        daysOfDelay: number;
      };
      cumulativeQuantityProcessedFabricQC: number;
    };
  };
  completionPercentage: number;
  tnaId: string;
}

export interface APIfetchOrderData {
  brandId: string;
  accessToken: string;
}

export interface APIfetchTnaDetailData {
  brandId: string;
  tnaID: string;
  accessToken: string;
}

export interface SignInUser {
  email: string;
  role: string;
  fullName: string;
  mobileNumber: string;
  associatedBrands: SignInBrand[];
}
export interface AddressType {
  type: string;
  value: string;
}
export interface SignInBrand {
  crmId: string;
  id: string;
  customerCode: string;
  bookId: string;
  name: string;
  gstNumber: string;
  companyType: string;
  address: AddressType[];
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface SignInUserData {
  userData: SignInUser;
  tokens: Tokens;
}

export interface SignInApiResponse {
  status: string;
  data: SignInUserData;
  message: string;
}

export interface APIaddMember {
  status: string;
  message: string;
}
export interface APIremoveMember {
  status: string;
  message: string;
}

export interface brandDropdown {
  crmId: string;
  id: string;
  customerCode: string;
  bookId: string;
  name: string;
}

interface OrderSkuStatus {
  total: number;
  onTime: number;
  delay: number;
}

interface OrderSkuData {
  title: string;
  lastUpdated: string;
  total: number;
  inProgress: OrderSkuStatus;
  completed: OrderSkuStatus;
  notStarted: number;
}

interface OrdersData {
  title: string;
  total: number;
}

export interface OrderBannerStats {
  orders: OrdersData;
  skus: OrderSkuData;
}

export interface APImemberList {
  email: string;
  id: string;
  brandIds: string[];
}

export enum NavNames {
  Orders = "Orders",
  Sampling = "Sampling",
  OrderHistory = "Order History",
  FAQs = "FAQs",
  TermsOfService = "Terms of service",
  PrivacyPolicy = "Privacy Policy",
  SignOut = "Sign Out",
}

export interface APIsendOTP {
  otp: string;
  userEmail: String;
}

export enum TnaMergerReportDeliveryStatus {
  DELAYED = "Delayed",
  ON_TIME = "On-time",
}


interface TNAapiDelay {
  status: string;
  displayText: string;
  daysOfDelay: number;
}

interface TNAapiSubStage {
  seq: number;
  stageId: string;
  displayText: string;
  status: string;
  expectedDate: string;
  actualDate: string;
  lastModifiedDateTime: string;
  delay: TNAapiDelay | null;
  [key: string]: any;
}

export interface TNAapiStageData {
  stage: string;
  subStages: TNAapiSubStage[];
  status: string;
  totalQuantity?: number;
  producedQuantity?: number;
}


export enum localStorageKeys{
  TOKENS = "tokens",
  USERDATA = "userData",
  USEREMAIL = "userEmail",
  ORDERLISTMAP = "orderListMap",
  ORDERFILTER =  "orderFilter",
  ORDERSTATS = "orderStats"

}

export enum localStorageDataType {
  STRING = 'string',
  NUMBER = 'number',
  OBJECT = 'object',
  MAP = 'map'
}

export enum queryPararms {
  BRANDID = "brandId",
  ORDERID = "orderId",
  USEREMAIL = "userEmail",
  PIN = "pin",
}

export interface OrderFilter{
  STYLENUMBER : string,
  ORDERID: string , 
  PROGRESSSTATUS : string,
  ORDERSTATUS : string, 
  PONUMBER : string 
}