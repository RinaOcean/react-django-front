import { useContext } from "react";
import AuthContext from "../../contex/AuthContex";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Stack } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";


const LoginPage = () => {
    const { loginUser } = useContext(AuthContext);   

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
                onSubmit={formik.handleSubmit}
                sx={{
                    margin: "0 auto",
                    mt: 5,
                    width: 500,
                    maxWidth: "100%",
                }}
                noValidate
                autoComplete="off"
            >
                <Stack spacing={2} direction="column">
                    <h1>Login </h1>
                    <hr />
                    <Stack spacing={2} direction="column" alignItems="çenter">
                        <TextField
                            fullWidth
                            required
                            id="username"
                            label="User Name"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.username &&
                                Boolean(formik.errors.username)
                            }
                            helperText={
                                formik.touched.username &&
                                formik.errors.username
                            }
                            size="small"
                        />
                        <TextField
                            required
                            fullWidth
                            type="password"
                            id="password"
                            label="User Password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.password &&
                                Boolean(formik.errors.password)
                            }
                            helperText={
                                formik.touched.password &&
                                formik.errors.password
                            }
                            size="small"
                        />
                    </Stack>
                    <Button type="submit" variant="outlined">
                        Login
                    </Button>
                </Stack>
            </Box>
        </section>
    );
};

export default LoginPage;
