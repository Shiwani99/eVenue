import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { PrettyChatWindow, MessageList} from "react-chat-engine-pretty";
import { ChatEngine,IsTyping,getOrCreateChat } from 'react-chat-engine';
import axios from "axios";
import TopNav from './Navbar';


function ChatsPage() {

  const[data,setData]=useState("");
  const URL="https://evenuee.herokuapp.com/chat"

  useEffect(()=>{
    /*
    axios.get('/chat_authentication')
    .then(response => {
      //console.log(response)
      setData(response.data);
    })
    .catch(error => {
      console.error(error);
    });
    */

    fetch('https://evenues.herokuapp.com/chat_authentication', {
      method: 'GET',
      mode: 'cors', // sets the mode of the request to CORS
      credentials: 'include', // includes credentials like cookies in the request
      headers: {
        'Content-Type': 'application/json' // sets the Content-Type header to JSON
      }
    })
    .then(response => response.json())
    .then(data => {
      setData(data);
    })
    .catch(error => {
      console.error(error);
    });
    
  },[]);

  console.log("->"+data["email"])
  console.log("->"+data["password"])

  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');


  function createDirectChat(creds) {
		getOrCreateChat(
			creds,
			{ is_direct_chat: true, usernames: [username] },
			() => setUsername('')
		)
	}

  function createGroupChat(creds) {
    getOrCreateChat(
      creds,
      { is_group_chat: true, title: title },
      () => {
        setTitle('');
      }
    )
  }

	function renderChatForm(creds) {
		return (
			<div>
      <div>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={() => createDirectChat(creds)}>Create Individual Chat</button>
      </div>
      <div>
        <input
          placeholder="Group Chat Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={() => createGroupChat(creds)}>Create Group Chat</button>
      </div>
    </div>
		)
	}
  
  
  return (
    
    <div>
      <TopNav/>
      {data["email"] ? (
      <div style={{ height: "100vh", width: "100vw", color:'black' }}>
      <ChatEngine
			height='100vh'
      width='100vw'
			userName={data["email"]}
			userSecret=process.env.userSecret
			projectID=process.env.projectID
      renderNewChatForm={(creds) => renderChatForm(creds)}
		/>
    </div>
      ) : (
        console.log("error")
      )}
  </div>
  
  );
  
};

export default ChatsPage;


