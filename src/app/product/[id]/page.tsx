import Image from "next/image";

const PRODUCTS = [
  {
    id: 1,
    name: "product1",
    describe: "product1",
    price: 1,
    img: "/test.jpg",
  },
  {
    id: 2,
    name: "product2",
    describe: "product2",
    price: 2,
    img: "/test.jpg",
  },
  {
    id: 3,
    name: "product3",
    describe: "product3",
    price: 3,
    img: "/test.jpg",
  },
  {
    id: 4,
    name: "product4",
    describe: "product4",
    price: 4,
    img: "/test.jpg",
  },
  {
    id: 5,
    name: "product5",
    describe: "product5",
    price: 5,
    img: "/test.jpg",
  },
  {
    id: 6,
    name: "product6",
    describe: "product6",
    price: 6,
    img: "/test.jpg",
  },
];

const Product = (params: { params: { id: string } }) => {
  const selectProduct = PRODUCTS.find(
    (product) => product.id === Number(params.params.id)
  );

  return (
    <div>
      product {params.params.id}
      <h2>{selectProduct?.name}</h2>
      <p>{selectProduct?.describe}</p>
      <p>
        <strong>Fiyat:</strong>
        {selectProduct?.price} tl
        <Image
          src={selectProduct?.img ?? ""}
          width={200}
          height={200}
          alt={""}
        />
      </p>
    </div>
  );
};

export default Product;
