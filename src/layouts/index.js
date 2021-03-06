import {Layout, ConfigProvider} from "antd";
import zhCN from 'antd/es/locale/zh_CN'

import './index.scss'
import Header from "./Header";
import Footer from "./Footer";


const {Content} = Layout

function BasicLayout({children, location}) {
  // 全局布局，登录页面
  if (location.pathname === "/login") {
    return children
  }

  return (
    // 国际化
    <ConfigProvider locale={zhCN}>
      <Layout className="basic-layout">
        <Header/>
        <Content className="content">{children}</Content>
        <Footer/>
      </Layout>
    </ConfigProvider>
  );
}

export default BasicLayout;
// 装低版本的node-sass
