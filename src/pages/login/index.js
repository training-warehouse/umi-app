/**
 * title: 登录
 * Routes:
 *  - ./src/routes/PrivateRoute.js
 * authority: ["admin","user"]
 */
import React from 'react';
import {Icon, Layout, Form, Input, Button, Message} from "antd";
import {router} from "umi";
import jwtDecode from "jwt-decode";
import {connect} from 'dva'

import styles from './index.scss'

const {Content, Footer} = Layout
const iconStyle = {color: 'rgba(0,0,0,.25)'}

const Index = ({form, dispatch, loading}) => {
  const handleSubmit = () => {
    // form校验
    form.validateFields((errors, values) => {
      if (!errors) {
        dispatch({type: 'login/login', payload: values}).then(res => {
          if (res && res.state === 'suc') {
            const token = jwtDecode(res.token)
            const {id, nickname, username, type} = token
            localStorage.setItem('username', username)
            localStorage.setItem('nickname', nickname)
            localStorage.setItem('userId', id)
            localStorage.setItem('authority', type === '0' ? 'admin' : 'user')

            router.push('/')
          } else {
            Message.error(res ? res.msg : '登录失败')
          }
        })
      }
    })
  }


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
              <Button type="primary" style={{width: '100%'}}
                      loading={loading}
                      onClick={handleSubmit}>登录</Button>
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

export default connect(
  ({loading}) => ({loading: loading.effects['login/login']})
)(Form.create()(Index));
