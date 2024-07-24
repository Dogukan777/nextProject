"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

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

const BasketFetch = async (): Promise<Basket[]> => {
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

const Hider = ({ onBasketUpdate }: { onBasketUpdate: () => void }) => {
  const [baskets, setBaskets] = useState<Basket[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await BasketFetch();
      setBaskets(result);
      console.log("Fetched Baskets: ", result);
    };

    fetchData();
  }, [onBasketUpdate]);

  const basketCount = baskets ? baskets.length : 0;

  return (
    <header
      style={{
        padding: "1rem",
        backgroundColor: "black",
        color: "white",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Image src="/test.jpg" alt="logo" width={50} height={50} />
      <div style={{ float: "left", width: "84%" }}>
        <nav style={{ marginLeft: "10px" }}>
          <ul style={{ display: "flex", gap: "1rem", float: "left" }}>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/products">Products</a>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <a href="/basket">
          <div style={{
            position: "absolute",
            top: "15",
            right: "1",
            color: "white",
            width: "10px",
            height: "10px",
            marginLeft: "35px",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "2",
            fontSize: "17px",
            marginTop: "-5px"
          }}>{basketCount}
          </div>
          <Image src="/sepet.png" alt="logo" width={45} height={45} style={{ borderRadius: "65px", border: "2px solid black", position: "relative", display: "inline-block", zIndex: "1" }} />
        </a>
      </div>
      <div style={{ width: "70px", height: "32px", paddingRight: "16px", paddingTop: "5px", background: "#B30C00", borderRadius: "5px", marginLeft: "30px" }}>
        <a href="/" style={{ float: "right", fontSize: "16px" }}>Exit</a>
      </div>
    </header>
  );
};

export default Hider;
