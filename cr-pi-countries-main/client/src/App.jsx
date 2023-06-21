import './App.css'

import { useEffect } from 'react'
import {Routes , Route , useLocation , useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'

import axios from 'axios'

import { getCountries, getActivities } from './redux/countrySlice';
import LandingPage from './components/landingPage/landingPage'
import HomePage from './components/homePage/homePage'
import DetailPage from './components/detailPage/detailPage'
import NavBar from './components/navBar/navBar'
import ActivityForm from './components/activityForm/activityForm'

function App() {
  
  const {pathname} = useLocation()

  const dispatch = useDispatch()

  const URL = 'http://localhost:3001/countries'

  const URLA = 'http://localhost:3001/activities'

  useEffect(()=>{
    const getallCountries= async()=>{
        try {
          const {data} = await axios(URL)
          dispatch(getCountries(data))
    
          const res= await axios(URLA)
          dispatch(getActivities(res.data))
            
        }catch (error) {
          throw error.message
        }
    }
    getallCountries();

  },[])

  return (
    <div >

      {pathname!=='/' ? <NavBar/>:''}

      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/details/:id' element={<DetailPage/>}/>
        <Route path='/activity' element={<ActivityForm/>}/>
      </Routes>

    </div>
  )
}

export default App
