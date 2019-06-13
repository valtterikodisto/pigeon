import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks'

import Navigation from '../navigation/Navigation'
import ChatPreviewList from './ChatPreviewList'

import './Profile.scss'

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

const Profile = ({ token }) => {
  const { data, loading, error } = useQuery(ALL_CHATS)

  return (
    <div className="page-wrapper">
      <Navigation token={token} />
      <ChatPreviewList chats={data.allChats} loading={loading} error={error} />
    </div>
  )
}

export default Profile
