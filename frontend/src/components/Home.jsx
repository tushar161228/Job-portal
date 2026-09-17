import React from 'react'
import Navbar from './ui/shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import userGetAllJobs from '@/hooks/userGetAllJobs'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'

const res = await axios.get(`${JOB_API_END_POINT}/get`, { withCredentials: true });
console.log("API Response:", res.data);

const Home = () => {
  
  userGetAllJobs();
  return (
    
    <div>
      <Navbar/>
      <HeroSection/>
      <CategoryCarousel/>
      <LatestJobs/>
      <Footer/>
    </div>
  )
}

export default Home
