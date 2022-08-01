import { useContext } from "react";
import AuthContext from "../../contex/AuthContex";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Stack } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";


const LoginPage = () => {
    const { loginUser } = useContext(AuthContext);
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const username = e.target.username.value;
    //     const password = e.target.password.value;
    //     username.length > 0 && loginUser(username, password);
    // };

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: username,
            password: password,
        },
        onSubmit: (values) => {
            loginUser(values.username, values.password);
        }
    });

    return (
        <section>
            <Box
                component="form"
                sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
            >
                <Stack spacing={2} direction="column">
                    <h1>Login </h1>
                    <hr />
                    <Stack spacing={2} direction="column">
                        <TextField
                            required
                            id="username"
                            label="User Name"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                            size="small"
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="User Password"
                            size="small"
                        />
                    </Stack>
                    <Button
                        type="submit"
                        variant="outlined"
                    >
                        Login
                    </Button>
                </Stack>
            </Box>
            {/* <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="Enter Username" />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter Password"
                />
                <button type="submit">Login</button>
            </form> */}
        </section>
    );
};

export default LoginPage;
