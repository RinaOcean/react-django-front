import { blue } from "@material-ui/core/colors";
import { Button, styled } from "@mui/material";

const LoginButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
        "&:hover": {
            backgroundColor: blue[700],
        },
    }));

export default LoginButton;