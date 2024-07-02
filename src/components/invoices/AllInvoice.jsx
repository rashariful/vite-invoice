import { Col, Row, Space, Table, Tag } from "antd";
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
import { useGetAllShopQuery } from "../../redux/api/shopApi";

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

  const { data: shopData, isLoading: isShopLoading } = useGetAllShopQuery();
  const {
    data: allData,
    isLoading,
    isFetching: isInvoicesFetching,
    refetch: refetchInvoice,
  } = useGetAllInvoiceQuery(searchQuery, {
    skip: isShopLoading,
  });

  const allInvoiceData = allData?.data?.map((item) => {
    return {
      orderId: item?.orderId,
      shop: item?.cashier_name
        ? shopData?.data?.find((shop) => shop?.name === item?.cashier_name)
        : shopData?.data?.find((shop) => shop?._id === item?.shop),
      customerName: item?.customer_name || item?.customer?.name,
      customerContactNo: item?.customer_phone || item?.customer?.contactNo,
      customerAddress: item?.customer_address || item?.customer?.address,
      deliveryCharge: item?.delivery_charge || item?.deliveryCharge,
      subTotal: item?.subTotal || item?.subTotal,
      paidAmount: item?.paid_amount || item?.paidAmount,
      note: item?.note,
      due: item?.due,
      grandTotal: item?.total || item?.grandTotal,
      items: item?.items || item?.products,
      status: item?.status,
      createdAt: item?.createdAt,
      _id: item?._id,
    };
  });
  const [updateInvoice] = useUpdateInvoiceMutation();

  const {
    data: singleInvoice,
    isLoading: isSingleInvoiceLoading,
    isFetching: isSingleInvoiceFetching,
  } = useGetSingleInvoiceQuery(id);
  const singleInvoiceData = {
    orderId: singleInvoice?.data?.orderId,
    shop: singleInvoice?.data?.cashier_name
      ? shopData?.data?.find(
          (shop) => shop?.name === singleInvoice?.data?.cashier_name
        )
      : shopData?.data?.find((shop) => shop?._id === singleInvoice?.data?.shop),
    customerName:
      singleInvoice?.data?.customer_name || singleInvoice?.data?.customer?.name,
    customerContactNo:
      singleInvoice?.data?.customer_phone ||
      singleInvoice?.data?.customer?.contactNo,
    customerAddress:
      singleInvoice?.data?.customer_address ||
      singleInvoice?.data?.customer?.address,
    deliveryCharge:
      singleInvoice?.data?.delivery_charge ||
      singleInvoice?.data?.deliveryCharge,
    subTotal: singleInvoice?.data?.subTotal || singleInvoice?.data?.subTotal,
    paidAmount:
      singleInvoice?.data?.paid_amount || singleInvoice?.data?.paidAmount,
    note: singleInvoice?.data?.note,
    due: singleInvoice?.data?.due,
    grandTotal: singleInvoice?.data?.total || singleInvoice?.data?.grandTotal,
    items: singleInvoice?.data?.items,
    status: singleInvoice?.data?.status,
    createdAt: singleInvoice?.data?.createdAt,
    _id: singleInvoice?.data?._id,
  };

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
      title: "Cashier Details",
      key: "_id",
      render: (_, item) => (
        <div>
          <p>
            <strong>Cashier Name:</strong> {item?.shop?.name}
          </p>
          <p>
            <strong>Cashier Phone:</strong> {item?.shop?.contactNo}
          </p>
          <p>
            <strong>Cashier Address:</strong> {item?.shop?.address}
          </p>
        </div>
      ),
    },
    {
      title: "Customer Details",
      key: "_id",
      render: (_, item) => (
        <div>
          <p>
            <strong>Customer Name:</strong> {item.customerName}
          </p>
          <p>
            <strong>Customer Phone:</strong> {item.customerContactNo}
          </p>
          <p>
            <strong>Customer Address:</strong> {item.customerAddress}
          </p>
        </div>
      ),
    },
    {
      title: "Items",
      dataIndex: `items`,
      fixed: "right",
      key: "items",
      render: (items) => items?.length,
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
              console.log(record);
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
        dataSource={allInvoiceData}
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
            status: singleInvoiceData?.status || "",
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
                defaultValue={singleInvoiceData?.status}
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
