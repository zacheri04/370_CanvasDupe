import { IncomingForm } from "formidable";
import fs from "fs";
import csvParser from "csv-parser";
import { createConnection } from "@/lib/db";
import { NextResponse } from "next/server";
import { Readable } from "stream";

// Required for formidable to not throw errors in Next.js 13+/App Router
export const config = {
  api: {
    bodyParser: false,
  },
};

function streamToNodeReadable(request) {
  const reader = request.body.getReader();
  return new Readable({
    async read() {
      const { done, value } = await reader.read();
      if (done) {
        this.push(null);
      } else {
        this.push(value);
      }
    },
  });
}

function parseFormData(nodeReadable) {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({ uploadDir: "/tmp", keepExtensions: true });
    form.parse(nodeReadable, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

export async function POST(req) {
  try {
    const nodeRequest = streamToNodeReadable(req);
    nodeRequest.headers = Object.fromEntries(req.headers); // Required by formidable

    const { fields, files } = await parseFormData(nodeRequest);
    const targetTable = fields.targetTable?.[0];
    const uploadedFile = files.csvfile?.[0];

    if (!uploadedFile || !uploadedFile.filepath) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    const filePath = uploadedFile.filepath;
    const rows = [];

    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (row) => rows.push(row))
        .on("end", resolve)
        .on("error", reject);
    });

    const db = await createConnection();

    if (targetTable === "Person") {
      for (const row of rows) {
        await db.query(
          "INSERT INTO Person (University_id, F_name, L_name, Gender, Pref_name, Email, Password) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [
            row.University_id,
            row.F_name,
            row.L_name,
            row.Gender,
            row.Pref_name,
            row.Email,
            row.Password,
          ]
        );
      }
    }

    if (targetTable === "Course") {
      for (const row of rows) {
        await db.query(
          "INSERT INTO Course (Course_id, University_id, Name, Description, Course_no, Section_no, Department_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [
            row.Course_id,
            row.University_id,
            row.Name,
            row.Description,
            row.Course_no,
            row.Section_no,
            row.Department_id,
          ]
        );
      }
    }

    if (targetTable === "Grade") {
      for (const row of rows) {
        await db.query(
          "INSERT INTO Grade (University_id, Material_id, Grade) VALUES (?, ?, ?)",
          [row.University_id, row.Material_id, row.Grade]
        );
      }
    }

    if (targetTable === "StudentCourse") {
      for (const row of rows) {
        await db.query(
          "INSERT INTO StudentCourse (University_id, Course_id) VALUES (?, ?)",
          [row.University_id, row.Course_id]
        );
      }
    }

    return NextResponse.json(
      { message: "CSV uploaded and data inserted!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
