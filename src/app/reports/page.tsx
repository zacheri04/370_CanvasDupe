"use client";

import Section from "@/components/section";

import { CustomButton } from "@/components/CustomButton";
import { useState } from "react";

const fetchData = async (query: string) => {
  try {
    const data = await fetch(query);
    const response = data.json();
    console.log(response);
    return await response;
  } catch (error) {
    console.log(error);
  }
};

export default function Reports() {
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [currentTable, setCurrentTable] = useState(
    "Choose an option to start!"
  );

  return (
    <>
      <Section bgColor={1}>
        <p className="text-5xl">Reports</p>
        <div className="flex flex-row gap-[2rem]">
          {/* Generates a report on the People table */}
          <button
            onClick={async () => {
              setDataToDisplay([]);
              setCurrentTable("Current Registered People");
              const result = await fetchData("/api/reports/people");
              setDataToDisplay(result);
            }}
          >
            <CustomButton label="Get People" />
          </button>

          {/* Generates a report on the Courses */}
          <button
            onClick={async () => {
              setDataToDisplay([]);
              setCurrentTable("Current Course Offerings");
              const result = await fetchData("/api/reports/courses");
              setDataToDisplay(result);
            }}
          >
            <CustomButton label="Get Course Offerings" />
          </button>

          {/* Generates a report of students grades */}
          <button
            onClick={async () => {
              setDataToDisplay([]);
              setCurrentTable("Grades");
              const result = await fetchData("/api/reports/grades");
              setDataToDisplay(result);
            }}
          >
            <CustomButton label="Get Grades" />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-3xl">{currentTable}</p>
          {dataToDisplay.length > 0 && (
            <table className="border border-collapse border-lapis">
              <thead>
                <tr>
                  {Object.keys(dataToDisplay[0]).map((key, index, array) => (
                    <th
                      key={key}
                      className={`border px-2 py-1 bg-charcoal text-white ${
                        index === 0
                          ? "rounded-tl-2xl"
                          : index === array.length - 1
                            ? "rounded-tr-2xl"
                            : ""
                      }`}
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataToDisplay.map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((value, j) => (
                      <td key={j} className="border px-2 py-1 bg-white">
                        {value?.toString()}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Section>
    </>
  );
}
