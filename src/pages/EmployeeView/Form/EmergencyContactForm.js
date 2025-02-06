import {
  Form,
  Input,
  Row,
  Col,
  Divider,
  Typography,
  Button,
  Space,
  Table,
  Popconfirm,
  Spin,
} from "antd";
import React, { useState, useEffect } from "react";
import { isEmptyOrNull, dateFormat } from "../../../share/helper";
import { request, request2 } from "../../../share/request";
import { DeleteOutlined, EditFilled } from "@ant-design/icons";
import Swal from "sweetalert2";
const { Title } = Typography;

const EmergencyContactForm = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [submittedId, setSubmittedId] = useState(null);
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [conId, setConId] = useState("");
  const getEmpContact = () => {
    setLoading(true);
    request("info/emergencyContact/ByEmId?emId=" + id, "get", {}).then(
      (res) => {
        if (res) {
          setLoading(false);
          var result = res.data;
          setData(result);
        }
      }
    );
  };

  const handleEdit = (item) => {
    setEdit(true);
    setConId(item.id);
    form.setFieldsValue({
      fullName: item.fullName,
      relationship: item.relationship,
      address: item.address,
      tel: item.tel,
      officeAddress: item.officeAddress,
      officeTel: item.officeTel,
    });
  };


  useEffect(() => {
    // Retrieve employee ID from local storage when the component mounts
    getEmpContact();
  }, []);

  const onFinish = (item) => {
    let body;
    let url = edit
      ? "info/emergencyContact/edit?Id=" + conId
      : "info/emergencyContact/add";
    var method = edit ? "put" : "post";
    body = {
      fullName: item.fullName,
      relationship: item.relationship,
      address: item.address,
      tel: item.tel,
      officeAddress: item.officeAddress,
      officeTel: item.officeTel,
      empId: id,
    };

    save(body, url, method);
  };

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
        setEdit(false);
        setLoading(false);
        getEmpContact();
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong, please check in error detail!",
          text: res.message,
        });
        setEdit(false);
        getEmpContact();
        setLoading(false);
      }
    });
  };

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Relationship",
      dataIndex: "relationship",
      key: "relationship",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tel",
      dataIndex: "tel",
      key: "tel",
    },
    {
      title: "Office Address",
      dataIndex: "officeAddress",
      key: "officeAddress",
    },
    {
      title: "Office Tel",
      dataIndex: "officeTel",
      key: "officeTel",
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

  const onCancel = () => {
    form.resetFields();
    setEdit(false);
  };
  return (
    <>
      <Spin spinning={loading}>
        <Form
          name="basic"
          form={form}
          layout={"vertical"}
          onFinish={(item) => {
            form.resetFields();
            onFinish(item);
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="fullName"
                label="Full Name"
                rules={[
                  {
                    required: true,
                    message: "Please input the full name!",
                  },
                ]}
              >
                <Input placeholder="Enter Full Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="relationship"
                label="Relationship"
                rules={[
                  {
                    required: true,
                    message: "Please input the relationship!",
                  },
                ]}
              >
                <Input placeholder="Enter Relationship" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="address"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: "Please input the address!",
                  },
                ]}
              >
                <Input placeholder="Enter Address" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="tel"
                label="Tel"
                rules={[
                  {
                    required: true,
                    message: "Please input the telephone number!",
                  },
                ]}
              >
                <Input placeholder="Enter Tel" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="officeAddress" label="Office Address">
                <Input placeholder="Enter Office Address" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="officeTel" label="Office Tel">
                <Input placeholder="Enter Office Tel" />
              </Form.Item>
            </Col>
          </Row>
          <Space>
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              {edit ? "Update" : "Save"}
            </Button>
          </Space>
        </Form>
        <Divider />
        <Table dataSource={data} columns={columns} />
      </Spin>
    </>
  );
};

export default EmergencyContactForm;
