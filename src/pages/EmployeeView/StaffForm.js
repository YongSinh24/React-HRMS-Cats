import React, { useState, useEffect } from "react";
import { Button, Collapse, Divider } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import PageTitle from "../../components/Title_Page/TitlePage";
import EducationFormView from "./FormView/EducationFormView";
import EmergencyContactFormView from "./FormView/EmergencyContactFormView";
import SpecialAbilityView from "./FormView/SpecialAbilityView";
import FamilyDataFormView from "./FormView/FamilyDataFormView";
import PersonalDetailFormView from "./FormView/PersonalDetailFormView";
import HistoryFormView from "./FormView/HistoryFormView";
import UserService from "../../UserService/UserService";
import PersonalDetailForm from "./Form/PersonalDetailForm";
import HistoryForm from "./Form/HistoryForm";
import FamilyDataForm from "./Form/FamilyDataForm";
import EducationForm from "./Form/EducationForm";
import EmergencyContactForm from "./Form/EmergencyContactForm";
import SpecialAbilityForm from "./Form/SpecialAbility";

const EmployeeView = () => {
  const [activeKey, setActiveKey] = useState("1");
  const id = UserService.getUsername();
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    console.log("Tab changed to: ", activeKey);
  }, [activeKey, id]);
  const handleEdit = () => {
    setEdit((prevEdit) => !prevEdit);
  };

  const items = [
    {
      key: "1",
      label: "Employee Information",
      children: <PersonalDetailForm id={id} />, // Pass activeKey as prop
    },
    {
      key: "2",
      label: "Job History",
      children: <HistoryForm id={id} />,
    },
    {
      key: "3",
      label: "Family Data",
      children: <FamilyDataForm id={id} />,
    },
    {
      key: "4",
      label: "Education",
      children: <EducationForm id={id} />,
    },
    {
      key: "5",
      label: "Special Ability",
      children: <SpecialAbilityForm id={id} />,
    },
    {
      key: "6",
      label: "Emergency Contact",
      children: <EmergencyContactForm id={id} />,
    },
  ];

  const onChange = (key) => {
    setActiveKey(key);
  };
  return (
    <>
      <PageTitle PageTitle="Personal Detail" />
      <Button
        onClick={handleEdit}
        type="primary"
        icon={edit ? <EyeOutlined /> : <EditOutlined />}
      >
        {edit ? " View" : "Edit"}
      </Button>
      <Divider />
      {edit ? (
        <Collapse items={items} defaultActiveKey={["1"]} onChange={onChange} />
      ) : (
        <>
          <PersonalDetailFormView id={id} />
          <Divider>Job History</Divider>
          <HistoryFormView id={id} />
          <Divider>Family Data</Divider>
          <FamilyDataFormView id={id} />
          <Divider>Education</Divider>
          <EducationFormView id={id} />
          <Divider>Special Ability</Divider>
          <SpecialAbilityView id={id} />
          <Divider>Emergency Contact</Divider>
          <EmergencyContactFormView id={id} />
        </>
      )}
    </>
  );
};

export default EmployeeView;
