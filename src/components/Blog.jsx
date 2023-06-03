import React from "react";
import { Box } from "@mui/material";
import Blog from "./Card";

import Header from "./Header";
import Typography from "@mui/material/Typography";
import { getBlogCover, getFirstImage } from "../data/utils";
import { tokens } from "../theme";
import { useTheme } from "@mui/material/styles";
import { getTimeStamp, getAvatarUrl, getFilteredUser } from "../data/utils";

export default function BlogComponent({
  blogs,
  currentUser,
  admin,
  filteredBlogs,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          position: "relative",
          top: "10%",
          justifyContent: "center",
          width: "1500px",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ width: "70%", margin: "50px 0 0 0" }}>
          <Header title={blogs?.topic} subtitle="" />
          <img
            src={
              blogs?.images !== ""
                ? getBlogCover(blogs)
                : getFirstImage(blogs?.description)
            }
            alt="blog-cover"
            className="blog-image"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              padding: "20px",
            }}
          />

          <Box display="flex" flexWrap="wrap" marginBottom="30px">
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              flexWrap="wrap"
            >
              <Box paddingRight="20px" marginRight="15px" display="flex">
                <Box display="flex" justifyContent="center" marginTop="5px">
                  <img
                    alt="profile-user"
                    width="50px"
                    height="50px"
                    src={
                      admin
                        ? getAvatarUrl(blogs, currentUser, "profile")
                        : getAvatarUrl(
                            blogs,
                            getFilteredUser(blogs?.user, currentUser),
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
                      : getFilteredUser(blogs?.user, currentUser)?.name || ""}
                  </Typography>
                  <Typography variant="h6" color={colors.greenAccent[500]}>
                    {admin
                      ? currentUser?.role || ""
                      : getFilteredUser(blogs?.user, currentUser)?.role || ""}
                  </Typography>
                </Box>
              </Box>
            </Box>
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
                {blogs?.created
                  ? `created on ${getTimeStamp(blogs?.created)}`
                  : ``}
              </Typography>
              <Typography
                variant="h6"
                display="flex"
                color={colors.greenAccent[500]}
              >
                {blogs?.updated
                  ? `modified on ${getTimeStamp(blogs?.updated)}`
                  : ``}
              </Typography>
            </Box>
          </Box>
          <Typography display="flex" variant="h4" margin="30px 0 20px 0">
            {`Article`}
          </Typography>

          <Typography marginTop="10px" textAlign="left">
            {blogs?.description ? (
              <span
                className="rich-text"
                style={{ wordBreak: "break-word", width: "80%" }}
                dangerouslySetInnerHTML={{
                  __html: blogs?.description?.replace(
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
        {!admin && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "50px",
              width: "20%",
              boder: "1px solid red",
              padding: "10px",
            }}
          >
            <Blog
              filteredBlogs={filteredBlogs}
              currentUser={currentUser}
              admin={admin}
            />
          </Box>
        )}
      </Box>
    </>
  );
}
