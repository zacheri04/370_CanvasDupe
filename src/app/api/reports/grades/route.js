import { createConnection } from "@/lib/db.js";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await createConnection();
    const sql =
      "SELECT DISTINCT Person.University_id, Grade.Grade, GradedMaterial.Title AS `Assignment` FROM Person INNER JOIN Grade ON Person.University_id = Grade.University_id INNER JOIN GradedMaterial ON Grade.Material_id = GradedMaterial.Material_id;"; // Put SQL Here!
    const [gradeEntries] = await db.query(sql);
    const [people] = await db.query(
      "SELECT DISTINCT Grade.University_id, F_name, L_name  FROM `Grade` INNER JOIN `Person` ON Grade.University_id = Person.University_id"
    );
    return NextResponse.json({ people, gradeEntries });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
