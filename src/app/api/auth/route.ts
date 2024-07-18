import { NextRequest, NextResponse } from "next/server";

const users = [
  {
    id: 1,
    name: "admin",
    password: "admin",
  },
  {
    id: 2,
    name: "user",
    password: "user",
  },
];

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  const user = users.find(
    (user) => user.name === username && user.password === password
  );

  if (user) {
    return NextResponse.json({
      message: "Login başarılı",
      name: user.name,
      isLoggedIn: true,
    });
  }

  return NextResponse.json(
    { message: "Kullanıcı adı veya şifre yanlış", isLoggedIn: false, name: "" },
    { status: 401 }
  );
}
