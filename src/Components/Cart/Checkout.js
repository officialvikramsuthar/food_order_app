import {useRef, useState} from 'react';
import classes from './Checkout.module.css';


const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;
 
const Checkout = props => {


    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const [formInputValidity, setFormInputValidity] = useState({
        name : true,
        street : true,
        city : true,
        postalCode : true
    });

    const confirmHandler = event =>{
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const cityName = cityInputRef.current.value;
        const streetName = streetInputRef.current.value;
        const postal = postalInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(cityName);
        const enteredCityIsValid = !isEmpty(streetName);
        const enteredPostalValid = isFiveChars(postal);

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalValid;

        setFormInputValidity({
            name : enteredNameIsValid,
            street : enteredStreetIsValid,
            city : enteredCityIsValid,
            postalCode : enteredPostalValid,
        })
        if(!formIsValid){
            return;
        }

        props.onConfirm({
            name:enteredName,
            street:streetName,
            postal:postal,
            city:streetName,
        });
    };
    const nameControlClasses = `${classes.control} ${formInputValidity.name ? '' : classes.invalid}`;
    const streetControlClasses = `${classes.control} ${formInputValidity.street ? '' : classes.invalid}`;
    const cityControlClasses = `${classes.control} ${formInputValidity.city ? '' : classes.invalid}`;
    const postalControlClasses = `${classes.control} ${formInputValidity.postalCode ? '' : classes.invalid}`;

    return <form className={classes.form} onSubmit={confirmHandler}>
    <div className={nameControlClasses}>
      <label htmlFor='name'>Your Name</label>
      <input type='text' id='name' ref={nameInputRef}/>
      {!formInputValidity.name && <p>Please input valid Name</p>}
    </div>
    <div className={streetControlClasses}>
      <label htmlFor='street'>Street</label>
      <input type='text' id='street' ref={streetInputRef}/>
      {!formInputValidity.street && <p>Please input valid street</p>}
    </div>
    <div className={postalControlClasses}>
      <label htmlFor='postal'>Postal Code</label>
      <input type='text' id='postal' ref={postalInputRef}/>
      {!formInputValidity.postalCode && <p>Please input valid postal</p>}
    </div>
    <div className={cityControlClasses}>
      <label htmlFor='city'>City</label>
      <input type='text' id='city' ref={cityInputRef}/>
      {!formInputValidity.city && <p>Please input valid city</p>}
    </div>
    <div className={classes.actions}>
      <button type='button' onClick={props.onClose}>
        Cancel
      </button>
      <button className={classes.submit} >Confirm</button>
    </div>
  </form>
}

export default Checkout;