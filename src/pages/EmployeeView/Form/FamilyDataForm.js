import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Divider,
  Typography,
  Button,
  Space,
  Select,
  Table,
  Spin,
  Popconfirm,
} from "antd";
import { isEmptyOrNull, dateFormat } from "../../../share/helper";
import { DeleteOutlined, EditFilled } from "@ant-design/icons";
import { request, request2 } from "../../../share/request";
import Swal from "sweetalert2";
const { Title } = Typography;

const FamilyDataForm = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [submittedId, setSubmittedId] = useState(null);
  const [data, setData] = useState([]);
  const [familyData, setFamilyDate] = useState("");
  const [editFamData, setEditFamData] = useState(false);
  const [editSibling, setEditSibling] = useState(true);
  const [siblingId, setSiblingId] = useState("");

  useEffect(() => {
    // Retrieve employee ID from local storage when the component mounts
    getEmpFamilyData();
    getEmpSiblingData();
  }, []);

  const save = (body, url, method) => {
    request(url, method, body).then((res) => {
      if (res.code === 200) {
        Swal.fire({
          title: "Success!",
          text: "Your has been saved",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          // confirmButtonText: "Confirm",
        });
        setEditSibling(true)
        setLoading(false);
        getEmpFamilyData();
        getEmpSiblingData();
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong, please check in error detail!",
          text: res.message,
        });
        setEditSibling(true)
        setLoading(false);
        getEmpFamilyData();
        getEmpSiblingData();
      }
    });
  };

  const handleEdit = (item) => {
    setEditSibling(false);
    setSiblingId(item.id);
    form2.setFieldsValue({
      firstName: item.firstName,
      lastName: item.lastName,
      age: item.age,
      gender: item.sex,
      education: item.education,
      occupation: item.occupation,
      position: item.position,
      office: item.office,
      maritalStats: item.maritalStats,
    });
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Sex",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "Marital Stats",
      dataIndex: "maritalStats",
      key: "maritalStats",
    },
    {
      title: "Education",
      dataIndex: "education",
      key: "education",
    },
    {
      title: "Occupation",
      dataIndex: "occupation",
      key: "occupation",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Office",
      dataIndex: "office",
      key: "office",
    },
    {
      title: "Action",
      key: "action",
      render: (_, item) => (
        <Space>
          <Button
            type="primary"
            icon={<EditFilled />}
            onClick={() => handleEdit(item)}
          />
        </Space>
      ),
    },
  ];

  const getEmpFamilyData = () => {
    setLoading(true);
    request(
      "info/familyData/getListFamilyDataByEmId?emId=" + id,
      "get",
      {}
    ).then((res) => {
      if (res) {
        console.log(res.data);
        setLoading(false);
        var result = res.data;
        setFamilyDate(result);
        isEmptyOrNull(result) ? setEditFamData(true) : setEditFamData(false);
        if (!isEmptyOrNull(result)) {
          form.setFieldsValue({
            fatherName: result.fatherName,
            fatherAddress: result.fatherAddress,
            fatherOccupation: result.fatherOccupation,
            fatherPhone: result.fatherPhoneNum,
            motherName: result.motherName,
            motherAddress: result.motherAddress,
            motherOccupation: result.motherOccupation,
            motherPhone: result.motherPhoneNum,
          });
        }
      }
    });
  };

  const getEmpSiblingData = () => {
    setLoading(true);
    request(
      "info/siblingData/getListSiblingDataByEmId?emId=" + id,
      "get",
      {}
    ).then((res) => {
      if (res) {
        console.log(res.data);
        setLoading(false);
        var result = res.data;
        setData(result);
      }
    });
  };

  const onFinish = (item) => {
    ///api/info/familyData/editFamilyData/{Id}
    let url = editFamData
      ? "info/familyData/addFamilyData"
      : "info/familyData/editFamilyData/" + familyData.id;
    let method = editFamData ? "post" : "put";
    let body;
    console.log(url + method);
    body = {
      fatherName: item.fatherName,
      fatherAddress: item.fatherAddress,
      fatherOccupation: item.fatherOccupation,
      fatherPhoneNum: item.fatherPhone,
      motherName: item.motherName,
      motherAddress: item.motherAddress,
      motherOccupation: item.motherOccupation,
      motherPhoneNum: item.motherPhone,
      emId: id,
    };
    save(body, url, method);
  };

  const onFinish2 = (item) => {
    let url = editSibling
      ?"info/siblingData/addSiblingData":"info/siblingData/editSiblingData/" + siblingId;
    let method = editSibling   ? "post":"put";
    let body;
    body = {
      empId: id,
      firstName: item.firstName,
      lastName: item.lastName,
      age: item.age,
      sex: item.gender,
      education: item.education,
      occupation: item.occupation,
      position: item.position,
      office: item.office,
      maritalStats: item.maritalStats,
    };
    console.log(body, url, method);
    save(body, url, method);
  };

  const onCancel = () => {
    form.resetFields();
  };

  const onCancel2 = () => {
    form2.resetFields();
    setEditSibling(true);
  };
  return (
    <>
      <Spin spinning={loading}>
        <Title level={4}>Family Information</Title>
        <Form
          name="basic"
          form={form}
          layout={"vertical"}
          onFinish={(item) => {
            //form.resetFields();
            onFinish(item);
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="fatherName" label="Father's Name">
                <Input placeholder="Enter Father's Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="fatherOccupation" label="Father's Occupation">
                <Input placeholder="Enter Father's Occupation" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="fatherAddress"
                label="Father's Permanent Address"
              >
                <Input placeholder="Enter Father's Permanent Address" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="fatherPhone" label="Father's Phone Number">
                <Input placeholder="Enter Father's Phone Number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="motherName" label="Mother's Name">
                <Input placeholder="Enter Mother's Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="motherOccupation" label="Mother's Occupation">
                <Input placeholder="Enter Mother's Occupation" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="motherAddress"
                label="Mother's Permanent Address"
              >
                <Input placeholder="Enter Mother's Permanent Address" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="motherPhone" label="Mother's Phone Number">
                <Input placeholder="Enter Mother's Phone Number" />
              </Form.Item>
            </Col>
            <Form.Item>
              <Space>
                <Button danger onClick={onCancel}>
                  Clean
                </Button>
                <Button type="primary" htmlType="submit">
                  {editFamData ? "Save" : "Edit"}
                </Button>
              </Space>
            </Form.Item>
          </Row>
        </Form>
        <Divider>Sibling Information</Divider>
        <Form
          name="basic"
          form={form2}
          layout={"vertical"}
          onFinish={(item) => {
            //form.resetFields();
            onFinish2(item);
          }}
        >
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                  {
                    required: true,
                    message: "Please input the First Name!",
                  },
                ]}
              >
                <Input placeholder="Enter Sibling's First Name" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[
                  {
                    required: true,
                    message: "Please input the Last Name!",
                  },
                ]}
              >
                <Input placeholder="Enter Sibling's Last Name" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                  {
                    required: true,
                    message: "Please Select the Gender!",
                  },
                ]}
              >
                <Select placeholder="Select Gender">
                  <Select.Option value="male">Male</Select.Option>
                  <Select.Option value="female">Female</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="age"
                label="Age"
                rules={[
                  {
                    required: true,
                    message: "Please input the Age!",
                  },
                ]}
              >
                <Input placeholder="Enter Sibling's Age" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Marital Stats"
                name="maritalStats"
                rules={[
                  {
                    required: true,
                    message: "Please input the marital stats!",
                  },
                ]}
              >
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Select a Marital Stats"
                  optionFilterProp="label"
                  options={[
                    {
                      value: "Single",
                      label: "Single",
                    },
                    {
                      value: "Married",
                      label: "Married",
                    },
                    {
                      value: "Separated",
                      label: "Separated",
                    },
                    {
                      value: "Divorced",
                      label: "Divorced",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="education" label="Education">
                <Input placeholder="Enter Sibling's Education" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="occupation" label="Occupation">
                <Input placeholder="Enter Sibling's Occupation" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="position" label="Position">
                <Input placeholder="Enter Sibling's Position" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="office" label="Office">
                <Input placeholder="Enter Sibling's Office" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Space>
              <Button danger onClick={onCancel2}>
                Clean
              </Button>
              <Button type="primary" htmlType="submit">
                {editSibling ? "Save" : "Edit"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
        <Table dataSource={data} columns={columns} />
      </Spin>
    </>
  );
};

export default FamilyDataForm;
