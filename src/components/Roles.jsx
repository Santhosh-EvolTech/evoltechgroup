import React from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import Typography from "@mui/material/Typography";
import { tokens } from "../theme";
import { useTheme } from "@mui/material/styles";
import { getTimeStamp } from "../data/utils";
import ApplyJob from "../scenes/submit-career";

export default function RolesComponent({ positions, admin }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          position: "relative",
          top: "10%",
          width: "1500px",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ width: "70%", margin: "50px 0 0 0" }}>
          <Header
            title={positions?.role}
            subtitle={`${positions?.status} · ${positions?.type} · remote`}
          />
          <ApplyJob position={positions} />
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
            </Box>
          </Box>
          <Typography display="flex" variant="h4" margin="30px 0 20px 0">
            {`Job Description`}
          </Typography>

          <Typography marginTop="10px" textAlign="left">
            {positions?.description ? (
              <span
                className="rich-text"
                style={{
                  wordBreak: "break-word",
                  width: "80%",
                  fontSize: "20px",
                }}
                dangerouslySetInnerHTML={{
                  __html: positions?.description?.replace(
                    '<a href="',
                    '<a target="_blank" href="'
                  ),
                }}
              />
            ) : (
              `-`
            )}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
