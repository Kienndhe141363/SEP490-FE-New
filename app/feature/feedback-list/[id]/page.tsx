"use client";

import FeedbackDetailForm from "@/components/feedback-detail/FeedbackDetailForm";
import { useParams } from "next/navigation";
import React from "react";

type Props = {};

const page = (props: Props) => {
  const { id } = useParams();

  return <FeedbackDetailForm id={id} />;
};

export default page;
