import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getProfileStatus,
    getUserProfile,
    savePhoto,
    saveProfile,
    updateProfileStatus
} from "../../redux/profile-reducer";
import {Navigate, useParams, RouteComponentProps } from "react-router-dom";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../types/types";

export function withRouter(Children: any){
    return(props: any)=>{
        const match  = {params: useParams()};
        return <Children {...props}  match = {match}/>
    }
}

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getProfileStatus: (userId: number) => void
    updateProfileStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

type PathParamsType = {
    userId: string
}

type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId = this.props.match.params.userId ?? this.props.authorizedUserId

        this.props.getUserProfile(userId)
        this.props.getProfileStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if(this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        if(!this.props.isAuth) return <Navigate to="/login"/>
        return <Profile
                        {...this.props}
                        profile={this.props.profile}
                        isOwner={!this.props.match.params.userId}
                        status={this.props.status}
                        savePhoto={this.props.savePhoto}
                        saveProfile={this.props.saveProfile}
                        updateProfileStatus={this.props.updateProfileStatus}/>
    }
}

const mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getProfileStatus, updateProfileStatus, savePhoto, saveProfile}),
    withRouter
)(ProfileContainer)
