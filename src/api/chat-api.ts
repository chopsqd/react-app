export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

type SubscriberType = (messages: ChatMessageType[]) => void

let subscribers = [] as SubscriberType[]

let webSocket: WebSocket | null = null

const closeHandler = () => {
    setTimeout(createChannel, 3000)
}

const messageHandler = (event: MessageEvent) => {
    const newMessages = JSON.parse(event.data);
    subscribers.forEach(sub => sub(newMessages))
};

const createChannel = () => {
    webSocket?.removeEventListener('close', closeHandler)
    webSocket?.close()

    webSocket = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    webSocket.addEventListener('close', closeHandler)
    webSocket.addEventListener('message', messageHandler)
}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers = []
        webSocket?.removeEventListener('close', closeHandler)
        webSocket?.removeEventListener('message', messageHandler)
        webSocket?.close()
    },
    subscribe(callback: SubscriberType) {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(sub => sub !== callback)
        }
    },
    unsubscribe(callback: SubscriberType) {
        subscribers = subscribers.filter(sub => sub !== callback)
    },
    sendMessage(message: string) {
        webSocket?.send(message)
    }
}