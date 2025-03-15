import React, { useState, useEffect } from "react";
//Componets form MUI
import PageTitle from "../../../components/Title_Page/TitlePage";
import "./leaveType.css";
import Swal from "sweetalert2";

// or via CommonJS
//Componets form antd
import {
  Space,
  Table,
  Button,
  Form,
  Col,
  Row,
  Divider,
  Typography,
  Input,
  Card,
  Popconfirm,
} from "antd";
import {
  SendOutlined,
  DeleteFilled,
  EditOutlined,
  EyeFilled,
} from "@ant-design/icons";
import { request } from "../../../share/request";
const { Title } = Typography;

const LeaveTypePage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);
 
  const onEdit = (Item) => {
    handleClickView(Item);
    setEdit(true);
  };

  const onDelete = (Item) => {
    request(`attendanceLeave/deleteLeaveType/${Item.id}`, "delete", {}).then(
      (res) => {
        if (res) {
          Swal.fire({
            title: "Success!",
            text: "Your has been deleted",
            icon: "success",
            showConfirmButton: true,
            //timer: 1500,
            // confirmButtonText: "Confirm",
          });
          getListLeaveType()
          setLoading(false);
        }
      }
    );
  };
  const onFinish = (Item) => {
    var param = {
      id: Item.id,
      leaveTitle: Item.title,
      leaveDes: Item.description,
      leaveDayPerYear: Item.days,
    };
    let url = "attendanceLeave/addLeaveType";
    let method = "post";
    // case update
    if (edit) {
      url = "attendanceLeave/editLeaveType/" + Item.id;
      method = "put";
    }

    request(url, method, param).then((res) => {
      if (res.code === 200) {
        Swal.fire({
          title: "Success!",
          text: "Your has been saved",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          // confirmButtonText: "Confirm",
        });
        getListLeaveType();
        setLoading(false);
        setEdit(false);
        onReset()
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong, please check in error detail!",
          text: res.message,
        });
        setLoading(false);
        getListLeaveType();
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const getListLeaveType = () => {
    setLoading(true);
    request("attendanceLeave/getListLeaveType", "get", {}).then((res) => {
      if (res) {
        //console.log(res);
        setData(res.data);
        setLoading(false);
      }
    });
  };

  const handleClickView = (Item) => {
    // console.log("Failed:", Item);
    form.setFieldsValue({
      id: Item.id,
      title: Item.leaveTitle,
      description: Item.leaveDes,
      days: Item.leaveDayPerYear,
    });
  };
  const onReset = () => {
    form.resetFields();
    setEdit(false);
  };
  useEffect(() => {
    getListLeaveType();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      fixed: "left",
    },
    {
      title: "Leave Title",
      dataIndex: "leaveTitle",
      key: "leaveTitle",
    },
    {
      title: "Leave Description",
      dataIndex: "leaveDes",
      key: "leaveDes",
    },
    {
      title: "Total Leave",
      dataIndex: "leaveDayPerYear",
      key: "leaveDayPerYear",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => handleClickView(record)}
            type="info"
            icon={<EyeFilled />}
          />
          <Button
            onClick={() => onEdit(record)}
            type="primary"
            icon={<EditOutlined />}
          />
          <Popconfirm
            title="Delete the Type"
            description="Are you sure to delete this type?"
            onConfirm={() =>onDelete(record)}
            //onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button 
            icon={<DeleteFilled />}
            danger/>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <PageTitle PageTitle="Leave Type" />

      <Card style={{ width: "100%" }}>
        <Title level={2}>Create Or Update Leave Type</Title>
        <Divider dashed />
        <Form
          form={form}
          name="basic"
          initialValues={{
            remember: false,
          }}
          layout={"vertical"}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Leave ID"
                name={"id"}
                rules={[
                  {
                    required: true,
                    message: "Please input Leave Id!",
                  },
                ]}
              >
                <Input placeholder="ID" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Leave Title"
                name={"title"}
                rules={[
                  {
                    required: true,
                    message: "Please input Leave Title!",
                  },
                ]}
              >
                <Input placeholder="Title" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Leave Description"
                name={"description"}
                rules={[
                  {
                    required: true,
                    message: "Please input Leave Description!",
                  },
                ]}
              >
                <Input placeholder="Description" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Leave Per Year"
                name={"days"}
                rules={[
                  {
                    required: true,
                    message: "Please input Leave Per Year!",
                  },
                ]}
              >
                <Input placeholder="Leave Per Year" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Space>
              <Button icon={<SendOutlined />} type="primary" htmlType="submit">
                submit
              </Button>
              <Button type="primary" danger onClick={onReset}>
                Clear
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
      <Divider dashed />
      <Card style={{ width: "100%" }}>
        <Table
          loading={loading}
          scroll={{
            x: "max-content",
          }}
          columns={columns}
          dataSource={data}
        />
      </Card>
    </>
  );
};

export default LeaveTypePage;
