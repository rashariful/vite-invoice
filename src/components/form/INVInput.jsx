import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

const INVInput = ({ type, name, label, disabled, defaultValue, readOnly }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              defaultValue={defaultValue}
              type={type}
              id={name}
              size="large"
              disabled={disabled}
              readOnly={readOnly}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default INVInput;
