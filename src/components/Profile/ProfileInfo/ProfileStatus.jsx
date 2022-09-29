import style from './ProfileInfo.module.css'
import React from 'react'

class ProfileStatus extends React.Component {
    state = {
        editMode: false
    }

    toggleActivateEditMode() {
        this.setState({
            editMode: !this.state.editMode
        })
        this.state.editMode = !this.state.editMode
    }

    render() {
        return (
            <div>
                {
                    this.state.editMode
                    ? <div>
                            <input autoFocus={true} onBlur={ this.toggleActivateEditMode.bind(this)} value={this.props.status}></input>
                        </div>
                    : <div>
                            <span onDoubleClick={this.toggleActivateEditMode.bind(this)}>{this.props.status}</span>
                        </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;