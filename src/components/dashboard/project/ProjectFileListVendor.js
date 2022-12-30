import { useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import { format } from 'date-fns';
// import numeral from 'numeral';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import {
  Box,
  Card,
  // CardContent,
  CardHeader,
  // Checkbox,
  Divider,
  IconButton,
  // Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import DownloadIcon from '../../../icons/Download';
// import ArrowRightIcon from '../../../icons/ArrowRight';
// import PencilAltIcon from '../../../icons/PencilAlt';
import EyeIcon from '../../../icons/Eye';
import Label from '../../Label';
// import MoreMenu from '../../MoreMenu';
import Scrollbar from '../../Scrollbar';
// import FileListBulkActions from './FileListBulkActions';
// import FileDropzone from '../../FileDropzone';
import { projectApi } from '../../../api/projectApi';
import { activityLogApi } from '../../../api/activityLogApi';
import ConfirmDialog from '../../popups/ConfirmDialog';
import ConfirmRequestEsign from '../../popups/ConfirmRequestEsign';
import ActivityLogModal from './ActivityLogModal';
import EsignModal from './EsignModal';

const getStatusLabel = (fileStatus) => {
    const map = {
      removed: {
        color: 'error',
        text: 'Removed'
      },
      available: {
        color: 'success',
        text: 'Active'
      },
      replaced: {
        color: 'warning',
        text: 'Replaced'
      },
      rejected: {
        color: 'error',
        text: 'Rejected'
      }
    };

  const { text, color } = map[fileStatus];

  return (
    <Label color={color}>
      {text}
    </Label>
  );
};

const getESignStatusLabel = (eSignStatus) => {
    const map = {
      none: {
        color: 'NoBackground',
        text: 'None'
      },
      created: {
        color: 'NoBackground',
        text: 'None'
      },
      sent: {
        color: 'ongoing',
        text: 'Requested'
      },
      due: {
        color: 'error',
        text: 'eSign is Due'
      },
      completed: {
        color: 'success',
        text: 'Completed'
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
    if (eSignStatus === 'none' || eSignStatus === 'created') {
        return (
            <Label color={color}>
                {text}
            </Label>
          );
    }

    return (
      <Label color={color} style={{ cursor: 'pointer' }}>
        {text}
      </Label>
    );
  };

const applyPagination = (files, page, limit) => files
  .slice(page * limit, page * limit + limit);

const ProjectFileListVendor = (props) => {
  const { files, ...other } = props;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });
  const [confirmRequestEsign, setConfirmRequestEsign] = useState({ isOpen: false, title: '', subTitle: '', document: {} });
  const [open, setOpen] = useState(false);
  const [openEsign, setOpenEsign] = useState(false);
  const [activityLog, setActivityLog] = useState([]);
  const [eSignRecord, setESignRecord] = useState([]);
  const [thisDocument, setThisDocument] = useState({});

  // const handleSelectAllOrders = (event) => {
  //  setSelectedOrders(event.target.checked
  //    ? orders.map((order) => order.id)
  //    : []);
  // };

  const handleDownload = (documentID) => {
    try {
        projectApi.fileDownload(documentID)
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
                const link = document.createElement('a');
                link.href = response.data;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                toast.error('Download failed');
                console.error(response);
            }
          })
          .catch((response) => {
            toast.error('Download failed');
            console.error(response);
          });
      } catch (err) {
        toast.error('Download failed!');
        console.error(err);
      }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
  };

  const paginatedFiles = applyPagination(files, page, limit);
  // const enableBulkActions = selectedFiles.length > 0;
  // const selectedSomeOrders = selectedOrders.length > 0 && selectedOrders.length < orders.length;
  // const selectedAllOrders = selectedOrders.length === orders.length;

  const handleOpenModal = (document) => {
    try {
        activityLogApi.getActivityLog(document.documentID)
          .then((response) => {
            console.log(response.log);
            setActivityLog(response.log);
            setThisDocument(document);
            setOpen(true);
          })
          .catch((response) => {
            toast.dismiss();
            toast.error('Get activity log failed - 2');
            console.error(response);
          });
    } catch (err) {
        toast.dismiss();
        toast.error('Get activity log failed! - 3');
        console.error(err);
    }
  };

  const onEsign = (file) => {
    console.log(file.eSignStatus);
    setConfirmRequestEsign({
        ...confirmRequestEsign,
        isOpen: false
    });
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOpenEsignModal = (document) => {
    setESignRecord(document.eSignature);
    setOpenEsign(true);
    setThisDocument(document);
  };

  const handleCloseEsignModal = () => {
    setOpenEsign(false);
  };

  return (
    <>
      <Card {...other}>
        <CardHeader
          title="Documents to Me"
        />
        <Divider />
        <Scrollbar>
          <Box sx={{ minWidth: 1150 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Document Name
                  </TableCell>
                  <TableCell>
                    Upload Date
                  </TableCell>
                  <TableCell>
                    Uploaded By
                  </TableCell>
                  <TableCell>
                    Description / Action
                  </TableCell>
                  <TableCell>
                    Unique File ID
                  </TableCell>
                  <TableCell align="center">
                    Status
                  </TableCell>
                  <TableCell align="center">
                    Activity Log
                  </TableCell>
                  <TableCell align="center">
                    Download
                  </TableCell>
                  <TableCell align="center">
                    eSignature
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {paginatedFiles.map((file) => (
                    <TableRow>
                      <TableCell>
                        <Typography
                          color="textPrimary"
                          variant="subtitle2"
                        >
                          {file.fileName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          color="textSecondary"
                          variant="body2"
                        >
                          {file.dateAdded}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          color="textPrimary"
                          variant="subtitle2"
                        >
                          {file.uploadedName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          color="textPrimary"
                          variant="subtitle2"
                        >
                          {file.description}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                            color="textPrimary"
                            variant="subtitle2"
                        >
                          {file.documentID}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        {getStatusLabel(file.status)}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => {
                            handleOpenModal(file);
                          }}
                        >
                          <EyeIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => {
                              handleDownload(file.documentID);
                          }}
                        >
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                      <TableCell
                         align="center"
                         onClick={() => {
                            if (file.eSignature.eSignStatus === 'sent' || file.eSignature.eSignStatus === 'due') {
                                setConfirmRequestEsign({
                                    isOpen: true,
                                    title: 'A request has been sent to you for an eSignature.',
                                    document: file,
                                    subTitle: 'Please check your email inbox for message from DocuSign and follow the instructions.',
                                    onConfirm: () => { onEsign(file); }
                                });
                            } else if (file.eSignature.eSignStatus === 'completed') {
                                handleOpenEsignModal(file);
                            }
                         }}
                      >
                        {getESignStatusLabel(file.eSignature.eSignStatus)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>
        </Scrollbar>
        <TablePagination
          component="div"
          count={files.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
      <ConfirmRequestEsign
        confirmRequestEsign={confirmRequestEsign}
        setConfirmRequestEsign={setConfirmRequestEsign}
      />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <ActivityLogModal
        activityLog={activityLog}
        thisDocument={thisDocument}
        onClose={handleCloseModal}
        open={open}
      />
      <EsignModal
        eSignRecord={eSignRecord}
        thisDocument={thisDocument}
        onClose={handleCloseEsignModal}
        openEsign={openEsign}
      />

    </>
  );
};

ProjectFileListVendor.propTypes = {
  files: PropTypes.array.isRequired
};

export default ProjectFileListVendor;
