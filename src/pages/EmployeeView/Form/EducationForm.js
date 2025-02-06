import {
  Form,
  Input,
  Row,
  Col,
  Button,
  Space,
  DatePicker,
  Divider,
  Table,
  Popconfirm,
  Spin,
} from "antd";
import { DeleteOutlined, EditFilled } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { isEmptyOrNull, dateFormat } from "../../../share/helper";
import dayjs from "dayjs";
import { request } from "../../../share/request";
import Swal from "sweetalert2";
const EducationForm = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [eduId, setEduId] = useState("");

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
        setLoading(false);
        getEmpEdu();
        setEdit(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong, please check in error detail!",
          text: res.message,
        });
        setLoading(false);
        getEmpEdu();
        setEdit(false);
      }
    });
  };

  const handleEdit = (item) => {
    setEdit(true);
    setEduId(item.id);
    form.setFieldsValue({
      level: item.eduLevel,
      institution: item.eduInstitution,
      endYear: dayjs(item.yearEnd),
      major: item.major,
      gpa: item.gpa,
    });
  };
  const onFinish = (item) => {
    let url = "info/education/addEducation";
    var method = edit ? "put" : "post";

    if (edit) {
      url = "info/education/editEducation/" + eduId;
    }
    let body = {
      eduLevel: item.level,
      eduInstitution: item.institution,
      yearEnd: dateFormat(item.endYear),
      major: item.major,
      emID: id,
      gpa: item.gpa,
    };
    save(body, url, method);
  };

  useEffect(() => {
    // Retrieve employee ID from local storage when the component mounts
    getEmpEdu();
  }, []);

  const getEmpEdu = () => {
    setLoading(true);
    request("info/education/getListEducationByEmId?emId=" + id, "get", {}).then(
      (res) => {
        if (res) {
          console.log(res.data);
          setLoading(false);
          var result = res.data;
          setData(result);
        }
      }
    );
  };
  const onCancel = () => {
    form.resetFields();
    setEdit(false);
  };
  const columns = [
    {
      title: "Institution",
      dataIndex: "eduInstitution",
      key: "eduInstitution",
    },
    {
      title: "Level",
      dataIndex: "eduLevel",
      key: "eduLevel",
    },
    {
      title: "Major",
      dataIndex: "major",
      key: "major",
    },
    {
      title: "GPA",
      dataIndex: "gpa",
      key: "gpa",
    },
    {
      title: "Year End",
      dataIndex: "yearEnd",
      key: "yearEnd",
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
                name="level"
                label="Level"
                rules={[
                  {
                    required: true,
                    message: "Please input level!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="institution"
                label="Institution"
                rules={[
                  {
                    required: true,
                    message: "Please input the institution!",
                  },
                ]}
              >
                <Input placeholder="Enter Institution" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="endYear"
                label="End Year"
                rules={[
                  {
                    required: true,
                    message: "Please input the end year!",
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="major"
                label="Major"
                rules={[
                  {
                    required: true,
                    message: "Please input the major!",
                  },
                ]}
              >
                <Input placeholder="Enter Major" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name="gpa" label="GPA">
                <Input placeholder="Enter GPA" />
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

export default EducationForm;
