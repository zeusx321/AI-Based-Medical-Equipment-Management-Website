import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthLayout from "../../../components/layout/AuthLayout";
import redInfoIcon from "../../../assets/Red-Info.svg";
import React from "react";
import { getHighestRole, getDashboardPath } from "../../../utils/roleUtils";

function Login() {
  const navigator = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }

    // Redirect if already logged in
    const savedUser = localStorage.getItem("user");
    if (savedUser && savedUser !== "undefined") {
      try {
        const userData = JSON.parse(savedUser);
        const highestRole = getHighestRole(userData.roles);
        if (highestRole) {
          navigator(getDashboardPath(highestRole));
        }
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }
  }, [navigator]);

  const postRegister = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          username: user,
          password: password,
        },
      );
      setErrMsg("");
      const userData = result.data;

      localStorage.setItem("token", userData.accessToken);
      localStorage.setItem("refreshToken", userData.refreshToken);
      localStorage.setItem("user", JSON.stringify(userData));

      const highestRole = getHighestRole(userData.roles);
      if (highestRole) {
        navigator(getDashboardPath(highestRole));
      } else {
        navigator("/main/dashboard/userrole"); // Fallback
      }
    } catch (err) {
      setErrMsg("Invalid Username or Password");
    }
  };

  return (
    <div>
      <AuthLayout />
      <div className="w-full p-4 flex justify-center items-center h-[100vh] overflow-y-auto">
        <div className="p-7 sm:p-16 rounded-[12px] flex flex-col gap-6 w-[550px]">
          
          <div className="flex justify-center items-center flex-col gap-1">
            <h2 className="text-[28px] max-sm:text-[20px] font-extrabold">
              Log in
            </h2>
            <p className="text-center text-[15px] text-color-white/40 w-[85%]">
              Welcome back! Log in to your account to continue and access your dashboard and features.
            </p>
          </div>

          <div className={`flex gap-3 bg-color-red/5 p-4 rounded-[12px] border border-color-red
            ${errMsg != "" ? '' : "hidden"}
            `}>
            <div>
                <img src={redInfoIcon} alt="Red Info" className="w-6" />
            </div>
            <h2 className="text-color-red font-semibold">{errMsg}</h2>
          </div>

          <form onSubmit={postRegister} className="flex flex-col gap-5">

            <div className="flex flex-col gap-3">
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                required
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                placeholder="username"
                className={`w-full h-[47px] rounded-full pl-5  
                                placeholder:text-color-white/10
                                max-sm:h-[45px]
                                bg-transparent border border-color-white/20
                                `}
              />
            </div>

            <div className="flex flex-col gap-3">
              <input
                type="password"
                id="password"
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
                required
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                placeholder="password"
                className={`w-full h-[47px] rounded-full pl-5   
                                placeholder:text-color-white/10
                                max-sm:h-[45px]
                                bg-transparent border border-color-white/20
                                `}
              />

            </div>

            <button
              type="submit"
              className="w-full h-12 max-sm:h-11 bg-color-white rounded-full text-color-gray1 font-medium"
            >
              Log in
            </button>
          </form>

          <div>
            <h3 className="max-sm:text-[14px] text-center">
              Create Account?{" "}
              <a href="signup" className="text-color-purple">
                Sign up
              </a>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
