import { NextRequest } from "next/server";
import { verifyToken } from "./jwt";

export const auth = {
  async getToken(request: NextRequest) {
    const authHeader = request.headers.get("authorization");
    if (!authHeader) return null;

    const token = authHeader.split(" ")[1];
    if (!token) return null;

    return verifyToken(token);
  },
};
