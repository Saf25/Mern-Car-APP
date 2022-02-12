import * as yup from "yup";

export const userschema = yup
  .object({
    name: yup.string().required(),
    userName: yup.string().min(3).required(),
    email: yup.string().email().required(),
    password: yup.string().min(10).required(),
  })
  .required();
