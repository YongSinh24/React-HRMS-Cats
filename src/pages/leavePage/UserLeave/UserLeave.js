import React, { useState, useEffect } from "react";
import UserService from "../../../UserService/UserService";
import "./leaveType.css";
//Componets form antd
import {
  Image,
  Table,
  Spin,
  Form,
  Col,
  Row,
  Divider,
  Typography,
  Input,
  Card,
} from "antd";
import { request } from "../../../share/request";
const { Title } = Typography;
const picture = require("../../../asset/image/missing-picture.jpg");

const UserLeave = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataLeave, setDataLeave] = useState([]);
  const [empInfo, setEmpInfo] = useState([]);
  const id = UserService.getUsername();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(picture);
  const getListFile = (date) => {
    request(
      `files/ByEmIdAndTypeServiceDate?emId=${id}&type=1&date=${date}&service=1`,
      "get",
      {}
    ).then((res) => {
      if (res) {
        if (res.length !== 0) {
          setPreviewImage(res[0].url);
          //console.log(res)
        }
        //setData(res);
      }
    });
  };

  const getEmpInfo2 = () => {
    setLoading(true);
    request("info/employee/getEmployeeById/" + id, "get", {}).then((res) => {
      if (res) {
        setLoading(false);
        var result = res.data;
        getListFile(result.empDate);
      }
    });
  };

  const getList = () => {
    setLoading(true);
    request("attendanceLeave/getLeaveBalanceByEmId?emId=" + id, "get", {}).then(
      (res) => {
        if (res) {
          //console.log(res);
          setData(res.data);
          setLoading(false);
        }
      }
    );
  };
  const getListLeave = () => {
    setLoading(true);
    request("attendanceLeave/leave/getLeaveByEmId/" + id, "get", {}).then(
      (res) => {
        if (res) {
          //console.log(res);
          setDataLeave(res.data);
          setLoading(false);
        }
      }
    );
  };

  const getListEmpInfo = () => {
    setLoading(true);
    request("info/employee/getEmpInfoById?emId=" + id, "get", {}).then(
      (res) => {
        if (res) {
          setEmpInfo(res.data);
          setLoading(false);
        } else {
          setEmpInfo({
            emId: "",
            fullName: "",
            section: "",
            department: "",
            position: "",
            email: "",
            location: "",
          });
        }
      }
    );
  };

  const columns2 = [
    {
      title: "Type",
      dataIndex: "leaveType",
      key: "leaveType",
    },
    {
      title: "Available",
      dataIndex: "balanceAmount",
      key: "balanceAmount",
    },
  ];

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "empId",
      key: "empId",
      fixed: "left",
    },
    {
      title: "Name",
      dataIndex: "employeeName",
    },
    {
      title: "Leave Title",
      dataIndex: "leaveType",
      key: "leaveType",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Total Leave",
      dataIndex: "dayOfLeave",
      key: "dayOfLeave",
    },
    {
      title: "From Date",
      key: "startDate",
      dataIndex: "startDate",
    },
    {
      title: "To Date",
      key: "endDate",
      dataIndex: "endDate",
    },
    {
      title: "Create Date",
      key: "createdAt",
      dataIndex: "createdAt",
    },
    {
      title: "Approved",
      key: "approved",
      dataIndex: "approved  ",
    },
  ];

  useEffect(() => {
    getList();
    getListEmpInfo();
    getListLeave();
    getEmpInfo2();
  }, []);

  return (
    <>
      <Spin spinning={loading}>
        <Card style={{ width: "100%" }}>
          {/* <Title>{id}</Title> */}

          <Form
            name="basic"
            initialValues={{
              remember: false,
            }}
            layout={"vertical"}
            autoComplete="off"
          >
            <Row gutter={16}>
              <Col span={6}>
                <Image
                  width={240}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) => !visible,
                  }}
                  src={previewImage}
                />
              </Col>

              <Col span={18}>
                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Employee ID">
                      <Input value={empInfo.emId} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Employee Name">
                      <Input value={empInfo.fullName} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Email">
                      <Input value={empInfo.email} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Location">
                      <Input value={empInfo.location} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Department">
                      <Input value={empInfo.department} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Position">
                      <Input value={empInfo.position} />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Card>
        <Divider dashed />
        <Row gutter={16}>
          <Col span={8}>
            <Title level={3}>Leave Credits</Title>
            {/* <Divider dashed /> */}
            <Card style={{ width: "100%", position: "relative" }}>
              <Table
                scroll={{
                  x: "max-content",
                }}
                columns={columns2}
                pagination={false}
                dataSource={data}
              />
            </Card>
          </Col>
          <Col span={16}>
            <Title level={3}>Leave Record</Title>
            {/* <Divider dashed /> */}
            <Card style={{ width: "100%" }}>
              <Table
                scroll={{
                  x: "max-content",
                }}
                columns={columns}
                dataSource={dataLeave}
              />
            </Card>
          </Col>
        </Row>
      </Spin>
    </>
  );
};

export default UserLeave;
