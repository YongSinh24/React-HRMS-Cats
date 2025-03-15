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
import UserService from "../../../UserService/UserService";
import getColumnSearchProps from "../../../share/ColumnSearchProps";
import RenderOnRole from "../../../UserService/RenderOnRole";
const { RangePicker } = DatePicker;

const LeaveForMange = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState([]);
  const [items, setItems] = useState([]);
  const id = UserService.getUsername();
  const showDrawer = (value) => {
    setItems(value);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const getList = () => {
    setLoading(true);
    request(
      "attendanceLeave/leave/getLeave/management?emId=" + id,
      "get",
      {}
    ).then((res) => {
      if (res) {
        //console.log(res);
        setData(res.data);
        setLoading(false);
      }
    });
  };

  // const onReject = (value) => {
  //   //approveOrRejectByHead
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, Reject it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       request(
  //         `attendanceLeave/leave/approveOrRejectByManger?id=${value.id}&reject=true`,
  //         "put",
  //         {}
  //       ).then((res) => {
  //         if (res) {
  //           Swal.fire({
  //             title: "Rejected!",
  //             text: "Your file has been rejected.",
  //             icon: "success",
  //           });
  //           getList();
  //           setLoading(false);
  //         }
  //       });
  //     }
  //   });
  // };

  const handleApprovalAction = (value, actionType, role) => {
    const endpoint =
      role === "hrms_manger"
        ? `attendanceLeave/leave/approveOrRejectByManger`
        : `attendanceLeave/leave/approveOrRejectByHead`;

    const actionText = actionType === "approve" ? "Approve" : "Reject";
    const actionFlag = actionType === "approve" ? false : true;

    Swal.fire({
      title: `Are you sure you want to ${actionText.toLowerCase()}?`,
      text: "You won't be able to revert this!",
      icon: actionType === "approve" ? "info" : "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${actionText} it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        request(
          `${endpoint}?id=${value.id}&reject=${actionFlag}`,
          "put",
          {}
        ).then((res) => {
          if (res) {
            Swal.fire({
              title: actionText + "d!",
              text: `Leave has been ${actionText.toLowerCase()}d.`,
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
    //console.log(isEmptyOrNull(date[0]));
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
          <Button onClick={() => showDrawer(record)} icon={<EyeFilled />} />
          <RenderOnRole roles={["hrms_manger", "hrms_head"]} showNotAllowed>
            {({ role }) => (
              <>
                <Space>
                  <Space>
                    <Button
                      onClick={() =>
                        handleApprovalAction(record, "approve", role)
                      }
                      type="primary"
                      disabled={
                        !record.status ||
                        (record.approvedByManger && !record.cancel)
                      }
                      icon={<CheckOutlined />}
                    />
                    <Button
                      onClick={() =>
                        handleApprovalAction(record, "reject", role)
                      }
                      type="primary"
                      danger
                      disabled={
                        !record.status || record.cancel || record.approved
                      }
                      icon={<CloseOutlined />}
                    />
                  </Space>
                </Space>
              </>
            )}
          </RenderOnRole>
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
export default LeaveForMange;
