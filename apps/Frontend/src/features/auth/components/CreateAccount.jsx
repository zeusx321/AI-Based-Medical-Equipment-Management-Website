import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import trashIcon from "../../../assets/Trash.svg";
import conformIcon from "../../../assets/Checkmark.svg";
import closeIcon from "../../../assets/Close.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../components/layout/AuthLayout";
import infoIcon from "../../../assets/Info.svg";
import redInfoIcon from "../../../assets/Red-Info.svg";

function CreateAccount({addOpen, setAddOpen}) {
  const navigator = useNavigate();

  const userRegex = /^[a-z][a-z0-9_]{3,20}$/;
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);

  const [user, setUser] = useState("");
  const validName = userRegex.test(user);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const validPassword = passwordRegex.test(password);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  const postRegister = async (e) => {
    e.preventDefault();
    if (!validName) {
      setErrMsg("Invalid User Name");
      return;
    } else if (!validPassword) {
      setErrMsg("Invalid Password");
      return;
    }

    try {
      const result = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          username: user,
          email: email,
          password: password,
        },
      );
      
    setAddOpen(false);
      
    } catch (err) {
      if (validName && validPassword) {
        setErrMsg("User Already Exist");
      }
    }
  };

  return (
    <form onSubmit={postRegister} className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-bold text-color-white/60 uppercase tracking-wide">Email Address</label>
        <input
          type="email"
          id="email"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          required
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setUserFocus(false)}
          placeholder="example@mail.com"
          className="w-full h-[50px] bg-color-gray2 border border-color-white/10 rounded-[8px] px-5 text-[14px] text-white focus:outline-none focus:border-color-purple transition-all placeholder:text-color-white/10"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-bold text-color-white/60 uppercase tracking-wide">Username</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          required
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
          placeholder="johndoe"
          className={`w-full h-[50px] rounded-[8px] px-5 text-[14px] text-white focus:outline-none focus:border-color-purple transition-all placeholder:text-color-white/10
            ${user === "" ? "bg-color-gray2 border border-color-white/10" : validName ? "bg-color-green/5 border border-color-green/40" : "bg-color-red/5 border border-color-red/40"}`}
        />

        <div
          className={`flex gap-4 bg-color-red/5 p-4 rounded-[8px] border border-color-red/20 mt-1
            ${!validName && user != "" ? "" : "hidden"}`}
        >
          <img src={redInfoIcon} alt="Info" className="w-5 h-5 shrink-0" />
          <ul className="text-[11px] text-color-red/80 font-medium flex flex-col gap-1 list-disc pl-3">
            <li>Lowercase letters only, 4-20 chars.</li>
            <li>Numbers and underscores allowed.</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-bold text-color-white/60 uppercase tracking-wide">Password</label>
        <input
          type="password"
          id="password"
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
          required
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
          placeholder="••••••••"
          className={`w-full h-[50px] rounded-[8px] px-5 text-[14px] text-white focus:outline-none focus:border-color-purple transition-all placeholder:text-color-white/10
            ${password === "" ? "bg-color-gray2 border border-color-white/10" : validPassword ? "bg-color-green/5 border border-color-green/40" : "bg-color-red/5 border border-color-red/40"}`}
        />

        <div
          className={`flex gap-4 bg-color-red/5 p-4 rounded-[8px] border border-color-red/20 mt-1
            ${!validPassword && password != "" ? "" : "hidden"}`}
        >
          <img src={redInfoIcon} alt="Info" className="w-5 h-5 shrink-0" />
          <ul className="text-[11px] text-color-red/80 font-medium flex flex-col gap-1 list-disc pl-3">
            <li>Minimum 8 characters.</li>
            <li>Include uppercase, lowercase, number.</li>
            <li>Include 1 special character (# ? ! @ $ % ^ & * -).</li>
          </ul>
        </div>
      </div>

      <button
        type="submit"
        className="w-full h-12 bg-color-purple text-white rounded-[8px] font-bold text-[14px] hover:opacity-90 active:scale-[0.98] transition-all mt-2"
      >
        Create Account
      </button>
    </form>
  );
}

export default CreateAccount;
