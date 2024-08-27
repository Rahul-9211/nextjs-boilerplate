import axios from "axios";
import {
  convertToMap,
  saveOrderListMapToLocalStorage,
  saveToLocalStorage,
} from "../functions/function";
import { McreateOrderFilter, MorderList, MorderListImage } from "../mapper/orderList";
import {
  APIaddMember,
  APImemberList,
  APIfetchOrderData,
  APIfetchTnaDetailData,
  APIremoveMember,
  TableItems,
  OrderStats,
  FilterMap,
  APIsendOTP,
  SignInUser,
  Tokens,
  localStorageKeys,
  OrderListImage,
} from "../types";
import { addItem, getItems } from "@/components/indexDB/indexDb";


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const sendOTP = async ({ otp, userEmail }: APIsendOTP) => {
  const urls = `${baseUrl}/api/v1/brand/auth/login`;
  const url = urls;
  const response = await axios.post(
    url,
    { data: { email: userEmail, pin: otp } },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("🚀 ~ sendOTP ~ response:", response)
  saveToLocalStorage<SignInUser>(localStorageKeys.USERDATA, response.data.data.userData);
  saveToLocalStorage<Tokens>(localStorageKeys.TOKENS, response.data.data.tokens);

  if (response.status == 201 || response.status == 200) {
    return response.data;
  } else return null;
};

export const verifyEmail = async (email: string)  =>{
  const response = await axios.get(
    `${baseUrl}/api/v1/brand/auth/verify-email/${email}`
  ); // Update the URL to your API endpoint
  if (response.status != 200) {
    throw new Error("Failed to fetch orders data");
  }

  // const data = await response.data;
  return response.data.data;
};




interface IDimageList {
  brandId: string;
  items: OrderListImage[];
}

export const fetchOrdersData = async ({
  brandId,
  accessToken,
}: APIfetchOrderData): Promise<TableItems[]> => {

  let data = [];
  const response = await axios.get(
    `${baseUrl}/api/v1/brand/${brandId}/orders/skus`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status != 200) {
    throw new Error("Failed to fetch orders data");
  }

  data = await response.data;

  const orderList = MorderList(data.data.skus); // order list or table
  // console.log("🚀 ~ data.data.skus:", data.data.skus)
  const orderListMap = convertToMap(orderList);
  // console.log("🚀 ~ orderListMap:", orderListMap)
  saveOrderListMapToLocalStorage(orderListMap);

  const orderStatsmap = new Map<string, OrderStats>();
  
  orderStatsmap.set(brandId, data.data.stats);
  saveToLocalStorage<Map<string, OrderStats>>(localStorageKeys.ORDERSTATS, orderStatsmap); // order stats setup
  const orderFilter = McreateOrderFilter(data.data.skus); // filter setup
  // console.log("🚀 ~ orderFilter:", orderFilter);
  // saveToLocalStorage("orderFilter",orderFilter)

  const orderFiltermap = new Map<string, FilterMap>();
  orderFiltermap.set(brandId, orderFilter);
  // console.log("🚀 ~ orderFiltermap:", orderFiltermap);

  saveToLocalStorage<Map<string, FilterMap>>(localStorageKeys.ORDERFILTER, orderFiltermap);

  const orderListImage = MorderListImage(data.data.skus); // order list or table
  // console.log("🚀 ~ orderListImage:", typeof orderListImage)
  
  const newItem: IDimageList = {
    brandId,
    items: orderListImage,
  };
  // console.log("🚀 ~ newItem:", newItem)
  try {
    await addItem(newItem);
    // setItems(allItems);
  } catch (error) {
    console.error('Failed to add item:', error);
  }
  // await addItem(brandId, orderListImage)

  // try {
  // } catch (error) {
  //   console.log("🚀 ~ error:", error)

  // }
  // console.log("🚀 ~ orderFilter:", orderFilter)
  // console.log("🚀 ~ data.data.stats:", data.data.stats)

  return orderList;
};

export const fetchTnaDetail = async ({
  brandId,
  tnaID,
  accessToken,
}: APIfetchTnaDetailData): Promise<any[]> => {
  let data = [];
  const response = await axios.get(
    `${baseUrl}/api/v1/brand/${brandId}/orders/tnaDetails/${tnaID}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status != 200) {
    throw new Error("Failed to fetch orders data");
  }

  data = await response.data;
  // console.log("🚀 ~ data:", data?.data?.stages)
  return data?.data?.stages;
};

export const verifyTokenStatus = async (
  accessToken: string
): Promise<boolean> => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/v1/brand/auth/isLoggedIn`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status == 200) {
      saveToLocalStorage<SignInUser>(localStorageKeys.USERDATA, response.data.data.userData);
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const getMemberList = async (
  accessToken: string
): Promise<APImemberList[]> => {
  try {
    const response = await axios.get(`${baseUrl}/api/v1/brand/spoc/member`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data?.data;
  } catch (error) {
    return [];
  }
  return [];
};

export const addMember = async (
  accessToken: string,
  email: string,
  brandId: string
): Promise<APIaddMember> => {
  try {
    const url = `${baseUrl}/api/v1/brand/spoc/member:add`;
    const response = await axios.post(
      url,
      { data: { email: email, brandId: brandId } },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status == 201 || response.status == 200) {
      return response.data;
    }
    throw new Error("Unexpected response status");
  } catch (error) {
    throw new Error(`Failed to add member ${brandId}`);
  }
};

export const removeMember = async (
  accessToken: string,
  email: string,
  brandId: string
): Promise<APIremoveMember> => {
  try {
    const url = `${baseUrl}/api/v1/brand/spoc/member:delete`;
    const response = await axios.patch(
      url,
      { data: { email: email, brandId: brandId } },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status == 201 || response.status == 200) {
      return response.data;
    }
    throw new Error("Unexpected response status");
  } catch (error) {
    throw new Error(`Failed to remove member ${brandId}`);
  }
};
