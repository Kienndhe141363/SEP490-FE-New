"use client";
import React from 'react';
import Link from 'next/link';
import { Home, Users, BookOpen, Settings, LogOut, UserCircle, BookCheck } from 'lucide-react';

const ViewSubjectGradeDetailTraineeForm = () => {
    const gradeData = [
        {
          category: "Assignment",
          weight: "15%",
          grade: 8
        },
        {
          category: "Practice Exam",
          weight: "40%",
          grade: 8
        },
        {
          category: "Audit",
          weight: "45%",
          grade: 8
        },
        {
          category: "Total",
          weight: "100%",
          grade: 8
        }
      ];
    
      return (
        <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-[#6FBC44] fixed h-screen">
        <div className="p-6">
          <img
            src="/assets/images/fpt-logo.png"
            alt="FPT Logo"
            className="w-40 mb-12"
          />
        </div>

        <nav className="text-white space-y-1">
          <Link href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <Home className="w-6 h-6 mr-4" />
            <span className="font-semibold">Home</span>
          </Link>
          <Link href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <Users className="w-6 h-6 mr-4" />
            <span className="font-semibold">User Management</span>
          </Link>
          <Link href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <BookOpen className="w-6 h-6 mr-4" />
            <span className="font-semibold">Curriculum Management</span>
          </Link>
          <Link href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <BookOpen className="w-6 h-6 mr-4" />
            <span className="font-semibold">Class Management</span>
          </Link>
        </nav>

        <div className="absolute bottom-0 w-full pb-4">
          <Link href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <UserCircle className="w-6 h-6 mr-4" />
            <span className="text-white font-semibold">My Account</span>
          </Link>
          <Link href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <LogOut className="w-6 h-6 mr-4" />
            <span className="text-white font-semibold">Sign out</span>
          </Link>
        </div>
      </div>
    
          {/* Main Content */}
          <div className="flex-1 ml-[228px] bg-[#EFF5EB] min-h-screen flex flex-col">
            <div className="p-24 flex-grow">
              <h1 className="text-5xl font-bold mb-12">Grade detail report</h1>
    
              <div className="bg-white rounded-lg overflow-hidden">
                <div className="grid grid-cols-3 bg-[#6FBC44] text-white font-semibold divide-x divide-white border border-[#6FBC44]">
                  <div className="py-4 px-6 text-center">Grade category</div>
                  <div className="py-4 px-6 text-center">Weight</div>
                  <div className="py-4 px-6 text-center">Grade</div>
                </div>
    
                {gradeData.map((item, index) => (
                  <div 
                    key={index} 
                    className="grid grid-cols-3 border-b divide-x border-x"
                  >
                    <div className="py-4 px-6 text-center">{item.category}</div>
                    <div className="py-4 px-6 text-center">{item.weight}</div>
                    <div className="py-4 px-6 text-center">{item.grade}</div>
                  </div>
                ))}
              </div>
            </div>
    
            {/* Back button container - fixed at bottom */}
            <div className="p-8 flex justify-center border-t bg-[#EFF5EB]">
              <Link 
                href="#" 
                className="px-8 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      );
    };

export default ViewSubjectGradeDetailTraineeForm;