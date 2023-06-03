import React from "react";
import {
  Box,
  useTheme,
  IconButton,
  Tooltip,
  tooltipClasses,
  CardHeader,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Header from "./Header";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import { shorten, getBlogTimeStamp } from "../data/utils";
import { tokens } from "../theme";
import { deleteJob } from "../lib/pocketbase";
import RolesDialog from "./RolesDialog";
import CreateJob from "../scenes/create-job";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip placement="top" {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#2a2d64",
    color: "#ffffff",
    fontWeight: 600,
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
  },
}));
const RolesCard = ({ positions, admin }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const classes = useStyles();

  const handleDelete = (id) => {
    deleteJob(id);
  };

  return (
    <Box width="auto">
      {/* My Blogs */}
      <Header title={`Open Positions`} subtitle="" />
      {admin && <CreateJob />}
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {positions?.map((jobs, index) => (
          <Box
            key={jobs.id}
            margin="20px"
            display="flex"
            className="fade-in role-card-style"
            style={{ animationDelay: `${0.2 * index}s` }}
          >
            <Card className={classes.root}>
              <CardHeader
                action={
                  <Box display="flex" alignItems="center" marginLeft="auto">
                    <Box display="flex">
                      <RolesDialog positions={jobs} admin={admin} />
                    </Box>
                    {admin && (
                      <HtmlTooltip
                        title={
                          <React.Fragment>
                            <Typography color="inherit">
                              Delete Job Post
                            </Typography>
                          </React.Fragment>
                        }
                      >
                        <IconButton
                          onClick={() => handleDelete(jobs?.id)}
                          edge="start"
                          color="error"
                          size="large"
                          sx={{
                            display: "flex",
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </HtmlTooltip>
                    )}
                  </Box>
                }
                title={
                  <Typography className="blog-header" variant="h4">
                    {jobs?.role}
                  </Typography>
                }
                subheader={
                  <Typography
                    variant="h6"
                    display="flex"
                    color={colors.greenAccent[500]}
                  >
                    {jobs?.created ? `${getBlogTimeStamp(jobs?.created)}` : ``}
                  </Typography>
                }
              />
              <CardContent>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  component="p"
                  className="cardContent"
                >
                  {shorten(jobs?.description, 18)}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RolesCard;
