"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const getAttendanceColor = (status: string) => {
  switch (status) {
    case 'P': return 'bg-green-100 text-green-800';
    case 'A': return 'bg-red-100 text-red-800';
    case 'L': return 'bg-yellow-100 text-yellow-800';
    case 'An': return 'bg-blue-100 text-blue-800';
    case 'Ln': return 'bg-purple-100 text-purple-800';
    default: return '';
  }
};

const TakeAttendanceForm: React.FC = () => {
  const [attendanceStatus, setAttendanceStatus] = useState<Record<string, 'P' | 'A' | 'L' | 'An' | 'Ln' | '-'>>({});
  const [selectedMonth, setSelectedMonth] = useState("November");
  const [dates, setDates] = useState<string[]>([]);
  const [subject, setSubject] = useState("SQL");
  const [activeTab, setActiveTab] = useState("Attendance");

  const handleAttendanceChange = (studentId: number, date: string, status: 'P' | 'A' | 'L' | 'An' | 'Ln' | '-') => {
    const key = `${studentId}-${date}`;
    setAttendanceStatus((prevStatus) => ({
      ...prevStatus,
      [key]: status,
    }));
  };

  const getAttendanceStatus = (studentId: number, date: string) => {
    const key = `${studentId}-${date}`;
    return attendanceStatus[key] || '-';
  };

  const trainees = [
    { id: 1, name: 'Nguyen Thi Phuong Dieu' },
    { id: 2, name: 'Nguyen Quynh Nga' },
    { id: 3, name: 'Nguyen Dang Kien' },
    { id: 4, name: 'Nguyen Anh Tuan' },
    { id: 5, name: 'Nguyen Minh Hoang' },
  ];

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (month: string): number => {
    const monthIndex = months.indexOf(month);
    return new Date(2024, monthIndex + 1, 0).getDate();
  };

  useEffect(() => {
    const daysInMonth = getDaysInMonth(selectedMonth);
    const newDates = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}/${months.indexOf(selectedMonth) + 1}`);
    setDates(newDates);
  }, [selectedMonth]);

  return (
    <div className="pl-[250px] w-full min-h-screen bg-white">
      <div className="p-6 w-full">
        <div className="mb-6">
          <h1 className="text-3xl font-medium">Class Detail: HN24_CPL.V_JAVA.01</h1>
        </div>

        <div className="flex gap-8 mb-6">
          {["Class Info", "Trainee", "Attendance", "Grade", "Session"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-lg font-medium ${
                activeTab === tab
                  ? "text-black border-b-2 border-black"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <Card className="shadow-none border-0">
          <CardContent className="p-0">
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-4">
                <span className="font-medium">MileStone:</span>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue>{selectedMonth}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>{month}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-medium">Subject:</span>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue>{subject}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SQL">SQL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-3 text-center w-16 bg-green-500 text-white border border-green-600">#</th>
                    <th className="p-3 text-left bg-green-500 text-white border border-green-600" style={{ width: '300px' }}>Name</th>
                    {dates.map((date) => (
                      <th key={date} className="p-3 text-center bg-green-500 text-white border border-green-600 min-w-[120px]">
                        {date}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {trainees.map((trainee, index) => (
                    <tr key={trainee.id}>
                      <td className="p-3 text-center border">{index + 1}</td>
                      <td className="p-3 border" style={{ whiteSpace: 'nowrap' }}>{trainee.name}</td>
                      {dates.map((date) => {
                        const status = getAttendanceStatus(trainee.id, date);
                        return (
                          <td key={`${trainee.id}-${date}`} className="p-3 text-center border">
                            <select 
                              className={`bg-transparent cursor-pointer outline-none w-full text-center font-medium 
                                ${getAttendanceColor(status)}`}
                              value={status}
                              onChange={(e) => handleAttendanceChange(trainee.id, date, e.target.value as any)}
                            >
                              <option value="-">-</option>
                              <option value="P">P</option>
                              <option value="A">A</option>
                              <option value="L">L</option>
                              <option value="An">An</option>
                              <option value="Ln">Ln</option>
                            </select>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TakeAttendanceForm;