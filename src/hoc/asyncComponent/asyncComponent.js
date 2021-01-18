import React, { Component } from "react";

export const asyncComponent = (importComponent) => {
  return class extends Component {
    state = {
      component: null,
    };

    componentDidMount() {
      importComponent().then((cmp) => {
        console.log(cmp.default);
        this.setState({ component: cmp.default });
      });
    }
    render() {
      console.log(this.props);

      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  };
};
