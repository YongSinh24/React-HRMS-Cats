import React, { useState, useEffect } from "react";
import {

  Table,
  Spin,
} from "antd";
import { request } from "../../../share/request";
const picture = require("../../../asset/image/missing-picture.jpg");
const PersonalDetailFormView = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [empInfor, setEmpInfor] = useState("");
  const columns = [
    {
      title: "Employee ID",
      dataIndex: "empId",
      fixed: "left",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "Gender",
      dataIndex: "sex",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Date Join",
      dataIndex: "joinDate",
    },
    {
      title: "Department",
      dataIndex: "depId",
    },
    {
      title: "Position",
      dataIndex: "posId",
    },
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "Remark",
      dataIndex: "remark",
    },
  ];
  const getEmpInfo = () => {
    setLoading(true);
    request("info/employee/getEmployeeById/" + id, "get", {}).then((res) => {
      if (res) {
        //console.log(res.data);
        setLoading(false);
        var result = res.data;
        setEmpInfor(result);
      }
    });
  };

  useEffect(() => {
    getEmpInfo();
    // getListDep(); // Only fetch data when this tab is active
  }, []);


  return (
    <>
      <Spin spinning={loading} tip="Loading" size="middle">
      <Table
        scroll={{
          x: "max-content",
        }}
        columns={columns}
        loading={loading}
        pagination={false}
        dataSource={[empInfor]}
      />
        {/* <Title level={4}>Personal Imformation:</Title> */}
        {/* <Form
          name="basic"
          initialValues={{
            status: 1,
          }}
          form={form}
          layout={"vertical"}
          onFinish={(item) => {
            //form.resetFields();
            //onFinish(item);
          }}
        >
          <Row gutter={16}>
            <Col span={20}>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item name="empId" label="Employee ID">
                    <Input placeholder="Enter Employee ID!" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="firstName" label="First Name">
                    <Input placeholder="Enter First Name" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="lastName" label="Last Name">
                    <Input placeholder="E.g., Doe" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Age" name="age">
                    <Input placeholder="E.g., 19" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Gender" name="gender">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Marital Stats" name="maritalStats">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            <Col span={4} style={{ textAlign: "center" }}>
              <Image
                width={140}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible,
                }}
                src={previewImage}
              />
            </Col>

            <Col span={8}>
              <Form.Item name="phone" label="Phone">
                <Input placeholder="E.g., +1 234 567 890" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="email" label="Email">
                <Input placeholder="E.g., john.doe@example.com" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="workType" label="Work Type">
                <Input placeholder="E.g., Full-time" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="location" label="Working Site">
                <Input placeholder="E.g., New York Office" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="department" label="Department">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="position" label="Position">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="mangerId" label="Position Level">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="section" label="Section">
                <Input placeholder="E.g., HR" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name="joinDate" label="Join Date">
                <DatePicker
                  placeholder="Select Start Date"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="empDate" label="End Date">
                <DatePicker
                  placeholder="Select Stop Date"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="address" label="Address">
                <Input placeholder="E.g., 123 Main St" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="birthDate" label="Date of Birth">
                <DatePicker
                  placeholder="Select Date of Birth"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="height" label="Height (cm)">
                <Input placeholder="E.g., 180" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="weight" label="Weight (kg)">
                <Input placeholder="E.g., 75" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="nationality" label="Nationality">
                <Input placeholder="E.g., American" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="religion" label="Religion">
                <Input placeholder="E.g., Christian" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="placeOfBirth" label="Place of Birth">
                <Input placeholder="E.g., New York" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="idCardNo" label="ID Card No.">
                <Input placeholder="E.g., 123456789" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="passportId" label="Passport ID">
                <Input placeholder="E.g., P12345678" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="remark" label="remark">
                <TextArea placeholder="Remark" autoSize />
              </Form.Item>
            </Col>
          </Row>
          <Divider variant="dashed" dashed>
            Government Officer
          </Divider>
          <Row gutter={16}>
            <Col span={18}>
              <Form.Item name="govOfficer" label="Government Officer">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="govPosition" label="Position">
                <Input />
              </Form.Item>
            </Col>
            <Col span={18}>
              <Form.Item name="govAddress" label="Address">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="govTel" label="Tel">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form> */}
      </Spin>
    </>
  );
};

export default PersonalDetailFormView;
