import React, {Component} from 'react'
import MaterialTable from 'material-table'
import FirebaseFunctions from "../../Firebase/FirebaseFunctions"
import {toast} from "react-toastify"

class UsersListTable extends Component {

    constructor(props) {
        super(props)

        this.state = {
            users: {
                columns: [
                    {title: this.props.lang.name, field: 'login'},
                    {title: this.props.lang.node_id, field: 'node_id'},
                    {title: this.props.lang.type, field: 'type'},
                    {
                        title: this.props.lang.change_type,
                        field: 'type',
                        lookup: {
                            "Admin": this.props.lang.admin,
                            "User": this.props.lang.user,
                            "Organization": this.props.lang.organization
                        },
                    },
                ],
                data: [...this.props.users],
            }
        }
    }

    handleAddNewUserData = (index, data) => {
        const {lang} = this.props
        const userAddData = {
            login: "",
            id: 0,
            node_id: "MDQ6VXNlcjE=",
            avatar_url: "",
            gravatar_id: "",
            url: "",
            html_url: "",
            followers_url: "",
            following_url: "",
            gists_url: "",
            starred_url: "",
            subscriptions_url: "",
            organizations_url: "",
            repos_url: "",
            events_url: "",
            received_events_url: "",
            type: "User",
            site_admin: false
        }
        return new Promise(function(resolve, reject) {
            if(!data.login || !data.node_id || !data.type){
                reject({message: lang.error_edit_empty_data})
            }else {
                userAddData.id = index
                userAddData.login = data.login
                userAddData.node_id = data.node_id
                userAddData.type = data.type
                FirebaseFunctions.addNewData("users", index, userAddData).then(data => {
                    if(data.message){
                        resolve({result: true})
                    }else {
                        reject({message: lang.error_add_new_data})
                    }
                }).catch(error => {
                    reject({message: error.message})
                })
            }
        })
    }

    handleEditUserData = (index, data) => {
        const {lang} = this.props
        return new Promise(function(resolve, reject) {
            if(!data.login || !data.node_id || !data.type){
                reject({message: lang.error_edit_empty_data})
            }else {
                FirebaseFunctions.updateData("users", index, data ).then(data => {
                    if(data.message){
                        resolve({result: true})
                    }else {
                        reject({message: lang.error_edit_data})
                    }
                }).catch(error => {
                    reject({message: error.message})
                })
            }
        })
    }

    handleDeleteUser = (index) => {
        return new Promise(function(resolve, reject) {
            FirebaseFunctions.removeUser(index).then(data => {
                if(data.result){
                    resolve({result: true})
                }
            }).catch(error => {
                reject(error)
            })
        })
    }

    render() {
        const {lang} = this.props

        const configs =
            {
                onRowAdd: (newData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const index = this.state.users.data.length
                            this.handleAddNewUserData(index, newData).then(data => {
                                if(data.result){
                                    resolve()
                                    this.props.refreshData()
                                    this.setState((prevState) => {
                                        const data = [...prevState.users.data]
                                        data.push(newData)
                                        return {...prevState, users: {
                                                ...prevState.users, data}
                                        }
                                    })
                                    toast.success(lang.success_edit_data)
                                }
                            }).catch(error => {
                                reject()
                                toast.error(error.message)
                            })
                        }, 600)
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const index = this.state.users.data.indexOf(oldData)
                            this.handleEditUserData(index, newData).then(data => {
                                if(data.result){
                                    resolve()
                                    this.props.refreshData()
                                    if (oldData) {
                                        this.setState((prevState) => {
                                            const data = [...prevState.users.data]
                                            data[data.indexOf(oldData)] = newData
                                            return {...prevState, users: {
                                                    ...prevState.users, data}
                                            }
                                        })
                                    }
                                    toast.success(lang.success_edit_data)
                                }
                            }).catch(error => {
                                reject()
                                toast.error(error.message)
                            })
                        }, 600)
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const index = this.state.users.data.indexOf(oldData)
                            this.handleDeleteUser(index).then(data => {
                                if(data.result){
                                    resolve()
                                    this.props.refreshData()
                                    this.setState((prevState) => {
                                        const data = [...prevState.users.data]
                                        data.splice(data.indexOf(oldData), 1)
                                        return {...prevState, users: {
                                                ...prevState.users, data}
                                        }
                                    })
                                    toast.success(lang.success_user_deleted)
                                }
                            }).catch(error => {
                                reject()
                                toast.error(error.message)
                            })
                        }, 600)
                    }),
            }

        return (
            <MaterialTable
                title={lang.users_list}
                columns={this.state.users.columns}
                data={this.state.users.data}
                editable={configs}
            />
        )
    }
}

export default UsersListTable