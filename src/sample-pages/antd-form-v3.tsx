import { createForm, FormImpl } from "@/antd-form-v3";
import React from "react";

export default createForm((props: { form: FormImpl }) => {
  const { form } = props;

  const handleClick = () => {
    form.validateFields((error, values) => {
      console.log({ error, values });
    });
  };
  return (
    <React.Fragment>
      <h1>rc-form</h1>
      {form.getFieldDecorator("name", { required: true }, <input />)}
      {form.getFieldDecorator("password", { required: false }, <input />)}
      <button onClick={handleClick}>登陆</button>
    </React.Fragment>
  );
});
