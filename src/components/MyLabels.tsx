import React from "react";

interface LabelItem {
  color: string;
  text: string;
}

interface MyLabelsProp {
  items: LabelItem[];
}

const MyLabels = ({ items }: MyLabelsProp) => {
  return <div>MyLabels</div>;
};

export default MyLabels;
