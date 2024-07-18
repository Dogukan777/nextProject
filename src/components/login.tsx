"use client";

const authenticateUser = async (username: string, password: string) => {
  const response = await fetch(`http://localhost:3000/api/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  const data = await response.json();
  return data;
};
const fetchUsersList = async () => {
  try {
    const response = await fetch(`http://localhost:3001/users/list`, {
      mode: 'no-cors'
    });
    if(!response.ok) throw new Error(`This is an HTTP error: The status is ${response.status}`);
    const data = await response.json();
    console.log("Users List:", data); // JSON verisini konsola yazdır
  } catch (error) {
    console.error('Error fetching users list:', error);
  }
}; 
const Login = ({ setLogin }: { setLogin: () => void }) => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    authenticateUser(e.target[0].value, e.target[1].value).then((data) => {
      if (data.isLoggedIn) {
        fetchUsersList();
        return setLogin();
      }
      if (!data.isLoggedIn) {
        return alert(data.message);
      }
    });
    console.log(e.target[0].value, e.target[1].value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "300px",
        margin: "auto",
        marginTop: "100px",
      }}
    >
      <h1>Login</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: "10px", flexDirection: "column" }}
      >
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
