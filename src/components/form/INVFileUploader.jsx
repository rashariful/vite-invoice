import { Form, Upload, message } from "antd";
import { Controller } from "react-hook-form";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

const INVFileUploader = ({ name, label, defaultImage }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadButton = !defaultImage ? (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  ) : (
    <img src={defaultImage} alt="avatar" style={{ width: "100%" }} />
  );

  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field: { onChange, ...field }, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Upload
              {...field}
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              beforeUpload={beforeUpload}
              onChange={(e) => {
                if (e.file.status === "uploading") {
                  setLoading(true);
                  return;
                } else {
                  getBase64(e.file.originFileObj, (url) => {
                    setLoading(false);
                    setImageUrl(url);
                  });
                }
                onChange(e.file);
              }}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default INVFileUploader;
