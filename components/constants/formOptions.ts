import { TranslationKeys } from "./translations";

type TranslateFunction = (key: TranslationKeys) => string;

export const getTargetStreamOptions = (t: TranslateFunction) => [
  {
    label: t("stream.engineering"),
    value: "Engineering",
  },
  {
    label: t("stream.medical"),
    value: "Medical",
  },
  {
    label: t("stream.pharmacy"),
    value: "Pharmacy",
  },
  {
    label: t("stream.management"),
    value: "Management",
  },
  {
    label: t("stream.law"),
    value: "Law",
  },
  {
    label: t("stream.arts"),
    value: "Arts",
  },
];

export const getReferenceOptions = (t: TranslateFunction) => [
  {
    label: t("reference.pudhari"),
    value: "Daily Pudhari",
  },
  {
    label: t("reference.instagram"),
    value: "Instagram",
  },
  {
    label: t("reference.facebook"),
    value: "Facebook",
  },
  {
    label: t("reference.youtube"),
    value: "YouTube",
  },
  {
    label: t("reference.whatsapp"),
    value: "WhatsApp",
  },
  {
    label: t("reference.friend"),
    value: "Friend",
  },
];

export const getDistrictOptions = (t: TranslateFunction) => [
  {
    label: t("district.pune"),
    value: "Pune",
  },
  {
    label: t("district.mumbai"),
    value: "Mumbai",
  },
  {
    label: t("district.kolhapur"),
    value: "Kolhapur",
  },
  {
    label: t("district.satara"),
    value: "Satara",
  },
  {
    label: t("district.sangli"),
    value: "Sangli",
  },
  {
    label: t("district.solapur"),
    value: "Solapur",
  },
];

export const getSeminarOptions = (t: TranslateFunction) => [
  {
    label: t("form.yes"),
    value: "yes",
  },
  {
    label: t("form.no"),
    value: "no",
  },
];
