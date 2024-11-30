import GradeAverageForm from "@/components/view-grade-average/ViewGradeAverageForm";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BASE_API_URL } from "@/config/constant";
import { getJwtToken } from "@/lib/utils";
import axios from "axios";

type Props = {
  id: any;
};

const Grade = ({ id }: Props) => {
  const [listTrainee, setListTrainee] = useState([]);
  const [listSubject, setListSubject] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [listSchemes, setListSchemes] = useState([]);

  // const listSchemes = listSubject?.find(
  //   (subject: any) => subject.subjectId === selectedSubject
  // )?.schemes;

  const fetchListTrainee = async () => {
    try {
      const response = await fetch(
        `${BASE_API_URL}/class-management/get-trainee-in-class/${id}`,
        {
          headers: { Authorization: `Bearer ${getJwtToken()}` },
        }
      );
      const res = await response.json();
      setListTrainee(res?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchListSchemesBySubject = async (subjectId: number) => {
    try {
      const response = await fetch(
        `${BASE_API_URL}/subject/detail/${subjectId}`,
        {
          headers: { Authorization: `Bearer ${getJwtToken()}` },
        }
      );
      const res = await response.json();
      if (res?.data) {
        return res?.data;
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
      if (res?.data) {
        const listSubjectScheme = await Promise.all(
          res?.data.map(async (subject: any) => {
            const schemes = await fetchListSchemesBySubject(subject.subjectId);
            return schemes;
          })
        );
        setListSubject(listSubjectScheme);
        setSelectedSubject(listSubjectScheme[0]?.subjectId);
        setListSchemes(listSubjectScheme[0]?.schemes);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${BASE_API_URL}/grade-management/search`,
        {
          classId: id, // ID lớp học
          status: true, // Trạng thái (true: đã kích hoạt, false: chưa kích hoạt)
          pageable: {
            page: 1,
            size: 10, // Số lượng item mỗi trang
          },
        },
        {
          headers: {
            Authorization: `Bearer ${getJwtToken()}`,
          },
        }
      );
      const res = response?.data?.data?.dataSource;
      console.log(res);
      // setStudents(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchListTrainee();
    fetchListSubject();
  }, []);

  console.log(listTrainee);
  console.log(listSubject);

  // Handle subject change
  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
    const schemes = listSubject?.find(
      (subject: any) => subject.subjectId === value
    )?.schemes;
    setListSchemes(schemes);
  };

  const calculateTotal = (assignment: number | null, final: number | null) => {
    if (!assignment || !final) return "";
    return (assignment * 0.5 + final * 0.5).toFixed(1);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Grade Average</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <span className="font-semibold">Subject:</span>
          <Select value={selectedSubject} onValueChange={handleSubjectChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {listSubject?.map((subject: any) => (
                <SelectItem key={subject.subjectId} value={subject.subjectId}>
                  {subject.subjectName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* <div className="flex gap-4">
          <button
            onClick={handleDownloadTemplate}
            className="bg-[#6FBC44] text-white px-6 py-2 rounded-md hover:bg-[#5da639] transition duration-200"
          >
            Download Template
          </button>
          <button
            onClick={handleImport}
            className="bg-[#6FBC44] text-white px-6 py-2 rounded-md hover:bg-[#5da639] transition duration-200"
          >
            Import
          </button>
          <button
            onClick={handleExport}
            className="bg-[#6FBC44] text-white px-6 py-2 rounded-md hover:bg-[#5da639] transition duration-200"
          >
            Export
          </button>
        </div> */}
      </div>

      <div className="bg-white rounded-lg shadow-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#6FBC44] text-white">
              <th className="py-4 px-6 text-left w-16 border-r border-[#5da639]">
                #
              </th>
              <th className="py-4 px-6 text-left border-r border-[#5da639]">
                Trainee Name
              </th>
              <th className="py-4 px-6 text-left border-r border-[#5da639]">
                Email
              </th>
              {/* <th className="py-4 px-6 text-center border-r border-[#5da639]">
                Assignment Average
                <div className="text-sm font-normal">50%</div>
              </th>
              <th className="py-4 px-6 text-center border-r border-[#5da639]">
                Final Average
                <div className="text-sm font-normal">50%</div>
              </th> */}
              {listSchemes?.map((scheme: any) => (
                <th
                  key={scheme.markSchemeId}
                  className="py-4 px-6 text-center border-r border-[#5da639]"
                >
                  {scheme.markName}
                  <div className="text-sm font-normal">
                    {scheme.markWeight}%
                  </div>
                </th>
              ))}
              <th className="py-4 px-6 text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {listTrainee?.map((student: any, index) => (
              <tr key={student.userId} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6 border-r border-gray-200">
                  {index + 1}
                </td>
                <td className="py-4 px-6 border-r border-gray-200">
                  {student.account}
                </td>
                <td className="py-4 px-6 border-r border-gray-200">
                  {student.email}
                </td>
                {listSchemes?.map((scheme: any) => (
                  <td
                    key={scheme.markSchemeId}
                    className="py-4 px-6 text-center border-r border-gray-200"
                  >
                    {student.grades?.find(
                      (grade: any) => grade.schemeId === scheme.schemeId
                    )?.grade || ""}
                  </td>
                ))}
                <td className="py-4 px-6 text-center">
                  {calculateTotal(
                    student.assignmentAverage,
                    student.finalAverage
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Grade;
