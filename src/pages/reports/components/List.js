import React from 'react';
import {
  Row,
  Col,
  Card,
  Pagination,
  Tooltip,
  Icon,
  Popconfirm,
  Message
} from 'antd'
import {connect} from 'dva'

const List = ({list, page, pageSize, total, dispatch}) => {
  const handleChangePage = current => {
    if (current !== page) getData(current)
  }

  const getData = page => {
    dispatch({type: 'reports/fetch', payload: {page}})
  }

  const handleDelete = id => {
    dispatch({
      type: 'reports/remove',
      payload: id
    }).then(res => {
      if (res && res.state === "success") {
        Message.success(res.msg)
        getData(1)
      } else {
        Message.error(res ? res.msg : '周报删除失败')
      }
    })
  }

  const colSpan = {xl: 6, xxl: 4, span: 6}
  return (
    <div>
      <Row gutter={20}>
        {
          list.map(item => (
            <Col key={item.id} {...colSpan}>
              <Card title={item.createTime} extra={
                <>
                  <Tooltip placement="top" title="编辑">
                    <a href={`/reports/write/${item.id}`}>
                      <Icon type="form"/>
                    </a>
                  </Tooltip>
                  <Popconfirm title="确认要删除周报吗？"
                              onConfirm={() => handleDelete(item.id)}>
                    <Tooltip placement="top" title="删除">
                      <Icon type="form"/>
                    </Tooltip>
                  </Popconfirm>
                </>
              }>
                <p className="title">{item.title.slice(0, 20)}</p>
                <p>接收人:{item.receiverName.slice(0, 20)}</p>
              </Card>
            </Col>
          ))
        }
      </Row>
      {
        list.length ? (
          <Pagination className="global-pagination"
                      current={page}
                      pageSize={pageSize}
                      total={total}
                      onChange={handleChangePage}/>
        ) : null
      }
    </div>
  );
};

export default connect(({reports}) => ({...reports}))(List);
