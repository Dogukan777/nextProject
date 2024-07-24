"use client";
import CustomInput from "@/components/input";
import LabelMessage from "@/components/label";
import CustomButton from "@/components/LogInButton"
import Hider from "@/components/layout/hider";
const ProductAddFetch = async (productName:string, productPrice:String) => {
    const response = await fetch(`http://localhost:3001/products/add`, {
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
    return data;
  };

export default function ProductAdd() {
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const productName = e.target[0].value;
        const productPrice = e.target[1].value;
        const lblProductName = document.getElementById("lblProductName");
        const lblProductPrice = document.getElementById("lblProductPRice");

          
        if (!productName && lblProductName) {
            lblProductName.style.display = "block";
        }else if(lblProductName){
            lblProductName.style.display = "none";
        }
        if (!productPrice && lblProductPrice) {
            lblProductPrice.style.display = "block";
        }else if(lblProductPrice){
            lblProductPrice.style.display = "none";
        }
        if(productName && productPrice){
            const currentDate = new Date().toISOString();
            ProductAddFetch(productName,productPrice).then((data) => {
              return alert(data.message);
            });
        }
    }
    return(

        <main>
            <Hider/>
            <form onSubmit={handleSubmit}>
            <div style={{width:"20%",height:"300px",margin:"0 auto",marginTop:"100px"}}>
            <span style={{fontSize:"22px",fontWeight:"550"}}>Product Add Page</span>
                <div style={{ height:"45px",marginTop:"20px"}}>
                    <CustomInput placeHolder="Product name"/>
                    <LabelMessage id="lblProductName" message=" *Product name field cannot be empty"/>
                </div>
                <div style={{ height:"45px" }}>
                    <CustomInput placeHolder="Price"/>
                    <LabelMessage id="lblProductPRice" message=" *PRice field cannot be empty"/>
                </div>
                <div style={{float:"right",marginRight:"25px"}}>
                    <CustomButton value="Add"/>
                </div>
                

            </div>
            </form>
            
        </main>

    );



}