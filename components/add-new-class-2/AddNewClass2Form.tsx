"use client";
import React, { useState } from "react";
import { Home, Users, BookOpen, Settings, LogOut } from "lucide-react";

const AddNewClass2Form: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Class Info");

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
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da33a]">
            <Home className="mr-3" /> Home
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da33a]">
            <Users className="mr-3" /> User Management
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da33a]">
            <BookOpen className="mr-3" /> Curriculum Management
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da33a]">
            <BookOpen className="mr-3" /> Class Management
          </a>
        </nav>

        <div className="px-6 py-3 text-white">
          <a href="#" className="flex items-center hover:text-gray-200">
            <Settings className="mr-3" /> My Account
          </a>
          <a href="#" className="flex items-center mt-3 hover:text-gray-200">
            <LogOut className="mr-3" /> Sign Out
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
                className={`pb-2 ${activeTab === tab ? "border-b-2 border-[#6FBC44]" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Form Content */}
          <div className="mt-6">
            {activeTab === "Class Info" && (
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block font-bold">Class Name</label>
                  <input type="text" className="w-full border p-2" placeholder="Enter class name" />
                </div>
                <div>
                  <label className="block font-bold">Admin</label>
                  <input type="text" className="w-full border p-2" value="DungNTP9" readOnly />
                </div>
                <div>
                  <label className="block font-bold">Class Code</label>
                  <input type="text" className="w-full border p-2" placeholder="Enter class code" />
                </div>
                <div>
                  <label className="block font-bold">Location</label>
                  <select className="w-full border p-2">
                    <option>Select location</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold">Generation</label>
                  <select className="w-full border p-2">
                    <option>HN24</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold">Curriculum</label>
                  <input type="text" className="w-full border p-2" value="C#" readOnly />
                </div>
                <div>
                  <label className="block font-bold">Start Date</label>
                  <input type="date" className="w-full border p-2" />
                </div>
                <div>
                  <label className="block font-bold">End Date</label>
                  <input type="date" className="w-full border p-2" />
                </div>
                <div>
                  <label className="block font-bold">Supplier</label>
                  <input type="text" className="w-full border p-2" value="FA GPS" readOnly />
                </div>
                <div>
                  <label className="block font-bold">Plan Trainee Number</label>
                  <input type="number" className="w-full border p-2" placeholder="Enter number" />
                </div>

                {/* Table Section */}
                <div className="col-span-2">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-[#6FBC44] text-white">
                        <th className="border border-gray-300 p-2">Code</th>
                        <th className="border border-gray-300 p-2">Slot</th>
                        <th className="border border-gray-300 p-2">Trainer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {["SQL", "C#"].map((subject) => (
                        <tr key={subject}>
                          <td className="border border-gray-300 p-2">{subject}</td>
                          <td className="border border-gray-300 p-2">
                            <select className="w-full border p-1">
                              <option>Select Slot</option>
                            </select>
                          </td>
                          <td className="border border-gray-300 p-2">
                            <select className="w-full border p-1">
                              <option>Select Trainer</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="col-span-2">
                  <label className="block font-bold">Note</label>
                  <textarea className="w-full border p-2" rows={3}></textarea>
                </div>
              </div>
            )}
          </div>

          {/* Buttons Section */}
          <div className="flex justify-center mt-6 space-x-4">
            <button className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
            <button className="bg-[#6FBC44] text-white px-4 py-2 rounded">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewClass2Form;