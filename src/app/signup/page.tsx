"use client"
import LogInButton from "@/components/LogInButton";
import CustomButton from "@/components/button";
import CustomInput from "@/components/input";
import LabelMessage from "@/components/label";
import { useRouter } from "next/navigation";
const SignUpFetch = async (email: string, username: string, password:string, name:string, surname:string) => {
  const response = await fetch(`http://localhost:3001/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email:email,
      username: username,
      password: password,
      name:name,
      surname:surname
    }),
  });

  const data = await response.json();
  return data;
};
export default function SignUp(){
  const router = useRouter();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const username = e.target[1].value;
    const password = e.target[2].value;
    const name = e.target[3].value;
    const surname = e.target[4].value;
    const lblEmail = document.getElementById("lblEmail");
    const lblUsername = document.getElementById("lblUsername");
    const lblPassword = document.getElementById("lblPassword");
    const lblName = document.getElementById("lblName");
    const lblSurname = document.getElementById("lblSurname");
    
    if (!email && lblEmail) {
      lblEmail.style.display = "block";
    }else if(lblEmail){
      lblEmail.style.display = "none";
    }
    if (!username && lblUsername) {
      lblUsername.style.display = "block";
    }else if(lblUsername){
      lblUsername.style.display = "none";
    }
    if (!password && lblPassword) {
      lblPassword.style.display = "block";
    }else if(lblPassword){
      lblPassword.style.display = "none";
    }
    if (!name && lblName) {
      lblName.style.display = "block";
    }else if(lblName){
      lblName.style.display = "none";
    }
    if (!surname && lblSurname) {
      lblSurname.style.display = "block";
    }else if(lblSurname){
      lblSurname.style.display = "none";
    }
    if(email && username && password && name && surname){
      SignUpFetch(email, username, password, name, surname).then((data) => {
        return alert(data.message);
      });
    }
   
  };
  return (
       <div
       style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "300px",
        margin: "auto",
        marginTop: "100px"
      }}><h1>SignUp</h1>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
        <div style={{ height:"30px" }}>
          <CustomInput placeHolder="Email" type="text"/>
          <LabelMessage id="lblEmail" message=" *Email field cannot be empty"/>
        </div>
        <div style={{height:"30px" }}>
          <CustomInput placeHolder="Username" type="text"/>
          <LabelMessage id="lblUsername" message=" *Username field cannot be empty"/>
        </div>
        <div style={{height:"30px"}}>
          <CustomInput placeHolder="Password" type="password"/>
          <LabelMessage id="lblPassword" message=" *Password field cannot be empty"/>
        </div>
        <div style={{height:"30px"}}>
          <CustomInput placeHolder="Name" type="text"/>
          <LabelMessage id="lblName" message=" *Name field cannot be empty"/>
        </div>
        <div style={{height:"30px"}}>
          <CustomInput placeHolder="Surname" type="text"/>
          <LabelMessage id="lblSurname" message=" *Surname field cannot be empty"/>
        </div>
        <CustomButton value="Sign In"/>
      </form>
      
      <LogInButton value="Login Page" onClick={()=>router.push("/")}/>

      </div>

  );
};
