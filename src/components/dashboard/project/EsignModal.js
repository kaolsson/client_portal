import PropTypes from 'prop-types';
import {
    Box,
    Button,
    Card,
    CardHeader,
    Dialog,
//    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';
import Scrollbar from '../../Scrollbar';
import Label from '../../Label';

const tableStyle = {
    border: 'none',
    boxShadow: 'none'
  };

const getESignStatusLabel = (eSignStatus) => {
    if (eSignStatus) {
        const map = {
            none: {
              color: 'NoBackground',
              text: 'Start eSign Request'
            },
            sent: {
              color: 'ongoing',
              text: 'Sent to Client'
            },
            created: {
              color: 'warning',
              text: 'Created but not Sent'
            },
            due: {
              color: 'error',
              text: 'Due'
            },
            completed: {
              color: 'success',
              text: 'eSign Completed'
            },
            aborted: {
              color: 'error',
              text: 'Aborted'
            },
            unknown: {
                color: 'error',
                text: 'Unknown'
            }
          };
        const { text, color } = map[eSignStatus];
        return (
            <Label color={color}>
                {text}
            </Label>
        );
    }
    return (
        <Label color="success">
            {' '}
        </Label>
    );
};

const EsignModal = (props) => {
    const { eSignRecord, thisDocument, onClose, openEsign, ...other } = props;

    const onModalClose = () => {
        onClose();
    };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      onClose={onModalClose}
      open={openEsign}
      {...other}
    >
      <Box sx={{ p: 3 }}>
            <Card {...other} style={tableStyle}>
              <CardHeader
                title="eSignature information for the document"
              />
                <Scrollbar>
                <Box sx={{ minWidth: 500 }}>
                    <Table style={tableStyle}>
                    <TableHead style={tableStyle}>
                        <TableRow style={tableStyle}>
                            <TableCell style={tableStyle}>
                                Data
                            </TableCell>
                            <TableCell style={tableStyle}>
                                Value
                            </TableCell>
                            <TableCell style={tableStyle}>
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={tableStyle}>
                        <TableRow style={tableStyle}>
                            <TableCell style={tableStyle}>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                Document Name
                                </Typography>
                            </TableCell>
                            <TableCell style={tableStyle}>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {thisDocument.fileName}
                                </Typography>
                            </TableCell>
                            <TableCell style={tableStyle}>
                                <Button
                                    color="primary"
                                    onClick={onModalClose}
                                    variant="outlined"
                                >
                                    Download Document
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableStyle}>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                Status
                                </Typography>
                            </TableCell>
                            <TableCell style={tableStyle}>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {getESignStatusLabel(eSignRecord.eSignStatus)}
                                </Typography>
                            </TableCell>
                            <TableCell style={tableStyle}>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {' '}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableStyle}>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                Requester
                                </Typography>
                            </TableCell>
                            <TableCell style={tableStyle}>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {eSignRecord.eSignRequestorName}
                                </Typography>
                            </TableCell>
                            <TableCell style={tableStyle}>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {' '}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableStyle}>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                Signer of Document
                                </Typography>
                            </TableCell>
                            <TableCell style={tableStyle}>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {eSignRecord.eSignSignerName}
                                </Typography>
                            </TableCell>
                            <TableCell style={tableStyle}>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {' '}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableStyle}>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                Signer Email
                                </Typography>
                            </TableCell>
                            <TableCell style={tableStyle}>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {eSignRecord.eSignSignerEmail}
                                </Typography>
                            </TableCell>
                            <TableCell style={tableStyle}>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {' '}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableStyle}>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                Date Requested
                                </Typography>
                            </TableCell>
                            <TableCell style={tableStyle}>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {eSignRecord.eSignDateRequested}
                                </Typography>
                            </TableCell>
                            <TableCell style={tableStyle}>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {' '}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableStyle}>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                Date Due
                                </Typography>
                            </TableCell>
                            <TableCell style={tableStyle}>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {eSignRecord.eSignDateDue}
                                </Typography>
                            </TableCell>
                            <TableCell style={tableStyle}>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {' '}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableStyle}>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                Date Completed
                                </Typography>
                            </TableCell>
                            <TableCell style={tableStyle}>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {eSignRecord.eSignDateCompleted}
                                </Typography>
                            </TableCell>
                            <TableCell style={tableStyle}>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {' '}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableStyle}>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                Date Certificate Expire
                                </Typography>
                            </TableCell>
                            <TableCell style={tableStyle}>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {eSignRecord.eSignDateExpire}
                                </Typography>
                            </TableCell>
                            <TableCell style={tableStyle}>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {' '}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableStyle}>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                DocuSign Certificate ID
                                </Typography>
                            </TableCell>
                            <TableCell style={tableStyle}>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {eSignRecord.eSignCertDocument_id}
                                </Typography>
                            </TableCell>
                            <TableCell style={tableStyle}>
                                <Button
                                    color="primary"
                                    onClick={onModalClose}
                                    variant="outlined"
                                >
                                    Download Certificate
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                    </Table>
                </Box>
                </Scrollbar>
            </Card>
        <Box sx={{ mt: 3 }} align="right">
            <Button
              color="primary"
              onClick={onModalClose}
              variant="contained"
            >
              CLOSE
            </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

EsignModal.propTypes = {
  eSignRecord: PropTypes.object.isRequired,
  thisDocument: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  openEsign: PropTypes.bool
};

EsignModal.defaultProps = {
    openEsign: false
};

export default EsignModal;
