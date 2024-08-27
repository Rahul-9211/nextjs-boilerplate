"use client";

import { verifyEmail } from "@/utils/api";
import { localStorageKeys, queryPararms } from "@/utils/types";
import { saveToLocalStorage } from "@/utils/functions/function";
import { emailRegex } from "@/utils/regex";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import BtnLoader from "../Loader/BtnLoader/BtnLoader";

interface EmailFormProps {
  onEmailSubmit: () => void;
}

const EmailForm: React.FC<EmailFormProps> = ({ onEmailSubmit }) => {
  const [emailError, setEmailError] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [userEmail, setUserEmail] = useState<string>('');
  const [btnLoader, setBtnLoader] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
    setEmailError(false);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBtnLoader(true);

    const formDataObject = Object.fromEntries(new FormData(e.currentTarget).entries()) as { email: string };
      console.log("🚀 ~ handleFormSubmit ~ formDataObject:", formDataObject)
      setFormData(formDataObject);
      const tempEmail = formDataObject.email;

      // debugger
      const res = emailRegex.test(tempEmail)
      console.log("🚀 ~ handleFormSubmit ~ formDataObject.email:", formDataObject.email , res)

    if (res) {
      console.log("inside")
      const data = await verifyEmail(formDataObject.email);

      if (typeof window !== 'undefined') {
        saveToLocalStorage(localStorageKeys.USEREMAIL, formDataObject.email);
      }

      setBtnLoader(false);
      if (data?.validEmail) {
        onEmailSubmit();
      } else {
        console.log("data?.validEmail")
        setEmailError(true);
      }
    } else {
      setBtnLoader(false);
      console.log("res is not their")
      setEmailError(true);
    }
  };

  useEffect(() => {
    const emailFromParams = searchParams.get(queryPararms.USEREMAIL);
    if (emailFromParams) {
      setUserEmail(emailFromParams);
    }
  }, [searchParams]);

  return (
    <div className="max-w-[360px] font-workSans bg-[#ffffff] rounded-2xl">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:p-6 w-[360px]">
        <h3 className="font-semibold text-xl text-neutral-2">Sign In</h3>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-neutral-4 text-[14px]">
                Email*
              </label>
              <div className="mt-2">
                <input
                  onChange={handleEmailChange}
                  id="email"
                  name="email"
                  value={userEmail}
                  type="email"
                  required
                  autoComplete="email"
                  className={`py-2 block w-full rounded-md border-1 pl-4 shadow-sm ring-1 focus:outline-none focus:ring-1 ${
                    emailError ? 'ring-error-4 focus:ring-error-4' : 'ring-neutral-9 focus:ring-primary-5'
                  } sm:text-sm sm:leading-6`}
                />
              </div>
              {emailError && <span className="mt-2 font-normal text-sm text-error-4 ring-error-4">Enter a valid Email</span>}
            </div>
            <div className="relative">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-primary-5 hover:bg-primary-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {btnLoader ? <BtnLoader /> : 'Get OTP'}
              </button>
            </div>
          </form>
          <p className="mt-2 text-sm text-neutral-5 font-normal">
            By <span className="font-medium">“Sign In”</span>, you agree to Lal10{"'"}s{" "}
            <a href="#" className="underline">
              Terms of Use
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Privacy Policy.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailForm;
