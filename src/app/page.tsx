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

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    targetTable: string
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("csvfile", file);
    formData.append("targetTable", targetTable);
  
    try {
      const res = await fetch("/api/upload-csv", {
        method: "POST",
        body: formData,
      });
  
      const result = await res.json();
      alert(result.message || result.error || "Upload complete");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed");
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

        {/* Import into the StudentCourse table */}
        <div className="flex flex-col items-center">
          <p className="text-3xl">Import Enrollment</p>
          <label className="custom-file-upload">
            <input
              type="file"
              className="hidden"
              accept=".csv"
              onChange={(e) => handleFileUpload(e, "StudentCourse")}
            />
            <CustomButton label="Upload Enrollment Data" />
          </label>
        </div>
      </Section>
    </>
  );
}
