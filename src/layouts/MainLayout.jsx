import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MainLayout = () => {
  return (
    <div className='font-jakarta'>
      <header className='sticky top-0 z-50'>
        <Navbar/>
      </header>

      <section>
        <Footer/>
      </section>
    </div>
  )
}

export default MainLayout
