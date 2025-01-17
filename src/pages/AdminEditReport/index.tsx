import React, { useState } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { isInteger } from "../../helpers/checkValidate";
import { AdminReportType, ListReportByDayTime } from "../../types/reports";
import NavBarComponent from "../../components/NavBar";
import { addFeedbackReportByAdmin } from "../../api/reports";

const AdminEditReportPage = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [disableButton, setDisableButton] = useState<boolean>(true);

  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const reportId = query.get("id");
  const reportDateTime = query.get("dateTime");
  if (!reportId || !isInteger(reportId)) {
    return <Navigate to={"/admin/list-report"} />;
  }

  if (!reportDateTime) {
    return <Navigate to={"/admin/list-report"} />;
  }

  const reportListJson = localStorage.getItem("admin-reports");
  let reportData: AdminReportType;
  if (reportListJson) {
    const reportJson: Array<ListReportByDayTime> = JSON.parse(reportListJson);

    const reportList = reportJson.find(
      (data: ListReportByDayTime) => data.time === reportDateTime
    );

    if (!reportList) {
      return <Navigate to={"/admin/list-report"} />;
    }
    reportData = reportList.data[+reportId];

    if (!reportData) {
      return <Navigate to={"/admin/list-report"} />;
    }
  } else {
    return <Navigate to={"/admin/list-report"} />;
  }

  const handleBackToList = () => {
    navigate("/admin/list-report");
  };

  const handleChangeFeedback = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 0) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
    setErrorMessage(null);
    setFeedback(e.target.value);
  };

  const handleAddFeedBack = async (_id: string) => {
    setErrorMessage(null);
    if (!_id || feedback.length < 1) {
      setErrorMessage("Add Feedback Please");

      return;
    }

    const resultAdd = await addFeedbackReportByAdmin({ _id, feedback });

    if (resultAdd.code === 200) {
      alert("Add Feedback Success!");

      navigate("/admin/list-report");
    } else {
      setErrorMessage("Add Feedback Error! Please Try Again。");
    }
  };

  return (
    <div className="container">
      <NavBarComponent />
      <div className="mb-6 p-6">
        <div className="my-2">
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={handleBackToList}
          >
            Back To List
          </button>
        </div>

        <h3>Title: {reportData.title}</h3>

        <table className="border-collapse border border-slate-500 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <tbody>
            <tr className="border-b border-black">
              <th className="border-r border-black p-3 min-w-36">Full Name</th>
              <td className="p-3">{`${reportData.userInfo.firstName} ${reportData.userInfo.lastName}`}</td>
            </tr>
            <tr className="border-b border-black">
              <th className="border-r border-black p-3 min-w-36">メール</th>
              <td className="p-3">{`${reportData.userInfo.email}`}</td>
            </tr>
            <tr className="border-b border-black">
              <th className="border-r border-black p-3 min-w-36">作業報告日</th>
              <td className="p-3">{`${reportData.reportYearMonthDay}`}</td>
            </tr>
            <tr className="border-b border-black">
              <th className="border-r border-black p-3 min-w-36">報告内容</th>
              <td className="p-3">{`${reportData.content}`}</td>
            </tr>
          </tbody>
        </table>

        <label
          htmlFor="message"
          className="block mt-10 mb-1 text-sm font-medium text-gray-900 dark:text-white"
        >
          Comment:
        </label>
        <textarea
          rows={6}
          placeholder="Type your comment"
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          value={feedback}
          onChange={(e) => handleChangeFeedback(e)}
        ></textarea>
        {errorMessage && (
          <div className="ms-3 mb-2">
            <span className="text-red-600">{errorMessage}</span>
          </div>
        )}
        <button
          type="button"
          className={`text-white bg-gradient-to-r ${
            disableButton
              ? `bg-blue-400 cursor-not-allowed`
              : "from-blue-500 via-blue-600 to-blue-700"
          } hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}
          onClick={() => handleAddFeedBack(reportData._id)}
          disabled={disableButton}
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default AdminEditReportPage;
