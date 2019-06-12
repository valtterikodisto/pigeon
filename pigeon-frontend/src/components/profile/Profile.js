import React from 'react'
import Navigation from '../navigation/Navigation'
import ChatPreviewList from './ChatPreviewList'

import './Profile.scss'

const Profile = ({ token }) => {
  // Dummy data, remove when backend provides this
  const chats = [
    {
      id: 1,
      name: 'Someon Lastname',
      users: [],
      messages: [
        {
          sender: {
            firstName: 'Someone'
          },
          message:
            'Lorem ipsum dolores annuumen porvu dom delaro et tul - Annuumen porvu dom delaro et tul'
        }
      ]
    },
    {
      id: 2,
      name: 'Else Lastname',
      users: [],
      messages: [
        {
          sender: {
            firstName: 'Else'
          },
          message: 'Lorem ipsum dolores annuumen porvu dom delaro et tul'
        }
      ]
    }
  ]

  return (
    <div className="page-wrapper">
      <Navigation token={token} />
      <ChatPreviewList chats={chats} />
    </div>
  )
}

export default Profile
