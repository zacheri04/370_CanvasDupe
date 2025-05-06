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

function renderPeopleTable(
  people: { [key: string]: any },
  registration: { [key: string]: any }
) {
  return (
    <>
      <p className="text-5xl">Student Registration Report</p>
      {Object.keys(people).map((key) => (
        <div className="flex flex-col gap-[1rem]" key={key}>
          <div className="flex items-center flex-col">
            <p className="text-2xl">
              Student: {people[key].F_name} {people[key].L_name}{" "}
            </p>
            <p>{`University ID # ${people[key].University_id}`}</p>
          </div>
          <div className="w-full min-w-lg mx-auto">
            <table className="w-full table-auto border-collapse rounded-lg shadow-md overflow-hidden">
              <thead>
                <tr className="bg-lapis text-white text-left">
                  <th className="px-4 py-2 w-1/6">Department</th>
                  <th className="px-4 py-2 w-1/6">Course</th>
                  <th className="px-4 py-2 w-1/6">Section</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(registration).map(
                  (innerKey, index) =>
                    registration[innerKey].University_id ===
                      people[key].University_id && (
                      <tr
                        key={innerKey}
                        className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                      >
                        <td className="px-4 py-2">
                          {registration[innerKey].Dept_abbr}
                        </td>
                        <td className="px-4 py-2">
                          {registration[innerKey].Course_no}
                        </td>
                        <td className="px-4 py-2">
                          {registration[innerKey].Section_no}
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </>
  );
}

function renderCoursesTable(
  departments: { [key: string]: any },
  courses: { [key: string]: any }
) {
  return (
    <>
      <p className="text-5xl">Course Offerings</p>
      {Object.keys(departments).map((key) => (
        <div className="flex flex-col gap-[1rem]" key={key}>
          <div className="flex items-center flex-col">
            <p className="text-2xl">{departments[key].Dept_abbr} Department</p>
          </div>
          <div className="w-full min-w-lg mx-auto">
            <table className="w-full table-auto border-collapse rounded-lg shadow-md overflow-hidden">
              <thead>
                <tr className="bg-lapis text-white text-left">
                  <th className="px-4 py-2 w-1/6">Number</th>
                  <th className="px-4 py-2 w-1/6">Section</th>
                  <th className="px-4 py-2 w-1/3">Course Name</th>
                  <th className="px-4 py-2 w-1/3">Course Description</th>
                  <th className="px-4 py-2 w-1/3">Instructor</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(courses).map(
                  (innerKey, index) =>
                    courses[innerKey].Department_id ===
                      departments[key].Department_id && (
                      <tr
                        key={innerKey}
                        className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                      >
                        <td className="px-4 py-2">
                          {courses[innerKey].Course_no}
                        </td>
                        <td className="px-4 py-2">
                          {courses[innerKey].Section_no}
                        </td>
                        <td className="px-4 py-2">{courses[innerKey].Name}</td>
                        <td className="px-4 py-2">
                          {courses[innerKey].Description}
                        </td>
                        <td className="px-4 py-2">
                          {courses[innerKey].L_name}
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </>
  );
}

function renderGradeTable(
  people: { [key: string]: any },
  gradeEntries: { [key: string]: any }
) {
  return (
    <>
      <p className="text-5xl">Grade Reports</p>
      {Object.keys(people).map((key) => (
        <div className="flex flex-col gap-[1rem]" key={key}>
          <div className="flex items-center flex-col">
            <p className="text-2xl">
              Student: {people[key].F_name} {people[key].L_name}{" "}
            </p>
            <p>{`University ID # ${people[key].University_id}`}</p>
          </div>
          <div className="w-full min-w-lg mx-auto">
            <table className="w-full table-auto border-collapse rounded-lg shadow-md overflow-hidden">
              <thead>
                <tr className="bg-lapis text-white text-left">
                  <th className="px-4 py-2 w-2/3">Assignment</th>
                  <th className="px-4 py-2 w-1/3">Grade</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(gradeEntries).map(
                  (innerKey, index) =>
                    gradeEntries[innerKey].University_id ===
                      people[key].University_id && (
                      <tr
                        key={innerKey}
                        className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                      >
                        <td className="px-4 py-2">
                          {gradeEntries[innerKey].Assignment}
                        </td>
                        <td className="px-4 py-2">
                          {gradeEntries[innerKey].Grade}
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </>
  );
}

export default function Reports() {
  const [gradeDataToDisplay, setGradeDataToDisplay] = useState([]);
  const [courseDataToDisplay, setCourseDataToDisplay] = useState([]);
  const [peopleDataToDisplay, setPeopleDataToDisplay] = useState([]);

  const [tableNum, setTableNum] = useState(-1);

  return (
    <>
      <Section bgColor={1}>
        <p className="text-6xl">Reports</p>
        <div className="flex flex-row gap-[2rem]">
          {/* Generates a report on the People table */}
          <button
            onClick={async () => {
              const result = await fetchData("/api/reports/people");
              setPeopleDataToDisplay(result);
              setTableNum(1);
            }}
          >
            <CustomButton label="Get Registration" />
          </button>

          {/* Generates a report on the Courses */}
          <button
            onClick={async () => {
              const result = await fetchData("/api/reports/courses");
              setCourseDataToDisplay(result);
              setTableNum(2);
            }}
          >
            <CustomButton label="Get Course Offerings" />
          </button>

          {/* Generates a report of students grades */}
          <button
            onClick={async () => {
              const result = await fetchData("/api/reports/grades");
              setGradeDataToDisplay(result);
              setTableNum(3);
            }}
          >
            <CustomButton label="Get Grades" />
          </button>
        </div>

        {tableNum === 3 &&
          gradeDataToDisplay.people &&
          renderGradeTable(
            gradeDataToDisplay.people,
            gradeDataToDisplay.gradeEntries
          )}

        {tableNum === 2 &&
          courseDataToDisplay.departments &&
          renderCoursesTable(
            courseDataToDisplay.departments,
            courseDataToDisplay.courses
          )}

        {tableNum === 1 &&
          peopleDataToDisplay.people &&
          renderPeopleTable(
            peopleDataToDisplay.people,
            peopleDataToDisplay.registration
          )}
      </Section>
    </>
  );
}
