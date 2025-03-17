import {
  Button,
  Col,
  Dropdown,
  Menu,
  message,
  Row,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { useState } from "react";
import InvoiceModal from "../InvoiceModal";
import {
  useGetAllInvoiceQuery,
  useGetSingleInvoiceQuery,
  useUpdateInvoiceMutation,
} from "../../redux/api/invoiceApi";
import { shippingStatus } from "../../const/shippingStatus";
import moment from "moment";
import INVModal from "../UI/INVModal";
import INVForm from "../form/INVForm";
import {
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
} from "@ant-design/icons";
// import INVSelect from "../form/INVSelect";
import CommonButton from "../UI/CommonButton";
import { useGetAllShopQuery } from "../../redux/api/shopApi";
import INVPagination from "../usableCompo/INVPagination";
import { FaTruckPickup } from "react-icons/fa";
import OrderManagement from "./OrderManagement";

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
  // const searchQuery = [
  //   {
  //     name: "limit",
  //     value: 10 + "",
  //   },
  //   {
  //     name: "page",
  //     value: page + "",
  //   },
  // ];
  // if (searchTerm) {
  //   searchQuery.push({
  //     name: "searchTerm",
  //     value: searchTerm,
  //   });
  // }
  // if (activeTab !== "all") {
  //   searchQuery.push({
  //     name: "status",
  //     value: activeTab,
  //   });
  // }

  const searchQuery = [
    { name: "limit", value: "10" },
    { name: "page", value: page.toString() },
  ];
  if (searchTerm) {
    searchQuery.push({ name: "searchTerm", value: searchTerm }); // Passing the search term to the query
  }
  if (activeTab !== "all") {
    searchQuery.push({ name: "status", value: activeTab });
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

  const today = moment().startOf("day");
  const yesterday = moment().subtract(1, "days").startOf("day");
  const startOfWeek = moment().startOf("week");
  const startOfMonth = moment().startOf("month");
  
  const todayInvoices = allData?.data?.filter((invoice) => moment(invoice.createdAt).isSame(today, "day"));
  const yesterdayInvoices =allData?.data?.filter((invoice) => moment(invoice.createdAt).isSame(yesterday, "day"));
  const weeklyInvoices = allData?.data?.filter((invoice) => moment(invoice.createdAt).isSameOrAfter(startOfWeek, "day"));
  const monthlyInvoices = allData?.data?.filter((invoice) => moment(invoice.createdAt).isSameOrAfter(startOfMonth, "day"));
  

  // fintering by date end here 


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

  const columns = [
    {
      title: "NO.",
      key: "index",
      render: (_, __, index) => index + 1,
    },
    {
      title: "SHOP",
      key: "shop",
      render: (_, item) => (
        <Tooltip title={item?.shop?.name}>
          <img
            src={item?.shop?.image || "/default-shop.png"}
            alt="Shop Logo"
            className="w-8 h-8 rounded-full object-cover cursor-pointer"
          />
        </Tooltip>
      ),
    },
    {
      title: "DATE",
      key: "orderDate",
      render: (_, item) => moment(item?.createdAt).format("MMM D, YYYY"),
    },
    {
      title: "NAME",
      key: "customerName",
      dataIndex: "customerName",
    },
    {
      title: "PHONE",
      key: "customerPhone",
      dataIndex: "customerContactNo",
    },
    {
      title: "ADDRESS",
      key: "customerAddress",
      dataIndex: "customerAddress",
    },
    {
      title: "PRODUCT NAME",
      key: "productName",
      render: (_, item) =>
        item.items?.map((product) => product.name).join(", "),
    },
    {
      title: "QUANTITY",
      key: "quantity",
      render: (_, item) =>
        item.items?.reduce((total, product) => total + product.qty, 0),
    },
    {
      title: "DELIVERY CHARGE",
      key: "deliveryCharge",
      render: (_, item) => {
        let charge = item?.deliveryCharge || 0;
        let location, color;
        if (charge === 120) {
          location = "Outside Dhaka";
          color = "red";
        } else if (charge === 60) {
          location = "Inside Dhaka";
          color = "green";
        } else if (charge === 80) {
          location = "Subarea";
          color = "blue";
        } else {
          location = "Unknown";
          color = "gray";
        }
        return (
          <Tag color={color}>
            {charge} BDT <span className="text-gray-600">({location})</span>
          </Tag>
        );
      },
    },
    {
      title: "ORDER STATUS",
      key: "orderStatus",
      render: (_, item) => (
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
      ),
    },
    {
      title: "ACTION",
      key: "action",
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu onClick={(e) => e.domEvent.stopPropagation()}>
              {record.status === "pending" && (
                <Menu.Item
                  key="edit"
                  onClick={() => {
                    setSelectedInvoice(record);
                    setIsEditModalOpen(true);
                  }}
                >
                  <EditOutlined /> Edit
                </Menu.Item>
              )}
              <Menu.Item
                key="delete"
                onClick={(e) => {
                  e.domEvent.stopPropagation();
                  handleDelete(record?._id);
                }}
                danger
              >
                <DeleteOutlined /> Delete
              </Menu.Item>
              
              {record.status === "pending" && (
                <Menu.Item
                  key="ready"
                  onClick={(e) => {
                    e.domEvent.stopPropagation();
                    setId(record?._id);
                    setIsModalOpen(true);
                  }}
                >
                  <FaTruckPickup className="text-blue-500" /> Ready for Pickup
                </Menu.Item>
              )}
            </Menu>
          }
          trigger={["click"]}
        >
          <Button
            icon={<MoreOutlined />}
            className="three-dots"
            onClick={(e) => e.stopPropagation()} // Prevents row click from triggering modal
          />
        </Dropdown>
      ),
    },
  ];

  // Handle row click to open modal
  const onRowClick = (record, event) => {
    if (
      !event.target.closest(".three-dots") &&
      !event.target.closest(".ant-dropdown-menu")
    ) {
      setInfo(record);
      setOpen(true);
    }
  };

  // column end here sharif

  if (isLoading) {
    return <p>loading......</p>;
  }

  const handleSendParcel = async () => {
    const data = {
      customerName: selectedInvoice.customerName,
      // customerPhone: selectedInvoice.customerContactNo,
      customerPhone: selectedInvoice.customerContactNo.startsWith("0")
        ? selectedInvoice.customerContactNo
        : "0" + selectedInvoice.customerContactNo,
      customerAddress: selectedInvoice.customerAddress,
      orderId: selectedInvoice.orderId,
      pickupAddress: selectedInvoice.shop.address,
      cashCollection: selectedInvoice.grandTotal,
      weight,
      message: note,
      isInsideDhaka,
    };
    // console.log("handleSendParcel called", data);
    try {
      const response = await fetch(
        "https://invoice-server.icchaporon.com/api/v1/parcels",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      console.log("Final Payload:", JSON.stringify(data));
      if (!response.ok) throw new Error("Failed to send parcel");
      message.success("Parcel sent successfully!");
      setNote("");
      setWeight(null);
      setIsModalOpen(false);
      console.log("Modal should close now, isModalOpen:", isModalOpen);

      console.log("Parcel sent successfully!");
    } catch (error) {
      console.error(error);
      message.error("Failed to send parcel, please try again.");
    }
  };

  return (
    <div>
      <div className=" my-5 space-y-2">
        <OrderManagement
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          allData={allData}
          activeTab={activeTab}
          handleTabChange={handleTabChange}
          todayInvoices={todayInvoices}
          yesterdayInvoices={yesterdayInvoices}
          weeklyInvoices={weeklyInvoices}
          monthlyInvoices={monthlyInvoices}
        />
      </div>

      <div className="shadow-md p-4 bg-white rounded-lg">
        <Table
          columns={columns}
          dataSource={allInvoiceData}
          onRow={(record) => ({
            onClick: (event) => onRowClick(record, event),
          })}
          rowClassName="cursor-pointer hover:bg-gray-100"
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
      </div>

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
                <label
                  htmlFor="weight"
                  className="text-sm font-bold md:text-base"
                >
                  Weight:
                </label>
                <input
                  required
                  className="bg-slate-100 p-2 rounded-md w-full"
                  type="number"
                  name="weight"
                  id="weight"
                  value={weight}
                  placeholder="Weight by gram"
                  onChange={(event) => setWeight(Number(event.target.value))}
                  // onChange={(event) => setWeight(event.target.value)}
                />
              </div>
            </Col>

            {/* Note Field */}
            <Col span={24}>
              <div>
                <label
                  htmlFor="note"
                  className="text-sm font-bold md:text-base"
                >
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
