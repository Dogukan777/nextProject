"use client"
import Hider from "@/components/layout/hider";
import BasketButton from "@/components/basketButton";
import { useState, useEffect } from "react";
import BasketDeleteButton from "@/components/deleteButton";
import PaymentButton from "@/components/LogInButton";
interface Basket {
    uid: string;
    pid: string;
    uName: string;
    uEmail: string;
    uUserName: string;
    uSurName: string;
    uUserType: string;
    productName: string;
    productPrice: string;
    productDate: string;
    Count: string;
  }
  
const BasketListFetch = async (): Promise<Basket[]> => {
    const userId = localStorage.getItem('userid');
    const response = await fetch(`http://localhost:3001/cart/list?userid=` + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
  
    const data = await response.json();
    console.log("dataBasket", data);
    return data;
  };

  const BasketAddFetch = async (productId:String,userId:any) => {
    const response = await fetch(`http://localhost:3001/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productid:productId,
        userid: userId,
      }),
    });
  
    const data = await response.json();
    console.log("data",data);
    return data;
  }; 
  const BasketUpdateFetch = async (productId:String,userId:any) => {
    const response = await fetch(`http://localhost:3001/cart/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productid:productId,
        userid: userId,
      }),
    });
  
    const data = await response.json();
    console.log("data",data);
    return data;
  };   
  const BasketDeleteFetch = async (userId:any) => {
    const response = await fetch(`http://localhost:3001/cart/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: userId,
      }),
    });
  
    const data = await response.json();
    console.log("data",data);
    return data;
  };   
export default function Basket(){

const [baskets, setBaskets] = useState<Basket[]>([]);
const [basketUpdate, setBasketUpdate] = useState(0);
const [totalPrice, setTotalPrice] = useState<number>(0);
useEffect(() => {
    const fetchData = async () => {
      const result = await BasketListFetch();
      setBaskets(result);

      // Toplam fiyatı hesapla
      const calculatedTotalPrice = result.reduce((acc, item) => {
        const price = parseFloat(item.productPrice);
        const count = parseInt(item.Count);
        return acc + (price * count);
      }, 0);

      setTotalPrice(calculatedTotalPrice);
    };

    fetchData();
  }, [basketUpdate]);
const handleBasketAdd= async (productID:String) =>{
    const userID = localStorage.getItem('userid');
  
    await BasketAddFetch(productID, userID);

    const updatedBaskets = await BasketListFetch();
    setBaskets(updatedBaskets);

    setBasketUpdate((prev) => prev + 1);
    
}
const handleBasketDelete= async (productID:String) =>{
    const userID = localStorage.getItem('userid');
  
    await BasketUpdateFetch(productID, userID);

    const updatedBaskets = await BasketListFetch();
    setBaskets(updatedBaskets);

    setBasketUpdate((prev) => prev + 1);
    
}
const handleAllBasketDelete = async() =>{
    const userID = localStorage.getItem('userid');
  
    await BasketDeleteFetch(userID);
    const updatedBaskets = await BasketListFetch();
    setBaskets(updatedBaskets);

    setBasketUpdate((prev) => prev + 1);
}

return(
    <main>
        <Hider onBasketUpdate={() => setBasketUpdate((prev) => prev + 1)}/>
        <div style={{width:"80%",marginLeft:"8%",marginTop:"15px"}}><h2>Basket Page</h2></div>
        <div style={{ width: "62%", height: "520px",border:"3px solid grey",borderRadius:"10px",marginTop:"5px",float:"left",marginLeft:"8%" }}>
          {baskets ? (
            baskets.map((item, index) => (
              <div
                key={index}
                style={{
                  width: "290px",
                  height: "200px",
                  float: "left",
                  margin: "10px",
                  background: "#18239E",
                  color: "white",
                  padding: "20px",
                  borderRadius: "10px",
                }}
              >
                <p>Id: {item.pid}</p> 
                <p>Name: {item.productName}</p>
                <p>Price: {item.productPrice}</p>
                <p>Date: {item.productDate}</p>
                <p>Total: {item.Count}</p>
                
               <BasketButton value="Add" id={item.pid} onClick={() => handleBasketAdd(item.pid)}/>
               <div style={{float:"right"}}>

               <BasketButton value="Delete" id={item.pid} onClick={() => handleBasketDelete(item.pid)} />
               </div>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div style={{width:"20%",height:"520px",border:"3px solid grey",float:"left",borderRadius:"10px",marginTop:"5px",marginLeft:"1%",padding:"10px"}}>
          <h2>Total Price:{totalPrice}</h2>
          <div style={{width:"100%",height:"90px",marginTop:"350px"}}>
            <div style={{margin:"0 auto",marginLeft:"17%"}}>
            <PaymentButton value="Proceed to payment"/>
            </div>
            <div style={{marginTop:"-10px",marginLeft:"5%",float:"left"}}>
                <BasketDeleteButton value="Remove Cart" onClick={() => handleAllBasketDelete()}/>
            </div>
            
          </div>
        </div>
    </main>
    )
}