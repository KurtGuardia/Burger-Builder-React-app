import React from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHandler";
import * as actions from "../../../store/actions/index";
import { updateObject, checkValidity } from "../../../shared/utility";
import { useState } from "react";

const initialState = {
  name: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Your Name",
    },
    value: "",
    validation: {
      required: true,
      minLength: 3,
    },
    valid: false,
    touched: false,
  },
  street: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Street",
    },
    value: "",
    validation: {
      required: true,
      minLength: 5,
    },
    valid: false,
    touched: false,
  },
  zipCode: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Postal Code",
    },
    value: "",
    validation: {
      required: true,
      minLength: 5,
      maxLength: 5,
      inNumeric: true,
    },
    valid: false,
    touched: false,
  },
  country: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Country",
    },
    value: "",
    validation: {
      required: true,
      minLength: 5,
    },
    valid: false,
    touched: false,
  },
  email: {
    elementType: "input",
    elementConfig: {
      type: "email",
      placeholder: "Your Email",
    },
    value: "",
    validation: {
      required: true,
      minLength: 5,
      isEmail: true,
    },
    valid: false,
    touched: false,
  },
  deliveryMethod: {
    elementType: "select",
    elementConfig: {
      options: [
        { value: "fastest", displayValue: "Fastest" },
        { value: "cheapest", displayValue: "Cheapest" },
      ],
    },
    validation: {
      required: false,
    },
    value: "fastest",
    valid: true,
  },
};

const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState(initialState);
  const [isFormValid, setIsFormValid] = useState(false);

  // state = {
  //   orderForm: {
  //     name: {
  //       elementType: "input",
  //       elementConfig: {
  //         type: "text",
  //         placeholder: "Your Name",
  //       },
  //       value: "",
  //       validation: {
  //         required: true,
  //         minLength: 3,
  //       },
  //       valid: false,
  //       touched: false,
  //     },
  //     street: {
  //       elementType: "input",
  //       elementConfig: {
  //         type: "text",
  //         placeholder: "Street",
  //       },
  //       value: "",
  //       validation: {
  //         required: true,
  //         minLength: 5,
  //       },
  //       valid: false,
  //       touched: false,
  //     },
  //     zipCode: {
  //       elementType: "input",
  //       elementConfig: {
  //         type: "text",
  //         placeholder: "Postal Code",
  //       },
  //       value: "",
  //       validation: {
  //         required: true,
  //         minLength: 5,
  //         maxLength: 5,
  //         inNumeric: true,
  //       },
  //       valid: false,
  //       touched: false,
  //     },
  //     country: {
  //       elementType: "input",
  //       elementConfig: {
  //         type: "text",
  //         placeholder: "Country",
  //       },
  //       value: "",
  //       validation: {
  //         required: true,
  //         minLength: 5,
  //       },
  //       valid: false,
  //       touched: false,
  //     },
  //     email: {
  //       elementType: "input",
  //       elementConfig: {
  //         type: "email",
  //         placeholder: "Your Email",
  //       },
  //       value: "",
  //       validation: {
  //         required: true,
  //         minLength: 5,
  //         isEmail: true,
  //       },
  //       valid: false,
  //       touched: false,
  //     },
  //     deliveryMethod: {
  //       elementType: "select",
  //       elementConfig: {
  //         options: [
  //           { value: "fastest", displayValue: "Fastest" },
  //           { value: "cheapest", displayValue: "Cheapest" },
  //         ],
  //       },
  //       validation: {
  //         required: false,
  //       },
  //       value: "fastest",
  //       valid: true,
  //     },
  //   },
  //   formIsValid: false,
  // };

  const orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }

    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      userId: props.userId,
    };

    props.onOrderBurger(order, props.token);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        orderForm[inputIdentifier].validation
      ),
      touched: true,
    });

    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement,
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    setOrderForm(updatedOrderForm);
    setIsFormValid(formIsValid);
  };

  const formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key],
    });
  }

  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map((formElement) => (
        <Input
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          key={formElement.id}
          changed={(event) => inputChangedHandler(event, formElement.id)}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          valueType={formElement.id}
        />
      ))}
      <Button btnType="Success" disabled={!isFormValid}>
        ORDER
      </Button>
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter you Contact Data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
