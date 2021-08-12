import React from 'react';
import {Affix, Menu, Dropdown, Icon} from "antd";
import {Link, withRouter} from "umi";

const Header = ({location}) => {
  const menu = (
    <Menu>
      <Menu.Item>
        <span>退出</span>
      </Menu.Item>
    </Menu>
  )

  return (
    <Affix offsetTop={0}>
      <div className="header">
        <img src={require('@/assets/logo.png')} alt="logo" className="logo"/>
        <Menu className="menus" mode="horizontal" theme="dark"
              selectedKeys={[location.pathname]}>
          <Menu.Item key="/">
            <Link to="/">首页</Link>
          </Menu.Item>
        </Menu>
        <div className="right">
          <Dropdown overlay={menu}>
            <a href="#">
              <Icon type="user" style={{marginRight: 3}}/>admin
            </a>
          </Dropdown>
        </div>
      </div>
    </Affix>
  );
};

export default withRouter(Header);
