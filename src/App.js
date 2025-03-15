import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayoutLayout from "./components/layout/Layout";
import DashboardPage from "./pages/Dashboard/dashboard";
import LeavePage from "./pages/leavePage/MainLeave/leavePage";
import LeaveRequest from "./pages/leavePage/UserLeavePage/leaveRequest";
import DepartmentPage from "./pages/DepartmentPage/Department";
import Staff from "./pages/StaffPage/Staff";
import Report from "./pages/Report/TabsReport";
import UserReport from "./pages/Report/UserReport";
import AttendancePage from "./pages/AttendancePage/TabsAttendance";
import AllowancePage from "./pages/AllowancePage/Allowance";
import DeductionPage from "./pages/DeductionPage/DeductionPage";
import PayrollPage from "./pages/PayrollPage/Payroll";
import PayslipPage from "./pages/Payslip/payslip";
import TaxPage from "./pages/tax/TaxPage";
import SalaryPage from "./pages/Salary/SalaryPage";
import LeaveTypePage from "./pages/leavePage/LeaveType/leaveType";
import LeaveBalancePage from "./pages/leavePage/LeaveBalance/leaveBalance";
import LeaveEmpPage from "./pages/leavePage/LeaveEmp/LeaveEmp";
import PositionPage from "./pages/PositionPage/Position";
import EidtPayslipPage from "./pages/Payslip/edtPayslipPage";
import StaffForm from "./pages/StaffPage/StaffForm";
import UserTabsAttendance from "./pages/AttendancePage/UserTabsAttendance";
import UserLeave from "./pages/leavePage/UserLeave/UserLeave";
import LeaveForMange from "./pages/leavePage/LeaveForMange/leaveMangePage";
import StaffEditForm from "./pages/StaffEditPage/StaffForm";
import UserLayout from "./components/layout-user/Layout";
import EmployeeView from "./pages/EmployeeView/StaffForm";
import RenderOnRole from "./UserService/RenderOnRole";
import "./App.css";
import "antd/dist/antd"; // or 'antd/dist/antd.less'
import "antd-button-color/dist/css/style.css"; // or 'antd-button-color/dist/css/style.less'
import { useEffect, useState } from "react";
import UserService from "./UserService/UserService";
function App() {
  const userRoles = UserService.getrole(); // Assuming roles are stored in localStorage
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (userRoles.includes("hrms_user")) {
      setUrl("/user/home");
    } else {
      setUrl("/home");
    }
  }, [userRoles, url]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Main layout routes */}
          <Route path="/" element={<Navigate to={url} />} />
          <Route
            path="/"
            element={
              <RenderOnRole roles={["hrms_admin", "hrms_hr"]}>
                <MainLayoutLayout />
              </RenderOnRole>
            }
          >
            <Route path="/home" element={<DashboardPage/>} />
            <Route path="/personal-info" element={<EmployeeView />} />
            <Route path="/leave" element={<LeavePage />} />
            <Route path="/leave-request" element={<LeaveRequest />} />
            <Route path="/department" element={<DepartmentPage />} />
            <Route path="/position" element={<PositionPage />} />
            <Route path="/employee" element={<Staff />} />
            <Route path="/payslip" element={<Report />} />
            <Route path="/payroll" element={<PayrollPage />} />
            <Route path="/payroll-item" element={<PayslipPage />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/product/:productId" element={<PayslipPage />} />
            <Route path="/allowance" element={<AllowancePage />} />
            <Route path="/deduction" element={<DeductionPage />} />
            <Route path="/leave-type" element={<LeaveTypePage />} />
            <Route path="/leave-balance" element={<LeaveBalancePage />} />
            <Route path="/salary" element={<SalaryPage />} />
            <Route path="/tax" element={<TaxPage />} />
            <Route path="/add-employee" element={<StaffForm />} />
            <Route path="/edit-employee/:id" element={<StaffEditForm />} />
            <Route path="/leave-employee/:id" element={<LeaveEmpPage />} />
            <Route path="/edit-payslip/:id" element={<EidtPayslipPage />} />
          </Route>

          {/* User layout routes */}
          <Route
            path="/"
            element={
              <RenderOnRole roles={["hrms_user", "hrms_admin", "hrms_head", "hrms_manger"]}>
                <UserLayout />
              </RenderOnRole>
            }
          >
            <Route path="/user/home" element={<DashboardPage />} />
            <Route path="/user/employee" element={<EmployeeView />} />
            <Route path="/user/leave-request" element={<LeaveRequest />} />
            <Route path="/user/staff-leave-request" element={<LeaveForMange />} />
            <Route path="/user/employee" element={<EmployeeView />} />
            <Route path="/user/payslip" element={<UserReport />} />
            <Route path="/user/attendance" element={<UserTabsAttendance />} />
            <Route path="/user/leave-balance" element={<UserLeave />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
