import React, {Component} from 'react'
import {AppBar, Toolbar, Typography, IconButton} from '@material-ui/core'
import {AccountCircle, ContactsTwoTone} from '@material-ui/icons'

const classes = {
    title: {
        flexGrow: 1,
    },
}

class Header extends Component {

    render() {
        const {lang} = this.props

        return (
            <div className={"header"}>
                <AppBar position="static">
                    <Toolbar>
                        <ContactsTwoTone />&nbsp;
                        <Typography variant="h6" style={classes.title}>
                            {lang.users}
                        </Typography>
                        <div>
                            <IconButton color="inherit" >
                                <AccountCircle />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default Header