import axios from "axios";
import { GetUserType, UserInfoType } from "./types";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5555/users",
  headers: {
    ContentType: "aplication/json",
  },
});

export const getUsers = async (): Promise<GetUserType[]> => {
  try {
    const response = await axiosInstance.get("/");

    return response.data.data;
  } catch (error) {
    console.error("Error getting data:", error);
    throw new Error("Could perform an action");
  }
};

export const saveUser = async (
  userData: UserInfoType
): Promise<{ price: string }> => {
  const {
    firstName,
    lastName,
    birthDate,
    email,
    phoneNumber,
    businessActivityFamily,
    insuranceDate,
  } = userData;

  try {
    const response = await axiosInstance.post("/", {
      firstName,
      lastName,
      birthDate,
      email,
      phoneNumber,
      businessActivityFamily,
      insuranceDate,
    });
    return response.data;
  } catch (error) {
    console.error("Error saving data:", error);
    throw new Error("Could perform an action");
  }
};
