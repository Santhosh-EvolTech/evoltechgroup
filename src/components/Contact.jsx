import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
// import { fontSize } from "@mui/system";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        m="20px"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Box display="flex" flexDirection="column" marginRight="200px">
          <Typography
            whiteSpace="nowrap"
            display="flex"
            color="info"
            variant="h1"
            fontWeight="400"
            fontSize="90px"
          >
            {`LET'S TALK`}
          </Typography>
          <Typography
            fontStyle="Jost"
            display="flex"
            color="white"
            fontWeight="300"
            variant="h4"
            marginTop={"5px"}
          >
            Thank you for visiting our website. <br />
            Please contact us using the form.
          </Typography>
        </Box>
        <Box display="flex" width="100%" marginLeft="50%">
          <Box display="flex" width= "auto" position="absolute" flexDirection="column" right="60%" >
            {" "}
            <svg
              width="400"
              height="450"
              viewBox="0 0 294 227"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_103_1036)">
                <path
                  d="M264.118 54.395L54.2719 149.324L33.479 187.495L264.118 54.395Z"
                  fill="#3F89C9"
                />
                <path
                  opacity="0.6"
                  d="M264.118 54.395L54.2719 149.324L33.479 187.495L264.118 54.395Z"
                  fill="white"
                />
                <path
                  d="M264.118 54.395L54.2719 149.324L76.8545 189.269L264.118 54.395Z"
                  fill="#1862A1"
                />
                <path
                  opacity="0.3"
                  d="M264.118 54.395L54.2719 149.324L76.8545 189.269L264.118 54.395Z"
                  fill="black"
                />
                <path
                  d="M45.427 63.9237L49.9656 127.157C50.0854 128.808 50.8551 130.344 52.1059 131.428C53.3567 132.512 54.9863 133.055 56.6374 132.939L177.067 124.298C178.717 124.176 180.251 123.406 181.335 122.156C182.418 120.905 182.963 119.277 182.849 117.627L178.32 54.3907C178.197 52.7396 177.425 51.2045 176.173 50.1213C174.921 49.0381 173.29 48.4952 171.639 48.6112L51.2093 57.2519C49.5582 57.3749 48.0231 58.147 46.9399 59.3992C45.8568 60.6514 45.3138 62.2817 45.4298 63.9333L45.427 63.9237Z"
                  fill="#1862A1"
                />
                <path
                  opacity="0.2"
                  d="M45.427 63.9237L49.9656 127.157C50.0854 128.808 50.8551 130.344 52.1059 131.428C53.3567 132.512 54.9863 133.055 56.6374 132.939L177.067 124.298C178.717 124.176 180.251 123.406 181.335 122.156C182.418 120.905 182.963 119.277 182.849 117.627L178.32 54.3907C178.197 52.7396 177.425 51.2045 176.173 50.1213C174.921 49.0381 173.29 48.4952 171.639 48.6112L51.2093 57.2519C49.5582 57.3749 48.0231 58.147 46.9399 59.3992C45.8568 60.6514 45.3138 62.2817 45.4298 63.9333L45.427 63.9237Z"
                  fill="black"
                />
                <path
                  d="M47.0925 59.2148L98.4572 94.7596C103.22 98.0548 108.966 99.6253 114.743 99.2111C120.52 98.797 125.983 96.4231 130.228 92.4822L175.999 49.9722C174.771 48.9779 173.211 48.488 171.636 48.6019L51.2063 57.2427C49.635 57.3563 48.1651 58.061 47.0925 59.2148Z"
                  fill="#2777BB"
                />
                <path
                  d="M264.118 54.395L95.9374 149.616L76.8545 189.269L264.118 54.395Z"
                  fill="#3F89C9"
                />
                <path
                  opacity="0.6"
                  d="M264.118 54.395L95.9374 149.616L76.8545 189.269L264.118 54.395Z"
                  fill="white"
                />
                <path
                  d="M210.218 114.849L210.943 115.538L194.254 133.131L193.529 132.443L210.218 114.849Z"
                  fill="#3F89C9"
                />
                <path
                  d="M186.158 140.203L186.883 140.891L180.882 147.218L180.157 146.529L186.158 140.203Z"
                  fill="#3F89C9"
                />
                <path
                  d="M264.118 54.395L95.9374 149.616L143.301 181.77L264.118 54.395Z"
                  fill="#3F89C9"
                />
                <path
                  d="M51.6679 224.922C51.9114 224.852 52.1394 224.737 52.3398 224.582L78.3799 204.423C78.7955 204.097 79.0654 203.62 79.1307 203.096C79.1959 202.572 79.0513 202.043 78.7282 201.625C78.4051 201.207 77.9299 200.934 77.4062 200.866C76.8826 200.797 76.353 200.938 75.9331 201.258L49.8834 221.42C49.5148 221.705 49.2573 222.11 49.1554 222.565C49.0534 223.019 49.1134 223.495 49.3249 223.91C49.5365 224.326 49.8863 224.654 50.3141 224.839C50.7419 225.023 51.2207 225.053 51.6679 224.922Z"
                  fill="#114571"
                />
                <path
                  opacity="0.3"
                  d="M51.6679 224.922C51.9114 224.852 52.1394 224.737 52.3398 224.582L78.3799 204.423C78.7955 204.097 79.0654 203.62 79.1307 203.096C79.1959 202.572 79.0513 202.043 78.7282 201.625C78.4051 201.207 77.9299 200.934 77.4062 200.866C76.8826 200.797 76.353 200.938 75.9331 201.258L49.8834 221.42C49.5148 221.705 49.2573 222.11 49.1554 222.565C49.0534 223.019 49.1134 223.495 49.3249 223.91C49.5365 224.326 49.8863 224.654 50.3141 224.839C50.7419 225.023 51.2207 225.053 51.6679 224.922Z"
                  fill="black"
                />
                <path
                  d="M48.522 207.552C48.7625 207.48 48.9866 207.362 49.1814 207.205L63.1602 196.337C63.3699 196.177 63.5459 195.977 63.6781 195.749C63.8102 195.521 63.896 195.269 63.9303 195.007C63.9646 194.746 63.9469 194.48 63.8781 194.225C63.8093 193.971 63.6908 193.732 63.5294 193.524C63.3681 193.315 63.1671 193.14 62.938 193.01C62.7088 192.879 62.4561 192.795 62.1944 192.762C61.9327 192.73 61.6671 192.749 61.4129 192.82C61.1587 192.89 60.921 193.01 60.7134 193.173L46.7263 204.011C46.3068 204.335 46.0327 204.812 45.9643 205.337C45.8959 205.862 46.0387 206.393 46.3614 206.814C46.6032 207.142 46.9398 207.389 47.326 207.521C47.7122 207.653 48.1296 207.664 48.522 207.552Z"
                  fill="#3F89C9"
                />
                <path
                  opacity="0.5"
                  d="M48.522 207.552C48.7625 207.48 48.9866 207.362 49.1814 207.205L63.1602 196.337C63.3699 196.177 63.5459 195.977 63.6781 195.749C63.8102 195.521 63.896 195.269 63.9303 195.007C63.9646 194.746 63.9469 194.48 63.8781 194.225C63.8093 193.971 63.6908 193.732 63.5294 193.524C63.3681 193.315 63.1671 193.14 62.938 193.01C62.7088 192.879 62.4561 192.795 62.1944 192.762C61.9327 192.73 61.6671 192.749 61.4129 192.82C61.1587 192.89 60.921 193.01 60.7134 193.173L46.7263 204.011C46.3068 204.335 46.0327 204.812 45.9643 205.337C45.8959 205.862 46.0387 206.393 46.3614 206.814C46.6032 207.142 46.9398 207.389 47.326 207.521C47.7122 207.653 48.1296 207.664 48.522 207.552Z"
                  fill="white"
                />
                <path
                  d="M86.3667 214.603C86.6057 214.53 86.83 214.416 87.0289 214.265L112.421 194.564C112.631 194.404 112.807 194.204 112.939 193.976C113.071 193.748 113.157 193.496 113.191 193.234C113.225 192.973 113.208 192.707 113.139 192.452C113.07 192.198 112.952 191.959 112.79 191.751C112.629 191.542 112.428 191.367 112.199 191.237C111.97 191.106 111.717 191.022 111.455 190.989C111.193 190.957 110.928 190.976 110.674 191.047C110.419 191.117 110.182 191.237 109.974 191.4L84.571 211.062C84.2025 211.347 83.9449 211.752 83.843 212.207C83.741 212.661 83.801 213.137 84.0126 213.553C84.2241 213.968 84.574 214.296 85.0017 214.481C85.4295 214.665 85.9083 214.695 86.3556 214.564L86.3667 214.603Z"
                  fill="#3F89C9"
                />
                <path
                  opacity="0.3"
                  d="M86.3667 214.603C86.6057 214.53 86.83 214.416 87.0289 214.265L112.421 194.564C112.631 194.404 112.807 194.204 112.939 193.976C113.071 193.748 113.157 193.496 113.191 193.234C113.225 192.973 113.208 192.707 113.139 192.452C113.07 192.198 112.952 191.959 112.79 191.751C112.629 191.542 112.428 191.367 112.199 191.237C111.97 191.106 111.717 191.022 111.455 190.989C111.193 190.957 110.928 190.976 110.674 191.047C110.419 191.117 110.182 191.237 109.974 191.4L84.571 211.062C84.2025 211.347 83.9449 211.752 83.843 212.207C83.741 212.661 83.801 213.137 84.0126 213.553C84.2241 213.968 84.574 214.296 85.0017 214.481C85.4295 214.665 85.9083 214.695 86.3556 214.564L86.3667 214.603Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_103_1036">
                  <rect
                    width="258.57"
                    height="161.33"
                    fill="white"
                    transform="matrix(-0.960532 0.278169 0.278169 0.960532 248.365 0)"
                  />
                </clipPath>
              </defs>
            </svg>
          </Box>
          <Box>
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
                      variant="standard"
                      type="text"
                      label="Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.Name}
                      name="name"
                      InputProps={{ style: { fontSize: "24px" } }}
                      InputLabelProps={{
                        shrink: true,
                        style: { color: "white" },
                      }}
                      error={!!touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                      sx={{
                        gridColumn: "span 25",
                        color: "white !important",
                        fontWeight: 600,
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label="Company"
                      InputLabelProps={{ style: { color: "white" } }}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      InputProps={{ style: { fontSize: "24px" } }}
                      value={values.company}
                      name="company"
                      error={!!touched.company && !!errors.company}
                      helperText={touched.company && errors.company}
                      sx={{ gridColumn: "span 13" }}
                    />
                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label="Role"
                      onBlur={handleBlur}
                      InputLabelProps={{ style: { color: "white" } }}
                      InputProps={{ style: { fontSize: "24px" } }}
                      onChange={handleChange}
                      value={values.email}
                      name="role"
                      error={!!touched.role && !!errors.role}
                      helperText={touched.role && errors.role}
                      sx={{ gridColumn: "span 12" }}
                    />
                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label="Email"
                      InputLabelProps={{ style: { color: "white" } }}
                      InputProps={{ style: { fontSize: "24px" } }}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      sx={{ gridColumn: "span 25" }}
                    />
                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label="Requirements"
                      InputLabelProps={{ style: { color: "white" } }}
                      InputProps={{ style: { fontSize: "24px" } }}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.address1}
                      name="requirements"
                      error={!!touched.requirements && !!errors.requirements}
                      helperText={touched.requirements && errors.requirements}
                      sx={{ gridColumn: "span 25" }}
                    />
                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label="Message"
                      InputLabelProps={{ style: { color: "white" } }}
                      InputProps={{ style: { fontSize: "24px" } }}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.address2}
                      name="message"
                      error={!!touched.message && !!errors.message}
                      helperText={touched.message && errors.message}
                      sx={{ gridColumn: "span 25" }}
                    />
                  </Box>

                  <Box display="flex" justifyContent="end" mt="20px">
                    <Button type="submit" color="secondary" variant="contained">
                      Submit
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  message: yup.string().required("required"),
});
const initialValues = {
  name: "",
  email: "",
  company: "",
  role: "",
  requirements: "",
  message: "",
};

export default Form;
