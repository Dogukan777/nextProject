"use client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Hider from "@/components/layout/hider";
interface User {
  name: string;
  email: string;
  surname: string,
  username:string,
  userType: string
}

const UserDeleteFetch = async (id:any) => {
    const response = await fetch('http://localhost:3001/users/delete?id='+id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
 
    });
    const data = await response.json();
    return data;
};

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
const UserDelete = ({params}: { params: { id: string } }) => {

  const { id } = params; // Extract the id from params
  const [data, setData] = useState<User[] | null>(null);

  useEffect(() => {
    if (id) {
      console.log("userid",id);
      UserDeleteFetch(id as string).then((data) => {
        alert(data.message);
        // Optionally, you could refresh the list of users after deletion
        UserFetch().then(setData);
      });
    }
  }, [id]);

  useEffect(() => {
    UserFetch().then(setData);
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

export default UserDelete;