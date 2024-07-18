import Image from "next/image";

const Hider = () => {
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
      <nav style={{ marginLeft: "10px" }}>
        <ul style={{ display: "flex", gap: "1rem" }}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Hider;
