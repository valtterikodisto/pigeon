import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "react-apollo-hooks";

import MessageWindow from "./MessageWindow";
import MessageForm from "./MessageForm";
import Header from "./Header";

const ALL_MESSAGES = gql`
  {
    allMessages {
      message
      sender {
        username
        firstName
        lastName
      }
      id
    }
  }
`;
const ADD_MESSAGE = gql`
  mutation addMessage($chatId: ID!, $message: String!) {
    addMessage(chatId: $chatId, message: $message) {
      message
      id
    }
  }
`;

const CURRENT_USER = gql`
  query {
    currentUser {
      username
      firstName
      lastName
    }
  }
`;

const FIND_CHAT = gql`
  query findChat($chatId: ID!) {
    findChat(chatId: $chatId) {
      name
      users {
        username
      }
      messages {
        message
        sender {
          username
          firstName
          lastName
        }
        id
      }
      id
    }
  }
`;

const Chat = ({ chatId }) => {
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const { currentUserData, currentUserError, currentUserLoading } = useQuery(
    CURRENT_USER
  );
  const { data, error, loading } = useQuery(FIND_CHAT, {
    variables: { chatId: chatId }
  });

  useEffect(() => {
    if (data.findChat) {
      setMessages(data.findChat);
    }
  }, [data, error, loading]);

  const addMessage = useMutation(ADD_MESSAGE, {
    refetchQueries: [{ query: FIND_CHAT, variables: { chatId: chatId } }]
  });

  //CurrentUser isnt passed

  return (
    <div className="container">
      <Header groupName={name} users={users} />
      <div className="main">
        <MessageWindow
          messages={messages.messages}
          currentUser={"temp"}
          error={error}
          loading={loading}
        />
        <MessageForm chatId={chatId} addMessage={addMessage} />
      </div>
    </div>
  );
};

export default Chat;
