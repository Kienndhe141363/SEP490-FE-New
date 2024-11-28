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
  // State for subject selection
  const [selectedSubject, setSelectedSubject] = useState("java");

  // State for students data
  const [students, setStudents] = useState<any[]>([
    // {
    //   id: 1,
    //   name: "Nguyễn Văn A",
    //   email: "dieuntphe161355@gmail.com",
    //   assignmentAverage: 9.7,
    //   finalAverage: 8.0,
    // },
    // {
    //   id: 2,
    //   name: "Trần Văn B",
    //   email: "dieuntphe161355@gmail.com",
    //   assignmentAverage: null,
    //   finalAverage: null,
    // },
    // {
    //   id: 3,
    //   name: "Mã Đình Thị Thái H",
    //   email: "dieuntphe161355@gmail.com",
    //   assignmentAverage: null,
    //   finalAverage: null,
    // },
    // {
    //   id: 4,
    //   name: "Hoàng Hoái A",
    //   email: "dieuntphe161355@gmail.com",
    //   assignmentAverage: null,
    //   finalAverage: null,
    // },
    // {
    //   id: 5,
    //   name: "Đinh Thái M",
    //   email: "dieuntphe161355@gmail.com",
    //   assignmentAverage: null,
    //   finalAverage: null,
    // },
  ]);

  const fetchData = async () => {
    try {
      // const response = await fetch(`${BASE_API_URL}/grade-management/search`, {
      //   method: "POST",
      //   body: JSON.stringify({
      //     classId: id,
      //     status: true,
      //     pageable: {
      //       page: 1,
      //       size: 10,
      //     },
      //   }),
      //   headers: { Authorization: `Bearer ${getJwtToken()}` },
      // });
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
      setStudents(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(students);

  // Handle subject change
  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
    // Here you would typically fetch new data based on the selected subject
    console.log(`Loading data for subject: ${value}`);
  };

  // Handle template download
  const handleDownloadTemplate = () => {
    // Create CSV template
    const headers = [
      "ID",
      "Trainee Name",
      "Email",
      "Assignment Average",
      "Final Average",
    ];
    const csvContent = [
      headers.join(","),
      ...students.map((student) =>
        [
          student.id,
          student.name,
          student.email,
          student.assignmentAverage || "",
          student.finalAverage || "",
        ].join(",")
      ),
    ].join("\n");

    // Create and trigger download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `grade_template_${selectedSubject}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Handle import
  const handleImport = () => {
    // Create file input
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const csvData = event.target?.result as string;
          // Parse CSV and update students
          const lines = csvData.split("\n").slice(1); // Skip header
          const newStudents = lines.map((line, index) => {
            const [id, name, email, assignmentAverage, finalAverage] =
              line.split(",");
            return {
              id: parseInt(id),
              name,
              email,
              assignmentAverage: assignmentAverage
                ? parseFloat(assignmentAverage)
                : null,
              finalAverage: finalAverage ? parseFloat(finalAverage) : null,
            };
          });
          setStudents(newStudents);
        };
        reader.readAsText(file);
      }
    };

    input.click();
  };

  // Handle export
  const handleExport = () => {
    // Create CSV content with current data
    const headers = [
      "ID",
      "Trainee Name",
      "Email",
      "Assignment Average",
      "Final Average",
      "Total",
    ];
    const csvContent = [
      headers.join(","),
      ...students.map((student) =>
        [
          student.id,
          student.name,
          student.email,
          student.assignmentAverage || "",
          student.finalAverage || "",
          calculateTotal(student.assignmentAverage, student.finalAverage),
        ].join(",")
      ),
    ].join("\n");

    // Create and trigger download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `grade_export_${selectedSubject}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
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
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="sql">SQL</SelectItem>
              <SelectItem value="python">Python</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-4">
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
        </div>
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
              <th className="py-4 px-6 text-center border-r border-[#5da639]">
                Assignment Average
                <div className="text-sm font-normal">50%</div>
              </th>
              <th className="py-4 px-6 text-center border-r border-[#5da639]">
                Final Average
                <div className="text-sm font-normal">50%</div>
              </th>
              <th className="py-4 px-6 text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {students?.map((student: any) => (
              <tr key={student.id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6 border-r border-gray-200">
                  {student.id}
                </td>
                <td className="py-4 px-6 border-r border-gray-200">
                  {student.name}
                </td>
                <td className="py-4 px-6 border-r border-gray-200">
                  {student.email}
                </td>
                <td className="py-4 px-6 text-center border-r border-gray-200">
                  {student.assignmentAverage || ""}
                </td>
                <td className="py-4 px-6 text-center border-r border-gray-200">
                  {student.finalAverage || ""}
                </td>
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
