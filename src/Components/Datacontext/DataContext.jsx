import { createContext, useEffect, useState } from "react";



export const DContext = createContext()
function DataContext(props) {
  const apiurl = process.env.REACT_APP_API_URL;

  const [Jobs, setJobs] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)

  const [profile, setProfile] = useState('')
  const [tickes, settickests] = useState(null)
  const [intrest, setintreast] = useState(null)

  function fetchJobs() {

    if (!Jobs || !tickes || !intrest || !currentUser || !apiurl) {

      fetch(`${apiurl}/fetch-tickets`, {
        method: "GET",
        credentials: 'include',
      })
        .then(res => res.json())
        .then(data => {
          if (data.success === true) {
            settickests(data.data)
          }
          else {
            console.log(data.message)
          }
        })
        .catch(err => {
          console.log("error fetching to username", err)
         
        })


      fetch(`${apiurl}/fetch-intreast`, {
        method: "GET",
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success === true) {
            setintreast(data.data);
          } else {
            console.log(data.message)
          }
        })
        .catch((err) => {
          console.log("Trounle in Fetch jobs", err);
        });


      fetch(`${apiurl}/checkauth`, {
        method: "GET",
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success === true) {
            setCurrentUser(data.user);
          } else {
            setCurrentUser(false)
          }
        })
        .catch((err) => {
          console.log("error", err);
        });


      fetch(`${apiurl}/fetch-Jobs`, {
        method: "GET",
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => {
         if (data.success === true) {
            setJobs(data.allJobs);
          } else {
            console.log(data.message)
          }
        })
        .catch((err) => {
          console.log("Trounle in Fetch jobs", err);

        });

      if (profile === '') {
        fetch(`${apiurl}/username`, {
          method: "GET",
          credentials: 'include',
        })
          .then(res => res.json())
          .then(data => {
            if (data.success === true) {
              setProfile(data.Name)
            }
            else {
              setProfile(data.Name)
            }
          })
          .catch(err => {
            console.log("error fetching to username", err)
          })
      }
      else {
        console.log("error fetching to username please login")
      }
    }
  }


  useEffect(() => {

    fetchJobs()
    const DataInterval = setInterval(fetchJobs, 5000)
    return () => clearInterval(DataInterval)

  })
  
  const data = { intrest, Jobs, currentUser, profile, tickes }

  return (
    <DContext.Provider value={data}>
      {props.children}
    </DContext.Provider>
  )
}

export default DataContext
