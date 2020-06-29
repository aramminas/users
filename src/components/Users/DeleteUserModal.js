import React, {Component} from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide} from '@material-ui/core'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

class DeleteUserModal extends Component {

    render() {
         const {lang, open, handleClose, handleDeleteUser} = this.props

        return (
            <div>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="user-delete-dialog-title"
                    aria-describedby="user-delete-dialog-description"
                >
                    <DialogTitle id="user-delete-dialog-title">{lang.delete_user}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="user-delete-dialog-description">
                            {lang.delete_user_question}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant="outlined" size="small">
                            {lang.cancel}
                        </Button>
                        <Button onClick={handleDeleteUser} variant="outlined" color="secondary" size="small">
                            {lang.delete}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default DeleteUserModal