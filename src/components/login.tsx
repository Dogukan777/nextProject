"use client";

import { useRouter } from "next/navigation";
import CustomButton from "@/components/button";
import LogInButton from "@/components/LogInButton";
import CustomInput from "@/components/input";

import LabelMessage from "@/components/label";
const LoginFetch = async (email: string, password: string) => {
  const response = await fetch(`http://localhost:3001/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  const data = await response.json();
  console.log('data',data);
  return data;
};

const Login = ({ setLogin }: { setLogin: () => void }) => {
  const router = useRouter();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const lblEmail = document.getElementById("lblEmail");
    const lblPassword = document.getElementById("lblPassword");
    if (!email && lblEmail) {
      lblEmail.style.display = "block";
    }else if(lblEmail){
      lblEmail.style.display = "none";
    }
    if (!password && lblPassword) {
      lblPassword.style.display = "block";
    }else if(lblPassword){
      lblPassword.style.display = "none";
    }
    LoginFetch(e.target[0].value, e.target[1].value).then((data) => {
      localStorage.setItem('token', data.token);
      if(data.isLogin==true){
        return setLogin();
      }else{
        if(email&&password){
          return alert(data.message);
        }
        
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "300px",
        margin: "auto",
        marginTop: "100px",
      }}
    >
      <h1>Login</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: "10px", flexDirection: "column" }}
      >
      <div style={{height:"30px"}}>
        <CustomInput placeHolder="Email" type="text"/>
        <LabelMessage id="lblEmail" message=" *Email field cannot be empty"/>
      </div>
      <div style={{height:"30px"}}>
        <CustomInput placeHolder="Password" type="password"/>
        <LabelMessage id="lblPassword" message=" *Password field cannot be empty"/>
      </div>
        <CustomButton value="Login" />
      </form>
      <LogInButton value="SignUp Page" onClick={()=>router.push("/signup")}/>
    </div>
  );
};

export default Login;
