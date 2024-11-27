import GradeAverageForm from "@/components/view-grade-average/ViewGradeAverageForm";
import React from "react";

type Props = {
  id: any;
};

const Grade = ({ id }: Props) => {
  return <GradeAverageForm id={id} />;
};

export default Grade;
