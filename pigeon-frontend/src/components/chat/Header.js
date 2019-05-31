import React from 'react'


const Topbar = props => {

    return (
        <div className="header" >
            <div className="header-container">
                <h3 className="header-group-name" align="center">{props.groupName}</h3>
                <ul className="header-users-list">
                    {props.users.map(user =>
                        <li key={user.id}>{user.username}</li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Topbar