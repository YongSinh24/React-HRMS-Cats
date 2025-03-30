import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Spin,
  Button,
  Space,
  DatePicker,
  Table,
  Divider
} from "antd";
import { isEmptyOrNull, dateFormat } from "../../../share/helper";
import { request } from "../../../share/request";
import Swal from "sweetalert2";

const HistoryForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [submittedId, setSubmittedId] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem("employeeId");
    if(!isEmptyOrNull(storedId)){
      setSubmittedId(storedId);
      getEmpInfo(storedId);
    }
       // Retrieve employee ID from local storage when the component mounts
  }, []);


  const save = (body) => {
    let url = "info/jobHistory/addJobHistory";
    let method = "post";
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
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong, please check in error detail!",
          text: res.message,
        });
        setLoading(false);
      }
    });
  };


  const onFinish = (item) => {
    let body;
    if (isEmptyOrNull(submittedId)) {
      Swal.fire({
        title: "Enter your Employee Id",
        input: "text",
        inputLabel: "Employee Id",
        inputValue: "",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "You need to input employee id!";
          }
        },
      }).then((result) => {
        if (result.isConfirmed && result.value) {
          const id = result.value;
          setSubmittedId(id);
          body = {
            startDate: dateFormat(item.startDate),
            endDate: dateFormat(item.endDate),
            jobTitle: item.jobTitle,
            department: item.dep,
            empId: id,
          };
          setData((prevData) => [...prevData, body]);
          save(body);
        }
      });
    } else {
      body = {
        startDate: dateFormat(item.startDate),
        endDate: dateFormat(item.endDate),
        jobTitle: item.jobTitle,
        department: item.dep,
        empId: submittedId,
      };
      save(body);
      setData((prevData) => [...prevData, body]);
    }
  };



  const getEmpInfo = (value) => {
    setLoading(true);
    request("info/employee/getEmployeeById/"+value, "get", {}).then((res) => {
      if (res) {
        console.log(res.data);
        setLoading(false);
        var result = res.data;
        form.setFieldsValue({
          empId: result.empId,
          dep: result.depId,
          jobTitle: result.posId,
          name:result.firstName +" "+ result.lastName
        });
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
  ];

  const onCancel = () => {
    form.resetFields();
  };

  return (
    <>
      {/* <Button onClick={text}>Hello</Button> */}
      <Spin spinning={loading} tip="Loading" size="middle">
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
                Save
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
