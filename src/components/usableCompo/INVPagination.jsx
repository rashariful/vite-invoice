/* eslint-disable react/prop-types */
import { Pagination } from "antd";

const INVPagination = ({ page, setPage, total, pageSize, style, ...rest }) => {
  return (
    <Pagination
      {...rest}
      style={style}
      current={page}
      onChange={(value) => setPage(value)}
      total={total}
      pageSize={pageSize}
    />
  );
};

export default INVPagination;
