import React from 'react'
import Navigation from '../navigation/Navigation'

const Profile = ({ token }) => {
  return (
    <div className="page-wrapper">
      <Navigation token={token} />
      <div>Profile</div>
    </div>
  )
}

export default Profile
