import { useEffect, useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Typography from "@mui/material/Typography";
import {
  getEmailVerified,
  requestEmailVerification,
} from "../../lib/pocketbase";

const VerifyEmail = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [details, setDetails] = useState([]);
  const [alert, setAlert] = useState(details?.email);
  useEffect(() => {
    getEmailVerified().then((res) => {
      setDetails(res);
    });
  }, []);
  const handleSubmit = () => {
    requestEmailVerification(details?.email).then((res) => {
      setAlert(true);
    });
  };
  return (
    <>
      <Box
        m="20px"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        width="50%"
        margin="20px auto 10px auto"
      >
        <Header
          title="Verify your email"
          subtitle="After email verification, you will be redirected to dashboard"
        />
        {alert ? (
          <Typography variant="h5" color={colors.greenAccent[500]}>
            {`Verification Email sent successfully`}
          </Typography>
        ) : (
          <Box display="flex" justifyContent="start" mt="50px">
            <Button
              type="submit"
              onClick={handleSubmit}
              color="secondary"
              variant="contained"
            >
              Send Verification Email
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default VerifyEmail;
