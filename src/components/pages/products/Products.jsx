import React, { useEffect, useState } from 'react'
import SectionTitle from '../../layout/SectionTitle'

import ProductCard from '../../images/ProductCard'
import PriceSlider from '../../filters/PriceSlider'
import Paginate from '../../pagination/Paginate'
import { getData } from '../../../testing/fetch' // ----- testing
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  fetchPublicProducts,
  selectPublicProducts,
  selectProductsLoading,
  selectProductsError,
} from '../../../features/products/productsSlice'
import CategoryFilter from '../../filters/CategoryFilter'
import MainSpinner from '../../spinners/MainSpinner'

const Products = () => {
  // const displayProducts = reduxProducts.length > 0 ? reduxProducts : products
  // Scroll to top on mount
  useEffect(() => {
    scrollTo({
      top: 0,
    })
  }, [])

  const dispatch = useDispatch()

  // Get data from Redux -- instead of usiing state.products here we do this in the slice
  const reduxProducts = useSelector(selectPublicProducts) || []
  const loading = useSelector(selectProductsLoading)
  const error = useSelector(selectProductsError)

  // Fetch products
  useEffect(() => {
    // Dispatch Redux action to fetch products
    dispatch(fetchPublicProducts())
  }, [dispatch])

  console.log(reduxProducts)

  return (
    <div className='align-element'>
      <div className='m-h grid sm:grid-cols-1 lg:grid-cols-[250px_1fr]'>
        {/* filters */}
        <section className='hidden lg:block'>
          <SectionTitle text={`filters`} />
          <PriceSlider />
          <CategoryFilter products={reduxProducts} />
        </section>

        {/* products */}
        <section className=''>
          {/* Display error if any */}
          {error && (
            <div className='text-red-500 mt-8 p-4 bg-red-50 rounded-lg border border-red-200'>
              Error: {error}
            </div>
          )}

          {/* Display products */}
          {loading ? (
            <MainSpinner extraStyles={`mt-30`} />
          ) : (
            <>
              <SectionTitle text={`browse our products`} />
              <div className='grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 mt-5'>
                {reduxProducts &&
                  reduxProducts.length > 0 &&
                  reduxProducts.map((i, index) => (
                    <ProductCard key={index} prod={i} />
                  ))}
              </div>
            </>
          )}
        </section>
      </div>

      {/* Keep pagination component for now */}
      <Paginate />
    </div>
  )
}

export default Products
