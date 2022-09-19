import { Box } from "@mui/system";
import LoginButton from "../../elements/LoginButton";

const RestrictedAccessPage = () => {

    return (
        <Box>
            <h1>Sorry, you have no permission to access this page</h1>
            <span>Please, try to log in as a different user</span>
            <LoginButton variant="contained" size="small" href="/login">
                Login
            </LoginButton>
        </Box>
    );
}

export default RestrictedAccessPage;