import React, {Component, Fragment} from 'react'
import {Grid, Button, IconButton} from '@material-ui/core'
import {Star, StarHalf, StarBorder, DeleteForever, Edit, ArrowLeftRounded, ArrowRightRounded} from '@material-ui/icons'
import {Animated} from "react-animated-css"
import DeleteUserModal from './DeleteUserModal'
import UserEdit from "./UserEdit"
import FirebaseFunctions from "../../Firebase/FirebaseFunctions"
import {toast} from "react-toastify"
import "./UsersListCard.scss"

const classes = {
    root: {
        flexGrow: 1,
    },
    button: {
        margin: 8,
        fontWeight: 600,
    },
    paddingLR: {
        padding: '0 15px',
    },
}

class UsersListCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userId: null,
            userIndex: null,
            editUserDate: {},
            offset: 0,
            limit: 6,
            amount: props.users.length,
            finish: false,
            start: true,
            modalState: false,
            lang: this.props.lang,
        }
    }

    getRate = () => {
        return Math.floor(Math.random() * (2000 - +100)) + 100
    }

    getDuration = () => {
        return Math.floor(Math.random() * (2000 - +500)) + 500
    }

    handleClickOpen = (id, index) => {
        this.setState((prevState) => {
            return {...prevState,
                userId: id,
                userIndex: index,
                modalState: true
            }
        })
    }

    handleClose = () => {
        this.setState((prevState) => {
            return {...prevState,
                userId: null,
                userIndex: null,
                modalState: false
            }
        })
    }

    handleOpenEditUser = (id, index) => {
        this.setState((prevState) => {
            return {...prevState,
                userId: id,
                userIndex: index,
                editUserDate: {...this.props.users[index]},
            }
        })
        this.props.handleEditUser()
    }

    handleCancelEditUser = () => {
        this.setState((prevState) => {
            return {...prevState,
                userId: null,
                userIndex: null,
                editUserDate: {},
            }
        })
        this.props.handleEditUser()
    }

    handleDeleteUser = () => {
        FirebaseFunctions.removeUser(this.state.userIndex).then(data => {
            if(data.result){
                this.handleClose()
                this.props.refreshData()
                this.setState((prevState) => {
                    return {...prevState, amount: this.props.users.length -1}
                })
                toast.success(this.state.lang.success_user_deleted)
            }
        }).catch(error => {
            toast.error(error.message)
        })
    }

    handleEditUserData = (data) => {
        if(!data.login || !data.node_id || !data.type){
            toast.error(this.state.lang.error_edit_empty_data)
        }else {
            FirebaseFunctions.updateData("users", this.state.userIndex, data ).then(data => {
                if(data.message){
                    this.props.refreshData()
                    toast.success(this.state.lang.success_edit_data)
                }else {
                    toast.error(this.state.lang.error_edit_data)
                }
            }).catch(error => {
                toast.error(error.message)
            })
        }
    }

    previousUsers = () => {
        let {offset, limit, finish, start} = this.state
        let temp = offset - 6
        finish = false
        start = false
        if(temp >= 0){
            offset = temp
            limit -= 6
            if(offset === 0){
                start = true
            }
        }else {
            let check = offset - 1
            if(check <= 0){
                offset = 0
                limit = 6
                start = true
            }
        }

        this.setState((prevState) => {
            return {...prevState, offset, limit, finish, start}
        })
    }

    nextUsers = () => {
        let {offset, limit, amount, finish, start} = this.state
        let temp = offset + 6
        start = false
        if(temp < amount){
            offset = temp
            limit += 6
        }else {
            let check = offset + 1
            if(check <= amount){
                offset = check
                limit = amount
            }
        }

        if(limit >= amount){
            finish = true
        }

        this.setState((prevState) => {
            return {...prevState, offset, limit, finish, start}
        })
    }

    render() {
        const {lang, users} = this.props
        const {offset, limit} = this.state

        const usersListJsx = users.map((user, index) => {
            return (
                <Fragment key={`user-${user.id}-${index}`}>
                    { (offset <= index && index < limit) &&
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <Animated animationIn="flipInX" animationOut="flipOutX" animationInDuration={+this.getDuration}
                                animationOutDuration={+this.getDuration} isVisible={true}>
                                <div className="well profile_view">
                                    <Grid container>
                                        <Grid item sm={12}>
                                            <h4 className="brief text-left"><i>{lang.personal_data}</i></h4>
                                            <Grid container spacing={3}>
                                                <Grid item xs={7} className={"left text-left"}>
                                                    <h2 className={"user-name"}>{user.login}</h2>
                                                    <p><strong>{lang.about}: </strong> {user.type} </p>
                                                    <ul className="list-un-styled">
                                                        <li><i className="fa fa-phone"/> {lang.node_id}: {user.node_id}</li>
                                                    </ul>
                                                </Grid>
                                                <Grid item xs={5} className={"right"}>
                                                    <img src={user.avatar_url && user.avatar_url !== "" ? user.avatar_url : "/images/empty_image.png"}
                                                         alt="user" className="img-circle img-responsive" />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} className={"bottom text-center"}>
                                            <Grid container>
                                                <Grid item xs={12} sm={6}>
                                                    <p className="ratings">
                                                        <span>{this.getRate()}</span>
                                                        <Star fontSize={"small"}/>
                                                        <Star fontSize={"small"}/>
                                                        <Star fontSize={"small"}/>
                                                        <StarHalf fontSize={"small"}/>
                                                        <StarBorder fontSize={"small"}/>
                                                    </p>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        size="small"
                                                        style={classes.button}
                                                        className={"user-delete-btn"}
                                                        onClick={() => this.handleClickOpen(user.id, index)}
                                                    >
                                                        <DeleteForever size="small"/>
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        size="small"
                                                        style={classes.button}
                                                        startIcon={<Edit />}
                                                        onClick={() => this.handleOpenEditUser(user.id, index)}
                                                    >
                                                        {lang.edit}
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Animated>
                        </Grid>
                    }
                </Fragment>
            )
        })

        return (
            <div>
                <div style={classes.root} className={"users-list-card"}>
                    <h2>{!this.props.editUser ? lang.users_list : lang.edit_user}</h2>
                    <Grid container spacing={3}>
                        { !this.props.editUser ?
                            <Grid container style={classes.paddingLR} spacing={3}>
                                {usersListJsx}
                                <Grid item xs={12}>
                                    <label htmlFor="previous-next-btn" className={"previous-next-btn"}>
                                        <IconButton color="primary" aria-label="previous" component="span"
                                                    onClick={this.previousUsers}
                                                    disabled={this.state.start}
                                        >
                                            <ArrowLeftRounded fontSize={"large"}/>
                                        </IconButton>
                                        <IconButton color="primary" aria-label="previous" component="span">
                                            {this.state.limit}
                                        </IconButton>
                                        <span className={"previous-next-drop"}>/</span>
                                        <IconButton color="primary" aria-label="previous" component="span">
                                            {this.state.amount}
                                        </IconButton>
                                        <IconButton color="primary" aria-label="next" component="span"
                                                    onClick={this.nextUsers}
                                                    disabled={this.state.finish}
                                        >
                                            <ArrowRightRounded fontSize={"large"}/>
                                        </IconButton>
                                    </label>
                                </Grid>
                            </Grid>
                        :
                            /* User Edit part */
                            <UserEdit
                                lang={lang}
                                data={this.state.editUserDate}
                                editUserData={this.handleEditUserData}
                                handleCancelEditUser={this.handleCancelEditUser}
                            />
                        }
                    </Grid>
                </div>
                <DeleteUserModal lang={lang} open={this.state.modalState} handleClose={this.handleClose} handleDeleteUser={this.handleDeleteUser}/>
            </div>
        )
    }
}

export default UsersListCard