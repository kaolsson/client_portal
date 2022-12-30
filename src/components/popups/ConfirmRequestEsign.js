import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, makeStyles, Typography } from '@material-ui/core';
// import ExclamationCircleIcon from '../../icons/Download';
import React from 'react';
// import PencilAltIcon from '@material-ui/icons/PencilAlt';
import PencilAltIcon from '../../icons/PencilAlt';

import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    dialog: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogTitle: {
        textAlign: 'center'
    },
    dialogActions: {
        justifyContent: 'center'
    },
    titleIcon: {
        color: theme.palette.secondary.main,
        '&:hover': {
            cursor: 'default'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '8rem'
        }
    }
}));

export default function ConfirmRequestEsign(props) {
    const { confirmRequestEsign, setConfirmRequestEsign } = props;
    const classes = useStyles();

    return (
        <Dialog
            open={confirmRequestEsign.isOpen}
            classes={{ paper: classes.dialog }}
        >
            <DialogTitle className={classes.dialogTitle}>
                <IconButton
                    disableRipple
                    className={classes.titleIcon}
                >
                    <PencilAltIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant="h6">
                    {confirmRequestEsign.title}
                </Typography>
                <Typography variant="h6">
                    {' '}
                </Typography>
                <Typography variant="h6">
                    {'Document: '}
                    {confirmRequestEsign.document.fileName}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmRequestEsign.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => setConfirmRequestEsign({ ...confirmRequestEsign, isOpen: false })}
                >
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}

ConfirmRequestEsign.propTypes = {
    confirmRequestEsign: PropTypes.isRequired,
    setConfirmRequestEsign: PropTypes.isRequired
  };
