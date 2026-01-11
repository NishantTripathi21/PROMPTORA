import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import AiTools from '../components/AiTools'
import {Testimonials} from '../components/Testimonials'
import Plan from '../components/Plan'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <>
        <Navbar></Navbar> 
        <Header></Header>
        <AiTools/>
        <Testimonials/>
        <Plan/>
        <Footer/>
        
    </> 
  )
}

export default Home