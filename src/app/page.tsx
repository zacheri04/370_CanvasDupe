"use client";

import { useState } from "react";
import Section from "@/components/section";
import { CustomButton } from "@/components/CustomButton";

const fetchData = async (query: string) => {
  try {
    const data = await fetch(query);
    const response = await data.json();
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default function Home() {
  const [csvContent, setCsvContent] = useState<string[][] | null>(null);

  const handleFileUpload = async (e: any, targetTable: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("csvfile", file); // field name must match server
    formData.append("targetTable", targetTable);

    try {
      const res = await fetch("/api/imports", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        alert("Upload successful: " + result.message);
      } else {
        alert("Upload failed: " + result.error);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <>
      <Section bgColor={1}>
        <p className="text-5xl">Import Data</p>

        {/* Import into the People table */}
        <div className="flex flex-col items-center">
          <p className="text-3xl">Import People</p>
          <label className="custom-file-upload">
            <input
              type="file"
              className="hidden"
              accept=".csv"
              onChange={(e) => handleFileUpload(e, "Person")}
            />
            <CustomButton label="Upload People Entries" />
          </label>
        </div>

        {/* Import into the Course table */}
        <div className="flex flex-col items-center">
          <p className="text-3xl">Import Courses</p>
          <label className="custom-file-upload">
            <input
              type="file"
              className="hidden"
              accept=".csv"
              onChange={(e) => handleFileUpload(e, "Course")}
            />
            <CustomButton label="Upload Course Entries" />
          </label>
        </div>

        {/* Import into the Grade table */}
        <div className="flex flex-col items-center">
          <p className="text-3xl">Import Grades</p>
          <label className="custom-file-upload">
            <input
              type="file"
              className="hidden"
              accept=".csv"
              onChange={(e) => handleFileUpload(e, "Grade")}
            />
            <CustomButton label="Upload Course Entries" />
          </label>
        </div>

        {/* Import into the StudentCourse table */}
        <div className="flex flex-col items-center">
          <p className="text-3xl">Import Registration</p>
          <label className="custom-file-upload">
            <input
              type="file"
              className="hidden"
              accept=".csv"
              onChange={(e) => handleFileUpload(e, "StudentCourse")}
            />
            <CustomButton label="Upload Registration Data" />
          </label>
        </div>

        {/* Reset Button */}
        <button
          onClick={async () => {
            const result = await fetchData("/api/reset");
            alert(result);
          }}
        >
          <CustomButton label="Reset Tables" />
        </button>
      </Section>
    </>
  );
}
