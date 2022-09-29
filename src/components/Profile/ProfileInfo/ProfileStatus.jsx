import style from './ProfileInfo.module.css'
import React from 'react'

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }

    toggleActivateEditMode = () => {
        this.setState({
            editMode: !this.state.editMode
        })
        this.state.editMode = !this.state.editMode
        this.props.updateProfileStatus(this.state.status)
    }

    onStatusChange = (event) => {
        this.setState({
            status: event.currentTarget.value
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.editMode
                    ? <div>
                            <input onChange={this.onStatusChange} autoFocus={true} onBlur={ this.toggleActivateEditMode} value={this.state.status}></input>
                        </div>
                    : <div>
                            <span onDoubleClick={this.toggleActivateEditMode}>{this.props.status || "No status yet"}</span>
                        </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;