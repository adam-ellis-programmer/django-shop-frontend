import React from 'react'
import { Link } from 'react-router-dom'
// import placeholder from '../../../place holders/place-holder.jpg'

const UserPrductItem = ({ product, i }) => {
  // console.log(i)
  return (
    <div>
      {/* make respnsive changes here  */}
      <div
        className={` rounded-2xl grid lg:grid-cols-5 -b-half items-center hover2  ${
          i % 2 === 0 && 'bg-gray-100'
        } `}
      >
        <div className='flex justify-center '>
          <img
            src={product?.images[0]?.image_url}
            alt={product.name}
            className='h-[80px] w-[80px] object-cover rounded-[35%]'
          />
        </div>
        <div className='text-center my-4 md:my-0 '>{product.name}</div>
        <div className='flex justify-center gap-2 '>
          {/* takes us to a edit page  */}
          <Link to={`/edit-my-listing/${product.id}`}>
            <button className='btn btn-soft btn-primary'>Edit</button>
          </Link>
          {/* takes us to a delete page  */}
          <Link to={`/delete-product/${product.id}`}>
            <button className='btn btn-soft btn-secondary'>Delete</button>
          </Link>
        </div>
        <div className='text-center my-5 md:my-0 '>
          {product.active ? (
            <div className='badge badge-secondary text-white'>Active</div>
          ) : (
            <div className='badge badge-info text-white'>Inactive</div>
          )}
        </div>
        <div className=' text-center '>
          <div className='badge badge-primary badge-lg'>2</div>
        </div>
      </div>
    </div>
  )
}

export default UserPrductItem
