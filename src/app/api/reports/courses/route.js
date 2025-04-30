import { createConnection } from "@/lib/db.js";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await createConnection();
    const sql =
      "SELECT Course.Dept_abbr AS `Department`, Course.Course_no AS `Number`, Course.Name, Course.Description AS `Course Description`, Person.F_name AS `Instructor First Name`, Person.L_name AS `Instructor Last Name`, Person.Email AS `Instructor Email` FROM Course INNER JOIN Person ON Course.University_id = Person.University_id"; // Put SQL Here!
    const [posts] = await db.query(sql);
    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
