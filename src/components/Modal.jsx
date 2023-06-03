import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { TextField, Box, AppBar, Toolbar, IconButton } from "@mui/material";
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
import { updateBlog } from "../lib/pocketbase";
import { getTimeStamp, getAvatarUrl, getFilteredUser } from "../data/utils";
import { ParamsContext } from "../context/ParamsContext";
import { useNavigate } from "react-router-dom";

export default function ResponsiveDialog({
  blogs,
  currentUser,
  admin,
  filteredBlogs,
}) {
  const [openEdit, setEditOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [topic, setTopic] = useState(blogs?.topic);
  const [code, setCode] = useState(blogs?.description);
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
      blogs: blogs,
      currentUser: currentUser,
      admin: admin,
      filteredBlogs: filteredBlogs,
    };

    updateParams(params);

    navigate("/blogs/post");
  };

  const handleUpdate = () => {
    if (code !== "" && topic !== "") {
      setError("");
      updateBlog(topic, code, blogs?.id).then((result) => {
        if (result.success) {
          setError("");
          setEditOpen(false);
          window.location.reload();
        } else {
          setError(result.error);
        }
      });
    } else {
      setError("Please fill the required fields*");
    }
  };
  const handleTopic = (e) => {
    setTopic(e?.target?.value);
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
            <Typography color="inherit">View Blog Post</Typography>
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
              <Typography color="inherit">Edit Blog</Typography>
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
                {`UPDATE BLOG`}
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
                Update blog
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
                <Box display="flex" flexWrap="wrap" marginBottom="30px">
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    flexWrap="wrap"
                  >
                    <Box paddingRight="20px" marginRight="15px" display="flex">
                      <Box
                        display="flex"
                        justifyContent="center"
                        marginTop="5px"
                      >
                        <img
                          alt="profile-user"
                          width="50px"
                          height="50px"
                          src={
                            admin
                              ? getAvatarUrl(blogs, currentUser, "profile")
                              : getAvatarUrl(
                                  blogs,
                                  getFilteredUser(blogs?.user, currentUser),
                                  "profile"
                                )
                          }
                          style={{
                            cursor: "pointer",
                            borderRadius: "50%",
                            marginRight: "20px",
                          }}
                        />
                      </Box>
                      <Box textAlign="left">
                        <Typography
                          variant="h5"
                          color={colors.grey[100]}
                          fontWeight="bold"
                          sx={{ m: "10px 0 0 0" }}
                        >
                          {admin
                            ? currentUser?.name || ""
                            : getFilteredUser(blogs?.user, currentUser)?.name ||
                              ""}
                        </Typography>
                        <Typography
                          variant="h6"
                          color={colors.greenAccent[500]}
                        >
                          {admin
                            ? currentUser?.role || ""
                            : getFilteredUser(blogs?.user, currentUser)?.role ||
                              ""}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
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
                      {blogs?.created
                        ? `created on ${getTimeStamp(blogs?.created)}`
                        : ``}
                    </Typography>
                    <Typography
                      variant="h6"
                      display="flex"
                      color={colors.greenAccent[500]}
                    >
                      {blogs?.updated
                        ? `modified on ${getTimeStamp(blogs?.updated)}`
                        : ``}
                    </Typography>
                  </Box>
                </Box>
                <Typography display="flex" variant="h5" margin="10px 0 20px 0">
                  {`Article Title*`}
                </Typography>
                <Box>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Topic"
                    onChange={(e) => handleTopic(e)}
                    value={topic}
                    name="topic"
                    sx={{ gridColumn: "span 2" }}
                  />
                </Box>
                <Typography display="flex" variant="h5" margin="30px 0 20px 0">
                  {`Article*`}
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
