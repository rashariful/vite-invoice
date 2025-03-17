import { FormOutlined, DatabaseOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";
import { DashboardSidebar } from "./SideBarDashboard";
const { Content, Footer, Sider } = Layout;

const App = () => {
  // const {
  //   token
  //   : { colorBgContainer},
  // } = theme.useToken();
  return (
    <Layout>
      {/* <Sider breakpoint="lg" collapsedWidth="0">
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <FormOutlined />,
              label: <Link to={"/"}>create invoice</Link>,
              className: "hover:bg-[#93278f] focus-within:bg-[#93278f] active:bg-[#93278f]"
            },
            {
              key: "2",
              icon: <DatabaseOutlined />,
              label: <Link to={"/invoices"}>Order Invoices</Link>,
              className: "hover:bg-[#93278f] focus-within:bg-[#93278f] active:bg-[#93278f]"
            },
            {
              key: "3",
              icon: <DatabaseOutlined />,
              label: <Link to={"/invoice-upload"}>invoice upload</Link>,
              className: "hover:bg-[#93278f] focus-within:bg-[#93278f] active:bg-[#93278f]"
            },
            {
              key: "4",
              icon: <DatabaseOutlined />,
              label: <Link to={"/shop"}>shop</Link>,
              className: "hover:bg-[#93278f] focus-within:bg-[#93278f] active:bg-[#93278f]"
            },
          ]}
        />
      </Sider> */}
      <DashboardSidebar/>
      <Layout>
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div className="min-h-screen bg-gray-100">
            <div className="max-w-screen-4xl mx-auto">
              <Outlet />
            </div>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          {/* footer content */}
          <div><p>
            
          All kind of received <strong>Digital agency park</strong></p></div>
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
