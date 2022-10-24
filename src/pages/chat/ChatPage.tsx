import React from "react";



const ChatPage: React.FC = () => {
    return <div>
        <Chat/>
    </div>
}

const Chat: React.FC = () => {



    return <div>
        <Messages/>
        <AddChatMessage/>
    </div>
}

const Messages: React.FC = () => {
    const messages = [1, 2, 3, 4]

    return <div style={{height: '400px', overflowY: 'auto'}}>
        {messages.map((m: any) => <Message/>)}
    </div>
}

const Message: React.FC = () => {
    const message = {
        url: "https://cs13.pikabu.ru/avatars/1873/x1873132-1972677953.png",
        author: 'Misha',
        text: 'Hello Bro!'
    }

    return <div>
        <img src={message.url} style={{"width": "50px"}}/>
        <b>{message.author}</b>
        <br/>
        {message.text}
        <hr/>
    </div>
}

const AddChatMessage: React.FC = () => {
    return <div style={{"display": "flex"}}>
        <textarea></textarea>
        <button>Send</button>
    </div>
}

export default ChatPage