import React from 'react'

import Chat from './chat/Chat'
import './App.css'

const App = props => {
  return (
<<<<<<< HEAD
    /*
    Tätä ehdottaisin. Nimet ovat aika itsestään selviä.
    App.css sitten järjestelee nuo elementit.
    <div id="container">
      <Sidebar />
      <section id="main">
        <MessagesList />
        <AddMessage />
      </section>
    </div>
    */
    <div className="container">
      <Sidebar users={users} />
      <div className="main">
        <MessageWindow messages={messages} />
        <AddMessage />
      </div>
    </div>
=======
    // Chat-scene
    <Chat />
>>>>>>> a22ed3bd8cdb202cdcc7d70eac597bf510b2e6cb
  )
}

export default App
