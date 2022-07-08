import {useContext, useState} from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = props => {
    const cartCtx = useContext(CartContext);
    const [isCheckout, setIsCheckout] = useState(true);
    const totalAmount = `$ ${cartCtx.totalAmount.toFixed(2)}`; 

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id)
    }
    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount:1});
    }
    const orderHandler= event =>{
        event.preventDefault();
        setIsCheckout(prevState=> !prevState);
    }
    const submitOrderHandler = (userData) => {
        console.log(cartCtx.items)
        fetch('https://reactapp-70819-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {
            method:'POST',
            body: JSON.stringify({
                user:userData,
                orderedItem :cartCtx.items
            })
        })
    };
    const CartItems =(
    <ul className={classes['cart-items']}>
    { cartCtx.items.map(item=><CartItem key={item.id} id={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)}></CartItem>)
    }      
    </ul>);
    const hasItems = cartCtx.items.length > 0;
    const checkOutButtons =  <div className={classes.actions}>
                                <button onClick={props.onHideCart} className={classes['button--alt']}>Close</button>
                                {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
                            </div>;
                        
    return <Modal onClose={props.onHideCart}>
            {CartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            { !isCheckout && <Checkout onClose={props.onHideCart} onConfirm={submitOrderHandler}/>}
           {isCheckout && checkOutButtons}
    </Modal>
}

export default Cart;