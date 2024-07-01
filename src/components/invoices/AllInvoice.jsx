import { Col, Row, Select, Space, Table, Tag } from "antd";
import { useState } from "react";
import InvoiceModal from "../InvoiceModal";
import SearchComp from "../usableCompo/SearchComp";
import IPPagination from "../usableCompo/IPPagination";
import {
  useGetAllInvoiceQuery,
  useGetSingleInvoiceQuery,
  useUpdateInvoiceMutation,
} from "../../redux/api/invoiceApi";
import { shippingStatus } from "../../const/shippingStatus";
import moment from "moment";
import INVModal from "../UI/INVModal";
import INVForm from "../form/INVForm";
import { EyeFilled, EditOutlined } from "@ant-design/icons";
import INVSelect from "../form/INVSelect";
import CommonButton from "../UI/CommonButton";
import InvoiceTab from "./InvoiceTab";

const AllInvoices = () => {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [id, setId] = useState("");

  const searchQuery = [
    {
      name: "limit",
      value: 10 + "",
    },
    {
      name: "page",
      value: page + "",
    },
  ];
  if (searchTerm) {
    searchQuery.push({
      name: "searchTerm",
      value: searchTerm,
    });
  }
  if (activeTab !== "all") {
    searchQuery.push({
      name: "status",
      value: activeTab,
    });
  }
  const handleTabChange = (key) => {
    if (key === "all") {
      setActiveTab("all");
      refetchInvoice();
    } else {
      setActiveTab(key);
    }
  };
  console.log(searchQuery, activeTab);
  const {
    data: allData,
    isLoading,
    isFetching: isInvoicesFetching,
    refetch: refetchInvoice,
  } = useGetAllInvoiceQuery(searchQuery);

  const [updateInvoice] = useUpdateInvoiceMutation();

  const {
    data: singleInvoice,
    isLoading: isSingleInvoiceLoading,
    isFetching: isSingleInvoiceFetching,
  } = useGetSingleInvoiceQuery(id);
  const onSubmit = async (data) => {
    try {
      await updateInvoice({
        id: singleInvoice?.data?._id,
        body: data,
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      title: "Order Details",
      key: "orderId",
      render: (_, item) => (
        <div>
          <div className="space-y-1">
            <p>
              Order Number:{" "}
              <Tag
                style={{
                  backgroundColor: "#93278f",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {item?.orderId}
              </Tag>
            </p>
            <p>
              Order Date:{" "}
              <Tag
                style={{
                  fontWeight: "bold",
                }}
              >
                {moment(item?.createdAt).format("MMMM D, YYYY h:mm A")}
              </Tag>
            </p>
            <p>
              Order Status:{" "}
              <Tag
                color={
                  item.status === shippingStatus.PENDING
                    ? "yellow"
                    : item.status === shippingStatus.READY_TO_DELIVERY
                    ? "purple"
                    : item.status === shippingStatus.DELIVERED
                    ? "green"
                    : "red"
                }
              >
                {item.status.toUpperCase()}
              </Tag>
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Cashier Name",
      dataIndex: "cashier_name",
      render: (_, item) => (
        <div>
          <p>
            <strong>{item.cashier_name}</strong>
          </p>
        </div>
      ),
    },
    {
      title: "Customer Details",
      dataIndex: "customer_name",
      render: (_, item) => (
        <div>
          <p>
            <strong>Customer Name:</strong> {item.customer_name}
          </p>
          <p>
            <strong>Customer Phone:</strong> {item.customer_phone}
          </p>
          <p>
            <strong>Customer Address:</strong> {item.customer_address}
          </p>
        </div>
      ),
    },
    {
      title: "Items",
      dataIndex: `items`,
      fixed: "right",
      key: "items",
      render: (items) => items.length,
    },
    {
      title: "Action",
      key: "invoice",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <EyeFilled
            onClick={() => {
              setInfo(record);
              setOpen(true);
            }}
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "0.3rem",
              borderRadius: "0.3rem",
              fontSize: "1.2rem",
            }}
          />
          <EditOutlined
            onClick={() => {
              setId(record?._id);
              setIsModalOpen(true);
            }}
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "0.3rem",
              borderRadius: "0.3rem",
              fontSize: "1.2rem",
            }}
          />
        </Space>
      ),
    },
  ];

  if (isLoading) {
    return <p>loading......</p>;
  }

  return (
    <div>
      <div className="my-5 space-y-2">
        <SearchComp style={{ width: 200 }} setSearchTerm={setSearchTerm} />
        <InvoiceTab activeTab={activeTab} handleTabChange={handleTabChange} />
      </div>
      <Table
        columns={columns}
        loading={isInvoicesFetching}
        rowKey="_id"
        dataSource={allData?.data}
        pagination={false}
        scroll={{ x: 400 }}
      />
      <IPPagination
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "1rem",
        }}
        page={page}
        setPage={setPage}
        total={allData?.meta.total}
        pageSize={allData?.meta.limit}
      />

      {open && (
        <InvoiceModal
          isOpen={open}
          setIsOpen={setOpen}
          invoiceInfo={info}
          items={info.items}
        />
      )}
      <INVModal
        title="Change Status"
        onOk={onSubmit}
        open={isModalOpen}
        setOpen={setIsModalOpen}
        loading={isSingleInvoiceFetching}
      >
        <INVForm
          defaultValues={{
            status: singleInvoice?.data?.status || "",
          }}
          onSubmit={onSubmit}
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <INVSelect
                options={Object.entries(shippingStatus)?.map(
                  ([key, value]) => ({
                    label: value,
                    value: value,
                  })
                )}
                name="status"
                label="Shipping Status"
                type="text"
                defaultValue={singleInvoice?.data?.shippingStatus}
                loading={isSingleInvoiceFetching || isSingleInvoiceLoading}
              />
            </Col>

            <Col span={24}>
              <CommonButton htmlType="submit">Change Status</CommonButton>
            </Col>
          </Row>
        </INVForm>
      </INVModal>
    </div>
  );
};

export default AllInvoices;
