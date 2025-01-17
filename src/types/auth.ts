export interface UserType {
  firstName: string;
  lastName: string;
  email: string;
  dayOfBirth: Date;
  role: number;
  sex: "男" | "女";
}

export interface UserLoginInformation {
  email: string;
  password: string;
}
