import React from 'react'
import NavBar from './NavBar'
import MainCrousal from './MainCrousal'
import { Outlet } from 'react-router-dom'
import Creators from './Creators'
import Reachus from './Reachus'
import Footer from './Footer'
import Services from './Services'

function Home() {
  return (
    <div>

        <MainCrousal></MainCrousal>
        <Services></Services>
        <Creators></Creators>
        
        <Footer></Footer>
       <Outlet></Outlet>
    </div>
  )
}

export default Home
