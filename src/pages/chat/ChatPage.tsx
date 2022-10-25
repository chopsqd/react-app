import React, {useEffect, useState} from "react";

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const ChatPage: React.FC = () => {
    return <div>
        <Chat/>
    </div>
}

const Chat: React.FC = () => {
    const [ws, setWS] = useState<WebSocket | null>(null)

    useEffect(() => {
        let webSocket: WebSocket
        const closeHandler = () => {
            setTimeout(createChannel, 3000)
        }

        const createChannel = () => {
            webSocket?.removeEventListener('close', closeHandler)
            webSocket?.close()

            webSocket = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
            webSocket.addEventListener('close', closeHandler)
            setWS(webSocket)
        }
        createChannel()

        return () => {
            webSocket.removeEventListener('close', closeHandler)
            webSocket.close()
        }
    }, [])

    return <div>
        <Messages ws={ws}/>
        <AddChatMessage ws={ws}/>
    </div>
}

const Messages: React.FC<{ ws: WebSocket | null }> = ({ws}) => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        let messageHandler = (event: MessageEvent) => {
            let newMessages = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        };
        ws?.addEventListener('message', messageHandler)

        return () => {
            ws?.removeEventListener('message', messageHandler)
        }
    }, [ws])

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

const AddChatMessage: React.FC<{ ws: WebSocket | null }> = ({ws}) => {

    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        let openHandler = () => {
            setReadyStatus('ready')
        };
        ws?.addEventListener('open', openHandler)
        
        return () => {
            ws?.removeEventListener('open', openHandler)
        }
    }, [ws])

    const sendMessage = () => {
        if (!message) return

        ws?.send(message)
        setMessage('')
    }

    return <div style={{"display": "flex"}}>
        <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
        <button disabled={ws === null || readyStatus !== 'ready'} onClick={sendMessage}>Send</button>
    </div>
}

export default ChatPage