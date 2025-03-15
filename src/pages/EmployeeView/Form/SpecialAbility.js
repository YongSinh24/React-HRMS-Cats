import {
  Form,
  Input,
  Row,
  Col,
  Divider,
  Table,
  Button,
  Space,
  Select,
  Spin,
} from "antd";
import React, { useState, useEffect } from "react";
import { request } from "../../../share/request";
import { EditFilled } from "@ant-design/icons";
import Swal from "sweetalert2";

const SpecialAbility = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [edit, setEdit] = useState(false);
  const [specId, setSpecId] = useState("");
  useEffect(() => {
    // Retrieve employee ID from local storage when the component mounts
    getEmpSpecialAbility();
  }, []);

  const getEmpSpecialAbility = () => {
    setLoading(true);
    request(
      "info/specialAbility/getListSpecialAbilityByEmId?emId=" + id,
      "get",
      {}
    ).then((res) => {
      if (res) {
        setLoading(false);
        var result = res.data;
        setData(result);
      }
    });
  };

  const handleEdit = (item) => {
    setEdit(true);
    setSpecId(item.id);
    form.setFieldsValue({
      foreignLanguage: item.foreignLanguages,
      speaking: item.speaking,
      listening: item.listening,
      writing: item.writing,
      reading: item.reading,
    });
  };
  const save = (body) => {
    let url = edit
      ? "info/specialAbility/update?Id=" + specId
      : "info/specialAbility/add";
    var method = "post";
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
        getEmpSpecialAbility();
        setLoading(false);
        setEdit(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong, please check in error detail!",
          text: res.message,
        });
        setEdit(false);
        getEmpSpecialAbility();
        setLoading(false);
      }
    });
  };

  const onFinish = (item) => {
    let body;
    body = {
      foreignLanguages: item.foreignLanguage,
      speaking: item.speaking,
      listening: item.listening,
      writing: item.writing,
      reading: item.reading,
      empId: id,
    };
    save(body);
  };


  const columns = [
    {
      title: "Foreign Languages",
      dataIndex: "foreignLanguages",
      key: "foreignLanguages",
    },
    {
      title: "Speaking",
      dataIndex: "speaking",
      key: "speaking",
    },
    {
      title: "Listening",
      dataIndex: "listening",
      key: "listening",
    },
    {
      title: "Writing",
      dataIndex: "writing",
      key: "writing",
    },
    {
      title: "Reading",
      dataIndex: "reading",
      key: "reading",
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

  const option = [
    {
      value: "Basic",
      label: "Basic",
    },
    {
      value: "Beginner",
      label: "Beginner",
    },
    {
      value: "Intermediate",
      label: "Intermediate",
    },
    {
      value: "Advanced",
      label: "Advanced",
    },
    {
      value: "Fluent",
      label: "Fluent",
    },
  ];

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
                name="foreignLanguage"
                label="Foreign Language"
                rules={[
                  {
                    required: true,
                    message: "Please input a foreign language!",
                  },
                ]}
              >
                <Input placeholder="Enter Foreign Language" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="reading"
                label="Reading"
                rules={[
                  {
                    required: true,
                    message: "Please select reading proficiency!",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select a Level"
                  optionFilterProp="label"
                  options={option}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="speaking"
                label="Speaking"
                rules={[
                  {
                    required: true,
                    message: "Please select speaking proficiency!",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select a Level"
                  optionFilterProp="label"
                  options={option}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="listening"
                label="Listening"
                rules={[
                  {
                    required: true,
                    message: "Please select listening proficiency!",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select a Level"
                  optionFilterProp="label"
                  options={option}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="writing"
                label="Writing"
                rules={[
                  {
                    required: true,
                    message: "Please select writing proficiency!",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select a Level"
                  optionFilterProp="label"
                  options={option}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Space>
              <Button danger onClick={onCancel}>
                Clean
              </Button>
              <Button type="primary" htmlType="submit">
                {edit ? "Update" : "Save"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
        <Divider />
        <Table dataSource={data} columns={columns} />
      </Spin>
    </>
  );
};

export default SpecialAbility;
