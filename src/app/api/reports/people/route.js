import { createConnection } from "@/lib/db.js";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await createConnection();
    const [people] = await db.query(
      "SELECT DISTINCT Person.University_id, F_name, L_name FROM `Person` INNER JOIN StudentCourse ON Person.University_id = StudentCourse.University_id"
    );
    const [registration] = await db.query(
      "SELECT Person.F_name, Person.L_name, Person.University_id, Course.Course_no, Course.Section_no, Department.Dept_abbr FROM Person INNER JOIN StudentCourse ON Person.University_id = StudentCourse.University_id INNER JOIN Course ON Course.Course_id = StudentCourse.Course_id INNER JOIN Department ON Department.Department_id = Course.Department_id"
    );
    return NextResponse.json({ people, registration });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
