import { Box } from "@mui/system";
import { useContext } from "react";
import AuthContext from "../../contex/AuthContex";
import LoginButton from "../../elements/LoginButton";
import styles from "./RestrictedAccessPage.module.css";

const RestrictedAccessPage = () => {
    const { logoutUser } = useContext(AuthContext);
    return (
        <Box className={styles.wrapper}>
            <h1>Sorry, you have no permission to access this page</h1>
            <span>Please, try to log in as a different user</span>
            {/* <LoginButton
                sx={{marginTop: '20px'}}
                variant="contained"
                size="small"
                href="/login"
                onClick={logoutUser}
            >
                Login
            </LoginButton> */}
        </Box>
    );
}

export default RestrictedAccessPage;