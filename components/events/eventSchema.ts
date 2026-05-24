import * as Yup from "yup";

export const eventSchema = Yup.object({
  city: Yup.string().required("Required"),
  cityMarathi: Yup.string().required("Required"),
  venue: Yup.string().required("Required"),
  venueMarathi: Yup.string().required("Required"),
  date: Yup.string().required("Required"),
  time: Yup.string().required("Required"),
  district: Yup.string().required("Required"),
  attendingSeminar: Yup.string().required("Required"),
});
