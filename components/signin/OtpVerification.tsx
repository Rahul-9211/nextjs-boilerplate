"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { sendOTP } from "@/utils/api";
import { headers } from "next/headers";
import { useRouter, useSearchParams } from "next/navigation";
import { SignInBrand, SignInUser, SignInUserData } from "@/utils/types";
import { getFromLocalStorage } from "@/utils/functions/function";
import { localStorageDataType, localStorageKeys, queryPararms } from "@/utils/types";
import BtnLoader from "../Loader/BtnLoader/BtnLoader";

const OtpVerification: React.FC<{ emailSent: string , onBackBtnClick : any }> = ({ emailSent , onBackBtnClick }) => {
  const router = useRouter();

  const [wrongOtp, setwrongOtp] = useState<boolean>(false);
  const [counter, setcounter] = useState<number>(30);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [resendTimer, setResendTimer] = useState<number>(30);
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(false);
  const [userEmail, setuserEmail] = useState<string>("");
  const [associatedBrands, setassociatedBrands] = useState<SignInBrand[]>([]);
  const searchParams = useSearchParams();
  const [btnLoader, setBtnLoader] = useState<boolean>(false);

  useEffect(() => {
    if (searchParams.get("pin")) {
      const urlOtp = searchParams.get(queryPararms.PIN)?.split("") || [];
      // console.log("🚀 ~ useEffect ~ urlOtp:", urlOtp);
      setOtpValues(urlOtp);
      // setuserEmail(searchParams.get("otp") as string[]);
    }
    const userEmail = getFromLocalStorage<string>(localStorageKeys.USEREMAIL, localStorageDataType.STRING) || "";
    setuserEmail(userEmail);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otp = inputRefs.current.map((input) => input?.value).join("");
    // console.log("Entered OTP:", otp);

    try {
      setBtnLoader(true)
      const data = await sendOTP({ otp, userEmail });
      setassociatedBrands(data?.data?.userData?.associatedBrands);

      
      if (data) {
        const brandID = data?.data?.userData?.associatedBrands[0]?.id;
        router.push(`/admin/orders?brandId=${brandID}`);
      } else {
        setBtnLoader(false)
        setwrongOtp(true);
        clearOtpInputs();
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setBtnLoader(false)
      setwrongOtp(true);
      clearOtpInputs();
    }
  };

  const clearOtpInputs = () => {
    setOtpValues(Array(6).fill(""));
    inputRefs.current.forEach((input) => {
      if (input) {
        input.value = "";
      }
    });
  };

  useEffect(() => {
    const form = formRef.current;
    const inputs = inputRefs.current;
    const submit = form?.querySelector(
      "button[type=submit]"
    ) as HTMLButtonElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        !/^[0-9]{1}$/.test(e.key) &&
        e.key !== "Backspace" &&
        e.key !== "Delete" &&
        e.key !== "Tab" &&
        !e.metaKey
      ) {
        e.preventDefault();
      }

      if (e.key === "Delete" || e.key === "Backspace") {
        const index = inputs.indexOf(e.target as HTMLInputElement);
        const newOtpValues = [...otpValues];

        if (index > 0 && !inputs[index]?.value) {
          newOtpValues[index - 1] = "";
          setOtpValues(newOtpValues);
          inputs[index - 1]!.focus();
        } else {
          newOtpValues[index] = "";
          setOtpValues(newOtpValues);
        }
      }
      if (e.key === "Enter") {
        handleFormSubmit(e as unknown as React.FormEvent);
      }
    };

    const handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const index = inputs.indexOf(target);
      const newOtpValues = [...otpValues];
      newOtpValues[index] = target.value;
      setOtpValues(newOtpValues);
      setwrongOtp(false); // Reset error state when any input value changes
      if (target.value) {
        if (index < inputs.length - 1) {
          inputs[index + 1]!.focus();
        } else {
          submit.focus();
        }
      }
    };

    const handleFocus = (e: FocusEvent) => {
      (e.target as HTMLInputElement).select();
    };

    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      const text = e.clipboardData!.getData("text");
      if (!new RegExp(`^[0-9]{${inputRefs.current.length}}$`).test(text)) {
        return;
      }
      const digits = text.split("");
      digits.forEach((digit, index) => {
        inputRefs.current[index]!.value = digit;
        otpValues[index] = digit;
      });
      setOtpValues([...otpValues]);
    };
  

    inputs.forEach((input) => {
      input?.addEventListener("input", handleInput);
      input?.addEventListener("keydown", handleKeyDown);
      input?.addEventListener("focus", handleFocus);
      input?.addEventListener("paste", handlePaste);
    });

    return () => {
      inputs.forEach((input) => {
        input?.removeEventListener("input", handleInput);
        input?.removeEventListener("keydown", handleKeyDown);
        input?.removeEventListener("focus", handleFocus);
        input?.removeEventListener("paste", handlePaste);
      });
    };
  }, [otpValues]);

  // Countdown timer effect for resend button
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0 && isResendDisabled) {
      interval = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (resendTimer === 0 && isResendDisabled) {
      setIsResendDisabled(false);
      setResendTimer(30); // Reset timer
    }

    return () => clearInterval(interval);
  }, [resendTimer, isResendDisabled]);

  return (
    <main className="relative min-h-screen justify-center bg-slate-50 overflow-hidden w-[360px] font-workSans">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex justify-center">
          <div className="max-w-md mx-auto text-left bg-white px-4 sm:px-6 py-6 rounded-xl shadow">
            <h3 className="font-semibold text-xl text-neutral-2 text-left">
              Verify Account
            </h3>

            <p className="mt-8 text-sm text-neutral-5 font-normal">
              We sent a verification OTP to{" "}
              <span className="font-medium">{emailSent}</span> <br />
              <a href="#" className="underline">
                Not you?
              </a>{" "}
            </p>
            <form
              id="otp-form"
              ref={formRef}
              className="mt-4"
              onSubmit={handleFormSubmit}
            >
              <label
                htmlFor="otp"
                className="block text-sm font-medium leading-6 text-neutral-4 text-[14px]"
              >
                Enter OTP*
              </label>
              <div className="flex items-center justify-between gap-2 mt-2">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    className={`w-11 h-11 text-center text-md font-normal hover:border-slate-200 appearance-none rounded-lg p-4 outline-none focus:bg-white ${
                      wrongOtp
                        ? "border-1 border border-error-4 focus:border-error-4"
                        : "border-1 border border-neutral-9 focus:border-primary-5"
                    }`}
                    maxLength={1}
                    onChange={(e) => {
                      const newOtpValues = [...otpValues];
                      newOtpValues[index] = e.target.value;
                      setOtpValues(newOtpValues);
                      setwrongOtp(false);
                    }}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    value={otpValues[index]}
                  />
                ))}
              </div>
              <div className="mt-2 font-normal text-sm text-error-4">
                {wrongOtp ? "Invalid OTP. Please try again" : ""}
              </div>

              <div className="text-sm text-neutral-6 mt-4">
                <span className="font-medium">Resend</span> in
                <a href="#" className="">
                  {" "}
                  {resendTimer}s
                </a>{" "}
                {isResendDisabled && (
                  <a
                    className="font-medium text-primary-5 hover:text-primary-5 underline"
                    href="#0"
                  >
                    Resend
                  </a>
                )}
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  className={`flex w-full justify-center rounded-md bg-primary-5 hover:bg-primary-4 px-6 py-3 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                 
                  {btnLoader ? <BtnLoader /> : 'Verify & Sign in'}
                </button>
              </div>
              <div className="mt-8 text-neutral-5 text-sm flex items-center cursor-pointer" onClick={onBackBtnClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M6.66666 14.436L0.230774 8.00009L6.66666 1.56421L7.61279 2.51034L2.12306 8.00009L7.61279 13.4898L6.66666 14.436Z"
                    fill="#797E86"
                  />
                </svg>
                Back
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OtpVerification;
