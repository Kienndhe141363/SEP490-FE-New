"use client";
import React from "react";
import { Home, Users, BookOpen, Settings, LogOut, UserCircle, BookCheck } from "lucide-react";

interface FeedbackDetailData {
  class: string;
  trainer: string;
  subjectName: string;
  duration: string;
  curriculumRating: number;
  recommendCourse: boolean;
  satisfiedCurriculum: boolean;
  trainerTeachFull: boolean;
  trainerOnTime: boolean;
  description: string;
}

const FeedbackDetailForm: React.FC = () => {
  // Sample data - in a real app, this would come from an API
  const feedbackDetail: FeedbackDetailData = {
    class: "Java01",
    trainer: "HuyLT",
    subjectName: "Java",
    duration: "12/8/2024-12/12-2024",
    curriculumRating: 3,
    recommendCourse: true,
    satisfiedCurriculum: true,
    trainerTeachFull: true,
    trainerOnTime: true,
    description: ""
  };

  const renderStar = (position: number) => {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={position <= feedbackDetail.curriculumRating ? "#FFD700" : "none"}
        stroke="#FFD700"
        strokeWidth="2"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  };

  return (
    <div className="flex min-h-screen max-h-screen overflow-hidden bg-[#EFF5EB]">
      {/* Sidebar */}
      <div className="w-[228px] bg-[#6FBC44] fixed h-screen">
        <div className="p-6">
          <img
            src="/assets/images/fpt-logo.png"
            alt="FPT Logo"
            width={150}
            height={50}
            className="mb-6"
          />
        </div>

        <nav className="text-white">
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <Home className="w-5 h-5 mr-3" />
            <span className="font-bold">Home</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <Users className="w-5 h-5 mr-3" />
            <span className="font-bold">User Management</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <BookOpen className="w-5 h-5 mr-3" />
            <span className="font-bold">Curriculum Management</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <BookCheck className="w-5 h-5 mr-3" />
            <span className="font-bold">Class Management</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 mt-40 hover:bg-[#5da639]">
            <Settings className="w-5 h-5 mr-3" />
            <span className="font-bold">Setting</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <UserCircle className="w-5 h-5 mr-3" />
            <span className="font-bold">My Account</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <LogOut className="w-5 h-5 mr-3" />
            <span className="font-bold">Sign out</span>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[228px] bg-[#EFF5EB] h-screen overflow-auto">
        {/* Header */}
        <div className="p-6 bg-white">
          <h2 className="text-4xl font-bold">Feedback Detail</h2>
        </div>

        {/* Content */}
        <div className="p-4 w-[95%] mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Feedback Detail Section */}
            <h3 className="text-2xl font-bold mb-6">Feedback Detail</h3>
            
            <div className="grid grid-cols-2 gap-y-4 mb-8">
              <div className="flex gap-2">
                <span className="font-bold">Class:</span>
                <span>{feedbackDetail.class}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold">Trainer:</span>
                <span>{feedbackDetail.trainer}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold">Subject Name:</span>
                <span>{feedbackDetail.subjectName}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold">Duration:</span>
                <span>{feedbackDetail.duration}</span>
              </div>
            </div>

            {/* Rating Section */}
            <div className="mb-6">
              <p className="mb-2 font-medium">How would you rate the curriculum quality?</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((num) => renderStar(num))}
              </div>
            </div>

            {/* Questions Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-6">
              <div>
                <p className="mb-2">Would you recommend the course to others?</p>
                <div className="space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-[#6FBC44]"
                      checked={feedbackDetail.recommendCourse}
                      readOnly
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-[#6FBC44]"
                      checked={!feedbackDetail.recommendCourse}
                      readOnly
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>

              <div>
                <p className="mb-2">Does the trainer come to class on time?</p>
                <div className="space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-[#6FBC44]"
                      checked={feedbackDetail.trainerOnTime}
                      readOnly
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-[#6FBC44]"
                      checked={!feedbackDetail.trainerOnTime}
                      readOnly
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>

              <div>
                <p className="mb-2">Are you satisfied with the curriculum?</p>
                <div className="space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-[#6FBC44]"
                      checked={feedbackDetail.satisfiedCurriculum}
                      readOnly
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-[#6FBC44]"
                      checked={!feedbackDetail.satisfiedCurriculum}
                      readOnly
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>

              <div>
                <p className="mb-2">Does the trainer teach the full lesson?</p>
                <div className="space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-[#6FBC44]"
                      checked={feedbackDetail.trainerTeachFull}
                      readOnly
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-[#6FBC44]"
                      checked={!feedbackDetail.trainerTeachFull}
                      readOnly
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div>
              <p className="font-bold mb-2">Description</p>
              <div className="w-full min-h-[200px] p-4 border rounded-lg bg-gray-50">
                {feedbackDetail.description || "No description provided."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDetailForm;