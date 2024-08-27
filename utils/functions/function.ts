import { getMemberList, removeMember } from "../api";
import { responseStatus } from "../constant";
import { useMemberStore } from "../store/zustang";
import { Member, OrderItemMap, SignInUser, TableItems, Tokens , localStorageDataType, localStorageKeys} from "../types";

// Common Functoions -->>>>>>
// sourcing -> Sourcing
function toNormalString(str: string | ""): string {
  // Replace underscores with spaces and convert to lowercase
  const spacedStr = str.replace(/_/g, " ");

  // Insert spaces before uppercase letters and convert to lowercase
  const camelCaseStr = spacedStr
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .toLowerCase();

  // Capitalize the first letter of each word
  const normalStr = camelCaseStr.replace(/\b\w/g, (char) => char.toUpperCase());

  return normalStr;
}

//  function to convert array of object to hashmap using its object id as key - common function
const convertToMap = (items: TableItems[]): OrderItemMap => {
  const map = new Map<string, TableItems>();
  items.forEach((item) => map.set(item.id, item));
  return map;
};


/**
 * Save data to localStorage with type safety.
 * @param key - The key under which the data should be stored.
 * @param value - The value to be stored, which can be of any type.
 */
function saveToLocalStorage<T>(key: string, value: T): void {
  if (typeof value === "object") {
    if (value === null) {
      localStorage.setItem(key, "null");
    } else if (value instanceof Map) {
      localStorage.setItem(key, JSON.stringify(Array.from(value.entries())));
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } else {
    localStorage.setItem(key, String(value));
  }
}



/**
 * Retrieve data from localStorage with type safety.
 * @param key - The key under which the data is stored.
 * @param type - The type of the data to be retrieved.
 * @returns The retrieved data in the specified type.
 */
const getFromLocalStorage = <T>(
  key: string,
  type: "string" | "number" | "object" | "map"
): T | null => {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    console.warn(`localStorage is not available for key "${key}"`);
    return null;
  }

  const item = localStorage.getItem(key);

  if (item === null) {
    return null;
  }

  try {
    switch (type) {
      case "number":
        return Number(item) as T;
      case "object":
        return JSON.parse(item) as T;
      case "map":
        return new Map(JSON.parse(item)) as T;
      default:
        return item as T;
    }
  } catch (error) {
    console.error(`Error parsing localStorage item "${key}":`, error);
    return null;
  }
};


function clearLocalStorage() {
  if (typeof window !== "undefined") {
    localStorage.clear();
  }
}

// returns brandId using localstorage
const redirectToLoginHome = () => {
  const brandId = getFromLocalStorage<SignInUser>(
    localStorageKeys.USERDATA,
    localStorageDataType.OBJECT
  );
  return brandId?.associatedBrands[0].id;
};

const handleRemoveMember = (brandId: string, email: string): string => {
  const tokens = getFromLocalStorage<Tokens>(
    localStorageKeys.TOKENS,
    localStorageDataType.OBJECT
  );

  if (tokens && tokens.accessToken) {
    const removeMemberData = async () => {
      try {
        const data = await removeMember(tokens.accessToken, email, brandId);
        if (data.status != "success") {
          return brandId;
        }
        return responseStatus.SUCCESS;
        // window.location.reload();
      } catch (error) {
        return brandId;
      }
      // return null;
    };

    removeMemberData();
  }
  return  responseStatus.SUCCESS;
};



const saveOrderListMapToLocalStorage = (map: OrderItemMap): void => {
  const jsonObject = Object.fromEntries(map.entries());
  saveToLocalStorage(localStorageKeys.ORDERLISTMAP, JSON.stringify(jsonObject));
};

const fetchOrderListMap = (): OrderItemMap => {
  const data = localStorage.getItem("orderListMap");
  // here add logic if orderList is not present so call that function to get orders and save in locastorage
  if (data) {
    const jsonObject: { [key: string]: TableItems } = JSON.parse(data);
    return new Map<string, TableItems>(
      Object.entries(jsonObject).map(([key, value]) => [key, value])
    );
  }
  return new Map<string, TableItems>();
};

function getNameFromEmail(email: string): string | null {
  if (email.includes('@')) {
    const [name] = email.split('@');
    return toNormalString(name);
  }
  return null;
}
// const getMembers = async ({brandId  : string , }) => {
//   const tokens = getFromLocalStorage<Tokens>(localStorageKeys.TOKENS, localStorageDataType.OBJECT);
//   if (tokens && tokens.accessToken) {
//     //  brandId = searchParams.get(queryPararms.BRANDID) || "";
//     if(brandId){
//       let brandList = await getMemberList(tokens.accessToken);
//       // console.log("🚀 ~ brandList:", brandList);
//       // console.log("🚀 ~ brandId:", brandId); // Log brandId

//       // Map through brandList and filter non-null results
//       const tempArr: Member[] = brandList
//         .map((value) => {
//           // Check if brandIds is an array and contains the brandId
//           if (
//             Array.isArray(value.brandIds) &&
//             value.brandIds.includes(brandId)
//           ) {
//             return {
//               email: value.email,
//               id: value.id,
//               brandIds: [brandId],
//             };
//           }
//           return null; // Return null for non-matching entries
//         })
//         .filter((item): item is Member => item !== null); // Use type predicate to filter out null

//       // console.log("🚀 ~ tempArr:", tempArr); // Log filtered results
//       setMembers(tempArr);
//     }
//     // else{
//     //   const intialBrandId = redirectToLoginHome() ;
//     //   console.log("🚀 ~ getData ~ intialBrandId:", intialBrandId)
//     //   if(intialBrandId != null){
//     //     router.push(`/admin/user?brandId=${intialBrandId}`);
//     //     // setBrandId(intialBrandId)
//     //   }
//     // }
  
//   }
// };

export {
  getNameFromEmail , 
  redirectToLoginHome,
  clearLocalStorage,
  toNormalString,
  convertToMap,
  saveOrderListMapToLocalStorage,
  fetchOrderListMap,
  saveToLocalStorage,
  getFromLocalStorage,
  handleRemoveMember,
};
