// import { TranslationKeys } from "./translations";

type TranslateFunction = (key: string) => string;

export const getTargetStreamOptions = (t: TranslateFunction) => [
  { label: t("stream.11th"), value: "11th-12th" },
  { label: t("stream.engineering"), value: "Engineering" },
  { label: t("stream.medical"), value: "Medical" },
  { label: t("stream.pharmacy"), value: "Pharmacy" },
  { label: t("stream.management"), value: "Management" },
  { label: t("stream.law"), value: "Law" },
  { label: t("stream.arts"), value: "Arts/Science" },
  { label: t("stream.other"), value: "Other" },
];

export const getReferenceOptions = (t: TranslateFunction) => [
  { label: t("reference.pudhari"), value: "Daily Pudhari Newspaper" },
  { label: t("reference.pudharichan"), value: "Daily Pudhari News Channel" },
  {
    label: t("reference.SocialMedia"),
    value: "Social Media - Facebook/Instagram/Whatsapp",
  },
  { label: t("reference.college"), value: "College or University" },
  { label: t("reference.website"), value: "Website or Google Search" },
  { label: t("reference.friend"), value: "Friend or Relative" },
  { label: t("stream.other"), value: "Other" },
];

export const getDistrictOptions = (t: TranslateFunction) => [
  { label: t("district.ahmednagar"), value: "Ahmednagar" },
  { label: t("district.akola"), value: "Akola" },
  { label: t("district.amravati"), value: "Amravati" },
  { label: t("district.beed"), value: "Beed" },
  { label: t("district.bhandara"), value: "Bhandara" },
  { label: t("district.buldhana"), value: "Buldhana" },
  { label: t("district.chandrapur"), value: "Chandrapur" },
  {
    label: t("district.chhatrapati_sambhaji_nagar"),
    value: "Chhatrapati Sambhaji Nagar",
  },
  { label: t("district.dhule"), value: "Dhule" },
  { label: t("district.gadchiroli"), value: "Gadchiroli" },
  { label: t("district.gondia"), value: "Gondia" },
  { label: t("district.hingoli"), value: "Hingoli" },
  { label: t("district.jalgaon"), value: "Jalgaon" },
  { label: t("district.jalna"), value: "Jalna" },
  { label: t("district.kolhapur"), value: "Kolhapur" },
  { label: t("district.latur"), value: "Latur" },
  { label: t("district.mumbai_city"), value: "Mumbai City" },
  { label: t("district.mumbai_suburban"), value: "Mumbai Suburban" },
  { label: t("district.nagpur"), value: "Nagpur" },
  { label: t("district.nanded"), value: "Nanded" },
  { label: t("district.nandurbar"), value: "Nandurbar" },
  { label: t("district.nashik"), value: "Nashik" },
  { label: t("district.osmanabad"), value: "Osmanabad" },
  { label: t("district.palghar"), value: "Palghar" },
  { label: t("district.parbhani"), value: "Parbhani" },
  { label: t("district.pune"), value: "Pune" },
  { label: t("district.raigad"), value: "Raigad" },
  { label: t("district.ratnagiri"), value: "Ratnagiri" },
  { label: t("district.sangli"), value: "Sangli" },
  { label: t("district.satara"), value: "Satara" },
  { label: t("district.sindhudurg"), value: "Sindhudurg" },
  { label: t("district.solapur"), value: "Solapur" },
  { label: t("district.thane"), value: "Thane" },
  { label: t("district.wardha"), value: "Wardha" },
  { label: t("district.washim"), value: "Washim" },
  { label: t("district.yavatmal"), value: "Yavatmal" },
];

export const getSeminarOptions = (t: TranslateFunction) => [
  {
    label: t("form.yes"),
    value: "Yes",
  },
  {
    label: t("form.no"),
    value: "No",
  },
];
