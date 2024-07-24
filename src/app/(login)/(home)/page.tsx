"use client";

import { useState, useEffect } from "react";
import Hider from "@/components/layout/hider";
interface User {
  name: string;
  email: string;
  surname: string,
  username:string,
  userType: string
}

const UserFetch = async (): Promise<User[]> => {
  const response = await fetch(`http://localhost:3001/users/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log("data",data);
  return data;
};

const onBasketUpdate = async () =>{

}
export default function Home() {
  const [data, setData] = useState<User[] | null>(null);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const userId = urlParams.get("id");
      console.log("userid",userId);
      if (userId) {
        setId(userId);
      }
    }
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      const result = await UserFetch();
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <main>
           <Hider onBasketUpdate={onBasketUpdate}/>
      <div style={{width:"82%",height:"500px",margin:"0 auto",marginTop:"50px"}}>
      {data ? (
        data.map((item, index) => (
          <div key={index} style={{width:"290px",height:"200px",float:"left",margin:"10px",background:"purple",color:"white",padding:"20px",borderRadius:"10px"}}>
            <p>Name: {item.name}</p>
            <p>Surname: {item.surname}</p>
            <p>Email: {item.email}</p>
            <p>Username: {item.username}</p>
            <p>UserType: {item.userType}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
      </div>
    </main>
  );
}