import React from 'react';
import {Icon, Layout, Form, Input, Button} from "antd";
import styles from './index.scss'

const {Content, Footer} = Layout
const iconStyle = {color: 'rgba(0,0,0,.25)'}

const Index = ({form}) => {
  return (
    <Layout>
      <Content className={styles.content}>
        <div className={styles.form}>
          <h1>
            <img src={require("@/assets/logo.png")} alt="logo"/>管理系统
          </h1>
          <Form>
            <Form.Item>
              {
                // 字段验证
                form.getFieldDecorator('username', {
                  rules: [
                    {
                      required: true,
                      message: '用户名不能为空'
                    }
                  ]
                })(
                  <Input
                    prefix={<Icon type="user" style={iconStyle}/>}
                    placeholder="请输入用户名"
                    autoFocus/>
                )}
            </Form.Item>
            <Form.Item>
              {
                form.getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: '密码不能为空'
                    }
                  ]
                })(
                  <Input type="password"
                         prefix={<Icon type="lock" style={iconStyle}/>}
                         placeholder="请输入密码" autoFocus/>
                )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" style={{width: '100%'}}>登录</Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
      <Footer className={styles.footer}>
        Copyright <Icon type="copyright"/> 2021 小摩托练习
      </Footer>
    </Layout>
  );
};

Index.title = "登录"
export default Form.create()(Index);
