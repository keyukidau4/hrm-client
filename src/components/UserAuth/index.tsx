import { Navigate} from "react-router-dom";

const UserAuthCheck = ({ children }: { children: JSX.Element }) => {
  const localStorageUser = localStorage.getItem("user-information");

  if (!localStorageUser) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default UserAuthCheck;
