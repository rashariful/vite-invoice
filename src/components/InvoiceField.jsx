/* eslint-disable react/prop-types */
const InvoiceField = ({ onEditItem, cellData }) => {
  return (
    <input
      className={cellData.className}
      disabled={cellData.disabled}
      type={cellData.type}
      placeholder={cellData.placeholder}
      min={cellData.min}
      max={cellData.max}
      step={cellData.step}
      name={cellData.name}
      id={cellData.id}
      value={cellData.value}
      onChange={onEditItem}
      required
    />
  );
};

export default InvoiceField;
