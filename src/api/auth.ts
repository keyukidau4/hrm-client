import axios, { AxiosError } from "axios";
import { UserLoginInformation } from "../types/auth";

const serverPath =
  process.env.REACT_APP_HTTP_SERVER ||
  "https://hrm-server-gamma.vercel.app/api";

//Login Api Call
export const login = async (formData: UserLoginInformation) => {
  try {
    if (!serverPath || serverPath.length < 1) {
      return {
        code: 400,
        message: "Error To Access With Server!",
      };
    }

    const resultApi = await axios.post(
      `${serverPath}/users/auth/login`,
      formData,
      {
        withCredentials: true,
      }
    );

    return {
      code: resultApi.status,
      message: resultApi.statusText,
      data: resultApi.data,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log({ error });
      return {
        code: error.code,
        message: error.message,
      };
    } else {
      return {
        code: 500,
        message: "Unknown Error",
      };
    }
  }
};

//
export const logout = async () => {
  try {
    if (!serverPath || serverPath.length < 1) {
      return {
        code: 400,
        message: "Error To Access With Server!",
      };
    }

    const resultApi = await axios.post(
      `${serverPath}/users/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );

    return {
      code: resultApi.status,
      message: resultApi.statusText,
      data: resultApi.data,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log({ error });
      return {
        code: error.code,
        message: error.message,
      };
    } else {
      return {
        code: 500,
        message: "Unknown Error",
      };
    }
  }
};

export const getuserInformation = async () => {
  try {
    if (!serverPath || serverPath.length < 1) {
      return {
        code: 400,
        message: "Error To Access With Server!",
      };
    }

    const resultApi = await axios.get(`${serverPath}/users/information`, {
      withCredentials: true,
    });

    return {
      code: resultApi.status,
      message: resultApi.statusText,
      data: resultApi.data,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log({ error });
      return {
        code: error.code,
        message: error.message,
      };
    } else {
      return {
        code: 500,
        message: "Unknown Error",
      };
    }
  }
};
