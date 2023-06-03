import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {
  TextField,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Select,
} from "@mui/material";
import { HtmlTooltip } from "./Card";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Typography from "@mui/material/Typography";
import ReactQuill from "react-quill";
import { modules, formats } from "../data/utils";
import { tokens } from "../theme";
import { useTheme } from "@mui/material/styles";
import { updateJob } from "../lib/pocketbase";
import { getTimeStamp } from "../data/utils";
import { ParamsContext } from "../context/ParamsContext";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

export default function RolesDialog({ positions, admin }) {
  const [openEdit, setEditOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [role, setRole] = useState(positions?.role);
  const [status, setStatus] = useState(positions?.status);
  const [type, setType] = useState(positions?.type);
  const [code, setCode] = useState(positions?.description);
  const [error, setError] = useState("");
  const { updateParams } = useContext(ParamsContext);
  const navigate = useNavigate();
  const handleEditOpen = () => {
    setEditOpen(true);
  };
  const handleEditClose = () => {
    setEditOpen(false);
  };
  const handleParams = () => {
    const params = {
      positions: positions,
      admin: admin,
    };

    updateParams(params);

    navigate("/careers/apply");
  };

  const handleUpdate = () => {
    if (code !== "" && role !== "" && type !== "" && status !== "") {
      setError("");
      updateJob(role, code, type, status, positions?.id).then((result) => {
        if (result.success) {
          setError("");
          setEditOpen(false);
          setType("");
          window.location.reload();
        } else {
          setError(result.error);
        }
      });
    } else {
      setError("Please fill the required fields*");
    }
  };
  const handleRole = (e) => {
    setRole(e?.target?.value);
    setError("");
  };
  const handleProcedureContentChange = (content, delta, _source, _editor) => {
    setCode(content);
    setError("");
    if (delta?.ops[0]?.delete) {
      setCode("");
    }
  };

  return (
    <>
      <HtmlTooltip
        title={
          <React.Fragment>
            <Typography color="inherit">View Job Post</Typography>
          </React.Fragment>
        }
      >
        <IconButton
          onClick={handleParams}
          edge="start"
          color="success"
          size="large"
          sx={{
            display: "flex",
          }}
        >
          <OpenInNewIcon />
        </IconButton>
      </HtmlTooltip>
      {admin && (
        <HtmlTooltip
          title={
            <React.Fragment>
              <Typography color="inherit">Edit Job Title</Typography>
            </React.Fragment>
          }
        >
          <IconButton
            onClick={handleEditOpen}
            edge="start"
            color="success"
            size="large"
            sx={{
              display: "flex",
            }}
          >
            <ModeEditIcon />
          </IconButton>
        </HtmlTooltip>
      )}
      {openEdit && (
        <Dialog fullScreen open={openEdit} onClose={handleEditClose}>
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleEditClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>

              <Typography
                sx={{ ml: 2, flex: 1, fontWeight: 600 }}
                variant="h5"
                component="div"
              >
                {`UPDATE JOB`}
              </Typography>
              <Button
                color="error"
                onClick={handleEditClose}
                variant="contained"
                sx={{
                  borderRadius: 2,
                  marginRight: 2,
                  fontWeight: 600,
                }}
              >
                Cancel
              </Button>
              <Button
                color="secondary"
                onClick={handleUpdate}
                autoFocus
                variant="contained"
                sx={{
                  borderRadius: 2,
                  fontWeight: 600,
                }}
              >
                Update Job
              </Button>
            </Toolbar>
          </AppBar>
          <DialogContent>
            {error !== "" ? (
              <>
                <Button
                  color="error"
                  variant="contained"
                  sx={{
                    pointerEvents: "none",
                    margin: "10px 0 20px 0",
                    fontWeight: 600,
                  }}
                >
                  {error}
                </Button>
              </>
            ) : (
              ``
            )}
            <DialogContentText>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "80%",
                  margin: "50px auto",
                }}
              >
                <Header title={positions?.role} subtitle={""} />
                <Box display="flex" flexWrap="wrap" marginBottom="30px">
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    flexWrap="wrap"
                    paddingTop="10px"
                  >
                    <Typography
                      variant="h6"
                      display="flex"
                      color={colors.greenAccent[500]}
                    >
                      {positions?.created
                        ? `created on ${getTimeStamp(positions?.created)}`
                        : ``}
                    </Typography>
                    <Typography
                      variant="h6"
                      display="flex"
                      color={colors.greenAccent[500]}
                    >
                      {positions?.updated
                        ? `modified on ${getTimeStamp(positions?.updated)}`
                        : ``}
                    </Typography>
                  </Box>
                </Box>
                <Typography display="flex" variant="h5" margin="10px 0 20px 0">
                  {`Job Title*`}
                </Typography>
                <Box>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Job Title"
                    onChange={(e) => handleRole(e)}
                    value={role}
                    name="role"
                    sx={{ gridColumn: "span 2" }}
                  />
                </Box>
                {/* JOB STATUS */}
                <Typography display="flex" variant="h5" margin="10px 0 20px 0">
                  {`Job Status*`}
                </Typography>
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  displayEmpty
                  name="status"
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={"open"}>open</MenuItem>
                  <MenuItem value={"pending"}>pending</MenuItem>
                  <MenuItem value={"closed"}>closed</MenuItem>
                </Select>
                {/* JOB TYPE */}
                <Typography display="flex" variant="h5" margin="10px 0 20px 0">
                  {`Job Type*`}
                </Typography>
                <Select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  displayEmpty
                  name="type"
                  required
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={"full-time"}>full-time</MenuItem>
                  <MenuItem value={"contract"}>contract</MenuItem>
                </Select>
                <Typography display="flex" variant="h5" margin="30px 0 20px 0">
                  {`Job Description*`}
                </Typography>
                <Box margin="20px 0 20px 0">
                  <ReactQuill
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={code}
                    onChange={handleProcedureContentChange}
                  />
                </Box>
              </Box>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
