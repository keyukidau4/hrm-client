import React, { useLayoutEffect, useState } from "react";
import NavBarComponent from "../../components/NavBar";
import {
  changeStatusReportByAdmin,
  getListClientReportByAdmin,
} from "../../api/reports";
import { ListReportByDayTime } from "../../types/reports";
import { useNavigate } from "react-router-dom";
import ButtonEffect from "../../components/Atom/ButtonEffect";
import { getListReportByRequestDay } from "../../helpers/workWithArray";
import { changeClassByStatus } from "../../helpers/changeClassByStatus";

const AdminListReportPage: React.FC = (): JSX.Element => {
  const [reports, setReports] = useState<Array<ListReportByDayTime>>([]);

  const [errorMessage, setErrorMessage] = useState<string>();

  const navigate = useNavigate();

  const getListData = async () => {
    const result = await getListClientReportByAdmin();

    if (result.code === 200) {
      const reports = getListReportByRequestDay(result.data.data);

      setReports(reports);

      localStorage.setItem("admin-reports", JSON.stringify(reports));
    } else if (result.code === 403) {
      return navigate("/login");
    } else {
      setErrorMessage("Get Data Failed!. Please Try Again!");
    }

    return;
  };

  useLayoutEffect(() => {
    getListData();
  }, []);

  const handleChangeToEdit = ({
    index,
    dateTime,
  }: {
    index: number;
    dateTime: string;
  }) => {
    navigate(`/admin/report-detail?dateTime=${dateTime}&id=${index}`);
  };

  const handleChangeSuccess = async (_id: string) => {
    const result = await changeStatusReportByAdmin({ _id, status: "approved" });
    if (result.code === 200) {
      alert("承認成功でした！");

      window.location.reload();
    } else if (result.code === 403) {
      return navigate("/login");
    } else {
      setErrorMessage("承認失敗でした！もう一度お試しください！");
    }

    return;
  };

  return (
    <div className="mx-2">
      <NavBarComponent />

      {errorMessage && (
        <div className="text-center">
          <span className="text-red-600">{errorMessage}</span>
        </div>
      )}

      <div>
        {reports &&
          reports.map((value, index) => (
            <div key={index} className="my-5 relative overflow-x-auto p-4">
              <h3>
                Time:{" "}
                {`${value.time.split("-")[0]}年${value.time.split("-")[1]}月${
                  value.time.split("-")[2]
                }日`}
              </h3>
              <table className="border-collapse border border-slate-500 w-full min-w-[1000px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th
                      scope="col"
                      className="px-2 py-3 border border-slate-600"
                    >
                      No
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 border border-slate-600"
                    >
                      Full Name
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 border border-slate-600"
                    >
                      メール
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 border border-slate-600"
                    >
                      タイトル
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 border border-slate-600"
                    >
                      報告内容
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 border border-slate-600"
                    >
                      状態
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 border border-slate-600"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {value.data.length > 0 &&
                    value.data.map((vl, ind) => (
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
                        <td className="border border-slate-700 px-2 py-4 min-w-24">{`${vl.userInfo.firstName} ${vl.userInfo.lastName}`}</td>
                        <td className="border border-slate-700 px-2 py-4 min-w-24">
                          {vl.userInfo.email}
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
                          {vl.status === "pending" && (
                            <>
                              <ButtonEffect
                                buttonId={1}
                                buttonText="Edit"
                                action={() =>
                                  handleChangeToEdit({
                                    index: ind,
                                    dateTime: vl.reportYearMonthDay,
                                  })
                                }
                              />
                              <div className="my-14"></div>
                              <ButtonEffect
                                buttonId={2}
                                buttonText="Accept"
                                action={() => handleChangeSuccess(vl._id)}
                              />
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminListReportPage;
