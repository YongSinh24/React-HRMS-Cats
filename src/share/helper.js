import { useEffect, useState } from "react";
import dayjs from "dayjs";
export const isEmptyOrNull = (value) => {
    return (value === "" || value === null || value === undefined) ? true : false
}

export const config = {
  base_keyclock: `http://localhost:8080`,
  //base_webSocket:`http://localhost:8089/ws`,
  //base_keyclock: `http://192.168.0.112:8080`,
  base_webSocket:`http://localhost:8089/ws`,
  version: 1,
};

const formatDate = "YYYY-MM-DD";
export const dateFormat = (value) => {
  return dayjs(value).format(formatDate);
};

export const WindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
    
      useEffect(() => {
        // Add event listener to handle window resize
        window.addEventListener("resize", handleResize);
    
        // Cleanup the event listener on component unmount
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []); // Empty dependency array ensures that the effect runs only once on mount
      
    return windowSize;
}


export const getStatus = (record) => {
  if (record.cancelled === false && record.status === false && record.approvedByHead === false) {
    return { status: "error", text: "Draft" };
  }
  if (record.approvedByHr && record.approvedByManger && record.approved) {
    return { status: "success", text: "Approved" };
  }
  if (record.approvedByManger && !record.approved) {
    return { status: "warning", text: "Manager Approved" };
  }

  if (record.status && record.cancelled === false) {
    return { status: "processing", text: "Applied" };
  }

  if (record.cancelled) {
    return { status: "error", text: "Cancelled" };
  }

  if (record.approved === false) {
    return { status: "error", text: "Rejected" };
  }

  return { status: "default", text: "Pending" };
};