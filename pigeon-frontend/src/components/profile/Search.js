import React, { useState, useEffect, useRef } from 'react'
import { gql } from 'apollo-boost'
import { useApolloClient } from 'react-apollo-hooks'

import anime from 'animejs'
import { searchButtonOpen, searchButtonClose } from '../../animations/search'
import './Search.scss'

const FIND_USER_BY_KEYWORD = gql`
  query findUserByKeyword($keyword: String!) {
    findUserByKeyword(keyword: $keyword) {
      id
      username
      firstName
      lastName
    }
  }
`

const Search = ({ state, open, toggleButton }) => {
  const client = useApolloClient()
  const [users, setUsers] = useState()
  const searchBoxRef = useRef()

  useEffect(() => {
    if (state === 'entering') searchButtonOpen(searchBoxRef.current)
    else if (state === 'exiting') searchButtonClose(searchBoxRef.current)
  })

  const handleSubmit = async event => {
    event.preventDefault()
    const keyword = event.target.keyword.value
    console.log('keyword', keyword)

    if (!keyword) return

    const { data } = await client.query({
      query: FIND_USER_BY_KEYWORD,
      variables: { keyword }
    })
    setUsers(data.findUserByKeyword)
  }

  console.log('state', state)
  console.log('users', users)

  return (
    <>
      <div className="search-box" ref={searchBoxRef}>
        <form onSubmit={handleSubmit} autoComplete="off">
          <input type="text" name="keyword" />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="search-button" onClick={toggleButton} />
    </>
  )
}

export default Search
