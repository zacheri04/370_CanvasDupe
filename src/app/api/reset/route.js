import { createConnection } from "@/lib/db.js";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await createConnection();
    await db.query("SET FOREIGN_KEY_CHECKS = 0;");
    await db.query("TRUNCATE TABLE `Course`;");
    await db.query("TRUNCATE TABLE `DiscussionBoard`;");
    await db.query("TRUNCATE TABLE `DiscussionPost`;");
    await db.query("TRUNCATE TABLE `Faculty`;");
    await db.query("TRUNCATE TABLE `Grade`;");
    await db.query("TRUNCATE TABLE `Person`;");
    await db.query("TRUNCATE TABLE `Student`;");
    await db.query("TRUNCATE TABLE `StudentCourse`;");
    await db.query("SET FOREIGN_KEY_CHECKS = 1;");
    return NextResponse.json("success");
  } catch (error) {
    console.log(error);
    return NextResponse.json(`${error}`);
  }
}
