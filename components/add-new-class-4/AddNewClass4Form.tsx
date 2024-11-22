"use client";
import React, { useState } from "react";
import { Home, Users, BookOpen, Settings, LogOut, ChevronUp, ChevronDown, Plus } from "lucide-react";

interface Lesson {
  id: number;
  name: string;
  order: number;
  date: string;
  description?: string;
}

interface Subject {
  id: number;
  name: string;
  lessons: Lesson[];
  isExpanded: boolean;
}

const AddNewClass4Form: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Session");
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: 1,
      name: "Subject 1",
      isExpanded: true,
      lessons: [
        { id: 1, name: "Lesson 1", order: 1, date: "21/12/2024" },
        { id: 2, name: "Lesson 1", order: 2, date: "21/12/2024" },
        { id: 3, name: "Lesson 1", order: 3, date: "21/12/2024" },
        { id: 4, name: "Lesson 1", order: 4, date: "21/12/2024" },
      ]
    },
    {
      id: 2,
      name: "Subject 2",
      isExpanded: false,
      lessons: []
    }
  ]);

  const toggleSubject = (subjectId: number) => {
    setSubjects(subjects.map(subject => 
      subject.id === subjectId 
        ? { ...subject, isExpanded: !subject.isExpanded }
        : subject
    ));
  };

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
            <Home className="mr-3" /> Dashboard
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
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold">Add New Class</h1>

        {/* Tabs */}
        <div className="mt-6">
          <div className="flex space-x-4 border-b border-gray-300">
            {["Class Info", "Trainee", "Session"].map((tab) => (
              <button
                key={tab}
                className={`pb-2 ${
                  activeTab === tab ? "border-b-2 border-[#6FBC44]" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Session Content */}
          <div className="mt-6">
            {/* Header with borders */}
            <div className="grid grid-cols-5 bg-[#6FBC44] text-white rounded-t-lg">
              <div className="p-3 border-r border-white">No</div>
              <div className="p-3 border-r border-white">Lesson</div>
              <div className="p-3 border-r border-white">Order</div>
              <div className="p-3 border-r border-white">Date</div>
              <div className="p-3">Description</div>
            </div>

            {subjects.map(subject => (
              <div key={subject.id} className="border rounded-lg mb-4">
                <div 
                  className="flex justify-between items-center p-4 cursor-pointer"
                  onClick={() => toggleSubject(subject.id)}
                >
                  <h3 className="font-bold">{subject.name}</h3>
                  {subject.isExpanded ? <ChevronUp /> : <ChevronDown />}
                </div>
                
                {subject.isExpanded && (
                  <>
                    {subject.lessons.map(lesson => (
                      <div key={lesson.id} className="grid grid-cols-5 border-t">
                        <div className="p-4 border-r">{lesson.id}</div>
                        <div className="p-4 border-r">{lesson.name}</div>
                        <div className="p-4 border-r">{lesson.order}</div>
                        <div className="p-4 border-r">{lesson.date}</div>
                        <div className="p-4">{lesson.description}</div>
                      </div>
                    ))}
                    <div className="p-4 border-t">
                      <div className="flex gap-4 items-center">
                        <Plus size={20} />
                        <input
                          type="text"
                          placeholder="Lesson Name:"
                          className="bg-gray-100 p-2 rounded"
                        />
                        <input
                          type="number"
                          placeholder="Order"
                          className="bg-gray-100 p-2 rounded w-24"
                        />
                        <input
                          type="text"
                          placeholder="Description:"
                          className="bg-gray-100 p-2 rounded flex-1"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}

            {/* Navigation Buttons */}
            <div className="flex justify-center mt-6 space-x-4">
              <button className="bg-gray-200 px-6 py-2 rounded">Back</button>
              <button className="bg-[#6FBC44] text-white px-6 py-2 rounded">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewClass4Form;