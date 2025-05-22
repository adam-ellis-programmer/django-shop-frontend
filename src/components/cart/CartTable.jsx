import React from 'react'
import { useSelector } from 'react-redux'
import { selectPaymentTotal } from '../../features/payment/paymentSlice'

const CartTable = ({ cartItems }) => {
  const totalAmount = useSelector(selectPaymentTotal) || 0

  // Calculate a fallback total if the Redux state isn't loaded yet
  const calculateFallbackTotal = () => {
    if (!cartItems || cartItems.length === 0) return 0
    return cartItems.reduce((total, item) => {
      return total + (item.product?.price || 0) * (item.quantity || 0)
    }, 0)
  }

  // Use the Redux state total if available, otherwise use the fallback
  const displayTotal = totalAmount || calculateFallbackTotal()

  return (
    <div className='overflow-x-auto '>
      {/* wrapped for scroll */}
      <div className='max-h-64 overflow-auto '>
        <table className='table table-zebra'>
          {/* head */}
          <thead className='sticky top-0 bg-white'>
            <tr>
              <th></th>
              <th>Name</th>
              <th>description</th>
              <th>quantity</th>
              <th>price</th>
            </tr>
          </thead>
          <tbody className=''>
            {cartItems?.map((item, i) => {
              const { product, quantity } = item
              return (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{product?.name}</td>
                  <td>{product?.description?.slice(0, 50) || ''}...</td>
                  <td>{quantity}</td>
                  <td>£{product?.price || 0}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className='flex justify-end'>
        <p className='border-b-1 flex-1 flex justify-between items-end bg-gray-600 text-white p-2'>
          <span>total <i className="fa-solid fa-money-bill-wave ml-2"></i></span>
          <span className='mr-5'>£{displayTotal.toFixed(2)}</span>
        </p>
      </div>
    </div>
  )
}

export default CartTable
