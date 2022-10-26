export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

export type StatusType = 'pending' | 'ready' | 'error';

type EventsNamesType = 'messages-received' | 'status-changed'

type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void

const subscribers = {
    'messages-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[]
}

let webSocket: WebSocket | null = null

const closeHandler = () => {
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 3000)
}

const messageHandler = (event: MessageEvent) => {
    const newMessages = JSON.parse(event.data);
    subscribers['messages-received'].forEach(sub => sub(newMessages))
};

const openHandler = () => {
    notifySubscribersAboutStatus('ready')
};

const errorHandler = () => {
    notifySubscribersAboutStatus('error')
    console.error('REFRESH PAGE')
};

const cleanUp = () => {
    webSocket?.removeEventListener('close', closeHandler)
    webSocket?.removeEventListener('message', messageHandler)
    webSocket?.removeEventListener('open', openHandler)
    webSocket?.removeEventListener('error', errorHandler)
}

const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach(s => s(status))
}

const createChannel = () => {
    cleanUp()
    webSocket?.close()

    webSocket = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    notifySubscribersAboutStatus('pending')
    webSocket.addEventListener('close', closeHandler)
    webSocket.addEventListener('message', messageHandler)
    webSocket.addEventListener('open', openHandler)
    webSocket.addEventListener('error', errorHandler)
}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers['messages-received'] = []
        subscribers['status-changed'] = []
        cleanUp()
        webSocket?.close()
    },
    subscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(sub => sub !== callback)
        }
    },
    unsubscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(sub => sub !== callback)
    },
    sendMessage(message: string) {
        webSocket?.send(message)
    }
}