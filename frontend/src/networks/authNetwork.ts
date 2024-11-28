import {
  signup_API,
  login_API,
  forgot_password_API,
  reset_password_API,
} from "@/utils/constants";
import axios from "axios";

export async function signup(formdata: any) {
  try {
    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axios.post(signup_API, formdata, options);
    console.log(response);
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
export async function login(formdata: any) {
  try {
    const response = await axios.post(login_API, formdata);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export async function forgotPassword(formdata: any) {
  try {
    const response = await axios.post(forgot_password_API, formdata);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export async function resetPassword(formdata: any) {
  try {
    const response = await axios.post(
      `${reset_password_API}?token=${formdata.token}`,
      formdata
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
