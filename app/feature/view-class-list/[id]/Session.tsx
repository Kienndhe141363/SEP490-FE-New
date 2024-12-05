import { formatDateRange } from "@/components/add-new-class-4/AddNewClass4Form";
import { BASE_API_URL } from "@/config/constant";
import { getJwtToken } from "@/lib/utils";
import { formatDate } from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";

type Props = {
  id: any;
  startDate: any;
};

const Session = ({ id, startDate }: Props) => {
  const [subjects, setSubjects] = useState<any>([]);

  const toggleSubject = (subjectId: number) => {
    setSubjects(
      subjects.map((subject: any) =>
        subject.subjectId === subjectId
          ? { ...subject, isExpanded: !subject.isExpanded }
          : subject
      )
    );
  };

  const fetchTimeTableSubject = async (sessionsList: any, slot: any) => {
    try {
      if (!startDate) return [];
      const response = await fetch(
        `${BASE_API_URL}/class-management/get-time-table-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            startDate: new Date(startDate),
            slot: slot || 1,
            sessions: sessionsList.map((s: any) => ({
              ...s,
              startDate: new Date(startDate),
            })),
          }),
        }
      );
      const res = await response.json();
      console.log("res", res);
      if (res.code === "Success") {
        return res.data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchListSubject = async () => {
    try {
      const response = await fetch(
        `${BASE_API_URL}/subject/get-subject-in-class/${id}`,
        {
          headers: { Authorization: `Bearer ${getJwtToken()}` },
        }
      );
      const res = await response.json();
      // setSubjects(
      //   res?.data?.map((subject: any, index: number) => ({
      //     ...subject,
      //     isExpanded: index === 0,
      //   }))
      // );
      console.log("res", res);
      const newSubjects = await Promise.all(
        res?.data?.map(async (subject: any) => {
          const response = await fetchTimeTableSubject(
            subject.sessionsList,
            subject.slot
          );
          return {
            ...subject,
            isExpanded: true,
            sessionsList: response,
          };
        })
      );

      setSubjects(newSubjects);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchListSubject();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-5 bg-[#6FBC44] text-white rounded-t-lg">
        <div className="p-3 border-r border-white">No</div>
        <div className="p-3 border-r border-white">Lesson</div>
        <div className="p-3 border-r border-white">Order</div>
        <div className="p-3 border-r border-white">Date</div>
        <div className="p-3">Description</div>
      </div>
      {subjects.map((subject: any) => (
        <div key={subject.subjectId} className="border rounded-lg mb-4">
          <div
            className="flex justify-between items-center p-4 cursor-pointer"
            onClick={() => toggleSubject(subject.subjectId)}
          >
            <h3 className="font-bold">{subject.subjectName}</h3>
            {subject?.isExpanded ? <ChevronUp /> : <ChevronDown />}
          </div>

          {/* {subject?.isExpanded && (
            <>
              {subject?.sessionsList.map((lesson: any, index: number) => (
                <div key={index} className="grid grid-cols-5 border-t">
                  <div className="p-4 border-r">{index + 1}</div>
                  <div className="p-4 border-r">{lesson.lesson}</div>
                  <div className="p-4 border-r">{lesson.sessionOrder}</div>
                  <div className="p-4 border-r">
                    {formatDate(new Date(subject.createdDate), "dd/MM/yyyy")}
                  </div>
                  <div className="p-4">{lesson.description}</div>
                </div>
              ))}
            </>
          )} */}
          {subject?.isExpanded && (
            <>
              {subject?.sessionsList?.map((lesson: any, index: number) => (
                <div key={index} className="grid grid-cols-5 border-t">
                  <div className="p-4 border-r">{index + 1}</div>
                  <div className="p-4 border-r">{lesson.lesson}</div>
                  <div className="p-4 border-r">{lesson.sessionOrder}</div>
                  <div className="p-4 border-r">
                    {lesson.date
                      ? formatDateRange(lesson.date, lesson.endDate)
                      : "--"}
                  </div>
                  <div className="p-4">{lesson.description}</div>
                </div>
              ))}
              {/* <LessonForm
                setSubjects={setSubjects}
                subjects={subjects}
                subjectId={subject.subjectId}
              /> */}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Session;
