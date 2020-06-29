import React, {Component} from "react"
import {Animated} from "react-animated-css"
import EditForm from "./EditForm"

class UserEdit extends Component {

    render() {
        const {lang, data, editUserData, handleCancelEditUser} = this.props

        return (
            <div className={"user-edit-container"}>
                <Animated animationIn="flipInY" animationOut="flipOutY" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
                    <div className={"user-edit-section"}>
                        <h1>{lang.edit_profile}</h1>
                        <img src={data.avatar_url && data.avatar_url !== "" ? data.avatar_url : "/images/empty_image.png"}
                             alt="user" className="user-edit-image"/>
                        <div className={"user-edit-name"}>{data.login}</div>
                        <EditForm lang={lang} data={data} editUserData={editUserData} handleCancelEditUser={handleCancelEditUser}/>
                    </div>
                </Animated>
            </div>
        )
    }
}

export default UserEdit