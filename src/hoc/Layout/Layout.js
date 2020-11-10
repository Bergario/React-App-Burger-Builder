import React, { Component } from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

export class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: !this.state.showSideDrawer });
  };
  render() {
    return (
      <Auxiliary>
        <Toolbar openSideDrawer={this.sideDrawerCloseHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          close={this.sideDrawerCloseHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Auxiliary>
    );
  }
}

export default Layout;
