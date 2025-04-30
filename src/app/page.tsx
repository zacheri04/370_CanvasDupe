"use client";

import { useState } from "react";
import Section from "@/components/section";

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
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const rows = text.split("\n").map((row) => row.split(","));
    setCsvContent(rows);

    // Example: Construct a query using first row of CSV
    const queryParam = encodeURIComponent(rows[0].join(","));
    const query = `/api/fetch?data=${queryParam}`;
    await fetchData(query);
  };

  return (
    <>
      <Section bgColor={1}>
        <p className="text-5xl">Import Data</p>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="text-lg"
        />
        <p>{csvContent}</p>
      </Section>
    </>
  );
}
