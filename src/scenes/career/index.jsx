import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { getJobList } from "../../lib/pocketbase";
import RolesCard from "../../components/RolesCard";

const Careers = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getJobList().then((res) => {
      setPositions(res);
      setLoading(false);
    });
  }, []);

  return (
    <Box m="0 20px auto 20px" display="flex" position="relative" top="20%">
      {loading ? (
        <>Loading...</>
      ) : (
        <RolesCard positions={positions} admin={false} />
      )}
    </Box>
  );
};

export default Careers;
