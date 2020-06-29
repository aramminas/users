import React, {Component} from 'react'
import {Input, InputLabel, InputAdornment, FormControl, Grid, Button, MenuItem, Select} from '@material-ui/core'
import {AccountCircle, Fingerprint, Ballot} from '@material-ui/icons'

const classes = {
    root: {
        width: 330,
        '& .MuiTextFieldRoot': {
            margin: 8,
            width: '25ch',
        },
    },
    formControl: {
        margin: 8,
        minWidth: 120,
    },
    margin: {
        margin: 8,
    },
    w100: {
        width: '100%',
    },
}

class EditForm extends Component {

    state = {
        userData: {...this.props.data},
    }

    handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value

        switch(name) {
            case "login":
                this.setState((prevState) => {
                    return {...prevState, userData: {...this.state.userData, login: value}}
                })
                break
            case "node-id":
                this.setState((prevState) => {
                    return {...prevState, userData: {...this.state.userData, node_id: value}}
                })
                break
            case "type":
                this.setState((prevState) => {
                    return {...prevState, userData: {...this.state.userData, type: value}}
                })
                break
            default:
                this.setState((prevState) => {
                    return {...prevState}
                })
        }
    }

    handleEditUserData = (event) => {
        event.preventDefault()
        this.props.editUserData(this.state.userData)
    }

    render() {
        const {lang, handleCancelEditUser} = this.props

        return (
            <form style={classes.root} autoComplete="off" onSubmit={this.handleEditUserData}>
                <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                    <Grid item xs={12} style={classes.w100}>
                        <FormControl style={classes.margin} fullWidth>
                            <InputLabel htmlFor="input-name">{lang.name}</InputLabel>
                            <Input
                                id="input-name"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                }
                                name={"login"}
                                value={this.state.userData.login}
                                error={!!!this.state.userData.login}
                                onChange={this.handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} style={classes.w100}>
                        <FormControl style={classes.margin} fullWidth>
                            <InputLabel htmlFor="input-node-id">{lang.node_id}</InputLabel>
                            <Input
                                id="input-node-id"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <Fingerprint />
                                    </InputAdornment>
                                }
                                name={"node-id"}
                                value={this.state.userData.node_id}
                                error={!!!this.state.userData.node_id}
                                onChange={this.handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} style={classes.w100}>
                        <FormControl style={classes.margin} fullWidth>
                            <InputLabel htmlFor="input-type">{lang.type}</InputLabel>
                            <Input
                                id="input-type"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <Ballot />
                                    </InputAdornment>
                                }
                                disabled={true}
                                value={this.state.userData.type}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} style={classes.w100}>
                        <FormControl style={classes.formControl} fullWidth>
                            <InputLabel id="input-change-type">{lang.change_type}</InputLabel>
                            <Select
                                labelId="input-change-type"
                                id="input-change-type"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <Ballot />
                                    </InputAdornment>
                                }
                                name={"type"}
                                value={this.state.userData.type}
                                error={!!!this.state.userData.type}
                                onChange={this.handleChange}
                            >
                                <MenuItem value="">
                                    <em>{lang.none}</em>
                                </MenuItem>
                                <MenuItem value={"Admin"}>{lang.admin}</MenuItem>
                                <MenuItem value={"User"}>{lang.user}</MenuItem>
                                <MenuItem value={"Organization"}>{lang.organization}</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} style={classes.w100}>
                        <Button variant="contained" style={classes.margin} onClick={handleCancelEditUser}>{lang.cancel}</Button>
                        <Button variant="contained" color="primary" style={classes.margin} type={"submit"}>
                            {lang.edit}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        )
    }
}

export default EditForm