"use client"
import CustomInput from "@/components/input";
import LabelMessage from "@/components/label";
import CustomButton from "@/components/LogInButton"
import { useParams } from 'next/navigation';
import Hider from "@/components/layout/hider";
import { useState, useEffect } from "react";
interface Product {
    id: string;
    name: string;
    price: string;
    date: string;
  }

const ProductIdFetch = async (productId: any): Promise<Product[]> => {
    const response = await fetch(`http://localhost:3001/products/list?id=` + productId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const data = await response.json();
    return data;
  };

  const ProductUpdateFetch = async (productId: any,productName:String,productPrice:String): Promise<Product[]> => {
    const response = await fetch(`http://localhost:3001/products/update?id=` + productId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name:productName,
        price: productPrice,
      }),
    });
  
    const data = await response.json();
    alert(data.message);
    return data;
  };


export default function ProductUpdate() {
    
    const [data, setData] = useState<Product | null>(null);
    const params = useParams();
    const { id } = params;     
    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                const result = await ProductIdFetch(id);
                setData(result[0]);
            };

            fetchData();
        }
    }, [id]);
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const productName=e.target[0].value;
        const productPrice= e.target[1].value;
        ProductUpdateFetch(id,productName,productPrice).then((data) => {
           
        });

    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prevData) => prevData ? { ...prevData, [name]: value } : null);
    };


    return (
        <main>
          <Hider/>
            <form onSubmit={handleSubmit}>
            <div style={{width:"20%",height:"300px",margin:"0 auto",marginTop:"100px"}}>
            <span style={{fontSize:"22px",fontWeight:"550"}}>Update Page</span>
                <div style={{ height:"45px",marginTop:"20px"}}>
                <CustomInput
                            name="name"
                            value={data?.name || ''}
                            placeHolder="Product name"
                            onChange={handleInputChange}
                        />
                    <LabelMessage id="lblProductName" message=" *Product name field cannot be empty"/>
                </div>
                <div style={{ height:"45px" }}>
                <CustomInput
                            name="price"
                            value={data?.price || ''}
                            placeHolder="Price"
                            onChange={handleInputChange}
                        />
                    <LabelMessage id="lblProductPRice" message=" *PRice field cannot be empty"/>
                </div>
                <div style={{float:"right",marginRight:"25px"}}>
                    <CustomButton value="Update"/>
                </div>
                

            </div>
            </form>
        </main>
    )

}