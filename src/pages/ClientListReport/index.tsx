import React, { useLayoutEffect, useState } from "react";
import { getListClientReport } from "../../api/reports";
import { ReadReportType } from "../../types/reports";
import NavBarComponent from "../../components/NavBar";
import { changeClassByStatus } from "../../helpers/changeClassByStatus";
import { useNavigate } from "react-router-dom";

const ListReportClient = () => {
  const [reports, setReports] = useState<Array<ReadReportType>>([]);

  const [errorMessage, setErrorMessage] = useState<string>();

  const navigate = useNavigate();

  const getListData = async () => {
    const result = await getListClientReport();

    if (result.code === 200) {
      result.data.data.sort((a: ReadReportType, b: ReadReportType) => {
        return a.reportYearMonthDay > b.reportYearMonthDay ? -1 : 1;
      });

      setReports(result.data.data);
    } else {
      setErrorMessage("Get Data Failed!. Please Try Again!");
    }

    return;
  };

  useLayoutEffect(() => {
    getListData();
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/client/report/edit/${id}`);
  };

  return (
    <div className="mx-2">
      <NavBarComponent />
      {errorMessage && (
        <div className="text-center">
          <span className="text-lime-600">{errorMessage}</span>
        </div>
      )}
      <div className="my-5 relative overflow-x-auto p-4">
        <table className="border-collapse border border-slate-500 w-full min-w-[1000px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-3 border border-slate-600">
                No
              </th>
              <th
                scope="col"
                className="px-2 py-3 border border-slate-600 min-w-24"
              >
                作業報告日
              </th>
              <th
                scope="col"
                className="px-2 py-3 border border-slate-600 min-w-24"
              >
                タイトル
              </th>
              <th scope="col" className="px-2 py-3 border border-slate-600">
                報告内容
              </th>
              <th scope="col" className="px-2 py-3 border border-slate-600">
                状態
              </th>
              <th scope="col" className="px-2 py-3 border border-slate-600">
                確認上司
              </th>
              <th
                scope="col"
                className="px-2 py-3 border border-slate-600 min-w-24"
              ></th>
            </tr>
          </thead>
          <tbody>
            {reports &&
              reports.map((vl, ind) => (
                <tr
                  key={ind}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="border border-slate-700 px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {ind + 1}
                  </th>
                  <td className="border border-slate-700 px-2 py-4 min-w-24">
                    {vl.reportYearMonthDay}
                  </td>
                  <td className="border border-slate-700 px-2 py-4">
                    {vl.title}
                  </td>
                  <td className="border border-slate-700 px-2 py-4">
                    {vl.content}
                  </td>
                  <td
                    className={`${changeClassByStatus(
                      vl.status
                    )} border border-slate-700 px-2 py-4`}
                  >
                    {vl.status}
                  </td>
                  <td className="border border-slate-700 px-2 py-4">
                    {vl.confirmedUserEmail}
                  </td>
                  {vl.status === "rejected" && (
                    <td className="border border-slate-700 px-2 py-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleEdit(vl._id)}
                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  shadow-blue-500/50 dark:shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                      >
                        編集
                      </button>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListReportClient;
