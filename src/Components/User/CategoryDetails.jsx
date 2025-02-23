import React from 'react'
import { useParams } from 'react-router-dom'
import { Jobs } from './Jobs'
import { Tickets } from './Tickets'
import { Notfound } from '../Notfound'
import { Createjobprovider } from './Createjobprovider'
import { RaiseTickets } from './RaiseTickets'


export const CategoryDetails = () => {
  const { id } = useParams()


  return (
    <div>
      {
        id === 'Jobs' && <Jobs />
      }
      {
        id === 'Tickets' && <Tickets />
      }
      {
        id === 'Create Job Provider job' && <Createjobprovider />
      }
      {
        id === 'Raise Ticket' && <RaiseTickets />
      }
      {
        id !== 'Jobs' && id !== 'Tickets' && id !== 'Create Job Provider job' && id !== 'Raise Ticket' && <Notfound />
      }
    </div>

  )
}
