import { useLocation, Link } from "react-router-dom";
import { Box, IconButton, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";
import { MenuItem } from "react-pro-sidebar";
// import { useContext } from "react";
// import { ColorModeContext } from "../../theme";
// import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { isUserValid } from "../../lib/pocketbase";
import { logout } from "../../lib/pocketbase";

const Topbar = () => {
  // const theme = useTheme();
  // const colorMode = useContext(ColorModeContext);
  const location = useLocation();

  const Item = ({ title, icon }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <MenuItem
        style={{
          color: colors.grey[100],
        }}
        icon={icon}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    );
  };
  return (
    <>
      <Box display="flex" justifyContent="space-between" p={2}>
        <Box
          display="flex"
          justifyContent="space-between"
          ml="15px"
          alignItems="center"
        >
          <a href="/profile">
            <img
              alt="Evoltech-logo"
              width="120px"
              height="20px"
              src={`../../assets/evoltech-logo.png`}
              style={{ display: "flex" }}
            />
          </a>
        </Box>

        {/* ICONS */}
        <Box display="flex" justifyContent="center">
          {/* <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <Item title="Dark" icon={<DarkModeOutlinedIcon />} />
            ) : (
              <Item title="Light" icon={<LightModeOutlinedIcon />} />
            )}
          </IconButton> */}
          {isUserValid ? (
            <IconButton onClick={() => logout()}>
              <Item title="Logout" icon={<LogoutIcon />} />
            </IconButton>
          ) : (
            <IconButton>
              {location.pathname === "/signup" ? (
                <Link to="/login">
                  <Item title="Login" icon={<LoginIcon />} />
                </Link>
              ) : (
                <Link to="/signup">
                  <Item title="Signup" icon={<LoginIcon />} />
                </Link>
              )}
            </IconButton>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Topbar;
