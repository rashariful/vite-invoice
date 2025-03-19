import { FormOutlined, DatabaseOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";
import { DashboardSidebar } from "./SideBarDashboard";
const { Content, Footer, Sider } = Layout;

const App = () => {

  return (
    <Layout>
     
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
