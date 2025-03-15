import React from "react";
import { DownOutlined, LogoutOutlined } from "@ant-design/icons";
import { Dropdown, Avatar } from "antd";
import UserService from "../../UserService/UserService";


const MenuItems = () => {
  const themes = {
    light: {
      sidebar: {
        // backgroundColor: "#EBEBEB",
        // color: "#636363;",
      },
      menu: {
        menuContent: "#F0F0F0",
        icon: "#777777",
        fontSize: 40,
        hover: {
          backgroundColor: "#f9f9f9",
          color: "#44596e",
        },
        disabled: {
          color: "#9fb6cf",
        },
      },
    },
  };
  
  const handleLogout = () => {
    UserService.doLogout();
   // window.location.href = window.location.origin;
    //window.location.href = "http://192.168.0.142:3005/";
  };
  const handleLogIn = () => {
    UserService.doLogin();
    //window.location.href = "https://www.cats.com.kh/apps/sso/logout";
  };
  const menuUser = [
    {
      key: "1",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];
  

  const name = UserService.getLastname() +" "+ UserService.getFirstname();
  
  return (
    <>
      <div>
        <div>
          <Dropdown
            menu={{
              items: menuUser,
            }}
            placement="bottomLeft"
          >
            <div>
              <Avatar
                style={{ marginRight: "8px" }}
                src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${1}`}
                size="large"
              />
              {name}
              <DownOutlined style={{ marginLeft: "8px" }} />
            </div>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default MenuItems;
