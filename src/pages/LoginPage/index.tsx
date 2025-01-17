import React, { useState } from "react";
import InputComponent from "../../components/Atom/Input";
import ButtonComponent from "../../components/Atom/Button";
import { UserLoginInformation } from "../../types/auth";
import { login } from "../../api/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState<UserLoginInformation>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlerSubmit = async () => {
    setErrorMessage(null);
    if (!formData || !formData.email || !formData.password) {
      setErrorMessage("Check ALL Input Please!");

      return;
    }

    const result = await login(formData);

    if (result.code === 200) {
      const returnData = result.data;
      localStorage.setItem("user-information", JSON.stringify(returnData.data));
    
      navigate("/")
    
    } else {
      setErrorMessage("Login Error, Please Try Again");
    }

    return;
  };

  return (
    <div className="bg-gray-200 flex justify-center items-center h-screen w-screen">
      <div className=" border-t-8 rounded-sm border-indigo-600 bg-white p-12 shadow-2xl w-96">
        <h1 className="font-bold text-center block text-2xl">Log In</h1>

        {errorMessage && <p>{errorMessage}</p>}
        <div className="my-5">
          <InputComponent
            type="email"
            id="email"
            name="email"
            label="Email Address"
            placeholder="me@example.com"
            autofocus={true}
            action={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <InputComponent
            type="password"
            id="password"
            name="password"
            label="Password"
            placeholder="••••••••••"
            action={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <ButtonComponent value="Submit" action={handlerSubmit} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
