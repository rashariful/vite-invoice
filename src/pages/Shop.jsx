import { Col, Row, Space, Table } from "antd";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  useCreateShopMutation,
  useDeleteShopMutation,
  useGetAllShopQuery,
  useGetSingleShopQuery,
  useUpdateShopMutation,
} from "../redux/api/shopApi";
import toast from "react-hot-toast";
import SearchComp from "../components/usableCompo/SearchComp";
import CommonButton from "../components/UI/CommonButton";
import INVPagination from "../components/usableCompo/INVPagination";
import INVModal from "../components/UI/INVModal";
import INVForm from "../components/form/INVForm";
import INVInput from "../components/form/INVInput";
import INVFileUploader from "../components/form/INVFileUploader";

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [createShop] = useCreateShopMutation();
  const [updateShop] = useUpdateShopMutation();
  const [deleteShop] = useDeleteShopMutation();
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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

  const {
    data: shopData,
    isLoading: isShopLoading,
    isFetching: isShopFetching,
  } = useGetAllShopQuery(searchQuery);

  const { data: singleShopData, isFetching: isSingleShopFetching } =
    useGetSingleShopQuery(id);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("data", JSON.stringify(data));
      formData.append("file", data?.image?.originFileObj);
      const res = await createShop(formData);
      if (res?.error) {
        toast.error("Shop adding failed!");
        return;
      }
      toast.success("Shop added successfully!");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Shop adding failed!");
    }
  };

  const onEdit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("file", data?.image?.originFileObj);
      const res = await updateShop({
        id: id,
        body: formData,
      });
      if (res?.error) {
        toast.error("Shop updating failed!");
        return;
      }
      toast.success("Shop updated successfully!");
      setIsEditModalOpen(false);
    } catch (error) {
      toast.error("Shop updating failed!");
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await deleteShop(id);
      if (res?.error) {
        toast.error("An error occurred while deleting the shop.");
        return;
      }
      toast.success("Shop deleted successfully!");
    } catch (error) {
      toast.error("An error occurred while deleting the shop.");
    }
  };

  if (isShopLoading) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <span className="loading loading-lg"></span>
      </div>
    );
  }
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: "30%",
      render: (_, record) => (
        <img
          src={record.image}
          alt={record.name}
          style={{ width: "3.8rem", height: "3.8rem", objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Shop Name",
      dataIndex: "name",
      key: "_id",
      width: "35%",
    },
    {
      title: "Action",
      key: "action",
      width: "35%",
      render: (_, item) => (
        <Space size="middle">
          <EditOutlined
            onClick={() => {
              setId(item._id);
              setIsEditModalOpen(true);
            }}
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "0.3rem",
              borderRadius: "0.3rem",
              fontSize: "1.2rem",
            }}
          />
          <DeleteOutlined
            onClick={() => {
              handleDelete(item._id);
            }}
            style={{
              backgroundColor: "red",
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
  return (
    <div className="min-h-screen space-y-4">
      <div className="my-5 space-y-2 flex items-center justify-between">
        <SearchComp style={{ width: 200 }} setSearchTerm={setSearchTerm} />
        <CommonButton
          style={{
            width: 200,
          }}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Add Shop
        </CommonButton>
      </div>
      <Table
        columns={columns}
        loading={isShopFetching}
        rowKey="_id"
        dataSource={shopData?.data}
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
        total={shopData?.meta.total}
        pageSize={shopData?.meta.limit}
      />
      <INVModal
        title="Add Shop"
        onOk={onSubmit}
        open={isModalOpen}
        setOpen={setIsModalOpen}
      >
        <INVForm onSubmit={onSubmit}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <INVInput type="text" name="name" label="Shop Name" />
            </Col>
            <Col span={24}>
              <INVInput type="text" name="address" label="Shop Address" />
            </Col>
            <Col span={24}>
              <INVInput type="text" name="contactNo" label="Contact No" />
            </Col>
            <Col span={24}>
              <INVFileUploader name="image" label="Shop Image" />
            </Col>
            <Col span={24}>
              <CommonButton htmlType="submit">Add Shop</CommonButton>
            </Col>
          </Row>
        </INVForm>
      </INVModal>

      <INVModal
        title="Edit Shop"
        onOk={onSubmit}
        open={isEditModalOpen}
        setOpen={setIsEditModalOpen}
        loading={isSingleShopFetching}
      >
        <INVForm
          defaultValues={{
            name: singleShopData?.data?.name,
          }}
          onSubmit={onEdit}
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <INVInput type="text" name="name" label="Shop Name" />
            </Col>
            <Col span={24}>
              <INVInput type="text" name="address" label="Shop Address" />
            </Col>
            <Col span={24}>
              <INVInput type="text" name="contactNo" label="Contact No" />
            </Col>
            <Col span={24}>
              <INVFileUploader
                name="image"
                label="Shop Image"
                defaultImage={singleShopData?.data?.image}
              />
            </Col>

            <Col span={24}>
              <CommonButton htmlType="submit">Edit Shop</CommonButton>
            </Col>
          </Row>
        </INVForm>
      </INVModal>
    </div>
  );
};

export default Shop;
