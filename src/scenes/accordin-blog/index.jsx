import { useEffect, useState } from "react";
import { Box, useTheme, Divider } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  getTimeStamp,
  getFilteredUser,
  getFiles,
  getAvatarUrl,
} from "../../data/utils";
import { tokens } from "../../theme";
import { getBlogs, getUsers } from "../../lib/pocketbase";

const Blog = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [blog, setBlogs] = useState([]);
  const [user, setUsers] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleRoute = (link) => {
    window.open(link, "_blank", "noreferrer");
  };

  const handleChange = (panel) => (_event, isExpanded) => {
    // getAvatarUrl(blog, user);
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box m="20px">
      <Header title="Blogs" subtitle="" />
      {/* <Box display="flex" flexWrap="wrap"> */}
      {loading ? (
        <>Loading...</>
      ) : (
        blog?.map((blogs) => (
          <Box key={blogs.id} margin="20px">
            {/* TODO: change width accordingly (maxWidth="600px" width="auto")*/}
            <Accordion
              expanded={expanded === blogs.id}
              onChange={handleChange(blogs.id)}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <Box
                    borderRight="3px solid #4cceac"
                    paddingRight="20px"
                    marginRight="15px"
                  >
                    <Typography display="flex" variant="h4">
                      {blogs?.topic}
                    </Typography>
                    <Typography
                      variant="h6"
                      display="flex"
                      color={colors.greenAccent[500]}
                    >
                      posted on {getTimeStamp(blogs?.created)}
                    </Typography>
                  </Box>

                  {/* Author, Avatar and Role */}
                  <Box
                    mb="10px"
                    display="flex"
                    alignItems="center"
                    gap="10px"
                    marginTop="5px"
                  >
                    <Box display="flex" justifyContent="center" marginTop="5px">
                      <img
                        alt="profile-user"
                        width="50px"
                        height="50px"
                        src={getAvatarUrl(blogs, user, "blogs")}
                        style={{ cursor: "pointer", borderRadius: "50%" }}
                      />
                    </Box>
                    <Box textAlign="left">
                      <Typography
                        variant="h5"
                        color={colors.grey[100]}
                        fontWeight="bold"
                        sx={{ m: "10px 0 0 0" }}
                      >
                        {getFilteredUser(blogs?.user, user)?.name || ""}
                      </Typography>
                      <Typography variant="h6" color={colors.greenAccent[500]}>
                        {getFilteredUser(blogs?.user, user)?.role || ""}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </AccordionSummary>
              <Divider color={colors.greenAccent[500]} flexItem />
              <Box height="400px" overflow="scroll">
                <AccordionDetails>
                  <Typography
                    variant="h6"
                    display="flex"
                    color={colors.greenAccent[500]}
                  >
                    modified on {getTimeStamp(blogs?.updated)}
                  </Typography>
                </AccordionDetails>
                <AccordionDetails>
                  <Typography display="flex" variant="h4" marginTop="10px">
                    {`Topic Brief`}
                  </Typography>
                  <Typography marginTop="10px" textAlign="left">
                    <span
                      style={{ wordBreak: "break-word" }}
                      dangerouslySetInnerHTML={{
                        __html: blogs?.description,
                      }}
                    />
                  </Typography>
                </AccordionDetails>

                <AccordionDetails>
                  <Typography display="flex" variant="h4" marginTop="10px">
                    {`References`}
                  </Typography>
                  <Typography
                    display="flex"
                    variant="h6"
                    color={colors.greenAccent[500]}
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() => handleRoute(blogs?.reference)}
                  >
                    {blogs?.reference}
                  </Typography>
                </AccordionDetails>
                <AccordionDetails>
                  <Typography display="flex" variant="h4">
                    {`Attachments`}
                  </Typography>
                  {Object.keys(getFiles(blogs, "attachments"))?.map((val) => (
                    <Box key={val}>
                      <a href={getFiles(blogs, "attachments")[val]} download>
                        <Typography
                          display="flex"
                          variant="h6"
                          color={colors.greenAccent[500]}
                          style={{
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                        >
                          {`${val} [download]`}
                        </Typography>
                      </a>
                    </Box>
                  ))}
                </AccordionDetails>
                <AccordionDetails>
                  <Typography display="flex" variant="h4">
                    {`Images`}
                  </Typography>
                  <Box display="flex" flexDirection="row" flexWrap="wrap">
                    {Object.keys(getFiles(blogs, "images"))?.map((val) => (
                      <Box
                        key={val}
                        display="flex"
                        justifyContent="left"
                        flexDirection="column"
                        margin="10px"
                      >
                        <a
                          href={getFiles(blogs, "images")[val]}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Typography
                            display="flex"
                            variant="h6"
                            color={colors.greenAccent[500]}
                            style={{
                              cursor: "pointer",
                              textDecoration: "underline",
                            }}
                          >
                            {`${val} [download]`}
                          </Typography>
                        </a>
                        <img
                          src={getFiles(blogs, "images")[val]}
                          alt={val}
                          width="auto"
                          height="auto"
                          style={{ maxHeight: "400px", maxWidth: "400px" }}
                        />
                      </Box>
                    ))}
                  </Box>
                </AccordionDetails>
              </Box>
            </Accordion>
          </Box>
        ))
      )}
      {/* </Box> */}
    </Box>
  );
};

export default Blog;
