import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import {
  getCareerSubmissions,
  deleteCareerSubmission,
  getCurrentUserData,
} from "../../lib/pocketbase";
import { useTheme } from "@mui/material";
import { getTimeStamp } from "../../data/utils";

const CareerSubmissions = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [submissions, setSubmissions] = useState([]);
  const [collectionName, setCollectionName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCareerSubmissions().then((res) => {
      setSubmissions(res);
    });
    getCurrentUserData().then((res) => {
      setCollectionName(res?.collectionName);
      setLoading(false);
    });
  }, []);
  const handleDelete = (id) => {
    deleteCareerSubmission(id);
  };
  const columns = [
    {
      field: "name",
      headerName: "Name",
      cellClassName: "name-column--cell",
      renderCell: ({ row: { name } }) => {
        return <div title={name || `-`}>{name || `-`}</div>;
      },
    },
    {
      field: "email",
      headerName: "Email",
      renderCell: ({ row: { email } }) => {
        return <div title={email || `-`}>{email || `-`}</div>;
      },
    },
    {
      field: "role",
      headerName: "Role",
      cellClassName: "name-column--cell",
      renderCell: ({ row: { role } }) => {
        return <div title={role || `-`}>{role || `-`}</div>;
      },
    },
    {
      field: "phone",
      headerName: "phone",
      renderCell: ({ row: { phone } }) => {
        return <div title={phone || `-`}>{phone || `-`}</div>;
      },
    },
    {
      field: "resume",
      headerName: "Resume",
      renderCell: ({ row: { resume } }) => {
        return <div title={resume || `-`}>{resume || `-`}</div>;
      },
    },
    {
      field: "description",
      headerName: "Description",
      renderCell: ({ row: { description } }) => {
        return <div title={description || `-`}>{description || `-`}</div>;
      },
    },
    {
      field: "created",
      headerName: "Created",
      renderCell: ({ row: { created } }) => {
        const date = created ? getTimeStamp(created) : `-`;
        return <div title={date || `-`}>{date || `-`}</div>;
      },
    },
    {
      field: "updated",
      headerName: "Updated",
      renderCell: ({ row: { updated } }) => {
        const date = updated ? getTimeStamp(updated) : `-`;
        return <div title={date || `-`}>{date || `-`}</div>;
      },
    },
    ...(collectionName === "admin"
      ? [
          {
            field: "id",
            headerName: "Actions",
            renderCell: ({ id }) => {
              return (
                <Button
                  variant="contained"
                  onClick={() => handleDelete(id)}
                  size="small"
                  color="error"
                  sx={{ fontWeight: 600 }}
                >
                  Delete
                </Button>
              );
            },
          },
        ]
      : []),
  ];
  return (
    <Box m="20px">
      <Header
        title="Career Submissions"
        subtitle="List of career submissions and their details"
      />
      {loading ? (
        <>Loading...</>
      ) : (
        <>
          <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
                fontSize: "12px",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
                fontSize: "12px",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colors.grey[100]} !important`,
              },
            }}
          >
            <DataGrid
              rows={submissions}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default CareerSubmissions;
