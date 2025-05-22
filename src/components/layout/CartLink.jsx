import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCart,
  selectCartItemCount,
  selectCartItems,
} from '../../features/cart/cartSlice'

// selectCartItems
// selectCartItemCount

const CartLink =  ({setIsNavOpen, mobile }) => {
  console.log(mobile)
  const dispatch = useDispatch()
  const itemsCount = useSelector(selectCartItemCount)
  useEffect(() => {
    dispatch(fetchCart())
    return () => {}
  }, [])
  return (
    <Link to='cart' onClick={() => setIsNavOpen(false)} className={`md:hidden ${mobile && 'mt-5'}`}>
      <span className='relative'>
        <i className='fa-solid text-3xl fa-cart-shopping mr-7'></i>
        <span className=' absolute top-[-25px] right-[3px] indicator-item indicator-middle indicator-start badge badge-secondary'>
          {itemsCount || 0}
        </span>
      </span>
    </Link>
  )
}

export default CartLink
