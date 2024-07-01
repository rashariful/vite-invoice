import { Tag } from "antd";

const InvoiceTab = ({ activeTab, handleTabChange }) => {
  return (
    <>
      <Tag
        color={activeTab === "all" ? "blue" : "default"}
        style={{
          padding: "0.2rem 1rem",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={() => handleTabChange("all")}
      >
        All Orders
      </Tag>
      <Tag
        color={activeTab === "pending" ? "blue" : "default"}
        style={{
          padding: "0.2rem 1rem",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={() => handleTabChange("pending")}
      >
        Pending
      </Tag>
      <Tag
        color={activeTab === "ready to delivery" ? "blue" : "default"}
        style={{
          padding: "0.2rem 1rem",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={() => handleTabChange("ready to delivery")}
      >
        Ready to Delivery
      </Tag>
      <Tag
        color={activeTab === "delivered" ? "blue" : "default"}
        style={{
          padding: "0.2rem 1rem",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={() => handleTabChange("delivered")}
      >
        Delivered
      </Tag>
    </>
  );
};

export default InvoiceTab;
