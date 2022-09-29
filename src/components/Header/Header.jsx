import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { blue } from "@mui/material/colors";
import AuthContext from "../../contex/AuthContex";

import styles from "./header.module.css";
import LoginButton from "../../elements/LoginButton";

const Header = () => {
    const { user, logoutUser } = useContext(AuthContext);
    // const LoginButton = styled(Button)(({ theme }) => ({
    //     color: theme.palette.getContrastText(blue[500]),
    //     backgroundColor: blue[500],
    //     "&:hover": {
    //         backgroundColor: blue[700],
    //     },
    // }));

    const RegButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(blue[500]),
        borderColor: blue[300],
        "&:hover": {
            backgroundColor: blue[700],
        },
    }));

    return (
        <nav className={styles.container}>
            <div className={styles.titleWrapper}>
                <h1 className={styles.title}>UCI</h1>
                <p className={styles.desc}>medical affiliates</p>
            </div>

            {user ? (
                <Stack spacing={2} direction="row">
                    <span>{user.username}</span>
                    <LoginButton
                        variant="contained"
                        size="small"
                        href="/login"
                        onClick={logoutUser}
                    >
                        Logout
                    </LoginButton>
                </Stack>
            ) : (                    
                <Stack spacing={2} direction="row">
                    <LoginButton variant="contained" size="small" href="/login">
                        Login
                    </LoginButton>
                    {/* <RegButton variant="outlined" size="small" href="/register">
                        Register
                    </RegButton> */}
                </Stack>
            )}
        </nav>
    );
};

export default Header;
