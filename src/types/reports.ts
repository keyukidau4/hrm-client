export interface ReportRequireType {
  title: string;
  content: string;
  reportYearMonthDay: string;
}

export interface UpdateReportType {
  title: string;
  content: string;
  _id: string;
}

export interface ReadReportType extends ReportRequireType {
  _id: string;
  status: string;
  feedback?: string;
  confirmedUserEmail?: string;
}

export interface AdminReportType extends ReadReportType {
  userInfo: UserInfomationReport;
}

export interface UserInfomationReport {
  userEmail: string;
  position: string;
  firstName: string;
  lastName: string;
  email: string;
}

export type FeedbackType = {
  _id: string;
  feedback: string;
};

export type ListReportByDayTime = {
  time: string;
  data: Array<AdminReportType>;
};
