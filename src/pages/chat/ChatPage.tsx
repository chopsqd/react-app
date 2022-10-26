import React, {useEffect, useRef, useState} from "react";
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
    const status = useSelector((state: AppStateType) => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListening() as unknown as AnyAction)
        return () => {
            dispatch(stopMessagesListening() as unknown as AnyAction)
        }
    }, [])

    return <div>
        {status === 'error' && <div>Some error occurred...</div>}
        <Messages/>
        <AddChatMessage/>
    </div>
}

const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const scrollHandler = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = event.currentTarget
        if(Math.abs((element.scrollHeight - element.scrollTop ) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if(isAutoScroll) {
            messagesRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    return <div style={{height: '400px', overflowY: 'auto'}} onScroll={scrollHandler}>
        {messages.map((m, index) => <Message key={index} message={m}/>)}
        <div ref={messagesRef}></div>
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
    const dispatch = useDispatch()

    const status = useSelector((state: AppStateType) => state.chat.status)


    const sendMessageHandler = () => {
        if (!message) return

        dispatch(sendMessage(message) as unknown as AnyAction)
        setMessage('')
    }

    return <div style={{"display": "flex"}}>
        <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
        <button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
    </div>
}

export default ChatPage