import { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { Box, Button, Dialog, TextField, Typography } from '@material-ui/core';
// import getInitials from '../../../utils/getInitials';
import { messageApi } from '../../../api/messageApi';
import useAuth from '../../../hooks/useAuth';

const ProjectApplicationModal = (props) => {
  const { onApply, onClose, open, ...other } = props;
  const { user } = useAuth();

  const initalModalState = {
    values: {
        customerID: user.customerID,
        accountID: user.accountID,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        phone: user.phone,
        messageText: 'Type: Case request',
        messageText2: '',
        messageText3: '',
        siteOrigin: 'MySmartmaster Client',
        typeOrigin: 'inapp',
        status: 'new',
        note: 'Client case request submitted',
    }
  };

  const [modalState, setModalState] = useState(initalModalState);

  const handleChange = (event) => {
    setModalState(event.target.value);
    setModalState(
        {
            values: {
                ...modalState.values,
                [event.target.name]: event.target.value,
            },
        }
    );
  };

  const handleApply = async () => {
    toast.success('Request sent!');

    if (onApply) {
        try {
            modalState.values.messageText2 = ['Topic: ', modalState.values.messageText2].join('');
            modalState.values.messageText3 = ['Message: ', modalState.values.messageText3].join('');
            await messageApi.sendMessage(modalState.values);
            toast.success('Message sent!');
          } catch (err) {
            console.error(err);
            toast.error('Something went wrong!');
          }
        }
        setModalState(initalModalState);
        onApply();
  };

  return (
    <Dialog
      maxWidth="lg"
      onClose={onClose}
      open={open}
      {...other}
    >
      <Box sx={{ p: 3 }}>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          Tell us what you need help with
        </Typography>
        <Typography
          align="center"
          color="textSecondary"
          variant="subtitle2"
        >
          Write down a short note with your needs and we will come back
          to you shortly with a proposal.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Box sx={{ mt: 3 }}>
            <TextField
              autoFocus
              FormHelperTextProps={{
                sx: {
                  textAlign: 'right',
                  mr: 0
                }
              }}
              fullWidth
              label="Topic and Tax Year"
              onChange={handleChange}
              placeholder="Please give topic and tax year"
              name="messageText2"
              value={modalState.values.messageText2}
              variant="outlined"
            />
          </Box>
          <Box sx={{ mt: 3 }}>
            <TextField
              FormHelperTextProps={{
                sx: {
                  textAlign: 'right',
                  mr: 0
                }
              }}
              fullWidth
              helperText={`${200 - modalState.values.messageText3.length} characters left`}
              label="Short Description"
              multiline
              onChange={handleChange}
              name="messageText3"
              placeholder="Tell us what you need help with?"
              rows={5}
              value={modalState.values.messageText3}
              variant="outlined"
            />
          </Box>
          <Box sx={{ mt: 3 }}>
            <Button
              color="primary"
              fullWidth
              onClick={handleApply}
              variant="contained"
            >
              Send Request
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

ProjectApplicationModal.propTypes = {
  onApply: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};

export default ProjectApplicationModal;
