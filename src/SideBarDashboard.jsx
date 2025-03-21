import {
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { MdOutlineDriveFolderUpload } from "react-icons/md";

import { BsShop } from "react-icons/bs";
import { MdAddBusiness } from "react-icons/md";
import { Layout, Menu, Button } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const { Sider } = Layout;

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      className=""
    >
      {/* <div className="flex items-center gap-2 p-4 border-b border-gray-200">
          <DashboardOutlined className="text-lg" />
          {!collapsed && <span className="text-lg text-white font-semibold">Dashboard</span>}
        </div> */}
      <div className="p-4 mt-5 border-gray-200 flex flex-col items-center gap-3">
        <img
          className="h-24 w-24 rounded-full"
          src="https://avatars.githubusercontent.com/u/85520624?v=4"
          alt="Profile"
        />
        {!collapsed && (
          <div className="flex flex-col">
            <span className="text-sm text-white font-medium">
              Md Shariful Islam
            </span>
            <span className="text-xs text-gray-500">icchaporon.com</span>
          </div>
        )}
        <Button type="text" icon={<LogoutOutlined />} className="ml-auto" />
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item
          key="1"
          icon={<HomeOutlined />}
          onClick={() => navigate("/dashboard/invoices")}
        >
          Home
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<MdAddBusiness />}
          onClick={() => navigate("/dashboard/create-invoice")}
        >
          Create Invoices
        </Menu.Item>
        <Menu.Item key="3" icon={<BsShop />} onClick={() => navigate("/dashboard/shop")}>
          Shop
        </Menu.Item>
        <Menu.Item
          key="4"
          icon={<MdOutlineDriveFolderUpload />}
          onClick={() => navigate("/dashboard/invoice-upload")}
        >
          invoice-upload
        </Menu.Item>
      </Menu>
      <Button onClick={logout} type="primary" danger className="mt-4 !w-full">
        Logout
      </Button>
    </Sider>
  );
}
