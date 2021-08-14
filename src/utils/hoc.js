// 克隆子元素button，并添加事件 HOC: higher order components
import React from "react";

export const withClick = (element, handleClick = () => {
}) => {
  if (!element) return
  // 判断元素是否是dom对象，如果是对象就重组，不是的话返回span元素
  if (Object.prototype.toString.call(element) === '[object Object]') {
    return <element.type {...element.props} onClick={handleClick}/>
  } else {
    return <span onClick={handleClick}>{element}</span>
  }
}
