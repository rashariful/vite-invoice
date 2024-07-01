import { Col, Row } from "antd";
import CommonButton from "../UI/CommonButton";
import { USER_ROLE } from "../../constant/role";
import ResponsivHelper from "../../helpers/ResponsivHelper";
import { useUpdateOrderMutation } from "../../redux/api/orderApi";
import ipToast from "../UI/iPToast";

const InvoiceStatus = ({
  singleOrderData,
  setIsEditModalOpen,
  userRole = "admin",
}) => {
  const { isSmall } = ResponsivHelper();

  const [updateOrder] = useUpdateOrderMutation();
  const onEdit = async (status) => {
    const loadingToastId = ipToast.loading("Updating order status...");
    try {
      const orderData = {
        id: singleOrderData?.data?._id,
        body: {
          orderStatus: status,
        },
      };

      const res = await updateOrder(orderData);

      if (res?.error) {
        ipToast.update(loadingToastId, {
          render:
            res?.error?.message ||
            "An error occurred while updating the order.",
          type: "error",
        });
        return;
      }
      ipToast.update(loadingToastId, {
        render: "Order updated successfully!",
        type: "success",
      });
      setIsEditModalOpen(false);
    } catch (error) {
      ipToast.update(loadingToastId, {
        render: "An error occurred while updating the order.",
        type: "error",
      });
    }
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={24} md={{ span: 12 }}>
        <p>
          <strong>Order Number:</strong> {singleOrderData?.data?.orderNumber}
        </p>
      </Col>
      <Col span={24} md={{ span: 12 }}>
        <p>
          <strong>Order Status:</strong> {singleOrderData?.data?.orderStatus}
        </p>
      </Col>
      <Col span={24} md={{ span: 12 }}>
        <p>
          <strong>Payment Status:</strong>{" "}
          {singleOrderData?.data?.paymentStatus}
        </p>
      </Col>
      <Col span={24} md={{ span: 12 }}>
        <p>
          <strong>Shipping Method:</strong>{" "}
          {singleOrderData?.data?.shippingMethod?.methodName}
        </p>
      </Col>
      <Col span={24} md={{ span: 12 }}>
        <p>
          <strong>Customer Name:</strong>{" "}
          {singleOrderData?.data?.customer?.name}
        </p>
        <p>
          <strong>Customer Email:</strong>{" "}
          {singleOrderData?.data?.customer?.email}
        </p>
        <p>
          <strong>Customer Contact No:</strong>{" "}
          {singleOrderData?.data?.customer?.contactNo}
        </p>
      </Col>
      <Col span={24} md={{ span: 12 }}>
        <p>
          <strong>Sub Total:</strong> {singleOrderData?.data?.subTotal}
        </p>
      </Col>
      <Col span={24} md={{ span: 12 }}>
        <p>
          <strong>Discount Amount:</strong>{" "}
          {singleOrderData?.data?.discountAmount}
        </p>
      </Col>
      <Col span={24} md={{ span: 12 }}>
        <p>
          <strong>Grand Total:</strong> {singleOrderData?.data?.grandTotal}
        </p>
      </Col>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          <Col span={24} md={{ span: 12 }}>
            <h3>Shipping Address:</h3>
            <p>
              <strong>Address:</strong>{" "}
              {singleOrderData?.data?.shippingAddress?.details}
            </p>
            <p>
              <strong>City:</strong>{" "}
              {singleOrderData?.data?.shippingAddress?.city?.name}
            </p>
            <p>
              <strong>District:</strong>{" "}
              {singleOrderData?.data?.shippingAddress?.district?.name}
            </p>
            <p>
              <strong>Division:</strong>{" "}
              {singleOrderData?.data?.shippingAddress?.division?.name}
            </p>
            <p>
              <strong>Postal Code:</strong>{" "}
              {singleOrderData?.data?.shippingAddress?.postalCode}
            </p>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <h3>Billing Address:</h3>
            <p>
              <strong>Address:</strong>{" "}
              {singleOrderData?.data?.billingAddress?.details}
            </p>
            <p>
              <strong>City:</strong>{" "}
              {singleOrderData?.data?.billingAddress?.city?.name}
            </p>
            <p>
              <strong>District:</strong>{" "}
              {singleOrderData?.data?.billingAddress?.district?.name}
            </p>
            <p>
              <strong>Division:</strong>{" "}
              {singleOrderData?.data?.billingAddress?.division?.name}
            </p>
            <p>
              <strong>Postal Code:</strong>{" "}
              {singleOrderData?.data?.billingAddress?.postalCode}
            </p>
          </Col>
        </Row>
      </Col>

      <Col span={24} style={{ maxHeight: "300px", overflowY: "scroll" }}>
        {singleOrderData?.data?.products?.map((product, index) => (
          <Col span={24} key={index}>
            <div
              style={{
                border: "1px solid #f0f0f0",
                padding: "1rem",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: "1rem",
              }}
            >
              <img
                src={product?.product?.images?.[0]?.url}
                alt={product?.product?.title}
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "cover",
                }}
              />
              <div>
                <p>
                  <strong>Product Title:</strong> {product?.product?.title}
                </p>
                <p>
                  <strong>Price:</strong> ${product?.product?.price}
                </p>
                <p>
                  <strong>Quantity:</strong> {product?.product?.quantity}
                </p>
              </div>
            </div>
          </Col>
        ))}
      </Col>
      {userRole === USER_ROLE.VENDOR &&
        singleOrderData?.data?.orderStatus === "pending" && (
          <Col span={24}>
            <CommonButton
              style={{
                width: isSmall ? "100%" : "50%",
                float: "right",
              }}
              onClick={() => onEdit("confirmed")}
            >
              Confirm Order
            </CommonButton>
          </Col>
        )}

      {/* <Col span={24}>
        <CommonButton
          style={{
            width: isSmall ? "100%" : "50%",
            float: "right",
          }}
          onClick={() => setIsEditModalOpen(false)}
        >
          Close
        </CommonButton>
      </Col> */}
    </Row>
  );
};

export default InvoiceStatus;
