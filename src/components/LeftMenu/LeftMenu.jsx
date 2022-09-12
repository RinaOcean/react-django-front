import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import UploadIcon from "@mui/icons-material/Upload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import AuthContext from "../../contex/AuthContex";
import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import { NavLink } from 'react-router-dom';

const MyNavLink = React.forwardRef((props, ref) => (
  <NavLink
    ref={ref}
    to={props.to}
    className={({ isActive }) => `${props.className} ${isActive ? props.activeClassName : ''}`}
  >
    {props.children}
  </NavLink>
));

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        activeLink: {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
            color: "#000000",
            borderRadius: 8,
            "& .MuiSvgIcon-root": {
                fill: "#006bb6",
            },
        },
    })
);

const LeftMenu = () => {
    const { user } = React.useContext(AuthContext);
     const classes = useStyles();
    return (
        <>
            {user ? (
                <Box sx={{ width: "30%", maxWidth: "400px" }}>
                    <nav aria-label="main mailbox folders">
                        <List>
                            <ListItem
                                disablePadding
                                component={MyNavLink}
                                sx={{
                                    color: "#8C8C8C",
                                }}
                                to={"/file-upload"}
                                activeClassName={classes.activeLink}
                            >
                                <ListItemButton >
                                    <ListItemIcon>
                                        <UploadIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Upload File" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem
                                disablePadding
                                component={MyNavLink}
                                sx={{
                                    color: "#8C8C8C",
                                }}
                                to={"/sftp-connection"}
                                activeClassName={classes.activeLink}
                            >
                                <ListItemButton >
                                    <ListItemIcon>
                                        <FileDownloadIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Download File" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </nav>
                </Box>
            ) : null}
        </>
    );
}

export default LeftMenu;