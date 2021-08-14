import React, {Component, Fragment} from 'react';
import {Modal, Form, Input, Radio} from "antd";
import {withClick} from "@/utils/hoc";
import {add} from "@/pages/users/services/users";

const FormItem = Form.Item
const RadioGroup = Radio.Group

// 表单单排格式
const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 14},
}

class UserModal extends Component {
  state = {
    visible: false
  }

  handleClick = () => {
    this.setState({visible: true})
  }

  handleCancel = () => {
    this.setState({visible: false})
  }

  handleOk = () => {
    this.props.form.validateFields((error, values) => {
      if (!error) {
        this.props.onOk(values).then(res => {
          if (res.state === 'success') {
            this.handleCancel()
          }
        })
      }
    })
  }

  render() {
    const {visible} = this.state
    const {children, addLoading, title} = this.props
    const {getFieldDecorator} = this.props.form
    console.log(this.props.record);
    const {username, nickname, type} = this.props.record

    return (
      <Fragment>
        {withClick(children, this.handleClick)}
        <Modal title={title}
               visible={visible}
               centered={true}
               maskClosable={false}
               onCancel={this.handleCancel}
               onOk={this.handleOk}
               confirmLoading={addLoading}>
          <Form>
            <FormItem label="用户名" {...formItemLayout}>
              {
                getFieldDecorator('username', {
                  rules: [
                    {
                      required: true,
                      message: '用户名不能为空'
                    }
                  ],
                  initialValue: username
                })(<Input placeholder='请输入用户名'/>)
              }
            </FormItem>
            <FormItem label="昵称" {...formItemLayout}>
              {
                getFieldDecorator('nickname', {
                  rules: [
                    {
                      required: true,
                      message: '昵称不能为空'
                    }
                  ],
                  initialValue: nickname
                })(<Input placeholder='请输入昵称'/>)
              }
            </FormItem>
            <FormItem label="用户类别" {...formItemLayout}>
              {
                getFieldDecorator('type', {
                  rules: [
                    {
                      required: true,
                      message: '类型不能为空'
                    }
                  ],
                  initialValue: type || '0'
                })(
                  <RadioGroup>
                    <Radio value={'0'}>管理员</Radio>
                    <Radio value={'1'}>普通用户</Radio>
                  </RadioGroup>
                )
              }
            </FormItem>
          </Form>
        </Modal>
      </Fragment>
    )
      ;
  }
}

export default Form.create()(UserModal);
