import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { getUsers } from "../../lib/pocketbase";
import { useTheme } from "@mui/material";
import { getDateOfBirth, getTimeStamp, getTableAvatarUrl } from "../../data/utils";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [user, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    setLoading(true);
    getUsers().then((res) => {
      setUsers(res);
      setLoading(false);
    });
  }, []);
  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      renderCell: ({ row: { avatar, id } }) => {
        return (
          <Box display="flex" justifyContent="center" marginTop="5px">
            <img
              alt="profile-user"
              width="25px"
              height="25px"
              src={getTableAvatarUrl(id, avatar)}
              style={{ cursor: "pointer", borderRadius: "50%" }}
            />
          </Box>
        );
      },
    },
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
      field: "dob",
      headerName: "Date of Birth",
      headerAlign: "left",
      align: "left",
      renderCell: ({ row: { dob } }) => {
        const date = dob ? getDateOfBirth(dob) : `-`;
        return <div title={date || `-`}>{date || `-`}</div>;
      },
    },
    {
      field: "onboarded",
      headerName: "Onboarded",
      renderCell: ({ row: { onboarded } }) => {
        const date = onboarded ? getDateOfBirth(onboarded) : `-`;
        return <div title={date || `-`}>{date || `-`}</div>;
      },
    },
    {
      field: "contact",
      headerName: "Phone Number",
      renderCell: ({ row: { contact } }) => {
        return <div title={contact || `-`}>{contact || `-`}</div>;
      },
    },
    {
      field: "address",
      headerName: "Address",
      renderCell: ({ row: { address } }) => {
        return <div title={address || `-`}>{address || `-`}</div>;
      },
    },
    {
      field: "city",
      headerName: "City",
      renderCell: ({ row: { city } }) => {
        return <div title={city || `-`}>{city || `-`}</div>;
      },
    },
    {
      field: "zipCode",
      headerName: "Zip Code",
      renderCell: ({ row: { zipcode } }) => {
        return <div title={zipcode || `-`}>{zipcode || `-`}</div>;
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
  ];
  return (
    <Box m="20px">
      <Header title="Team" subtitle="List of Employees and their details" />
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
              rows={user}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Team;
