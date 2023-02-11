import React, { ReactElement } from "react";

export interface FormImpl {
  setValues: (state: any) => void;
  getFieldDecorator: (
    name: string,
    rule: { required: boolean },
    component: React.ReactElement
  ) => ReactElement;
  getValues(): any;
  validateFields: (callback: (error: any, values: any) => any) => void;
}

export function createForm(Component: React.FunctionComponent<{ form: any }>) {
  return class extends React.Component {
    state = {} as any;
    rules = {} as any;

    validateFields: FormImpl["validateFields"] = (callback) => {
      const names = Object.keys(this.rules);
      for (let index = 0; index < names.length; index++) {
        const name = names[index];
        const value = this.state[name];
        const rule = this.rules[name];

        if (rule.required && value == null) {
          callback(`${name} is required`, this.state);
          return;
        }
      }

      return callback(null, this.state);
    };

    getFieldDecorator: FormImpl["getFieldDecorator"] = (
      name,
      rule,
      component
    ) => {
      this.rules[name] = rule;

      return React.cloneElement(component, {
        onChange: (e: any) => {
          this.setState({ [name]: e.target.value });
        },
      });
    };

    getForm(): FormImpl {
      return {
        setValues: (state) => this.setState(state),
        getFieldDecorator: this.getFieldDecorator,
        getValues: () => this.state,
        validateFields: this.validateFields,
      };
    }

    render() {
      return <Component {...this.props} form={this.getForm()} />;
    }
  };
}
