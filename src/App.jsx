import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './projectcomps/NavBar'
import Signuppp from './projectcomps/Signupp'
import Loginp from './projectcomps/Loginp'
import Donordetails from './projectcomps/Donordetails'
import Medicinedetails from './projectcomps/Medicinedetails'
import NeedyDetails from './projectcomps/NeedyDetails'
import ListedMedicines from './projectcomps/ListedMedicines'
import MedicineFinder2 from './projectcomps/MedicineFinder2'
import DonorNav from './navbars/DonorNav'
import DonorDash from './projectcomps/DonorDash'
import NeedyNav from './navbars/NeedyNav'
import NeedyDash from './projectcomps/NeedyDash'
import MainCrousal from './projectcomps/MainCrousal'
import Home from './projectcomps/Home'
import NavBonly from './projectcomps/NavBonly'
import Eqpdetails from './projectcomps/Eqpdetails'
import Eqpfinder from './projectcomps/Eqpfinder'

function App() {
  return (
    <>
   
  
  <Routes>
      <Route path="/" element={<NavBonly />}>
        <Route index element={<Home />} />
        <Route path="signup" element={<Signuppp />} />
        <Route path="login" element={<Loginp />} />
      </Route>

    <Route path='/donornav' element={<DonorNav></DonorNav>}>
     <Route index element={<DonorDash></DonorDash>}></Route>
     </Route>


     <Route path='/needynav' element={<NeedyNav></NeedyNav>}>
     <Route index element={<NeedyDash></NeedyDash>}></Route>
    </Route>

{/******************FOR DONOR DASH NAVIGATIONS********** */}
    <Route path='/donordata' element={<DonorNav></DonorNav>}>
      <Route index element={<Donordetails></Donordetails>}></Route>
    </Route>

    <Route path='/medicinedata' element={<DonorNav></DonorNav>}>
      <Route index element={<Medicinedetails></Medicinedetails>}></Route>
    </Route>



{/*--------------FOR EQP--------------------------*/}
    {<Route path='/eqpdetails' element={<DonorNav></DonorNav>}>
      <Route index element={<Eqpdetails></Eqpdetails>}></Route>
    </Route>}



    <Route path='/listedmedicines' element={<DonorNav></DonorNav>}>
      <Route index element={<ListedMedicines></ListedMedicines>}></Route>
    </Route>
    
    

    {/******************FOR NEEDY DASH NAVIGATIONS********** */}
    <Route path='/needydata' element={<NeedyNav></NeedyNav>}>
      <Route index element={<NeedyDetails></NeedyDetails>}></Route>
    </Route>

   <Route path='/medicinefinder' element={<NeedyNav></NeedyNav>}>
      <Route index element={<MedicineFinder2></MedicineFinder2>}></Route>
    </Route>

    {/*--------------FOR EQP--------------------------*/}
    {<Route path='/eqpfinder' element={<NeedyNav></NeedyNav>}>
      <Route index element={<Eqpfinder></Eqpfinder>}></Route>
    </Route>}
    
    


    
     
  </Routes>
  
  </>
  )
  }

export default App
