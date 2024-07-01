/* eslint-disable react/prop-types */
import Search from "antd/es/transfer/search";

const SearchComp = ({
  setSearchTerm,
  style,
  placeholder = "input order id",
  ...remaining
}) => {
  return (
    <div style={{ ...style }}>
      <Search
        {...remaining}
        placeholder={placeholder}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchComp;
