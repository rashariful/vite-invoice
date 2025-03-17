"use client";

import { useState } from "react";
import { Button, Tabs } from "antd";
const { TabPane } = Tabs;

import Search from "antd/es/input/Search";
import OrdersOverview from "./OrdersOverview";
import { Tab } from "@headlessui/react";
import TabsCompo from "./TabsCompo";

export default function OrderManagement({
  setSearchTerm,
  allData,
  handleTabChange,
  activeTab,
  todayInvoices,
  yesterdayInvoices,
  weeklyInvoices,
  monthlyInvoices,
}) {
  const data = allData;
  const orders = data?.data?.orders;

  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [date, setDate] = useState(null);

  const [activeKey, setActiveKey] = useState("all");

  const handleChange = (key) => {
    setActiveKey(key);
    setStatusFilter(key);
  };

  // tab clss active functin here
  const getTabClass = (key, baseClass, activeClass) =>
    activeKey === key ? activeClass : baseClass;

  // tabs data here
  const TABS = [
    { key: "all", label: "All Orders", color: "bg-indigo-500" },
    { key: "pending", label: "Pending", color: "bg-rose-500" },
    { key: "ready", label: "Ready To Delivery", color: "bg-amber-500" },
    { key: "delivered", label: "Delivered", color: "bg-green-500" },
  ];
  // tabs style render here
  const renderTab = ({ key, label, color }) => (
    <Button
      key={key}
      tab={
        <span
          onClick={() => handleTabChange(key)}
          className={getTabClass(
            key,
            "px-4 py-2 rounded-md transition-all duration-200",
            `px-4 py-2 rounded-md transition-all duration-200 bg-gradient-to-r ${color} text-white`
          )}
        >
          {label}
        </span>
      }
    />
  );

  return (
    <div className=" mx-auto">
      <div className="relative mb-2">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-xl blur-xl"></div>
        <div className="relative  p-6 bg-white dark:bg-slate-100 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-200 shadow-sm">
          <OrdersOverview
            todayInvoices={todayInvoices}
            yesterdayInvoices={yesterdayInvoices}
            weeklyInvoices={weeklyInvoices}
            monthlyInvoices={monthlyInvoices}
            allData={allData}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 mt-6">
        {/* Search Box */}
        <div className="w-full md:w-96 shadow-sm flex items-center gap-4">
          <Search
            allowClear
            size="large"
            enterButton="Search"
            placeholder="Search by order ID, customer name, or phone"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Tabs Component */}
        <div className="w-full md:w-auto">
          <TabsCompo activeTab={activeTab} handleTabChange={handleTabChange} />
        </div>
      </div>
    </div>
  );
}
