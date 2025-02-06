import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Spin,
  Typography,
  Button,
  Space,
  DatePicker,
  Table,
  Divider,
  Popconfirm,
} from "antd";
import { EyeFilled, DeleteOutlined, EditFilled } from "@ant-design/icons";
import { isEmptyOrNull, dateFormat } from "../../../share/helper";
import { request, request2 } from "../../../share/request";
import Swal from "sweetalert2";
import dayjs from "dayjs";
const { Title } = Typography;

const HistoryForm = ({ id }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [hisId, setHisId] = useState("");

  useEffect(() => {
      getEmpHistory();
      getEmpInfo();
      //getListDep(); // Only fetch data when this tab is active
    // Retrieve employee ID from local storage when the component mounts
  }, []);

  const save = (body) => {
    let url;
    url = "info/jobHistory/addJobHistory";
    let method = edit ? "put" : "post";
    if (edit) {
      url = "info/jobHistory/editJobHistory/" + hisId;
    }
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
        setEdit(false);
        getEmpHistory();
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong, please check in error detail!",
          text: res.message,
        });
        setLoading(false);
        setEdit(false);
      }
    });
  };

  const onFinish = (item) => {
    let body;
    body = {
      startDate: dateFormat(item.startDate),
      endDate: dateFormat(item.endDate),
      jobTitle: item.jobTitle,
      department: item.dep,
      empId: id,
    };
    save(body);
  };
  
  const handleEdit = (item) => {
    setEdit(true);
    setHisId(item.id);
    form.setFieldsValue({
      dep: item.department,
      jobTitle: item.jobTitle,
      startDate: dayjs(item.startDate),
      endDate: dayjs(item.endDate),
    });
  };
  const getEmpInfo = () => {
    setLoading(true);
    request("info/employee/getEmployeeById/" + id, "get", {}).then((res) => {
      if (res) {
        setLoading(false);
        var result = res.data;
        form.setFieldsValue({
          name: result.firstName + " " + result.lastName,
        });
      }
    });
  };

  const getEmpHistory = () => {
    setLoading(true);
    request(
      "info/jobHistory/getListJobHistoryByEmId?emId=" + id,
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

  const columns = [
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
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
  };

  return (
    <>
      <Spin spinning={loading} tip="Loading" size="middle">
        <Title level={4}> History Imformation</Title>
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
              <Form.Item name="name" label="Employee Name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dep"
                label="Department"
                rules={[
                  {
                    required: true,
                    message: "Please input the department!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="jobTitle"
                label="Job Title"
                rules={[
                  {
                    required: true,
                    message: "Please input the Job Title!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="startDate"
                label="Start Date"
                rules={[
                  {
                    required: true,
                    message: "Please select Start Date!",
                  },
                ]}
              >
                <DatePicker
                  placeholder="Select Start Date"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="endDate"
                label="End Date"
                rules={[
                  {
                    required: true,
                    message: "Please select End Date!",
                  },
                ]}
              >
                <DatePicker
                  placeholder="Select End Date"
                  style={{ width: "100%" }}
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
              {edit? "Update" : "Save"}
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

export default HistoryForm;
