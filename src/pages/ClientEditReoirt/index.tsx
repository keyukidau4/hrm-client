import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getReportById, updateReport } from "../../api/reports";
import NavBarComponent from "../../components/NavBar";
import { getJapaneseTime } from "../../helpers/convertDayTime";

const ClientEditReport = () => {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState<string>();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<String>("");
  const [feedback, setFeedback] = useState<string>("");

  useEffect(() => {
    getReport();
  }, []);

  if (!id) {
    return <Navigate to="/client/list-report" />;
  }

  const getReport = async () => {
    const result = await getReportById(id);

    if (result.code === 200) {
      setTitle(result.data.data.title);
      setContent(result.data.data.content);
      setSelectedDate(getJapaneseTime(result.data.data.reportYearMonthDay));
      setFeedback(result.data.data.feedback);
    } else {
      setErrorMessage("Get Data Failed!. Please Try Again!");
      // return navigate('/client/list-report');
    }

    return;
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmitUpdate = async () => {
    setErrorMessage(undefined);
    if (!title || title.length < 1 || !content || content.length < 1) {
      setErrorMessage("Input All Box Please!");
      return;
    }

    if (!window.confirm("Update This Report?")) {
      return;
    }

    const addData = {
      title,
      content,
      _id: id,
    };

    const result = await updateReport(addData);

    if (result.code === 200) {
      alert("Update Report Successfully!");
      window.location.href = "/client/list-report";
    } else {
      setErrorMessage(result.message);
    }

    return;
  };

  return (
    <div className="mx-auto">
      <NavBarComponent />
      {errorMessage && (
        <div className="text-center">
          <span className="text-rose-400">{errorMessage}</span>
        </div>
      )}

      <div className="m-5">
        <div className="my-5">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300  shadow-lg shadow-cyan-500/50  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            一覧に戻る
          </button>
        </div>

        <div className="mb-5">
          <label
            htmlFor="selectedDate"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            作業報告日:
          </label>
          <span>{selectedDate}</span>
        </div>

        <div className="mb-5">
          <label
            htmlFor="selectedDate"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            上司からのフィードバック:
          </label>
          <span className="text-red-600">{feedback}</span>
        </div>

        {/* title */}
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            タイトル
          </label>
          <input
            type="title"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700  dark:text-white  focus:border-cyan-500 hover:border-lime-400"
            placeholder="Title Of Today"
            value={title}
            onChange={(e) => handleTitleChange(e)}
          />
        </div>

        {/* content */}
        <div className="mb-5">
          <label
            htmlFor="content"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            内容
          </label>
          <textarea
            id="content"
            rows={10}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 hover:border-lime-400"
            placeholder="Write your thoughts here..."
            value={content}
            onChange={(e) => handleChangeContent(e)}
          />
        </div>

        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleSubmitUpdate}
        >
          変更する
        </button>
      </div>
    </div>
  );
};

export default ClientEditReport;
