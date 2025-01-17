import { Navigate } from "react-router-dom";

const AdminCheck = ({ children }: { children: JSX.Element }) => {
  const localStorageUser = localStorage.getItem("user-information");
  if (!localStorageUser) {
    return <Navigate to={"/login"} />;
  } else {
    const userInformation = JSON.parse(localStorageUser);

    if (userInformation.role !== 1) {
      return <Navigate to={"/"} />;
    }
  }
  
  return children;
};

export default AdminCheck;
