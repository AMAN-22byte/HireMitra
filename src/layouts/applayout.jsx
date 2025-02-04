import Header from '@/components/ui/header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>
      <div className='grid-background'></div>
        {/* //custom classes: */}
        <main className='min-h-screen container'>
          <Header/>
        <Outlet/>
        </main>
        <div className='p-10 text-center bg-black-500 font-bold text-white'>Made by HireMitra</div>
      </div>
      
    
  )
}

export default AppLayout