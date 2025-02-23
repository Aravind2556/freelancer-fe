import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Header } from './User/Header'

import { UserJob } from './User/UserJob'
import { Categories } from './Admin/Categories'
import { Notfound } from './Notfound'
import { CategoryDetails } from './User/CategoryDetails'
import { Adminjobs } from './Admin/Adminjobs'


import { Signin } from './Register/Signin'
import HomePage from './Homepage'
import { Jobsdata } from './User/Jobsdata'



import { RaiseTickets } from './User/RaiseTickets'
import { Tickets } from './User/Tickets'
import { AdminTickets } from './Admin/AdminTickets'
import { UserAccount } from './Admin/UserAccount'
import { Login } from './Register/Login'

import { Forget } from './Register/Forget'
import { Interst } from './User/Interst'
import { Footer } from './Footer'
import { AdminCategories } from './Admin/AdminCategories'
import { DContext } from './Datacontext/DataContext'
import { Jobs } from './User/Jobs'
import { Loading } from './User/Loading'




export const Storage = () => {

 
  const { currentUser } = useContext(DContext)


  if (currentUser === null) {
    return <Loading />
  }

  return (
    <div>
      <Header />

      <Routes>

        <Route path='/' element={currentUser ? <HomePage /> : <HomePage/>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/forget' element={<Forget />}></Route>
        <Route path='/jobdata' element={<Jobsdata />}></Route>
        <Route path='/admin' element={currentUser  ? <AdminCategories /> : <HomePage/>}></Route>
        <Route path='/User' element={<UserJob />}></Route>
        <Route path='/Categories' element={<Categories />}></Route>
        <Route path='/adminjobs' element={<Adminjobs />}></Route>
        <Route path='/registerall' element={<UserAccount />}></Route>
        <Route path="/category/:id" element={<CategoryDetails />}></Route>
        <Route path='/tickets' element={<Tickets />}></Route>
        <Route path='/admintickets' element={<AdminTickets />}></Route>
        <Route path='/interst' element={<Interst />}></Route>
        <Route path='/raiseticked' element={<RaiseTickets />}></Route>
        <Route path='/Account Register' element={<Signin />}></Route>
        <Route path='*' element={<Notfound />}></Route>
      </Routes>

      <Footer />
      </div>
  )
}








