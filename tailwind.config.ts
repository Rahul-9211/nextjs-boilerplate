import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        workSans: ["Work Sans"],
        // sourceSerif: "Source Serif 4"
      },
      colors: {
        "primary-1": "#0F1324",
        "primary-2": "#1F2547",
        "primary-3": "#2E386B",
        "primary-4": "#3D4B8F",
        "primary-5": "#4D5EB2",
        "primary-6": "#707EC2",
        "primary-7": "#949ED1",
        "primary-8": "#B8BEE0",
        "primary-9": "#DBDFF0",
        "primary-9.5": "#EDEFF7",
        "primary-9.8": "#F8F9FC",
        "primary-9.8-2": "#F8F9FC",

        "decorative-1": "#160E25",
        "decorative-2": "#2B1C4A",
        "decorative-3": "#412A6F",
        "decorative-4": "#573894",
        "decorative-5": "#6C46B9",
        "decorative-6": "#8A6BC7",
        "decorative-7": "#A790D5",
        "decorative-8": "#C4B5E3",
        "decorative-9": "#E2DAF1",
        "decorative-9.5": "#F0EDF8",
        "decorative-9.8": "#F9F8FC",

        "neutral-1": "#17191C",
        "neutral-2": "#2E3238",
        "neutral-2-2": "#454A54",
        "neutral-3": "#454A54",
        "neutral-4": "#5C6370",
        "neutral-5": "#737C8C",
        "neutral-6": "#8F96A3",
        "neutral-6-6": "#999",
        "neutral-7": "#ABB0BA",
        "neutral-8": "#C7CBD1",
        "neutral-9": "#E3E5E8",
        "neutral-9.5": "#F1F2F4",
        "neutral-9.8": "#F9FAFA",

        "error-1": "#310502",
        "error-2": "#620A04",
        "error-3": "#940F05",
        "error-4": "#C51407",
        "error-5": "#F61909",
        "error-6": "#F8473A",
        "error-7": "#FA756B",
        "error-8": "#FBA39D",
        "error-9": "#FDD1CE",
        "error-9.5": "#FEE8E6",
        "error-9.8": "#FFF6F5",

        "warning-1": "#332400",
        "warning-2": "#654701",
        "warning-3": "#986B01",
        "warning-4": "#CB8E01",
        "warning-5": "#FEB201",
        "warning-6": "#FEC134",
        "warning-7": "#FED167",
        "warning-8": "#FEE09A",
        "warning-9": "#FFF0CC",
        "warning-9.5": "#FFF7E6",
        "warning-9.8": "#FFFCF5",

        "success-1": "#092A19",
        "success-2": "#115533",
        "success-3": "#1A7F4C",
        "success-4": "#23A966",
        "success-5": "#2BD47F",
        "success-6": "#56DC99",
        "success-7": "#80E5B2",
        "success-8": "#AAEECC",
        "success-9": "#D5F6E5",
        "success-9.5": "#EAFBF2",
        "success-9.8": "#F7FDFA",

        //accent colors
        "orange-1": "#2B1108",
        "orange-2": "#57220F",
        "orange-3": "#823417",
        "orange-4": "#AD451F",
        "orange-5": "#D95626",
        "orange-6": "#E07852",
        "orange-7": "#E89A7D",
        "orange-8": "#F0BBA8",
        "orange-9": "#F7DDD4",
        "orange-9.5": "#FBEEE9",
        "orange-9.8": "#FDF8F6",

        "sap-green-1": "#1A2112",
        "sap-green-2": "#334224",
        "sap-green-3": "#4D6336",
        "sap-green-4": "#668547",
        "sap-green-5": "#80A659",
        "sap-green-6": "#99B87A",
        "sap-green-7": "#B2C99C",
        "sap-green-8": "#CCDBBD",
        "sap-green-9": "#E5EDDE",
        "sap-green-9.5": "#F2F6EE",
        "sap-green-9.8": "#FAFBF8",

        // Example secondary color


        
      },
      boxShadow: {
        "card-shadow":
          "0px 12px 16px -4px rgba(77, 94, 178, 0.08), 0px 4px 6px -2px rgba(77, 94, 178, 0.04)",
      },
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
    },
  },
  plugins: [],
};
export default config;
