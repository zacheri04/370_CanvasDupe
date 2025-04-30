import { createConnection } from "@/lib/db.js";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await createConnection();
    const sql =
      "SELECT Person.University_id AS `Student ID`, Person.F_name AS `First Name`, Person.L_name AS `Last Name`, Grade.Grade, GradedMaterial.Title AS `Assignment` FROM Person INNER JOIN Grade ON Person.University_id = Grade.University_id INNER JOIN GradedMaterial ON Grade.Material_id = GradedMaterial.Material_id;"; // Put SQL Here!
    const [posts] = await db.query(sql);
    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
