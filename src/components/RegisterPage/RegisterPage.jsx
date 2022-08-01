import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Stack } from "@mui/material";
import { useFormik } from "formik";
import AuthContext from "../../contex/AuthContex";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const { registerUser } = useContext(AuthContext);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     registerUser(username, password, password2);
    // };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: username,
            password: password,
            password2: password2,
        },
        onSubmit: (values) => {
            registerUser(values.username, values.password, values.password2);
        },
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
                    <h1>Register</h1>
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
                        <TextField
                            required
                            fullWidth
                            type="password"
                            id="password2"
                            label="Confirm Password"
                            name="password2"
                            value={formik.values.password2}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.password2 &&
                                Boolean(formik.errors.password2)
                            }
                            helperText={
                                formik.touched.password &&
                                formik.errors.password2
                            }
                            size="small"
                        />
                    </Stack>
                    <Button type="submit" variant="outlined">
                        Register
                    </Button>
                </Stack>
            </Box>
        </section>
        // <section>
        //     <form onSubmit={handleSubmit}>
        //         <h1>Register</h1>
        //         <hr />
        //         <div>
        //             <label htmlFor="username">Username</label>
        //             <input
        //                 type="text"
        //                 id="username"
        //                 onChange={(e) => setUsername(e.target.value)}
        //                 placeholder="Username"
        //                 required
        //             />
        //         </div>
        //         <div>
        //             <label htmlFor="password">Password</label>
        //             <input
        //                 type="password"
        //                 id="password"
        //                 onChange={(e) => setPassword(e.target.value)}
        //                 placeholder="Password"
        //                 required
        //             />
        //         </div>
        //         <div>
        //             <label htmlFor="confirm-password">Confirm Password</label>
        //             <input
        //                 type="password"
        //                 id="confirm-password"
        //                 onChange={(e) => setPassword2(e.target.value)}
        //                 placeholder="Confirm Password"
        //                 required
        //             />

        // </div>
        //     <button>Register</button>
        // </form>
        // </section>
    );
}

export default Register;
