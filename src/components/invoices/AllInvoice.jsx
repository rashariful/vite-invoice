import { Button, Col, message, Row, Space, Table, Tag } from "antd";
import { useState } from "react";
import InvoiceModal from "../InvoiceModal";
import SearchComp from "../usableCompo/SearchComp";
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
// import INVSelect from "../form/INVSelect";
import CommonButton from "../UI/CommonButton";
import InvoiceTab from "./InvoiceTab";
import { useGetAllShopQuery } from "../../redux/api/shopApi";
import INVPagination from "../usableCompo/INVPagination";
import { FaTruckPickup } from "react-icons/fa";

const AllInvoices = () => {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [id, setId] = useState("");
  const [weight, setWeight] = useState(null);
  const [note, setNote] = useState("");
  const [isInsideDhaka, setIsInsideDhaka] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState();
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

  const handleStatusChange = async (data) => {
    const status = {
      status: "DELIVERED",
    };
    try {
      await updateInvoice({
        id: singleInvoice?.data?._id,
        body: status,
      });
      // setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };
  // const onSubmit = async (data) => {
  //   try {
  //     await updateInvoice({
  //       id: singleInvoice?.data?._id,
  //       body: data,
  //     });
  //     setIsModalOpen(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
      width: "10%",
      dataIndex: `items`,
      fixed: "right",
      key: "items",
      render: (items) => items?.length,
    },
    {
      title: "Action",
      width: "15%",
      key: "invoice",
      fixed: "right",
      render: (_, record) => (
        <Space size="middle">
          <EyeFilled
            onClick={() => {
              console.log(record);
              setInfo(record);
              setOpen(true);
            }}
            style={{
              // backgroundColor: "red",
              border: "1px solid #93278f",
              color: "#93278f",
              padding: "0.3rem",
              borderRadius: "0.3rem",
              fontSize: "1.2rem",
            }}
          />
          {/* <FaTruckPickup
            onClick={() => {
              setId(record?._id);
              setIsModalOpen(true);
              setSelectedInvoice(record)
            }}
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "0.2rem",
              borderRadius: "0.3rem",
              fontSize: "1.5rem",
            }}
          /> */}
          {record.status === "pending" && <Button
            onClick={() => {
              setId(record?._id);
              setIsModalOpen(true);
              setSelectedInvoice(record)
            }}
            type="primary"
            icon={<FaTruckPickup />}
            className="bg-[#93278f]"
          >Delivered</Button>}
        </Space>
      ),
    },
  ];

  if (isLoading) {
    return <p>loading......</p>;
  }
  // console.log(selectedInvoice, 'selectedInvoice',)
  // console.log(selectedInvoice?.customerName, 'selectedInvoiceCustomer',)

  // console.log(allInvoiceData)
  // console.log(singleInvoiceData, "single invoice data");

  const handleSendParcel = async () => {
    const data = {
      customerName: selectedInvoice.customerName,
      customerPhone: selectedInvoice.customerContactNo,
      customerAddress: selectedInvoice.customerAddress,
      orderId: selectedInvoice.orderId,
      pickupAddress: selectedInvoice.shop.address,
      cashCollection: selectedInvoice.grandTotal,
      weight,
      message: note,
      isInsideDhaka,
    }
    // console.log("handleSendParcel called", data);
    try {
      const response = await fetch("https://invoice-server.icchaporon.com/api/v1/parcels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to send parcel");
      message.success('Parcel sent successfully!');
      setNote("");
      setWeight(null);
      setIsModalOpen(false);
      console.log("Modal should close now, isModalOpen:", isModalOpen);

      console.log("Parcel sent successfully!");
    } catch (error) {
      console.error(error);
      message.error('Failed to send parcel, please try again.');
    }
  };


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
      <INVPagination
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
        title="Send Parcel"
        onOk={handleSendParcel}
        open={isModalOpen}
        setOpen={setIsModalOpen}
        loading={isSingleInvoiceFetching}
      >
        <INVForm
          defaultValues={{
            isInsideDhaka: isInsideDhaka, // Set initial value
            weight: weight || null,
            note: note || "",
          }}
          onSubmit={handleSendParcel}
        >
          <Row gutter={[16, 16]}>
            {/* <Col span={24}>
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
            </Col> */}
            <Col span={24}>
              <div className="mb-4 flex gap-5">
                <Button
                  type={isInsideDhaka ? "primary" : "default"}
                  onClick={() => setIsInsideDhaka(true)}
                >
                  Inside Dhaka
                </Button>
                <Button
                  type={!isInsideDhaka ? "primary" : "default"}
                  onClick={() => setIsInsideDhaka(false)}
                >
                  Outside Dhaka
                </Button>
              </div>
            </Col>

            {/* Weight Field */}
            <Col span={24}>
              <div>
                <label htmlFor="weight" className="text-sm font-bold md:text-base">
                  Weight:
                </label>
                <input
                  required
                  className="bg-slate-100 p-2 rounded-md w-full"
                  type="number"
                  name="weight"
                  id="weight"
                  value={weight}
                  onChange={(event) => setWeight(event.target.value)}
                />
              </div>
            </Col>

            {/* Note Field */}
            <Col span={24}>
              <div>
                <label htmlFor="note" className="text-sm font-bold md:text-base">
                  Note:
                </label>
                <input
                  className="bg-slate-100 p-2 rounded-md w-full"
                  type="text"
                  name="note"
                  id="note"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                />
              </div>
            </Col>

            {/* Submit Button */}
            <Col span={24}>
              <CommonButton htmlType="submit">Send Parcel</CommonButton>
            </Col>
          </Row>
        </INVForm>
      </INVModal>

    </div>
  );
};

export default AllInvoices;
