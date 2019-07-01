import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks'

import { Transition } from 'react-transition-group'
import Navigation from '../navigation/Navigation'
import ChatPreviewList from './ChatPreviewList'
import Search from './Search'

import './Profile.scss'

const CURRENT_USER = gql`
  query {
    currentUser {
      username
      firstName
      lastName
    }
  }
`

const ALL_CHATS = gql`
  query {
    allChats {
      id
      name
      messages {
        message
        timestamp
        sender {
          firstName
        }
      }
    }
  }
`

const Profile = ({ token, setToken, setChatId, setCurrentUser }) => {
  const { data, loading, error } = useQuery(ALL_CHATS)
  const { data: userData } = useQuery(CURRENT_USER)
  const [searchIn, setSearchIn] = useState(false)

  setCurrentUser(userData.currentUser)

  const toggleSearchButton = () => {
    setSearchIn(!searchIn)
  }

  return (
    <div className="page-wrapper">
      <Navigation token={token} setToken={setToken} />
      <Transition>
        {state => (
          <ChatPreviewList
            state={state}
            chats={data.allChats}
            loading={loading}
            error={error}
            setChatId={setChatId}
          />
        )}
      </Transition>
      <Transition in={searchIn} timeout={500}>
        {state => <Search state={state} open={searchIn} toggleButton={toggleSearchButton} />}
      </Transition>
    </div>
  )
}

export default Profile
