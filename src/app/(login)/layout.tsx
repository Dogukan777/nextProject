"use client";

import Login from "@/components/login";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLogin, setIsLogin] = useState(false);

  const handleLogin = () => {
    setIsLogin(true);
  };

  return (
    
    <div>
     
      {isLogin ? children : <Login setLogin={handleLogin} />}
    </div>
    
  );
}
