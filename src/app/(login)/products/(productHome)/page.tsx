"use client";
import CustomButton from "@/components/button";
import LoginButton from "@/components/LogInButton";
import CustomSearchInput from "@/components/searchInput";
import CustomDeleteButton from "@/components/deleteButton";
import CustomUpdateButton from "@/components/updateButton";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Hider from "@/components/layout/hider";

interface Product {
  id: string;
  name: string;
  price: string;
  date: string;
}

const ProductFetch = async (): Promise<Product[]> => {
  const response = await fetch(`http://localhost:3001/products/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

const ProductIdFetch = async (productId: string): Promise<Product[]> => {
  const response = await fetch(`http://localhost:3001/products/list?id=` + productId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};
const ProductNameFetch = async (productName: string): Promise<Product[]> => {
  const response = await fetch(`http://localhost:3001/products/list?name=` + productName, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log("data", data);
  return data;
};

const ProductDeleteFetch = async (productId:String): Promise<Product[]> => {
  const response = await fetch(`http://localhost:3001/products/delete?id=` + productId, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
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
export default function Product() {
  const [data, setData] = useState<Product[] | null>(null);
  const [basketUpdate, setBasketUpdate] = useState(0);
  const router = useRouter();
  const productid="";
  const userid="";
  useEffect(() => {
    const fetchData = async () => {
      const result = await ProductFetch();
      setData(result);
    };

    fetchData();
  }, []);
  const handleDelete = async (productId: string) => {
    setData([]);
    if(productId){
      ProductDeleteFetch(productId).then((newData) => {
        const fetchData = async () => {
          const result = await ProductFetch();
          setData(result);
        };
        fetchData();
      });
    }
  }
  const handleBasket= async (urunID:String) =>{
    const userID=localStorage.getItem('userid');
    console.log("urunID",urunID);
    BasketAddFetch(urunID,userID).then((newData)=>{
      setBasketUpdate((prev) => prev + 1);
    });
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const productId = e.target[1].value;
    const productName = e.target[0].value;
    setData([]); // data'yı temizle
    if(productId){
      ProductIdFetch(productId).then((newData) => {
        setData(newData); // yeni veriyi setData ile kaydet
      });
    }
    else if(productName){
      ProductNameFetch(productName).then((newData) => {
        setData(newData); // yeni veriyi setData ile kaydet
      });
    }else{
      ProductFetch().then((newData) => {
        setData(newData); // yeni veriyi setData ile kaydet
      });
    }
      
  };

  return (
    <main>
       <Hider onBasketUpdate={() => setBasketUpdate((prev) => prev + 1)} />
      <div style={{ width: "83%", height: "500px", margin: "0 auto" }}>
        <div style={{ width: "98%", height: "60px", margin: "0 auto" }}>
          <CustomButton value="Add" onClick={()=>router.push("/products/add")}/>
          <div style={{ width: "44%", height: "40px", float: "left", marginTop: "15px", marginLeft: "10px" }}>
            <form onSubmit={handleSubmit}>
              <CustomSearchInput placeHolder="Productname" />
              <CustomSearchInput placeHolder="Productid" />
              <LoginButton value="Search" />
            </form>
          </div>
        </div>

        <div style={{ width: "100%", height: "500px", margin: "0 auto" }}>
          {data ? (
            data.map((item, index) => (
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
              ><button onClick={() => handleBasket(item.id)} style={{float:"right",width:"25px",fontSize:"16px",background:"",borderRadius:"15px"}}>  + </button>
                <p>Id: {item.id}</p> 
                <p>Name: {item.name}</p>
                <p>Price: {item.price}</p>
                <p>Date: {item.date}</p>
                <CustomUpdateButton id={item.id} value="Update"  onClick={()=>router.push("/products/update/"+item.id)}/>
                <CustomDeleteButton id={item.id} value="Delete" onClick={() => handleDelete(item.id)}/>
                
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </main>
  );
}
