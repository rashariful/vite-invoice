/* eslint-disable react/prop-types */
import Search from "antd/es/transfer/search";

const SearchComp = ({setSearchTerm, style, placeholder = "Search invoice", ...remaining }) => {

  
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
