import React from 'react'
import { Outlet } from 'react-router-dom'

import { NavBar, Header, Footer, MobileSearch } from '../index'

function MainLayout() {
  return (
    <div>
      <Header />
      <NavBar />
      <MobileSearch />
      <Outlet />
      <Footer />
    </div>
  )
}

export default MainLayout
