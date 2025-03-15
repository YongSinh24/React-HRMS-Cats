import "./leavePage.css";
import { Button, Space, DatePicker, Table, Badge } from "antd";
import {
  SearchOutlined,
  EyeFilled,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import PageTitle from "../../../components/Title_Page/TitlePage";
import React, { useState, useEffect } from "react";
import { request } from "../../../share/request";
import { isEmptyOrNull, getStatus } from "../../../share/helper";
import Swal from "sweetalert2";
import Drawerleave from "./Drawer";
import getColumnSearchProps from "../../../share/ColumnSearchProps";
const { RangePicker } = DatePicker;


const LeavePage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState([]);
  const [items, setItems] = useState([]);
  const showDrawer = (value) => {
    setItems(value);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const getList = () => {
    setLoading(true);
    request("attendanceLeave/leave/getAll", "get", {}).then((res) => {
      if (res) {
        //console.log(res);
        setData(res.data);
        setLoading(false);
      }
    });
  };

  const onReject = (value) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        request(
          `attendanceLeave/leave/approveOrRejectByHr?id=${value.id}&reject=true`,
          "put",
          {}
        ).then((res) => {
          if (res) {
            Swal.fire({
              title: "Rejected!",
              text: "Your file has been rejected.",
              icon: "success",
            });
            getList();
            setLoading(false);
          }
        });
      }
    });
  };

  const onApprove = (value) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        request(
          `attendanceLeave/leave/approveOrRejectByHr?id=${value.id}&reject=false`,
          "put",
          {}
        ).then((res) => {
          if (res) {
            Swal.fire({
              title: "Approved!",
              text: "Leave has been approved.",
              icon: "success",
            });
            getList();
            setLoading(false);
          }
        });
      }
    });
  };

  useEffect(() => {
    getList();
  }, []);

  const onChangeDate = (value, dataSrting) => {
    setDate(dataSrting);
    console.log(dataSrting[0]);
    console.log(dataSrting[1]);
  };

  const onSeacrh = () => {
    console.log(isEmptyOrNull(date[0]));
    if (!isEmptyOrNull(date[0])) {
      setLoading(true);
      var filter = `?startDate=${date[0]}&endDate=${date[1]}`;
      request(
        "attendanceLeave/leave/getLeaveByDateBetween" + filter,
        "get",
        {}
      ).then((res) => {
        if (res) {
          setData(res.data);
          setLoading(false);
        }
      });
    } else {
      getList();
    }
  };

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "empId",
      fixed: "left",
      ...getColumnSearchProps("empId"),
      width: 140,
    },
    {
      title: "Name",
      dataIndex: "employeeName",
    },
    {
      title: "Leave Date",
      dataIndex: "leave_date",
      render: (_, record) => record.startDate + " to " + record.endDate,
      width: 220,
    },
    {
      title: "Leave Type",
      dataIndex: "leaveType",
      width: 200,
    },
    {
      title: "Duration",
      dataIndex: "dayOfLeave",
      width: 100,
    },
    {
      title: "Reason",
      dataIndex: "reason",
      width: 250,
      ellipsis: true,
    },
    {
      title: "Remark",
      dataIndex: "remark",
      width: 250,
      ellipsis: true,
      render: (remark) => (remark ? remark : "N/A"), // Handle undefined remarks
    },
    {
      title: "Date Create",
      dataIndex: "createdAt",
      width: 180,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 150,
      render: (_, record) => {
        const { status, text } = getStatus(record); // Using the helper function
        return <Badge status={status} text={text} />;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      width: 150,
      fixed: "right",
      render: (_, record) => (
        <Space>
          {/* View button is always enabled */}
          <Button onClick={() => showDrawer(record)} icon={<EyeFilled />} />

          {/* Approve button is disabled if the record is approved or cancelled */}
          <Button
            onClick={() => onApprove(record)}
            type="primary"
            disabled={
              getStatus(record).text === "Draft" ||
              getStatus(record).text === "Approved" ||
              getStatus(record).text === "Cancelled" ||
              getStatus(record).text === "Rejected"
            }
            icon={<CheckOutlined />}
          />

          <Button
            type="primary"
            onClick={() => onReject(record)}
            icon={<CloseOutlined />}
            disabled={
              getStatus(record).text === "Cancelled" ||
              getStatus(record).text === "Rejected"
            }
            danger
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <PageTitle PageTitle="Leave" />
      <Space>
        <RangePicker onChange={onChangeDate} />
        <Button icon={<SearchOutlined />} onClick={onSeacrh} type="primary">
          Search
        </Button>
        {/* <div>
          <Button icon={<ExportOutlined />} type="primary">
            Export xlsx
          </Button>
        </div> */}
      </Space>
      <Drawerleave open={open} onClose={onClose} items={items} />
      <Table
        style={{ marginTop: 10 }}
        scroll={{
          x: 2000,
        }}
        loading={loading}
        dataSource={data}
        columns={columns}
      />
    </>
  );
};
// const App = () => <Pagination defaultCurrent={6} total={500} />;
export default LeavePage;
