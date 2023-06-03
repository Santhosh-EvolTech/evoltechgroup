import {
  Box,
  Button,
  TextField,
  useTheme,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import { useState } from "react";
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
import { createBlog } from "../../lib/pocketbase";

const CreateBlog = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
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
  const handleImageChange = (e) => {
    setImage(e.currentTarget.files[0]);
  };
  // console.log(URL.createObjectURL(image));
  const handleFormSubmit = (values) => {
    if (code !== "") {
      setError("");
      createBlog(values?.topic?.toString(), code).then((result) => {
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
        Create New Blog
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
                {`CREATE BLOG POST`}
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
                            Create Blog
                          </Typography>{" "}
                          <Typography
                            display="flex"
                            color="secondary"
                            fontWeight="bold"
                            variant="h5"
                            marginTop={"5px"}
                          >
                            Write a New Blog and upload
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
                            Upload Blog
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
                        {`Article Title*`}
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
                          label="Topic"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.topic}
                          name="topic"
                          error={!!touched.topic && !!errors.topic}
                          helperText={touched.topic && errors.topic}
                          sx={{ gridColumn: "span 2" }}
                        />
                      </Box>
                      <Typography
                        display="flex"
                        variant="h5"
                        margin="10px 0 20px 0"
                      >
                        {`Blog Cover Image (optional)`}
                      </Typography>

                      {image === "" ? (
                        <>
                          {" "}
                          <input
                            accept=".png, .jpeg, .jpg, .svg"
                            id="image"
                            name="image"
                            type="file"
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                          />
                          <label htmlFor="image">
                            <Button
                              variant="contained"
                              color="secondary"
                              component="span"
                              sx={{ fontWeight: 600 }}
                            >
                              Upload Image
                            </Button>
                          </label>
                        </>
                      ) : (
                        <>
                          <Box margin="20px 0 20px 0">
                            <img
                              src={URL?.createObjectURL(image)}
                              alt="Preview"
                            />
                          </Box>
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            component="span"
                            sx={{ margin: "10px 0 20px 0", fontWeight: 600 }}
                            onClick={() => setImage("")}
                          >
                            Remove Image
                          </Button>
                        </>
                      )}
                      <Typography
                        display="flex"
                        variant="h5"
                        margin="30px 0 20px 0"
                      >
                        {`Article*`}
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
                          Upload Blog
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
  topic: yup.string().required("required"),
});
const initialValues = {
  topic: "",
};

export default CreateBlog;
