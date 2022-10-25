import React, {useEffect, useState} from "react";
import {ChatMessageType} from "../../api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {AnyAction} from "redux";
import {AppStateType} from "../../redux/redux-store";

const ChatPage: React.FC = () => {
    return <div>
        <Chat/>
    </div>
}

const Chat: React.FC = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening() as unknown as AnyAction)
        return () => {
            dispatch(stopMessagesListening() as unknown as AnyAction)
        }
    }, [])

    return <div>
        <Messages/>
        <AddChatMessage/>
    </div>
}

const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)

    return <div style={{height: '400px', overflowY: 'auto'}}>
        {messages.map((m, index) => <Message key={index} message={m}/>)}
    </div>
}

const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {
    return <div>
        <img src={message.photo} style={{"width": "50px"}}/>
        <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
}

const AddChatMessage: React.FC = () => {

    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
    const dispatch = useDispatch()


    const sendMessageHandler = () => {
        if (!message) return

        dispatch(sendMessage(message) as unknown as AnyAction)
        setMessage('')
    }

    return <div style={{"display": "flex"}}>
        <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
        <button disabled={false} onClick={sendMessageHandler}>Send</button>
    </div>
}

export default ChatPage