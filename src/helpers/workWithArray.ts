import { AdminReportType, ListReportByDayTime } from "../types/reports";

export const getListReportByRequestDay = (reports: Array<AdminReportType>) => {
  const reportAfter: Array<ListReportByDayTime> = [];

  reports.forEach((vl, ind) => {
    const foundId = reportAfter.findIndex(
      (value) => value.time === vl.reportYearMonthDay
    );

    if (foundId > -1) {
      reportAfter[foundId].data.push(vl);
    } else {
      reportAfter.push({
        time: vl.reportYearMonthDay,
        data: [vl],
      });
    }
  });

  reportAfter.sort((a: ListReportByDayTime, b: ListReportByDayTime): number => {
    return a.time < b.time ? 1 : -1;
  });

  return reportAfter;
};
