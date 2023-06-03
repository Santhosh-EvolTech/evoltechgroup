import React, { useEffect, useState, useContext } from "react";
import { getBlogs, getUsers } from "../../lib/pocketbase";
import {
  Box,
  IconButton,
  Tooltip,
  tooltipClasses,
  CardHeader,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { styled } from "@mui/material/styles";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import { useNavigate } from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";
import { ParamsContext } from "../../context/ParamsContext";
import CardMedia from "@mui/material/CardMedia";
import {
  getAvatarUrl,
  shorten,
  getFilteredUser,
  getBlogCover,
  getBlogTimeStamp,
  getFirstImage,
} from "../../data/utils";

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

const HomeBlog = () => {
  const [filteredBlogs, setBlogs] = useState([]);
  const [currentUser, setUsers] = useState([]);
  const navigate = useNavigate();
  const admin = false;
  const { updateParams } = useContext(ParamsContext);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleParams = (blogs) => {
    const params = {
      blogs: blogs,
      currentUser: currentUser,
      admin: admin,
      filteredBlogs: filteredBlogs,
    };

    updateParams(params);

    navigate("/blogs/post");
  };
  useEffect(() => {
    setLoading(true);
    getBlogs().then((res) => {
      setBlogs(res);
    });
    getUsers().then((res) => {
      setUsers(res);
      setLoading(false);
    });
  }, []);

  return (
    <Box display="flex" justifyContent="center">
      <Box
        m="20px"
        display="flex"
        justifyContent="center"
        position="relative"
        top="10%"
      >
        {loading ? (
          <>Loading...</>
        ) : (
          <Box width="60%" >
            <Typography fontWeight="300" fontSize="64px" textAlign="center">Blogs</Typography>
            <Box className="blog-container">
              {filteredBlogs?.map((blogs, index) => (
                <Box
                  key={blogs.id}
                  margin="20px"
                  display="flex"
                  className="fade-in blog-card"
                  style={{ animationDelay: `${0.2 * index}s` }}
                >
                  <Card className={classes.root}>
                    <CardHeader
                      action={
                        <Box
                          display="flex"
                          alignItems="center"
                          marginLeft="auto"
                        >
                          <Box display="flex">
                            <HtmlTooltip
                              title={
                                <React.Fragment>
                                  <Typography color="inherit">
                                    View Blog Post
                                  </Typography>
                                </React.Fragment>
                              }
                            >
                              <IconButton
                                onClick={() => handleParams(blogs)}
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
                          </Box>
                        </Box>
                      }
                      title={
                        <Typography className="blog-header" variant="h4">
                          {blogs?.topic}
                        </Typography>
                      }
                      subheader={
                        <Typography
                          variant="h6"
                          display="flex"
                          color={colors.greenAccent[500]}
                        >
                          {blogs?.created
                            ? `${getBlogTimeStamp(blogs?.created)}`
                            : ``}
                        </Typography>
                      }
                    />
                    <CardMedia
                      component="img"
                      style={{
                        width: "100%",
                        maxHeight: "200px",
                        overflowY: "scroll",
                      }}
                      loading="lazy"
                      image={
                        blogs?.images !== ""
                          ? getBlogCover(blogs)
                          : getFirstImage(blogs?.description)
                      }
                      className="blog-image"
                      alt={blogs?.images}
                    />
                    <CardContent>
                      <Typography
                        variant="h6"
                        color="textSecondary"
                        component="p"
                        className="cardContent"
                      >
                        {shorten(blogs?.description, 18)}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Box display="flex" flexWrap="wrap" marginBottom="30px">
                        <Box
                          display="flex"
                          flexDirection="row"
                          alignItems="center"
                          flexWrap="wrap"
                        >
                          <Box
                            padding="0 10px 20px 10px"
                            marginBottom="10px"
                            display="flex"
                          >
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
                                    ? getAvatarUrl(
                                        blogs,
                                        currentUser,
                                        "profile"
                                      )
                                    : getAvatarUrl(
                                        blogs,
                                        getFilteredUser(
                                          blogs?.user,
                                          currentUser
                                        ),
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
                                  : getFilteredUser(blogs?.user, currentUser)
                                      ?.name || ""}
                              </Typography>
                              <Typography
                                variant="h6"
                                color={colors.greenAccent[500]}
                              >
                                {admin
                                  ? currentUser?.role || ""
                                  : getFilteredUser(blogs?.user, currentUser)
                                      ?.role || ""}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </CardActions>
                  </Card>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomeBlog;
