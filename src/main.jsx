import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
//import viteLogo from '/vite.svg';

//myviteproject\public\undraw_sign-up_qamz.svg
import App from './App.jsx'
import Signuppp from './projectcomps/Signupp.jsx'
import Loginp from './projectcomps/Loginp.jsx'
import Donordetails from './projectcomps/Donordetails.jsx'
import Medicinedetails from './projectcomps/Medicinedetails.jsx'
import ListedMedicines from './projectcomps/ListedMedicines.jsx'
import NeedyDetails from './projectcomps/NeedyDetails.jsx'
import NavBar from './projectcomps/NavBar.jsx'

createRoot(document.getElementById('root')).render(
  <>
  <BrowserRouter>
        <App></App>
  </BrowserRouter>
   {/*<Signuppp></Signuppp>*/}
   {/*<Loginp></Loginp>*/}
   {/*<Donordetails></Donordetails>*/}
  {/*<Medicinedetails></Medicinedetails>*/}
  {/*<ListedMedicines></ListedMedicines>*/}
   {/*<Needydetails></Needydetails>*/}
   {/*<NavBar></NavBar>*/}

  </>
)
