import { Spin } from "antd";
import { Fragment } from "react";

const Loading = ({ children, isLoading }) => {

  return (
    isLoading ? <Spin>{children}</Spin> : <Fragment>{children}</Fragment>
  )
}

export default Loading;