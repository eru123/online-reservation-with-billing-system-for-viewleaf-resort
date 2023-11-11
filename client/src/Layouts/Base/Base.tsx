import React from 'react'
import { Outlet } from 'react-router-dom';

import Header from '../Header/Header'

export default function Base() {
  return (
    <>
      <Header />
      <div style={{marginTop:"80px"}}>
        <Outlet />

      </div>
    </>
  )
}