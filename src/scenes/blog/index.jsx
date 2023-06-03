import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { getBlogs, getUsers } from "../../lib/pocketbase";
import Blog from "../../components/Card";

const AllBlogs = () => {
  const [blog, setBlogs] = useState([]);
  const [user, setUsers] = useState([]);

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

  return (
    <Box m="20px" display="flex" justifyContent="center" position="relative" top="10%">
      {loading ? (
        <>Loading...</>
      ) : (
        <Blog filteredBlogs={blog} currentUser={user} admin={false} />
      )}
    </Box>
  );
};

export default AllBlogs;
