import React, { useContext } from 'react'
import { DContext } from '../Datacontext/DataContext'
import { useNavigate } from 'react-router-dom'


export const Header = () => {
  const apiurl = process.env.REACT_APP_API_URL
  const { currentUser } = useContext(DContext);
  console.log("Current user", currentUser)
  const { profile } = useContext(DContext)
  const navigate = useNavigate()


  function isLogout() {
    if(currentUser===false){
      window.location.href="#login"
      return
    }
    console.log(`${apiurl}/logout`)
    fetch(`${apiurl}/logout`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message)
        if (data.success === true) {
          window.location.href='/'
        }
      })
      .catch(err => {
        console.log("Error in Logout:", err)
        alert("Trouble in connecting to the server, try again later!")
      })
  }


 return (
    <div>
      {/* Header Section */}
      <div className=" flex justify-between items-center h-20 w-full bg-gradient-to-r from-blue-900 to-blue-950 text-white px-4 sm:px-8 fixed z-[500] shadow-lg">
        {/* Logo Section */}
        <div className="flex items-center gap-6">
          <p className="text-xl font-bold tracking-wide">MyApp</p>
        </div>

<div className="flex">
          {/* Profile Section */}
          <div>
          <p className=" cursor-not-allowed w-28 h-10 flex items-center justify-center text-white ">
            Welcome to {profile}
          </p>
        </div>

        {/* Logout Button */}
        <div className="flex gap-6">
          <p
            onClick={isLogout}
            className="cursor-pointer w-28 h-10 flex items-center justify-center text-white font-bold bg-red-500 hover:bg-red-400 rounded-sm transition duration-300"
          >
           {currentUser === false  ? 'Login' : 'Logout' }
          </p>
        </div>
</div>
      </div>

    </div>

  )
}
