"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import { SVGcloseModal, SVGdropdownArrow, SVGshare, SVGsucess } from "@/utils/images/svg";
import { Member, SignInUser, Tokens, brandDropdown } from "@/utils/types";
import { useRouter, useSearchParams } from "next/navigation";
import Rodal from "rodal";
import ShareDashboard from "../shareDashboard/ShareDashboard";
import { getFromLocalStorage } from "@/utils/functions/function";
import { getMemberList } from "@/utils/api";
import { localStorageDataType, localStorageKeys, queryPararms } from "@/utils/types";
import InvitationSentModal from "@/utils/Rodal/InvitationSentModal";
import { useMemberStore } from "@/utils/store/zustang";

const defaultMembers: Member[] = [
];
const AdminNavbar: React.FC = () => {
  const [dropdown, setDropdown] = useState(false);
  const [options, setOptions] = useState<brandDropdown[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [selectedBuyerId, setSelectedBuyerId] = useState<string>("");
  const menuRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [members, setMembers] = useState<Member[]>(defaultMembers);
  const searchParams = useSearchParams();

  const [isSuccessInviteModalVisible, setIsSuccessInviteModalVisible] =
  useState<boolean>(false);
  const updateStoreMember = useMemberStore((state) => state.ZupdateMember);
  const router = useRouter();

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setDropdown(false);
    }
  };
  const hide = () => {
    setVisible(false);
  };
  const show = () => {
    setVisible(true);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const getMembers = async () => {
    const tokens = getFromLocalStorage<Tokens>(localStorageKeys.TOKENS, localStorageDataType.OBJECT);
    if (tokens && tokens.accessToken) {
      const brandId = searchParams.get(queryPararms.BRANDID) || "";
      if(brandId){
        let brandList = await getMemberList(tokens.accessToken);
        // console.log("🚀 ~ brandList:", brandList);
        // console.log("🚀 ~ brandId:", brandId); // Log brandId

        // Map through brandList and filter non-null results
        const tempArr: Member[] = brandList
          .map((value) => {
            // Check if brandIds is an array and contains the brandId
            if (
              Array.isArray(value.brandIds) &&
              value.brandIds.includes(brandId)
            ) {
              return {
                email: value.email,
                id: value.id,
                brandIds: [brandId],
              };
            }
            return null; // Return null for non-matching entries
          })
          .filter((item): item is Member => item !== null); // Use type predicate to filter out null

        // console.log("🚀 ~ tempArr:", tempArr); // Log filtered results
        updateStoreMember(tempArr)
        setMembers(tempArr);
      }
      // else{
      //   const intialBrandId = redirectToLoginHome() ;
      //   console.log("🚀 ~ getData ~ intialBrandId:", intialBrandId)
      //   if(intialBrandId != null){
      //     router.push(`/admin/user?brandId=${intialBrandId}`);
      //     // setBrandId(intialBrandId)
      //   }
      // }
    
    }
  };
  useEffect(()=>{
    getMembers();
  },[])

  useEffect(() => {
    // const userDataString = localStorage.getItem("userData");
    const userData = getFromLocalStorage<SignInUser>(localStorageKeys.USERDATA, localStorageDataType.OBJECT);
    const urlParams = new URLSearchParams(window.location.search);
    const urlBrandId = urlParams.get("brandId");

    if (userData) {
      // const userData = getFromLocalStorage<SignInUser>(localStorageKeys.USERDATA, localStorageDataType.OBJECT);
      const brands = userData.associatedBrands.map((brand: any) => ({
        crmId: brand.crmId,
        id: brand.id,
        customerCode: brand.customerCode,
        bookId: brand.bookId,
        name: brand.name,
      }));
      setOptions(brands);

      if (brands.length > 0) {
        const matchedBrand = brands.find((brand: { id: string | null; }) => brand.id === urlBrandId);
        if (matchedBrand) {
          setSelectedCustomer(matchedBrand.name);
          setSelectedBuyerId(matchedBrand.id);
        } else {
          setSelectedCustomer(brands[0].name);
          setSelectedBuyerId(brands[0].id);
        }
      }
    }
  }, []);

  const handleOptionClick = (option: brandDropdown) => {
    setDropdown(false);
    setSelectedCustomer(option.name);
    setSelectedBuyerId(option.id);
    // Update the URL with the selected buyer ID
    const url = new URL(window.location.href);
    url.searchParams.set(queryPararms.BRANDID, option.id);
    window.history.pushState({}, "", url.toString());
    // router.reload()
    window.location.reload();
  };


  const closeSuccessInviteModal = () => {
    // window.location.reload();
    setIsSuccessInviteModalVisible(false);
  };



  const handleEmailSent = () => {
    setVisible(false);
    getMembers();
    setIsSuccessInviteModalVisible(true);
    // console.log("handle email sent ");
  };

  return (
    <div className="w-full max-w-screen-2xl">
      <nav className={`bg-[#FFF] md:text-sm font-workSans border-b-[1px] `}>
        <div className="gap-x-14 items-center mx-auto px-4 py-2 md:flex md:px-8 ">
          <div className={`flex-1 items-center mt-8 md:mt-0 md:flex `}>
            <div className="" ref={menuRef}>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton
                    onClick={() => {
                      setDropdown(!dropdown);
                    }}
                    className="flex items-center min-w-[236px] justify-between gap-x-1.5 rounded-xl bg-white p-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-primary-9"
                  >
                    <div className="flex items-center ">
                      <div className="border-[1px] border-neutral-9 rounded-lg w-8 h-8 flex justify-center items-center text-neutral-2 text-lg bg-white">
                        {selectedCustomer[0]}
                      </div>{" "}
                      <div className="pl-3 text-base font-medium text-neutral-3">
                        {selectedCustomer}
                      </div>
                    </div>{" "}
                    <div className="pl-6">
                      {dropdown
                        ? SVGdropdownArrow.clicked
                        : SVGdropdownArrow.active}
                    </div>
                  </MenuButton>
                </div>

                {dropdown && (
                  <MenuItems
                    transition
                    className="absolute left-0 z-[201] mt-4 min-w-[352px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in "
                  >
                    <div className="">
                      {options.map((ele, idx) => (
                        <MenuItem key={idx}>
                          <a
                            href="#"
                            className="flex items-center p-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            onClick={() => handleOptionClick(ele)}
                          >
                            <div className="border-[1px] border-neutral-9 rounded-lg w-11 h-11 flex justify-center items-center text-neutral-2 text-lg bg-white">
                              {ele.name[0]}
                            </div>
                            <span className="pl-3 text-base text-neutral-3">
                              {ele.name}
                            </span>
                          </a>
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                )}
              </Menu>{" "}
            </div>
            <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0 font-medium text-base leading-6 text-primary-5">
              <a href="#" className="flex hover:font-semibold" onClick={show}>
                <span className="pr-2">{SVGshare.active}</span> Share
                Dashboard
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.buyerapp&pli=1" target="_blank" className="block hover:font-semibold">
                Download App
              </a>
              <a href="https://www.lal10.com/design" target="_blank" className="block hover:font-semibold">
                View Catalogue
              </a>
            </div>

            <Rodal
                visible={visible}
                onClose={hide}
                customStyles={{ borderRadius: 16, height: "fit-content" }}
                width={502}
              >
                <div className="">
                <ShareDashboard handleCloseRodal={hide} membersProps = {members}   handleEmailSent={handleEmailSent}/>
                </div>
              </Rodal>
              <div className="invitationModal">
        <InvitationSentModal
          visible={isSuccessInviteModalVisible}
          onClose={closeSuccessInviteModal}
        >
          <div className="flex justify-end">
            {" "}
            <button className="" onClick={closeSuccessInviteModal}>
              {SVGcloseModal.active}
            </button>
          </div>
          <div className="p-6 text-center align-middle">
            <div className="flex justify-center">{SVGsucess.active}</div>
            <h4 className="pt-4 text-base font-semibold text-neutral-2 ">
              Invite successfully sent
            </h4>
            <p className="pt-2 text-sm font-medium text-neutral-4">
              Members can access the dashboard by signing in
            </p>
          </div>
        </InvitationSentModal>
      </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminNavbar;
