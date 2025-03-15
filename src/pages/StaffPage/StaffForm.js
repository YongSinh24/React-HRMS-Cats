import React from "react";
import { Collapse } from "antd";
import PersonalDetailForm from "./Form/PersonalDetailForm";
import HistoryForm from "./Form/HistoryForm";
import FamilyDataForm from "./Form/FamilyDataForm";
import EducationForm from "./Form/EducationForm";
import SpecialAbilityForm from "./Form/SpecialAbility";
import EmergencyContactForm from "./Form/EmergencyContactForm";

const StaffForm = () => {

  const items = [
    {
      key: "1",
      label: "Employee Information",
      children: <PersonalDetailForm />, // Pass activeKey as prop
    },
    {
      key: "2",
      label: "Job History",
      children: <HistoryForm />,
    },
    {
      key: "3",
      label: "Family Data",
      children: <FamilyDataForm />,
    },
    {
      key: "4",
      label: "Education",
      children: <EducationForm />,
    },
    {
      key: "5",
      label: "Special Ability",
      children: <SpecialAbilityForm />,
    },
    {
      key: "6",
      label: "Emergency Contact",
      children: <EmergencyContactForm />,
    },
  ];

  return (
    <>
      <Collapse
        items={items}
        defaultActiveKey={["1"]}
      // onChange={(key) => setActiveKey(key)}
      />
    </>
  );
}; 

export default StaffForm;
