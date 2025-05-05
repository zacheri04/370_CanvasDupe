import { createConnection } from "@/lib/db.js";
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import csvParser from 'csv-parser';
import mysql from 'mysql2/promise';

// Set up multer to store uploaded files temporarily
const upload = multer({ dest: '/tmp' });

// Disable Next.js body parser so multer can handle multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

// Wrapper to use multer with Next.js
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      return result instanceof Error ? reject(result) : resolve(result);
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  try {
    // Parse file upload
    await runMiddleware(req, res, upload.single('csvfile'));

    const targetTable = req.body.targetTable;

    const filePath = req.file.path;
    const rows = [];

    // Read and parse CSV
    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => rows.push(row))
        .on('end', resolve)
        .on('error', reject);
    });

    // Connect to MySQL
    const db = await createConnection();

    // Insert each row into MySQL for Person table
    if (targetTable === 'Person') {
        for (const row of rows) {
          await db.execute(
            'INSERT INTO Person (University_id, F_name, L_name, Gender, Pref_name, Email, Password) VALUES (?, ?, ?, ?, ?, ?, ?)',
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
        await db.end();
      }

      if (targetTable === 'Course') {
        for (const row of rows) {
            await db.execute(
                'INSERT INTO Course (Course_id, University_id, Name, Description, Dept_abbr, Course_no, Section_no) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [
                    row.Course_id,
                    row.University_id,
                    row.Name,
                    row.Description,
                    row.Dept_abbr,
                    row.Course_no,
                    row.Section_no,
                ]
            );
        }
        await db.end();
      }

      if (targetTable === 'StudentCourse') {
        for (const row of rows) {
            await db.execute(
                'INSERT INTO StudentCourse (University_id. Course_id) VALUES (?, ?)',
                [
                    row.University_id,
                    row.Course_id,
                ]
            );
        }
        await db.end();
      }
      

    res.status(200).json({ message: 'CSV uploaded and data inserted!' });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Something went wrong during upload.' });
  }
}
