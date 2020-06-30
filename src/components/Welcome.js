import React, {Component} from 'react'
import {Paper, Grid, Switch, FormControlLabel, Button} from '@material-ui/core'
import {RotateLeft} from '@material-ui/icons/'
import axios from 'axios'
import {Animated} from "react-animated-css"
import {toast} from 'react-toastify'
import Loader from 'react-loader-spinner'
import Layout from "../hoc/layout/Layout"
import UsersListTable from "./Users/UsersListTable"
import UsersListCard from "./Users/UsersListCard"
import FirebaseFunctions from "../Firebase/FirebaseFunctions"
import data from "../constants"

// languages
import lang from '../lang/en/en.json'
// User Api url
const apiUrl = data.usersUrl

const classes = {
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: 16,
        textAlign: 'center',
        color: 'rgba(0, 0, 0, 0.54)',
    },
    margin: {
        margin: 8,
    },
}

class Welcome extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tableType: false,
            users: [],
            editUser: false,
        }
    }

    getUserDataFromMainApi = (restore = false) => {
        if(this.state.users.length === 0 || restore === true){
            restore && this.setState(prevState => ({...prevState, users: []}))
            axios.get(`${apiUrl}/users`)
                .then(res => {
                    if((res.status === 200 || res.statusText === "OK") && res.data && res.data.length > 0){
                        this.setState((prevState) => {
                            return {...prevState, users: [...res.data]}
                        })
                        FirebaseFunctions.setUsersData(res.data).then(data => {
                            if(data.message){
                                toast.success(lang.success_firebase_added)
                            }
                        }).catch(error => {
                            toast.error(error.message)
                        })
                    }else {
                        toast.error(lang.error_server_unavailable)
                    }
                })
        }
    }

    getUserDataFromFirebase = () => {
        FirebaseFunctions.getUsersData().then(data => {
            if(data.length > 0){
                this.setState((prevState) => {
                    return {...prevState, users: [...data]}
                })
            }else {
                this.getUserDataFromMainApi()
            }
        }).catch(error => {
            toast.error(error.message)
            this.getUserDataFromMainApi()
        })
    }

    componentDidMount(){
        this.getUserDataFromFirebase()
    }

    handleChange = (event) => {
        const check = event.target.checked
        this.setState((prevState) => {
            return {...prevState, tableType: check}
        })
    }

    handleEditUser = () => {
        this.setState((prevState) => {
            return {...prevState, editUser: !this.state.editUser}
        })
    }

    restoreData = () => {
        this.getUserDataFromMainApi(true)
    }

    render() {

        return (
            <div className={`welcome-container`} style={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <h1 className={"welcome-title"}>{lang.welcome_users_page}</h1>
                    </Grid>
                    { this.state.users.length > 0 ?
                        !this.state.tableType ?
                            <Grid item xs={12}>
                                <Animated animationIn="zoomIn" animationOut="zoomOut" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
                                    <UsersListTable lang={lang} users={this.state.users} refreshData={this.getUserDataFromFirebase}/>
                                </Animated>
                            </Grid>
                        :
                            <Grid item xs={12}>
                                <Paper style={classes.paper}>
                                    <UsersListCard
                                        lang={lang}
                                        users={this.state.users}
                                        editUser={this.state.editUser}
                                        handleEditUser={this.handleEditUser}
                                        refreshData={this.getUserDataFromFirebase}
                                    />
                                </Paper>
                            </Grid>
                    :
                        <Grid item xs={12}>
                            <div className={"empty-data-loader"}>
                                <div>
                                    <Loader type="Bars" color="#1079f8" height={100} width={100}/>
                                    <span>{lang.wait_loader}</span>
                                </div>
                            </div>
                        </Grid>
                    }
                    { !this.state.editUser &&
                        <Grid item xs={12}>
                            <Grid container direction="row" justify="flex-start" alignItems="center" className={"users-list-switch"}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.tableType}
                                            onChange={this.handleChange}
                                            color="primary"
                                        />
                                    }
                                    label={lang.card}
                                />
                                <Button variant="outlined" size="small" style={classes.margin} onClick={this.restoreData}>
                                   <RotateLeft fontSize={"small"}/> {lang.restore_default_data}
                                </Button>
                            </Grid>
                        </Grid>
                    }
                </Grid>
            </div>
        )
    }
}

export default Layout(Welcome)