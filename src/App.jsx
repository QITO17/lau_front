import './App.css'
import Login from './components/Login'
import Principal from './components/Principal'
import { Route, Routes } from 'react-router-dom'
import Conductores from './components/Conductores'
import ExportReportButton from './components/Informes';


function App() {
  return (
    <>
      <section>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/conductores' element={<Conductores/>} />
          <Route path='/informes' element={<ExportReportButton/>} />
          <Route path='/principal' element={<Principal/>} />
        </Routes>
      </section>
    </>
  )
}

export default App
