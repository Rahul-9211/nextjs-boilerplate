"use client";
import LoginNavbar from "@/components/Navbar/LoginNavbar";
import logo from "../../public/logo.png";
import logo2 from "../../public/logo.png"; // Assuming you have another logo
import logo3 from "../../public/logo.png"; // Assuming you have another logo
import Image from "next/image";
import { ImageProps, Tokens } from "@/utils/types";
import React, { HtmlHTMLAttributes, useMemo, useState, useEffect } from "react";
import OtpVerification from "@/components/signin/OtpVerification";
import EmailForm from "@/components/signin/EmailForm";
import { AdminColors } from "@/utils/css";
import {
  SVGdeliverySimplified,
  SVGorderManagment,
  SVGqualityAssurance,
} from "@/utils/images/svg";
import { getFromLocalStorage, redirectToLoginHome } from "@/utils/functions/function";
import { verifyEmail, verifyTokenStatus } from "@/utils/api";
import useAuth from "@/utils/hooks/useAuth";
import { useRouter } from "next/navigation";
import { localStorageDataType, localStorageKeys } from "@/utils/types";

interface KeySkillsProps {
  image: ImageProps;
  heading: string;
  svgImg: React.ReactNode;
  subHeading: string;
  backgroundColor: string;
}

const images: ImageProps[] = [
  {
    src: logo,
    alt: "Logo",
    width: 80,
    height: 80,
  },
  {
    src: logo2,
    alt: "Logo 2",
    width: 80,
    height: 80,
  },
  {
    src: logo3,
    alt: "Logo 3",
    width: 80,
    height: 80,
  },
];

const keySkillsData = [
  {
    heading: "Order Management",
    subHeading:
      "Real-time order monitoring for full transparency and traceability",
    backgroundColor: AdminColors.order,
    svg: SVGorderManagment.active,
  },
  {
    heading: "QUALITY ASSURANCE",
    subHeading: "Multi-step checks for quality assurance of your products",
    backgroundColor: AdminColors.quality,
    svg: SVGqualityAssurance.active,
  },
  {
    heading: "DELIVERY SIMPLIFIED",
    subHeading:
      "Shipping, tracking & follow-up all handled by us on your fingertips",
    backgroundColor: AdminColors.delivery,
    svg: SVGdeliverySimplified.active,
  },
];

const Login: React.FC = () => {
  // useAuth()
  const [showOtpVerification, setShowOtpVerification] =
    useState<boolean>(false);

  const handleEmailSubmit = () => {
    setShowOtpVerification(true);
  };
  const handleBackClick = () => {
    setShowOtpVerification(false);
  };

  const memoLoginNavbar = useMemo(() => <LoginNavbar />, []);

  const StaticPart = useMemo(() => {
    return (
      <div className="">
        <div className="mb-8">
          <h3 className="font-sourceSerif text-2xl font-semibold text-neutral-2-2">
            Simplify Your Order Management.
          </h3>
          <h3 className="font-sourceSerif text-2xl font-semibold text-neutral-6-6 ">
            Get Started with Our Buyer Dashboard.
          </h3>
        </div>
        <div className="mt-4">
          {keySkillsData.map((skill, index) => (
            <KeySkills
              key={index}
              svgImg={skill.svg}
              image={images[index]}
              heading={skill.heading}
              subHeading={skill.subHeading}
              backgroundColor={skill.backgroundColor}
            />
          ))}
        </div>
      </div>
    );
  }, []);
  const router = useRouter();
  const [brandId, setBrandId] = useState<string>("");

  useEffect(() => {
    const verifyUser = async (accessToken : string) => {
      try {
        const check = await verifyTokenStatus(accessToken);
        return check;
      } catch (error) {
        console.error("Error verifying user:", error);
        return false;
      }
    };

    const init = async () => {
      const tokens = getFromLocalStorage<Tokens>(localStorageKeys.TOKENS, localStorageDataType.OBJECT);
      if (tokens && tokens?.accessToken) {
        const verifiedUser = await verifyUser(tokens.accessToken);
        if (verifiedUser) {
          const initialBrandId = redirectToLoginHome();
          // console.log("🚀 ~ init ~ initialBrandId:", initialBrandId)
          if (initialBrandId != null) {
            router.push(`/admin/orders?brandId=${initialBrandId}`);
            setBrandId(initialBrandId);
          }
        } else {
          // Handle the case where the user is not verified
          // Maybe redirect to login page
          // router.push("/login");
        }
      }
    };

    init();
  }, []);

  return (
    <div className="">
      {memoLoginNavbar}
      <section className="bg-primary-9.8-2 h-[100vh]">
        <div className="gap-x-14 max-w-screen-xl mx-auto px-4 md:flex md:px-28 md:pt-16 md:justify-between items-start">
          {StaticPart}
          {showOtpVerification ? (
            <div>
              <OtpVerification emailSent="" onBackBtnClick={handleBackClick}/>
            </div>
          ) : (
            <div>
              <EmailForm onEmailSubmit={handleEmailSubmit} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const KeySkills: React.FC<KeySkillsProps> = ({
  image,
  svgImg,
  heading,
  subHeading,
  backgroundColor,
}) => {
  // console.log("i called keyskill");
  return (
    <div className="p-[18px] bg-[#FFF] rounded-md flex max-w-[474px] mt-4">
      <div className="pr-[18px]">
        <div
          className={`w-[80px] h-[80px] ${backgroundColor} rounded-lg flex justify-center items-center`}
        >
          {/* <Image src={image.src} alt={image.alt} width={image.width} height={image.height} /> */}
          {svgImg}
        </div>
      </div>
      <div className="font-workSans">
        <h4 className="text-neutral-2 pb-2 font-semibold uppercase">
          {heading}
        </h4>
        <p className="text-neutral-4 font-normal">{subHeading}</p>
      </div>
    </div>
  );
};

export default Login;
