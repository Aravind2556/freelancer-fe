// import React, { useContext } from 'react'
// import { Route, Routes } from 'react-router-dom'
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Header } from './User/Header'

// import { UserJob } from './User/UserJob'
// import { Categories } from './Admin/Categories'
// import { Notfound } from './Notfound'
// import { CategoryDetails } from './User/CategoryDetails'
// import { Adminjobs } from './Admin/Adminjobs'


// import { Signin } from './Register/Signin'
// import HomePage from './Homepage'
// import { Jobsdata } from './User/Jobsdata'



// import { RaiseTickets } from './User/RaiseTickets'
// import { Tickets } from './User/Tickets'
// import { AdminTickets } from './Admin/AdminTickets'
// import { UserAccount } from './Admin/UserAccount'
// import { Login } from './Register/Login'

// import { Forget } from './Register/Forget'
// import { Interst } from './User/Interst'
// import { Footer } from './Footer'
// import { AdminCategories } from './Admin/AdminCategories'
// import { DContext } from './Datacontext/DataContext'
// import { Jobs } from './User/Jobs'
// import { Loading } from './User/Loading'




// export const Storage = () => {

 
//   const { currentUser } = useContext(DContext)


//   if (currentUser === null) {
//     return <Loading />
//   }

//   return (
//     <div>
//       <Header />

//       <div className="flex items-center fixed top-20 z-40 justify-between w-full text-7xl  font-bold text-white">
//       <ChevronLeft className="bg-blue-950 rounded-full w-10 h-10" />
//       <span className="mx-4"></span>
//       <ChevronRight className="bg-blue-950 rounded-full  w-10 h-10 "  />
//     </div>

//       <Routes>

//         <Route path='/' element={currentUser ? currentUser.Role === "Admin" ? <AdminCategories/> : currentUser.Role === "Freelancer" ?  <Jobsdata/> : currentUser.Role === "Company" ? <UserJob/> :  <HomePage /> : <HomePage/>}></Route>
//         <Route path='/login' element={<Login />}></Route>
//         <Route path='/forget' element={<Forget />}></Route>
//         <Route path='/Categories' element={<Categories />}></Route>
//         <Route path='/adminjobs' element={<Adminjobs />}></Route>
//         <Route path='/registerall' element={<UserAccount />}></Route>
//         <Route path="/category/:id" element={<CategoryDetails />}></Route>
//         <Route path='/tickets' element={<Tickets />}></Route>
//         <Route path='/admintickets' element={<AdminTickets />}></Route>
//         <Route path='/interst' element={<Interst />}></Route>
//         <Route path='/raiseticked' element={<RaiseTickets />}></Route>
//         <Route path='/Account Register' element={<Signin />}></Route>
//         <Route path='*' element={<Notfound />}></Route>
//       </Routes>

//       <Footer />
//       </div>
//   )
// }





