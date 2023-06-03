import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useTheme,
  AppBar,
  Toolbar,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import ReactQuill from "react-quill";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { modules, formats } from "../../data/utils";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { tokens } from "../../theme";
import { createJob } from "../../lib/pocketbase";

const CreateJob = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleProcedureContentChange = (content, delta, _source, _editor) => {
    setCode(content);
    setError("");
    if (delta?.ops[0]?.delete) {
      setCode("");
    }
  };

  const handleFormSubmit = (values) => {
    if (code !== "") {
      setError("");
      createJob(
        values?.role?.toString(),
        code,
        values?.type?.toString(),
        values?.status?.toString()
      ).then((result) => {
        if (result.success) {
          setError("");
          alert("Uploaded successfully!");
          window.location.reload();
          setCode("");
        } else {
          setError("Invalid details. Try again");
        }
      });
    } else {
      setError("Please fill the required fields*");
    }
  };
  return (
    <>
      <Button
        type="submit"
        color="secondary"
        variant="contained"
        onClick={handleOpen}
        startIcon={<ModeEditIcon />}
        sx={{ fontWeight: 600 }}
      >
        Create New JOB
      </Button>

      <Dialog fullScreen open={open} onClose={handleClose}>
        <Box>
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>

              <Typography
                sx={{ ml: 2, flex: 1, fontWeight: 600 }}
                variant="h5"
                component="div"
              >
                {`CREATE JOB POST`}
              </Typography>
              <Button
                color="error"
                onClick={handleClose}
                variant="contained"
                sx={{
                  borderRadius: 2,
                  marginRight: 2,
                  fontWeight: 600,
                }}
              >
                Cancel
              </Button>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <DialogContentText>
              <Box className="dialog">
                <Formik
                  onSubmit={handleFormSubmit}
                  initialValues={initialValues}
                  validationSchema={checkoutSchema}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mt="20px"
                        mb="20px"
                      >
                        {" "}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                          }}
                        >
                          <Typography
                            display="flex"
                            color="info"
                            variant="h2"
                            fontWeight="bold"
                          >
                            Create Open Position
                          </Typography>{" "}
                          <Typography
                            display="flex"
                            color="secondary"
                            fontWeight="bold"
                            variant="h5"
                            marginTop={"5px"}
                          >
                            Create an Open Position and upload
                          </Typography>
                        </Box>
                        <Box>
                          <Button
                            type="submit"
                            color="secondary"
                            variant="contained"
                            size="medium"
                            sx={{ fontWeight: 600 }}
                          >
                            Create Position
                          </Button>
                        </Box>
                      </Box>
                      {error !== "" ? (
                        <>
                          <Typography
                            display="flex"
                            variant="h6"
                            color={colors.redAccent[500]}
                            // margin="30px 0 20px 0"
                          >
                            {error}
                          </Typography>
                        </>
                      ) : (
                        ``
                      )}
                      <Typography
                        display="flex"
                        variant="h5"
                        margin="10px 0 20px 0"
                      >
                        {`Job Title*`}
                      </Typography>
                      <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                          "& > div": {
                            gridColumn: isNonMobile ? undefined : "span 4",
                          },
                        }}
                      >
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Job Title"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.role}
                          name="role"
                          error={!!touched.role && !!errors.role}
                          helperText={touched.role && errors.role}
                          sx={{ gridColumn: "span 2" }}
                        />
                      </Box>
                      {/* JOB STATUS */}
                      <Typography
                        display="flex"
                        variant="h5"
                        margin="10px 0 20px 0"
                      >
                        {`Job Status*`}
                      </Typography>
                      <Select
                        value={values.status}
                        onChange={handleChange}
                        displayEmpty
                        name="status"
                        required
                        error={!!touched.status && !!errors.status}
                        helperText={touched.status && errors.status}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value={"open"}>open</MenuItem>
                        <MenuItem value={"pending"}>pending</MenuItem>
                        <MenuItem value={"closed"}>closed</MenuItem>
                      </Select>
                      {/* JOB TYPE */}
                      <Typography
                        display="flex"
                        variant="h5"
                        margin="10px 0 20px 0"
                      >
                        {`Job Type*`}
                      </Typography>
                      <Select
                        value={values.type}
                        onChange={handleChange}
                        displayEmpty
                        name="type"
                        required
                        error={!!touched.type && !!errors.type}
                        helperText={touched.type && errors.type}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value={"full-time"}>full-time</MenuItem>
                        <MenuItem value={"contract"}>contract</MenuItem>
                      </Select>
                      <Typography
                        display="flex"
                        variant="h5"
                        margin="30px 0 20px 0"
                      >
                        {`Job Description*`}
                      </Typography>
                      <Box
                        minWidth="300px"
                        maxWidth="800px"
                        margin="20px 0 20px 0"
                      >
                        <ReactQuill
                          theme="snow"
                          modules={modules}
                          formats={formats}
                          value={code}
                          onChange={handleProcedureContentChange}
                        />
                      </Box>
                      {error !== "" ? (
                        <>
                          <Typography
                            display="flex"
                            variant="h6"
                            color={colors.redAccent[500]}
                            margin="30px 0 20px 0"
                          >
                            {error}
                          </Typography>
                        </>
                      ) : (
                        ``
                      )}
                      <Box display="flex" justifyContent="start" mt="20px">
                        <Button
                          type="submit"
                          color="secondary"
                          variant="contained"
                        >
                          Create Position
                        </Button>
                      </Box>
                    </form>
                  )}
                </Formik>
              </Box>
            </DialogContentText>
          </DialogContent>
        </Box>
      </Dialog>
    </>
  );
};

const checkoutSchema = yup.object().shape({
  role: yup.string().required("required"),
  status: yup.string().required("Job Status is required"),
  type: yup.string().required("Job Type is required"),
});
const initialValues = {
  role: "",
  status: "open",
  type: "full-time",
};

export default CreateJob;
