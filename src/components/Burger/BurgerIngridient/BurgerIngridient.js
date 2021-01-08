import React, { Component } from "react";
import classes from "./BurgerIngridient.module.css";
// import PropTypes from "prop-types";

class BurgerIngridient extends Component {
  render() {
    let ingredient = null;

    switch (this.props.type) {
      case "bread-bottom":
        ingredient = <div className={classes.BreadBottom}></div>;
        break;
      case "bread-top":
        ingredient = (
          <div className={classes.BreadTop}>
            <div className={classes.seeds1}></div>
            <div className={classes.seeds2}></div>
          </div>
        );
        break;
      case "Meat":
        ingredient = <div className={classes.Meat}></div>;
        break;
      case "Cheese":
        ingredient = <div className={classes.Cheese}></div>;
        break;
      case "Salad":
        ingredient = <div className={classes.Salad}></div>;
        break;
      case "Bacon":
        ingredient = <div className={classes.Bacon}></div>;
        break;
      default:
        ingredient = null;
        console.log(this.props.type);
    }
    return ingredient;
  }
}

// BurgerIngridient.propTypes = {
//   Type: PropTypes.string.isRequired,
// };
// console.log(BurgerIngridient.propTypes);

export default BurgerIngridient;
