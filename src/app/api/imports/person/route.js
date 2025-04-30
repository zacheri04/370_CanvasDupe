import { createConnection } from "@/lib/db.js";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await createConnection();
    const sql = "INSERT INTO `Person` VALUES ";
    const [posts] = await db.query(sql);
    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
