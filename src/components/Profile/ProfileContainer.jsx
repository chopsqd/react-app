import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileStatus, getUserProfile, updateProfileStatus} from "../../redux/profile-reducer";
import {Navigate, useParams} from "react-router-dom";
import {compose} from "redux";

export function withRouter(Children){
    return(props)=>{
        const match  = {params: useParams()};
        return <Children {...props}  match = {match}/>
    }
}

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId ?? this.props.authorizedUserId

        this.props.getUserProfile(userId)
        this.props.getProfileStatus(userId)
    }

    render() {
        if(!this.props.isAuth) return <Navigate to="/login"/>
        return <Profile
                        {...this.props}
                        status={this.props.status}
                        updateProfileStatus={this.props.updateProfileStatus}/>
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth
})

export default compose(
    connect(mapStateToProps, {getUserProfile, getProfileStatus, updateProfileStatus}),
    withRouter
)(ProfileContainer)
