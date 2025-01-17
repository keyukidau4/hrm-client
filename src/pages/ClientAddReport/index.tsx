import React, { useState } from "react";
import NavBarComponent from "../../components/NavBar";
import DatePicker from "react-datepicker";
import { addNewReport } from "../../api/reports";

const AddNewReportPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [errorMessage, setErrorMessage] = useState<string|null>(null);
  const [successMessage, setSuccessMessage] = useState<string|null>(null);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmitAdd = async () => {
    setErrorMessage(null)
    setSuccessMessage(null)
    if( !selectedDate || !title || title.length<1 || !content || content.length<1 ) {
      setErrorMessage("Input All Box Please!")
      return 
    }

    if( !window.confirm("Add This Report?") ) {
      return
    }

    const year = selectedDate.getFullYear().toString();
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
    const day = selectedDate.getDate().toString().padStart(2, "0");

    const addData = {
      title,
      content,
      reportYearMonthDay: `${year}-${month}-${day}`
    }

    const result = await addNewReport(addData);

    if(result.code === 200) {
      setSuccessMessage("Add New Report Successfully!")
      setContent("")
      setSelectedDate(null)
      setTitle("")
    } else {
      setErrorMessage(result.message)
    }

    return
  };

  return (
    <div className="container mx-auto">
      <NavBarComponent />
      <h1 className="text-center my-5">
        Add New Report Page
      </h1>
      
      <div className="max-w-screen-sm mx-auto shadow-2xl p-5">
        {errorMessage && (
          <div className="text-center">
            <span className="text-rose-400">
              {errorMessage}
            </span>

          </div>
        )}

       {successMessage && (
          <div className="text-center">
            <span className="text-green-400">
              {successMessage}
            </span>

          </div>
        )}

        {/* select date */}
        <div className="mb-5">
          <label
            htmlFor="selectedDate"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Date:
          </label>
          <DatePicker
            id="selectedDate"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 hover:border-lime-400"
            showIcon
            icon="fa fa-calendar"
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            showFullMonthYearPicker
          />
        </div>

        {/* title */}
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Title</label>
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
            Content
          </label>
          <textarea
            id="content"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 hover:border-lime-400"
            placeholder="Write your thoughts here..."
            value={content}
            onChange={(e) => handleChangeContent(e)}
          />
        </div>

        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleSubmitAdd}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddNewReportPage;
