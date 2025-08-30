// Disable this API route when exporting
export const dynamic = "force-static";
export const revalidate = 60; // or any number

import { NextResponse } from "next/server";
import { signToken } from "@/lib/jwt";

// Replace with your DB logic
async function authenticateUser(email: string, password: string) {
  if (email === "test@example.com" && password === "123456") {
    return { id: 1, email };
  }
  return null;
}

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const user = await authenticateUser(email, password);
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Create JWT
  const token = signToken(user.id);

  // Option A: Return token in JSON (good for mobile/web SPA)
  return NextResponse.json({ token });

  // Option B: Use cookie instead (more secure)
  // const response = NextResponse.json({ success: true });
  // response.cookies.set("token", token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   path: "/",
  //   maxAge: 60 * 60 * 24 * 7, // 7 days
  // });
  // return response;
}
