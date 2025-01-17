import axios, { AxiosError } from "axios";
import {
  FeedbackType,
  ReportRequireType,
  UpdateReportType,
} from "../types/reports";

const serverPath = process.env.REACT_APP_HTTP_SERVER;

//Login Api Call
export const addNewReport = async (reportData: ReportRequireType) => {
  try {
    if (!serverPath || serverPath.length < 1) {
      return {
        code: 400,
        message: "Error To Access With Server!",
      };
    }

    console.log({ reportData });

    const resultApi = await axios.post(
      `${serverPath}/reports/client/add`,
      reportData,
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

export const getListClientReport = async (status: string = "") => {
  try {
    if (!serverPath || serverPath.length < 1) {
      return {
        code: 400,
        message: "Error To Access With Server!",
      };
    }

    const resultApi = await axios.get(
      `${serverPath}/reports/client/list-report?status=` + status,
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

export const getReportById = async (id: string) => {
  try {
    if (!serverPath || serverPath.length < 1) {
      return {
        code: 400,
        message: "Error To Access With Server!",
      };
    }

    const resultApi = await axios.get(
      `${serverPath}/reports/client/single-report?id=` + id,
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

export const updateReport = async (reportData: UpdateReportType) => {
  try {
    if (!serverPath || serverPath.length < 1) {
      return {
        code: 400,
        message: "Error To Access With Server!",
      };
    }

    const resultApi = await axios.post(
      `${serverPath}/reports/client/update`,
      reportData,
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
export const getListClientReportByAdmin = async (
  status: string = "",
  yearMonth: string | null = null
) => {
  try {
    if (!serverPath || serverPath.length < 1) {
      return {
        code: 400,
        message: "Error To Access With Server!",
      };
    }

    let url = `${serverPath}/reports/admin/list-report?status=` + status;
    if (yearMonth) {
      url += `&yearMonth=${yearMonth}`;
    }

    const resultApi = await axios.get(url, {
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
        code: error.response?.data.code,
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

export const getListUserByAdmin = async () => {
  try {
    if (!serverPath || serverPath.length < 1) {
      return {
        code: 400,
        message: "Error To Access With Server!",
      };
    }

    let url = `${serverPath}/users/admin/users`;

    const resultApi = await axios.get(url, {
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
        code: error.response?.data.code,
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

//add feedback
export const addFeedbackReportByAdmin = async ({
  _id,
  feedback,
}: FeedbackType) => {
  try {
    if (!serverPath || serverPath.length < 1) {
      return {
        code: 400,
        message: "Error To Access With Server!",
      };
    }

    //call
    const resultApi = await axios.post(
      `${serverPath}/reports/admin/add-feedback`,
      { _id, feedback },
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

export const changeStatusReportByAdmin = async ({
  _id,
  status = "approved",
}: {
  _id: string;
  status: string;
}) => {
  try {
    if (!serverPath || serverPath.length < 1) {
      return {
        code: 400,
        message: "Error To Access With Server!",
      };
    }

    //call
    const resultApi = await axios.post(
      `${serverPath}/reports/admin/change-status`,
      { _id, status },
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
        message: "Unknown Error When change status",
      };
    }
  }
};