import React, { useContext } from "react";
import { Route, Routes, useNavigate, useLocation, Navigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "./User/Header";
import { UserJob } from "./User/UserJob";
import { Categories } from "./Admin/Categories";
import { Notfound } from "./Notfound";
import { CategoryDetails } from "./User/CategoryDetails";
import { Adminjobs } from "./Admin/Adminjobs";
import { Signin } from "./Register/Signin";
import HomePage from "./Homepage";
import { Jobsdata } from "./User/Jobsdata";
import { RaiseTickets } from "./User/RaiseTickets";
import { Tickets } from "./User/Tickets";
import { AdminTickets } from "./Admin/AdminTickets";
import { UserAccount } from "./Admin/UserAccount";
import { Login } from "./Register/Login";
import { Forget } from "./Register/Forget";
import { Interst } from "./User/Interst";
import { Footer } from "./Footer";
import { AdminCategories } from "./Admin/AdminCategories";
import { DContext } from "./Datacontext/DataContext";
import { Loading } from "./User/Loading";

export const Storage = () => {
  const { currentUser } = useContext(DContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Define page order for navigation buttons
  const pages = ["/",  "/Categories", "/adminjobs", "/registerall", "/tickets", "/admintickets", "/interst", "/raiseticked"];
  const currentIndex = pages.indexOf(location.pathname);

  // Pages where icons should NOT be displayed
  const hideIconsOnPages = ["/", "/login", "/signin", "/Account Register"];
  const shouldHideIcons = hideIconsOnPages.includes(location.pathname);

  // Previous & Next Button Handlers
  const handlePrevious = () => {
    if (currentIndex > 0) {
      navigate(pages[currentIndex - 1]);
    }
  };
  const handleNext = () => {
    if (currentIndex < pages.length - 1) {
      navigate(pages[currentIndex + 1]);
    }
  };

  // Define role-based restrictions
  const restrictedForAdmin = ["/interst", "/raiseticked"];
  const restrictedForCompany = ["/admintickets", "/registerall", "/adminjobs", "/Categories"];
  const restrictedForFreelancer = ["/interst", "/admintickets", "/registerall", "/adminjobs", "/Categories"];
  const restrictedForGuest = ["/raiseticked", "/interst"];

  // Redirect users based on their role
  if (currentUser?.Role === "Admin" && restrictedForAdmin.includes(location.pathname)) {
    return <Navigate to="/" />;
  }
  if (currentUser?.Role === "Company" && restrictedForCompany.includes(location.pathname)) {
    return <Navigate to="/" />;
  }
  if (currentUser?.Role === "Freelancer" && restrictedForFreelancer.includes(location.pathname)) {
    return <Navigate to="/" />;
  }
  if (!currentUser && restrictedForGuest.includes(location.pathname)) {
    return <Navigate to="/login" />;
  }

  // Show loading screen while fetching user data
  if (currentUser === null) {
    return <Loading />;
  }

  return (
    <div>
      <Header />

      {/* Previous & Next Navigation Buttons (Hidden on some pages) */}
      {!shouldHideIcons && (
        <div className="flex items-center fixed top-20 z-40 justify-between w-full text-7xl font-bold text-white">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="bg-blue-950 rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-50"
          >
            <ChevronLeft size={24} color="white" />
          </button>

          <span className="mx-4"></span>

          <button
            onClick={handleNext}
            disabled={currentIndex === pages.length - 1}
            className="bg-blue-950 rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-50"
          >
            <ChevronRight size={24} color="white" />
          </button>
        </div>
      )}

      {/* Routes Configuration */}
      <Routes>
        <Route
          path="/"
          element={
            currentUser ? (
              currentUser.Role === "Admin" ? (
                <AdminCategories />
              ) : currentUser.Role === "Freelancer" ? (
                <Jobsdata />
              ) : currentUser.Role === "Company" ? (
                <UserJob />
              ) : (
                <HomePage />
              )
            ) : (
              <HomePage />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/Categories" element={currentUser?.Role === "Admin" ? <Categories />  :  <Navigate to="/" />} />
        <Route path="/adminjobs" element={currentUser?.Role === "Admin" ?  <Adminjobs />  : <Navigate to="/" />} />
        <Route path="/registerall" element={currentUser?.Role === "Admin" ? <UserAccount /> :  <Navigate to="/" />} />
        <Route path="/category/:id" element={<CategoryDetails />} />
        <Route path="/tickets" element={  currentUser?.Role === "Company" ? <Tickets /> : currentUser?.Role === "Freelancer" ?  <Tickets /> : <Navigate to="/" /> } />
        <Route path="/admintickets" element={currentUser?.Role === "Admin" ? <AdminTickets />  : <Navigate to="/" />} />
        <Route path="/interst" element={!currentUser ? <Navigate to="/login" /> : currentUser?.Role === "Admin" || currentUser?.Role === "Freelancer" ?  <Navigate to="/" /> : <Interst />} />
        <Route path="/raiseticked" element={!currentUser ? <Navigate to="/login" /> : currentUser?.Role === "Freelancer" ? <RaiseTickets />  : <Navigate to="/" />} />
        <Route path="/Account Register" element={<Signin />} />
        <Route path="*" element={<Notfound />} />
      </Routes>

      <Footer />
    </div>
  );
};
