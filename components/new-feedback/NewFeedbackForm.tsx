"use client";
import React, { useState } from "react";
import {
  Home,
  Users,
  BookOpen,
  Settings,
  LogOut,
  UserCircle,
  BookCheck,
} from "lucide-react";

interface FeedbackData {
  curriculumRating: number;
  recommendCourse: boolean;
  satisfiedCurriculum: boolean;
  trainerTeachFull: boolean;
  trainerOnTime: boolean;
  comments: string;
}

type Props = {
  userId: any;
  classId: any;
};

const NewFeedbackForm = ({ userId, classId }: Props) => {
  console.log("userId", userId);
  console.log("classId", classId);
  const [feedback, setFeedback] = useState<FeedbackData>({
    curriculumRating: 0,
    recommendCourse: false,
    satisfiedCurriculum: false,
    trainerTeachFull: false,
    trainerOnTime: false,
    comments: "",
  });

  const handleSubmit = () => {
    console.log("Submitted feedback:", feedback);
  };

  const renderStar = (position: number) => {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={position <= feedback.curriculumRating ? "#FFD700" : "none"}
        stroke="#FFD700"
        className="cursor-pointer"
        onClick={() => setFeedback({ ...feedback, curriculumRating: position })}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  };

  return (
    <div className="flex-1 bg-[#EFF5EB] overflow-auto">
      {/* Header */}
      <div className="p-6 border-b">
        <h2 className="text-4xl font-bold">Feedback</h2>
      </div>

      {/* Content */}
      <div className="p-4 w-[95%] mx-auto">
        {" "}
        {/* Changed max-w-4xl to w-[95%] */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Feedback Information */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4">Feedback Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex gap-2">
                <span className="font-bold">Class:</span>
                <span>Java01</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold">Trainer:</span>
                <span>HuyLT</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold">Subject Name:</span>
                <span>Java</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold">Duration:</span>
                <span>12/8/2024-12/12-2024</span>
              </div>
            </div>
          </div>

          {/* Rating Section */}
          <div className="mb-6">
            <p className="mb-2">How would you rate the curriculum quality?</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((num) => renderStar(num))}
            </div>
          </div>

          {/* Yes/No Questions */}
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="mb-2">
                    Would you recommend the course to others?
                  </p>
                  <div className="space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-[#6FBC44] w-4 h-4"
                        checked={feedback.recommendCourse}
                        onChange={() =>
                          setFeedback({ ...feedback, recommendCourse: true })
                        }
                      />
                      <span className="ml-2 text-sm">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-[#6FBC44] w-4 h-4"
                        checked={!feedback.recommendCourse}
                        onChange={() =>
                          setFeedback({ ...feedback, recommendCourse: false })
                        }
                      />
                      <span className="ml-2 text-sm">No</span>
                    </label>
                  </div>
                </div>

                <div>
                  <p className="mb-2">Are you satisfied with the curriculum?</p>
                  <div className="space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-[#6FBC44] w-4 h-4"
                        checked={feedback.satisfiedCurriculum}
                        onChange={() =>
                          setFeedback({
                            ...feedback,
                            satisfiedCurriculum: true,
                          })
                        }
                      />
                      <span className="ml-2 text-sm">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-[#6FBC44] w-4 h-4"
                        checked={!feedback.satisfiedCurriculum}
                        onChange={() =>
                          setFeedback({
                            ...feedback,
                            satisfiedCurriculum: false,
                          })
                        }
                      />
                      <span className="ml-2 text-sm">No</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="mb-2">
                    Does the trainer teach the full lesson?
                  </p>
                  <div className="space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-[#6FBC44] w-4 h-4"
                        checked={feedback.trainerTeachFull}
                        onChange={() =>
                          setFeedback({ ...feedback, trainerTeachFull: true })
                        }
                      />
                      <span className="ml-2 text-sm">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-[#6FBC44] w-4 h-4"
                        checked={!feedback.trainerTeachFull}
                        onChange={() =>
                          setFeedback({
                            ...feedback,
                            trainerTeachFull: false,
                          })
                        }
                      />
                      <span className="ml-2 text-sm">No</span>
                    </label>
                  </div>
                </div>

                <div>
                  <p className="mb-2">
                    Does the trainer come to class on time?
                  </p>
                  <div className="space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-[#6FBC44] w-4 h-4"
                        checked={feedback.trainerOnTime}
                        onChange={() =>
                          setFeedback({ ...feedback, trainerOnTime: true })
                        }
                      />
                      <span className="ml-2 text-sm">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-[#6FBC44] w-4 h-4"
                        checked={!feedback.trainerOnTime}
                        onChange={() =>
                          setFeedback({ ...feedback, trainerOnTime: false })
                        }
                      />
                      <span className="ml-2 text-sm">No</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mb-6">
            <p className="mb-2 font-bold">Your comments about the course</p>
            <textarea
              className="w-full h-24 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6FBC44] text-sm"
              value={feedback.comments}
              onChange={(e) =>
                setFeedback({ ...feedback, comments: e.target.value })
              }
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-[#6FBC44] text-white rounded-lg hover:bg-[#5da639] text-sm"
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewFeedbackForm;
