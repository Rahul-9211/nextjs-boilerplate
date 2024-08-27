"use client";
import { SVGcloseModal, SVGsucess } from "@/utils/images/svg";
import React, { useEffect, useRef, useState } from "react";
import MultiEmailInput, {
  MultiEmailInputRef,
} from "@/components/Input/MultiEmailInput"; // Adjust the import path as needed
import SelectBrands from "../SelectBrands/SelectBrands";
import {
  APImemberList,
  Member,
  ShareDashboardProps,
  SignInBrand,
  SignInUser,
  Tokens,
} from "@/utils/types";
import {
  getFromLocalStorage,
  handleRemoveMember,
} from "@/utils/functions/function";
import { addMember, getMemberList } from "@/utils/api";
import { useSearchParams } from "next/navigation";
import { defaultMembers, responseStatus } from "@/utils/constant";
import {
  localStorageDataType,
  localStorageKeys,
  queryPararms,
} from "@/utils/types";
import DotSpinner from "../Loader/DotSpinner/DotSpinner";
import Swal from "sweetalert2";
import InvitationSentModal from "@/utils/Rodal/InvitationSentModal";
import ConfirmModal from "../Modal/ConfirmModal";
import useDotSpinner from "@/utils/hooks/useDotSpinner";
import { useMemberStore } from "@/utils/store/zustang";

const ShareDashboard: React.FC<ShareDashboardProps> = ({
  handleCloseRodal,
  membersProps,
  handleEmailSent,
}) => {
  const storeMember = useMemberStore((state) => state.member)

  const [members, setMembers] = useState<Member[]>(
    membersProps || defaultMembers
  );
  const searchParams = useSearchParams();
  const emailInputRef = useRef<MultiEmailInputRef>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [associatedMembers, setAssociatedMembers] = useState<SignInBrand[]>([]);
  const [disableSendInvite, setDisableInvite] = useState<boolean>(false);
 
  const [isEmailSent, setisEmailSent] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<{ email: string; brandId: string } | null>(null);
  const { isDotSpinnerLoading, startDotSpinnerLoading, stopDotSpinnerLoading } = useDotSpinner();
  const updateStoreMember = useMemberStore((state) => state.ZupdateMember);



  const handleBrandsChange = (selected: string[]) => {
    setSelectedBrands(selected);
  };

  const handleSave = () => {
    if (emailInputRef.current) {
      const validEmails = emailInputRef.current.getValidEmails();
      handleEmailsSubmit(validEmails);
    }
  };
  const fetchMembers = async () => {
    const tokens = getFromLocalStorage<Tokens>(
      localStorageKeys.TOKENS,
      localStorageDataType.OBJECT
    );
    // console.log("fetch members" , membersProps);
    if (tokens && tokens.accessToken) {
      const brandId = searchParams.get(queryPararms.BRANDID) || "";
      if (brandId) {
        try {
          const brandList = await getMemberList(tokens.accessToken);
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
            updateStoreMember(tempArr)
          setMembers(tempArr);
        } catch (error) {
          console.error("Error fetching member list:", error);
        }
      }
    }
  };
  useEffect(() => {
    const userData = getFromLocalStorage<SignInUser>(
      localStorageKeys.USERDATA,
      localStorageDataType.OBJECT
    );
    if (userData && userData.associatedBrands) {
      setAssociatedMembers(userData.associatedBrands);
    }

    if (!membersProps || membersProps.length === 0) {
      const tokens = getFromLocalStorage<Tokens>(
        localStorageKeys.TOKENS,
        localStorageDataType.OBJECT
      );
      const fetchMembers = async () => {
        // console.log("fetch members" , membersProps);
        if (tokens && tokens.accessToken) {
          const brandId = searchParams.get(queryPararms.BRANDID) || "";
          if (brandId) {
            try {
              const brandList = await getMemberList(tokens.accessToken);
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
              setMembers(tempArr);
            } catch (error) {
              console.error("Error fetching member list:", error);
            }
          }
        }
      };

      fetchMembers();
    }
  }, [membersProps, searchParams , storeMember]);


  const handleEmailsSubmit = async (emails: string[]) => {
    const tokens = getFromLocalStorage<Tokens>(
      localStorageKeys.TOKENS,
      localStorageDataType.OBJECT
    );

    if (emails.length > 0 && tokens && tokens.accessToken) {
      setDisableInvite(true);
      const addMemberData = async (email: string, brandId: string) => {
        try {
          const data = await addMember(tokens.accessToken, email, brandId);
          if (data.status == "success") {
            setisEmailSent(true);
          } else {
            return brandId;
          }
        } catch (error) {
          return brandId;
        }
        return null;
      };

      let notSentEmailList: string[] = [];
      for (let i = 0; i < emails.length; i++) {
        for (let j = 0; j < selectedBrands.length; j++) {
          const failedBrandId = await addMemberData(
            emails[i],
            selectedBrands[j]
          );
          if (failedBrandId) {
            notSentEmailList.push(failedBrandId);
          }
        }
      }
      console.log("🚀 ~ handleEmailsSubmit ~ notSentEmailList:", notSentEmailList)
      if (isEmailSent) {
        setDisableInvite(false);
        if (emailInputRef.current) {
          emailInputRef.current.resetEmails();
        }
        fetchMembers()
        handleEmailSent();

      }

    }
  };


  const closeRodal = () => {
    // handleEmailSent();
    handleCloseRodal()
  };

  const openRemoveConfirmModal = (brandId: string, email: string) => {
    setSelectedMember({ email, brandId });
    setIsModalOpen(true);
  };
  const destroyDotSpinnerState = (brandId: string, email: string)=> {
    setSelectedMember({ email, brandId });
  }

  const handleConfirmRemove = () => {

    if (selectedMember) {
      startDotSpinnerLoading()
      const removed = handleRemoveMember(selectedMember.brandId, selectedMember.email);
      if(removed == responseStatus.SUCCESS){
        setTimeout(() => {
          stopDotSpinnerLoading()
        fetchMembers();
        }, 3000);
      }
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-2">
      <div className="flex items-center justify-between mb-6">
        <p className="text-neutral-2 text-xl font-semibold">Share Dashboard</p>
        <button onClick={closeRodal}>{SVGcloseModal.active}</button>
      </div>
      <MultiEmailInput
        ref={emailInputRef}
        onEmailsSubmit={handleEmailsSubmit}
        disableStatus={disableSendInvite}
      />
      <div className="">
        <SelectBrands
          brands={associatedMembers}
          onChange={handleBrandsChange}
        />
      </div>
      <button
        disabled={disableSendInvite}
        onClick={handleSave}
        className="mt-6 mb-8 px-6 py-3 bg-primary-5 text-md text-primary-9.8 font-semibold rounded-lg flex"
      >
        Send Invite {disableSendInvite && <DotSpinner />}
      </button>
      <h3 className="text-xl font-semibold text-neutral-2 mb-6">
        Members with Access {`(${storeMember.length})`}
      </h3>

      <div className="max-h-[200px] overflow-y-auto">
        {storeMember.map((member, index) => (
          <div key={index} className="mb-4">
            <h6 className="text-sm text-neutral-4 font-medium mb-1">
              Member {index + 1}
            </h6>
            <div className="text-neutral-2 flex items-center justify-between">
              <p>{member.email}</p>
              <button
                className="px-2 py-1 bg-neutral-9.5 rounded-md text-sm flex"
                onClick={() => {
                  // handleRemoveClick(member.brandIds[0], member.email);
                  openRemoveConfirmModal(member.brandIds[0], member.email)
                  // handleRemoveMember(member.brandIds[0], member.email);
                }}
              >
                Remove 
                {selectedMember?.email == member.email ? <DotSpinner color="#2e3238"/> : ""}
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedMember && (
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={() => {setIsModalOpen(false) ; destroyDotSpinnerState("","")}}
          onConfirm={handleConfirmRemove}
          memberEmail={selectedMember.email}
        />
      )}
    </div>
  );
};

export default ShareDashboard;
