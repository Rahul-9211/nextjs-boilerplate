"use client";
import React, { useEffect, useRef, useState } from "react";
import { SVGaddMember, SVGcloseModal, SVGsucess } from "@/utils/images/svg";
import {
  Company,
  Member,
  SignInUser,
  Tokens,
} from "@/utils/types";
import Rodal from "rodal";
import ShareDashboard from "@/components/shareDashboard/ShareDashboard";
import { getFromLocalStorage, getNameFromEmail, handleRemoveMember, redirectToLoginHome } from "@/utils/functions/function";
import { useRouter, useSearchParams } from "next/navigation";
import { getMemberList } from "@/utils/api";
import { defaultCompany, defaultMembers, defaultuserData, responseStatus } from "@/utils/constant";
import {  localStorageDataType, localStorageKeys, queryPararms } from "@/utils/types";
import BanterLoader from "@/components/Loader/BanterLoader";
import InvitationSentModal from "@/utils/Rodal/InvitationSentModal";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import DotSpinner from "@/components/Loader/DotSpinner/DotSpinner";
import useDotSpinner from "@/utils/hooks/useDotSpinner";
import { useMemberStore } from "@/utils/store/zustang";

const User: React.FC = () => {
  const [company, setCompany] = useState<Company>(defaultCompany);
  const [members, setMembers] = useState<Member[]>(defaultMembers);
  const [userData, setUserData] = useState<SignInUser>(defaultuserData);
  const [visible, setVisible] = useState(false);
  const [brandId, setBrandId] = useState<string>("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isSuccessInviteModalVisible, setIsSuccessInviteModalVisible] =
  useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const storeMember = useMemberStore((state)=> state.member)
  const updateStoreMember = useMemberStore((state) => state.ZupdateMember);
  const [selectedMember, setSelectedMember] = useState<{ email: string; brandId: string } | null>(null);
const { isDotSpinnerLoading,
    startDotSpinnerLoading,
    stopDotSpinnerLoading,} = useDotSpinner()


  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    // getMembers();
    setVisible(false);
  };

  const getMembers = async () => {
    const tokens = getFromLocalStorage<Tokens>(localStorageKeys.TOKENS, localStorageDataType.OBJECT);

    if (tokens && tokens.accessToken) {
      const brandId = searchParams.get(queryPararms.BRANDID) || "";
      if (brandId) {
        let brandList = await getMemberList(tokens.accessToken);
        const tempArr: Member[] = brandList
          .map((value) => {
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
            return null;
          })
          .filter((item): item is Member => item !== null);
        // dispatch(updateMember(tempArr))
        updateStoreMember(tempArr)
        setMembers(tempArr);
      stopDotSpinnerLoading()
      } else {
        const initialBrandId = redirectToLoginHome();
        if (initialBrandId != null) {
          router.push(`/admin/user?brandId=${initialBrandId}`);
        }
      }
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      handleEmailSent()
      // setDropdown(false);
    }
  };

  const handleEmailSent = () => {
    setVisible(false);
    getMembers();
    setIsSuccessInviteModalVisible(true);
    console.log("handle email sent ");
  };
  
  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  useEffect(() => {
   
    getMembers();

    const userData = getFromLocalStorage<SignInUser>(localStorageKeys.USERDATA, localStorageDataType.OBJECT);
    if (userData) {
      setUserData(userData);
    }
    const brandId = searchParams.get(queryPararms.BRANDID) || "";
    setBrandId(brandId);

    if (userData) {
      const foundBrand = userData.associatedBrands.find(
        (value) => value.id === brandId
      );

      if (foundBrand) {
        const companyData: Company = {
          type: foundBrand.companyType,
          name: foundBrand.name,
          gstNumber: foundBrand.gstNumber,
          address: foundBrand.address,
        };
        setCompany(companyData);
      } else {
        console.log("No matching brand found");
      }
    }
  }, [searchParams, router]);

  if (!brandId) {
    return <BanterLoader/>;
  }


  const openSuccessInviteModal = () => {
    setIsSuccessInviteModalVisible(true);
  };

  const closeSuccessInviteModal = () => {
    // window.location.reload();
    setIsSuccessInviteModalVisible(false);
  };

  
  const openModal = (brandId: string, email: string) => {
    setSelectedMember({ email, brandId });
    setIsModalOpen(true);
  };

  const handleConfirmRemove = () => {
    startDotSpinnerLoading
    if (selectedMember) {
      startDotSpinnerLoading()
      const removed = handleRemoveMember(selectedMember.brandId, selectedMember.email);
      if(removed == responseStatus.SUCCESS){
        setTimeout(() => {
        getMembers();
        }, 4000);
      }
    }

    setIsModalOpen(false);
  };
  const destroyDotSpinnerState = (brandId: string, email: string)=> {
    setSelectedMember({ email, brandId });
  }

  return (
    <div className="p-6 font-workSans flex">
      <div className="flex-1 mr-2">
        <div className="p-6 bg-white rounded-2xl flex-1">
          <h3 className="text-xl font-semibold text-neutral-2 mb-6">
            My Profile Details
          </h3>
          {userData?.email &&  <div className="mb-4">
           
            <h6 className="text-sm text-neutral-4 font-medium mb-1">
              Full Name
            </h6>
            <p className="text-neutral-2">
              {userData.fullName ? userData.fullName : getNameFromEmail(userData.email)}
            </p>
          </div>}
          <div className="mb-4">
            <h6 className="text-sm text-neutral-4 font-medium mb-1">Email</h6>
            <p className="text-neutral-2">{userData.email}</p>
          </div>
         {userData?.mobileNumber &&  <div className="">
            <h6 className="text-sm text-neutral-4 font-medium mb-1">
              Mobile Number
            </h6>
            <p className="text-neutral-2">{userData.mobileNumber}</p>
          </div>}
        </div>

        <div className="p-6 bg-white rounded-2xl flex-1 mt-5">
          <h3 className="text-xl font-semibold text-neutral-2 mb-6">
            Company Details
          </h3>
          {company.type && (
            <div className="mb-4">
              <h6 className="text-sm text-neutral-4 font-medium mb-1">
                Company Type
              </h6>
              <p className="text-neutral-2">{company.type}</p>
            </div>
          )}
          {company.name && (
            <div className="mb-4">
              <h6 className="text-sm text-neutral-4 font-medium mb-1">
                Company Name
              </h6>
              <p className="text-neutral-2">{company.name}</p>
            </div>
          )}

          {company.gstNumber && (
            <div className="mb-4">
              <h6 className="text-sm text-neutral-4 font-medium mb-1">
                GST Number
              </h6>
              <p className="text-neutral-2">{company.gstNumber}</p>
            </div>
          )}

          {company.address[0]?.value && (
            <div className="">
              <h6 className="text-sm text-neutral-4 font-medium mb-1">
                Address
              </h6>
              <p className="text-neutral-2 max-w-[336px]">
                {company.address[0]?.value}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 ml-2">
        <div className="p-6 bg-white rounded-2xl flex-1">
         <div className="flex justify-between items-start">
         <h3 className="text-xl font-semibold text-neutral-2 mb-6">
            Members with dashboard access {`(${storeMember.length})`}
          </h3>
          <p>{isDotSpinnerLoading && <DotSpinner color="#2e3238"/>}</p>
         </div>
          <div className="max-h-[400px] overflow-y-auto">
            {storeMember.map((member, index) => (
              <div key={index} className="mb-4">
                <h6 className="text-sm text-neutral-4 font-medium mb-1">
                  Member {index + 1}
                </h6>
                <div className="text-neutral-2 flex items-center justify-between">
                  <p>{member.email}</p>
                  <button
                    className="px-2 py-1 bg-neutral-9.5 rounded-md text-sm flex"
                    onClick={() =>
                      // handleRemoveMember(member.brandIds[0], member.email)
                      openModal(member.brandIds[0], member.email)
                    }
                  >
                    Remove
                    {/* {selectedMember?.email == member.email ? <DotSpinner color="#2e3238"/> : ""} */}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {selectedMember && (
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={() => {setIsModalOpen(false); destroyDotSpinnerState("","")}}
          onConfirm={handleConfirmRemove}
          memberEmail={selectedMember.email}
        />
      )}
          <div className="">
            <button
              onClick={show}
              className="py-2.5 px-2 rounded-lg border-[1px] border-primary-5 text-sm text-primary-5 flex items-center w-[137px] justify-between cursor-pointer"
            >
              {SVGaddMember.active} Add member
            </button>

            <Rodal
              visible={visible}
              onClose={hide}
              customStyles={{ borderRadius: 16, height: "fit-content" }}
              width={502}
            >
              <div className="">
                <ShareDashboard handleCloseRodal={hide} membersProps={members}  handleEmailSent={handleEmailSent}/>
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
      </div>
    </div>
  );
};

export default User;
