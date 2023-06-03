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
  getDateOfBirth,
  getFilteredBlogs,
  getAvatarUrl,
} from "../../data/utils";
import { tokens } from "../../theme";
import {
  getBlogs,
  getUsers,
  currentUserId,
  getCurrentUserData,
  getJobList,
} from "../../lib/pocketbase";
import { makeStyles } from "@material-ui/core";
import Blog from "../../components/Card";
import RolesCard from "../../components/RolesCard";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
const Profile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [blog, setBlogs] = useState([]);
  const [user, setUsers] = useState([]);
  const [positions, setPositions] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [filteredBlogs, setFilteredBlog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [collectionName, setCollectionName] = useState("");

  const classes = useStyles();
  useEffect(() => {
    setLoading(true);
    getBlogs().then((res) => {
      setBlogs(res);
    });
    getUsers().then((res) => {
      setUsers(res);
    });
    getJobList().then((res) => {
      setPositions(res);
    });
    getCurrentUserData().then((res) => {
      setCollectionName(res?.collectionName);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (user) {
      setCurrentUser(getFilteredUser(currentUserId, user));
      setFilteredBlog(getFilteredBlogs(currentUserId, blog));
      setLoading(false);
    }
  }, [user, blog]);

  const handleRoute = (link) => {
    window.open(link, "_blank", "noreferrer");
  };

  return (
    <Box m="20px">
      {/* My Profile */}
      <Header title="My Profile" subtitle="" />

      {loading ? (
        <>Loading...</>
      ) : (
        <Box margin="20px">
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box display="flex" flexWrap="wrap">
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
                    display="flex"
                  >
                    <Box display="flex" justifyContent="center" marginTop="5px">
                      <img
                        alt="profile-user"
                        width="50px"
                        height="50px"
                        src={getAvatarUrl(blog, currentUser, "profile")}
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
                        {currentUser?.name || ""}
                      </Typography>
                      <Typography variant="h6" color={colors.greenAccent[500]}>
                        {currentUser?.role || ""}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  flexWrap="wrap"
                  paddingTop="20px"
                >
                  <AccordionDetails>
                    <Typography
                      variant="h6"
                      display="flex"
                      color={colors.greenAccent[500]}
                    >
                      {currentUser?.created
                        ? `created on ${getTimeStamp(currentUser?.created)}`
                        : ``}
                    </Typography>
                    <Typography
                      variant="h6"
                      display="flex"
                      color={colors.greenAccent[500]}
                    >
                      {currentUser?.updated
                        ? `modified on ${getTimeStamp(currentUser?.updated)}`
                        : ``}
                    </Typography>
                  </AccordionDetails>
                </Box>
              </Box>
            </AccordionSummary>
            <Divider color={colors.greenAccent[500]} flexItem />
            <Box height="400px" overflow="scroll">
              <AccordionDetails>
                <Typography display="flex" variant="h4" marginTop="10px">
                  {`Email`}
                </Typography>
                <Typography marginTop="10px" textAlign="left">
                  {currentUser?.email}
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography display="flex" variant="h4" marginTop="10px">
                  {`Username`}
                </Typography>
                <Typography marginTop="10px" textAlign="left">
                  {currentUser?.username}
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography display="flex" variant="h4" marginTop="10px">
                  {`Date of Birth`}
                </Typography>
                <Typography marginTop="10px" textAlign="left">
                  {getDateOfBirth(currentUser?.dob) || `-`}
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography display="flex" variant="h4" marginTop="10px">
                  {`Contact`}
                </Typography>
                <Typography marginTop="10px" textAlign="left">
                  {currentUser?.contact || `-`}
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography display="flex" variant="h4" marginTop="10px">
                  {`Address`}
                </Typography>
                <Typography marginTop="10px" textAlign="left">
                  {currentUser?.address || `-`}
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography display="flex" variant="h4" marginTop="10px">
                  {`City`}
                </Typography>
                <Typography marginTop="10px" textAlign="left">
                  {currentUser?.city || `-`}
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography display="flex" variant="h4" marginTop="10px">
                  {`Zip Code`}
                </Typography>
                <Typography marginTop="10px" textAlign="left">
                  {currentUser?.zipcode || `-`}
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography display="flex" variant="h4" marginTop="10px">
                  {`Onboarded on`}
                </Typography>
                <Typography marginTop="10px" textAlign="left">
                  {getDateOfBirth(currentUser?.onboarded) || `-`}
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography display="flex" variant="h4" marginTop="10px">
                  {`LinkedIn Profile`}
                </Typography>
                <Typography
                  display="flex"
                  variant="h6"
                  color={colors.greenAccent[500]}
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={() => handleRoute(currentUser?.linkedin)}
                >
                  {currentUser?.linkedin || `-`}
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography display="flex" variant="h4" marginTop="10px">
                  {`Description`}
                </Typography>
                <Typography marginTop="10px" textAlign="left">
                  {currentUser?.description ? (
                    <span
                      style={{ wordBreak: "break-word" }}
                      dangerouslySetInnerHTML={{
                        __html: currentUser?.description,
                      }}
                    />
                  ) : (
                    `-`
                  )}
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography display="flex" variant="h4">
                  {`Attachments`}
                </Typography>
                {currentUser?.docs
                  ? Object.keys(getFiles(currentUser, "docs"))?.map((val) => (
                      <Box key={val}>
                        <a href={getFiles(currentUser, "docs")[val]} download>
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
                    ))
                  : ``}
              </AccordionDetails>
            </Box>
          </Accordion>
        </Box>
      )}

      {/* My Blogs */}

      <Box className={classes.root} display="flex" width="100%">
        <Blog
          filteredBlogs={filteredBlogs}
          currentUser={currentUser}
          admin={true}
        />
      </Box>
      {/* Manage Open positions (Admins only)*/}
      {collectionName === "admin" && (
        <Box className={classes.root} display="flex" width="100%">
          <RolesCard positions={positions} admin={true} />
        </Box>
      )}
    </Box>
  );
};

export default Profile;
