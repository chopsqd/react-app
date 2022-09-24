import React from "react";
import {sendMessageActionCreator, updateNewMessageBodyActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../store-context";

const DialogsContainer = () => {
    return <StoreContext.Consumer>
        { (store) => {
            let onNewMessageChange = (body) => {
                store.dispatch(updateNewMessageBodyActionCreator(body))
            }

            let onSendMessageClick = () => {
                store.dispatch(sendMessageActionCreator())
            }

            return <Dialogs
                        updateNewMessageBody={onNewMessageChange}
                        sendMessage={onSendMessageClick}
                        dialogsPage={store.getState().dialogsPage}/>
        }
    }

    </StoreContext.Consumer>
}

export default DialogsContainer