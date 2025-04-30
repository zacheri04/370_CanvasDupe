import { createConnection } from "@/lib/db.js";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await createConnection();
    const sql =
      "SELECT University_id AS `Univerity ID`,	F_name AS `First Name`,	Pref_name AS `Preferred Name`,	L_name AS `Last Name`, Gender,	Email FROM `Person`";
    const [posts] = await db.query(sql);
    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
