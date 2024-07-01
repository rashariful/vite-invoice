import { Modal } from "antd";
const INVModal = ({ title, open, setOpen, loading, children, ...rest }) => {
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal
        {...rest}
        open={open}
        title={title}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        loading={loading}
      >
        {children}
      </Modal>
    </>
  );
};
export default INVModal;
