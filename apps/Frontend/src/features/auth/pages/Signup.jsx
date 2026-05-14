import { useState, useRef, useEffect } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import AuthLayout from '../../../components/layout/AuthLayout'
import infoIcon from '../../../assets/Info.svg'
import redInfoIcon from "../../../assets/Red-Info.svg";

import React from 'react'
import { getHighestRole, getDashboardPath } from "../../../utils/roleUtils";

function Signup() {
    const navigator = useNavigate();

    const userRegex = /^[a-z][a-z0-9_]{3,20}$/;
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [emailFocus, setEmailFocus] = useState(false);

    const [user, setUser] = useState('');
    const validName = userRegex.test(user);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState('');
    const validPassword = passwordRegex.test(password);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, []);

    const postRegister = async (e) => {
        e.preventDefault();
        if(!validName){
            setErrMsg('Invalid User Name');
            return;
        }else if(!validPassword){
            setErrMsg('Invalid Password');
            return;
        }

        try{
            const result = await axios.post("http://localhost:8080/api/auth/register", {
                username: user,
                email: email,
                password: password,
                
            })
            const userData = result.data;

            localStorage.setItem("token", userData.token);
            localStorage.setItem("user", JSON.stringify(userData));

            const highestRole = getHighestRole(userData.roles);
            if (highestRole) {
                navigator(getDashboardPath(highestRole));
            } else {
                navigator("/main/dashboard/userrole"); // Fallback
            }
            
        }catch(err){
            if (validName && validPassword) {
                setErrMsg("User Already Exist");
            }
            
        }
        
    }

  return (
        <div>
            <AuthLayout />

            <div className='w-full p-4 flex justify-center items-center h-[100vh] overflow-y-auto'>
                

                <div className='p-7 sm:p-16 rounded-[12px] flex flex-col gap-6 w-[550px]'>
                    <div className='flex justify-center items-center flex-col gap-1'>
                        <h2 className='text-[28px] max-sm:text-[20px] font-extrabold'>Create a free account</h2>
                        <p className='text-center text-[15px] text-color-white/40 w-[80%]'>Create your account to get started and access all features in one place.</p>
                    </div>

                    <div className={`flex gap-3 bg-color-red/5 p-4 rounded-[12px] border border-color-red
                    ${errMsg != "" ? '' : "hidden"}
                    `}>
                        <div>
                            <img src={redInfoIcon} alt="Red Info" className="w-6" />
                        </div>
                        <h2 className="text-color-red font-semibold">{errMsg}</h2>
                    </div>
                    
                    <form onSubmit={postRegister} className='flex flex-col gap-5'>
                        

                        <div className='flex flex-col gap-2'>
                            <input
                                type="email"
                                id="email"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setUserFocus(false)}
                                placeholder='email'
                                className={`w-full h-[47px] rounded-full pl-5  
                                placeholder:text-color-white/10
                                max-sm:h-[45px]
                                bg-transparent border border-color-white/20
                                `}
                            />

                        </div>

                        <div className='flex flex-col gap-3'>
                            <input
                                type="text"
                                id="username"
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                required
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                                placeholder='username'
                                className={`w-full h-[47px] rounded-full pl-5  
                        placeholder:text-color-white/10
                        max-sm:h-[45px]
                        ${user === '' ? 'bg-transparent border border-color-white/20' : validName ? 'bg-color-green/5 border border-color-green' : 'bg-color-red/5 border border-color-red'}
                        `}
                            />

                            <div className={`flex gap-7 bg-color-gray1/80 p-5 rounded-[12px] border border-color-white/10
                        ${!validName && user != '' ? '' : 'hidden'}
                        `}>
                                <div className='pt-[2px]'>
                                    <img src={infoIcon} alt="Info" className='w-6' />
                                </div>
                                <div>
                                    <ul className='text-[15px] flex flex-col gap-1 list-disc'>
                                        <li>All letters must be lowercase only.</li>
                                        <li>May contain numbers and underscores (_).</li>
                                        <li>No spaces or special characters</li>
                                    </ul>
                                </div>
                            </div>

                        </div>

                        <div className='flex flex-col gap-3'>
                            <input
                                type="password"
                                id="password"
                                autoComplete="off"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                onFocus={() => setPasswordFocus(true)}
                                onBlur={() => setPasswordFocus(false)}
                                placeholder='password'
                                className={`w-full h-[47px] rounded-full pl-5   
                        placeholder:text-color-white/10
                        max-sm:h-[45px]
                        ${password === '' ? 'bg-transparent border border-color-white/20' : validPassword ? 'bg-color-green/5 border border-color-green' : 'bg-color-red/5 border border-color-red'}
                        `}
                            />

                            <div className={`flex gap-7 bg-color-gray1/80 p-5 rounded-[12px] border border-color-white/10
                        ${!validPassword && password != '' ? '' : 'hidden'}
                        `}>
                                <div className='pt-[2px]'>
                                    <img src={infoIcon} alt="Info" className='w-6' />
                                </div>
                                <div>
                                    <ul className='text-[15px] flex flex-col gap-1 list-disc'>
                                        <li>Minimum 8 characters.</li>
                                        <li>Include uppercase, lowercase, number.</li>
                                        <li>Include 1 special character (# ? ! @ $ % ^ & * -).</li>
                                    </ul>
                                </div>
                            </div>

                        </div>

                        <button type='submit' className='w-full h-12 max-sm:h-11 bg-color-white rounded-full text-color-gray1 font-medium'>
                            Sign Up
                        </button>

                    </form>

                    <div>
                        <h3 className='max-sm:text-[14px] text-center'>
                            Have Account? <a href='login' className='text-color-purple'>Log In</a>
                        </h3>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Signup
