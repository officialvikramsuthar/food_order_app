import {useContext, useEffect, useState} from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';

const HeaderCartButton = props =>{
    const cartCtx = useContext(CartContext);
    const {items} = cartCtx;
    const [btnHighlighted, setBtnHighLighted] = useState(false);
    const numberOfCartItem = items.reduce((curNumber, item)=>{
        return curNumber + item.amount
    }, 0);
    const btnClasses = `${classes.button} ${ btnHighlighted ? classes.bump: ''}`;

    useEffect(()=>{
        if(items.length === 0){
            return ;
        }
        setBtnHighLighted(true);
        let timer = setTimeout(() => {
            setBtnHighLighted(false);
        }, 300);
        
        return () => {
            clearTimeout(timer);
        }
    }, [items])

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}><CartIcon /></span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItem}</span>
    </button>   
}

export default HeaderCartButton;