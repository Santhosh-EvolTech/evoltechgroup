import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useTheme,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { tokens } from "../../theme";
import { submitCareerPosition } from "../../lib/pocketbase";

const ApplyJob = ({ position }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  // TODO: hanlde resume upload
  const resumeUrl = "";
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleFormSubmit = (values) => {
    setError("");
    submitCareerPosition(
      values?.name?.toString(),
      values?.email?.toString(),
      values?.phone?.toString(),
      resumeUrl,
      position?.id,
      values?.description?.toString()
    ).then((result) => {
      if (result.success) {
        setError("");
        alert("Submitted successfully!");
        window.location.reload();
      } else {
        setError("Invalid details. Try again");
      }
    });
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
        {`Apply for ${position?.role}`}
      </Button>

      <Dialog
        // fullScreen
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            width: "80%",
            maxHeight: "auto",
            overflowY: "scroll",
          },
        }}
        maxWidth=""
      >
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
                {`Careers`}
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "80%",
                  margin: "50px auto",
                }}
              >
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
                            {`Careers`}
                          </Typography>{" "}
                          <Typography
                            display="flex"
                            color="secondary"
                            fontWeight="bold"
                            variant="h5"
                            marginTop={"5px"}
                          >
                            Fill your details to apply
                          </Typography>
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
                        color="secondary"
                        fontWeight="bold"
                        variant="h5"
                        marginTop={"5px"}
                      >
                        {`Role: ${position?.role}`}
                      </Typography>
                      <Typography
                        display="flex"
                        color="secondary"
                        fontWeight="bold"
                        variant="h5"
                        marginTop={"5px"}
                        marginBottom={"5px"}
                      >
                        {`Type: ${position?.type}`}
                      </Typography>
                      <Typography
                        display="flex"
                        variant="h5"
                        margin="10px 0 20px 0"
                      >
                        {`Name*`}
                      </Typography>
                      <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                          "& > div": {
                            gridColumn: isNonMobile ? undefined : "span 5",
                          },
                        }}
                      >
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Name*"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.name}
                          name="name"
                          error={!!touched.name && !!errors.name}
                          helperText={touched.name && errors.name}
                          sx={{ gridColumn: "span 10" }}
                        />
                      </Box>
                      <Typography
                        display="flex"
                        variant="h5"
                        margin="10px 0 20px 0"
                      >
                        {`Email*`}
                      </Typography>
                      <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                          "& > div": {
                            gridColumn: isNonMobile ? undefined : "span 5",
                          },
                        }}
                      >
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Email*"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.email}
                          name="email"
                          error={!!touched.email && !!errors.email}
                          helperText={touched.email && errors.email}
                          sx={{ gridColumn: "span 10" }}
                        />
                      </Box>
                      <Typography
                        display="flex"
                        variant="h5"
                        margin="10px 0 20px 0"
                      >
                        {`Contact Number`}
                      </Typography>
                      <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                          "& > div": {
                            gridColumn: isNonMobile ? undefined : "span 5",
                          },
                        }}
                      >
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Phone"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.phone}
                          name="phone"
                          error={!!touched.phone && !!errors.phone}
                          helperText={touched.phone && errors.phone}
                          sx={{ gridColumn: "span 10" }}
                        />
                      </Box>
                      <Typography
                        display="flex"
                        variant="h5"
                        margin="10px 0 20px 0"
                      >
                        {`Description*`}
                      </Typography>
                      <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                          "& > div": {
                            gridColumn: isNonMobile ? undefined : "span 5",
                          },
                        }}
                      >
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Description*"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.description}
                          name="description"
                          error={!!touched.description && !!errors.description}
                          helperText={touched.description && errors.description}
                          sx={{ gridColumn: "span 10" }}
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
                          Apply
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
  name: yup.string().required("required"),
  email: yup.string().required("required"),
  description: yup.string().required("required"),
});
const initialValues = {
  name: "",
  email: "",
  description: "",
  phone: "",
};

export default ApplyJob;
