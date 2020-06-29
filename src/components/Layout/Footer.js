import React, {Component} from 'react'
import {BottomNavigation, BottomNavigationAction} from '@material-ui/core'
import {PhoneIphone, LocationOn, Business} from '@material-ui/icons/'

const classes = {
    root: {
        width: 500,
        borderRadius: 4,
    },
}

class Footer extends Component {

    constructor(props) {
        super(props)
        this.state = {value: ""}
    }

    handleChange = (event, newValue) => {
        this.setState(() => {
            return {...this.state, value: newValue}
        })
    }

    render() {
        const {lang} = this.props

        return (
            <footer className={"main-footer"}>
                <div className={"footer-content"}>
                    <BottomNavigation value={this.state.value} onChange={this.handleChange} style={classes.root}>
                        <BottomNavigationAction label="Company" value={lang.company} icon={<Business />} />
                        <BottomNavigationAction label="Phone" value={lang.phone} icon={<PhoneIphone />} />
                        <BottomNavigationAction label="Address" value={lang.addres} icon={<LocationOn />} />
                    </BottomNavigation>
                </div>
            </footer>
        )
    }
}

export default Footer