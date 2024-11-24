"use client";
import React, { useState } from "react";
import {
  Home,
  Users,
  BookOpen,
  Settings,
  LogOut,
  CheckCircle2,
  MinusCircle,
} from "lucide-react";
import Image from "next/image";

interface AddNewClass3FormProps {
  setActiveStep: (step: number) => void;
  data: any;
  setData: any;
}

const AddNewClass3Form = ({
  setActiveStep,
  data,
  setData,
}: AddNewClass3FormProps) => {
  const activeTab = "Trainee";

  const handleCancel = () => {
    setActiveStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("e", e);
    setActiveStep(3);
  };

  const [inClass, setInClass] = useState([
    {
      id: 1,
      name: "DieuNTP",
      email: "dieuntphe161355@fpt.edu.vn",
      phone: "0336627895",
    },
    {
      id: 2,
      name: "NgaNQ",
      email: "nganqhe1625342@fpt.edu.vn",
      phone: "0337462847",
    },
    {
      id: 3,
      name: "DieuNTP",
      email: "dieuntphe161355@fpt.edu.vn",
      phone: "0336627895",
    },
    {
      id: 4,
      name: "NgaNQ",
      email: "nganqhe1625342@fpt.edu.vn",
      phone: "0337462847",
    },
    {
      id: 5,
      name: "DieuNTP",
      email: "dieuntphe161355@fpt.edu.vn",
      phone: "0336627895",
    },
  ]);

  const handleRemoveFromClass = (id: number) => {
    const userToRemove = inClass.find((user) => user.id === id);
  };

  console.log(data);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[250px] bg-[#6FBC44] h-full flex flex-col">
        <div className="p-8">
          <div className="flex items-center gap-2">
            <img
              src="/assets/images/fpt-software.png"
              alt="FPT Software"
              className="h-8"
            />
            <div className="border-l-2 border-white h-8 mx-2"></div>
            <img
              src="/assets/images/fpt-academy.png"
              alt="FPT Academy"
              className="h-8"
            />
          </div>
        </div>

        <nav className="flex flex-col flex-1 text-white">
          <a
            href="#"
            className="flex items-center px-6 py-3 hover:bg-[#5da33a]"
          >
            <Home className="mr-3" /> Home
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-3 hover:bg-[#5da33a]"
          >
            <Users className="mr-3" /> User Management
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-3 hover:bg-[#5da33a]"
          >
            <BookOpen className="mr-3" /> Course Management
          </a>
        </nav>

        <div className="mt-auto px-6 py-3 text-white">
          <a href="#" className="flex items-center hover:text-gray-200">
            <Settings className="mr-3" /> Setting
          </a>
          <a href="#" className="flex items-center mt-3 hover:text-gray-200">
            <Users className="mr-3" /> My Account
          </a>
          <a href="#" className="flex items-center mt-3 hover:text-gray-200">
            <LogOut className="mr-3" /> Sign out
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold">Add New Class</h1>
        <div className="mt-6">
          {/* Tabs */}
          <div className="flex space-x-4 border-b border-gray-300">
            {["Class Info", "Trainee", "Session"].map((tab) => (
              <button
                key={tab}
                className={`pb-2 ${
                  activeTab === tab ? "border-b-2 border-[#6FBC44]" : ""
                }`}
                disabled={activeTab !== tab}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="mt-6">
            {/* Trainee in Class Section */}
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Trainee in class</h2>
              <div className="flex gap-4">
                <button className="px-4 py-2 text-blue-600 hover:underline">
                  Download Template
                </button>
                <button className="px-6 py-2 bg-[#6FBC44] text-white rounded">
                  Import
                </button>
              </div>
            </div>

            {/* In Class Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#6FBC44] text-white">
                    <th className="py-4 px-6 text-left w-[10%] border-r border-gray-300">
                      #
                    </th>
                    <th className="py-4 px-6 text-left w-[25%] border-r border-gray-300">
                      Account
                    </th>
                    <th className="py-4 px-6 text-left w-[35%] border-r border-gray-300">
                      Email
                    </th>
                    <th className="py-4 px-6 text-left w-[20%] border-r border-gray-300">
                      Phone number
                    </th>
                    <th className="py-4 px-6 w-[10%]"></th>
                  </tr>
                </thead>
                <tbody>
                  {inClass.map((trainee, index) => (
                    <tr
                      key={trainee.id}
                      className={index % 2 === 1 ? "bg-[#EFF5EB]" : ""}
                    >
                      <td className="py-4 px-6 border-r border-gray-300">
                        {trainee.id}
                      </td>
                      <td className="py-4 px-6 border-r border-gray-300">
                        {trainee.name}
                      </td>
                      <td className="py-4 px-6 border-r border-gray-300">
                        {trainee.email}
                      </td>
                      <td className="py-4 px-6 border-r border-gray-300">
                        {trainee.phone}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => handleRemoveFromClass(trainee.id)}
                        >
                          <MinusCircle className="w-6 h-6 text-red-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                className="px-8 py-2 bg-[#D5DCD0] text-black rounded"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="px-8 py-2 bg-[#6FBC44] text-white rounded"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewClass3Form;
