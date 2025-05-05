import { createConnection } from "@/lib/db.js";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await createConnection();
    const [departments] = await db.query("SELECT DISTINCT * FROM `Department`");
    const [courses] = await db.query(
      "SELECT Course.Name AS Name, Course.Description AS Description, Course.Course_no AS Course_no, Course.Section_no AS Section_no, Course.Department_id AS Department_id, Person.F_name AS F_name, Person.L_name AS L_name FROM Course INNER JOIN Person ON Person.University_id = Course.University_id"
    );
    return NextResponse.json({ departments, courses });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
