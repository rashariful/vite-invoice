import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

const INVSelect = ({
  label,
  name,
  options,
  disabled,
  mode,
  loading,
  defaultValue,
}) => {
  console.log(defaultValue);
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            defaultValue={defaultValue}
            mode={mode}
            style={{ width: "100%" }}
            {...field}
            options={options}
            size="large"
            disabled={disabled}
            loading={loading}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default INVSelect;
