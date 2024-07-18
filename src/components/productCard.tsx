"use client";
import Image from "next/image";
import CustomButton from "./button";
import { useRouter } from "next/navigation";

interface IProductCardProps {
  title: string;
  desc: string;
  price: number;
  img: string;
}

const ProductCard = ({ title, desc, price, img }: IProductCardProps) => {
  const router = useRouter();
  return (
    <div
      style={{
        border: "none",
        padding: "10px",
        gap: "10px",
        backgroundColor: "gray",
        borderRadius: "10px",
      }}
    >
      <Image src={img} alt={title} width={200} height={200} />
      <h2 onClick={() => router.push(`/product/${1}`)}>{title}</h2>
      <p>{desc}</p>
      <p style={{ fontWeight: "bold", textAlign: "right" }}>{price} TL</p>
      <CustomButton />
    </div>
  );
};

export default ProductCard;
