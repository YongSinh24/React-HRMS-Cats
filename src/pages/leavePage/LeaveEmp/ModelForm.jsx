import React, { useEffect } from "react";
import {
  Button,
  Modal,
  Space,
  Form,
  Select,
  Col,
  Row,
  DatePicker,
  Input,
} from "antd";
import { SaveFilled } from "@ant-design/icons";
import dayjs from "dayjs";
export default function ModelForm({
  open = false,
  handleClose,
  onFinish,
  handleOk,
  item,
  leaveType,
  edit = false,
}) {
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields(); // clear data in form
    handleClose();
  };

  const typeProps = {
    mode: "multiple",
    style: {
      width: "100%",
    },
    leaveType,
    placeholder: "Select Item...",
    maxTagCount: "responsive",
  };

  useEffect(() => {
    if (item != null) {
      form.setFieldsValue({
        type: item.leaveType,
        balance: item.balanceAmount,
        date: dayjs(item.lastUpdateDate),
      });
    }
  }, [item]);

  const onOk = (value) => {
    console.log("onOk: ", value);
  };
  return (
    <>
      <Modal
        title="Update User Leave Balance"
        open={open}
        onOk={handleOk}
        onCancel={handleClose}
        footer={false}
        maskClosable={false}
      >
        <Form
          form={form}
          name="form_category"
          layout="vertical"
          onFinish={(item) => {
            //form.resetFields();
            onFinish(item);
          }}
        >
          <Row gutter={16}>
            <Col span={24}>
              {/* <Form.Item label="Leave Type" name={"type"}>
                <Input />
              </Form.Item> */}
              <Form.Item
                label="Leave Type"
                name={"type"}
                rules={[
                  {
                    required: true,
                    message: "Please input Leave Type!",
                  },
                ]}
              >
                <Select
                  showSearch
                  {...typeProps}
                  placeholder="Select a Leave Type"
                  allowClear
                  mode="multiple"
                  options={leaveType}
                />
              </Form.Item>
            </Col>
            {edit ? (
              <Col span={12}>
                <Form.Item
                  label="Leave Balance"
                  name={"balance"}
                  rules={[
                    {
                      required: true,
                      message: "Please Input Balance!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            ) : (
              <></>
            )}
            <Col span={edit ? 12:24 }>
              <Form.Item
                label="Date"
                name={"date"}
                rules={[
                  {
                    required: true,
                    message: "Please select date!",
                  },
                ]}
              >
                <DatePicker
                  showTime
                  style={{ width: "100%" }}
                  onChange={(value, dateString) => {
                    console.log("Selected Time: ", value);
                    console.log("Formatted Selected Time: ", dateString);
                  }}
                  onOk={onOk}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item style={{ textAlign: "right" }}>
            <Space>
              <Button type="primary" onClick={handleCancel} danger>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                <SaveFilled />
                submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
