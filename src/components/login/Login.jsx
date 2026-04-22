import React from "react";
import { Tooltip, TextField, Box, Alert, Paper, Stack, } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Form, Button } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import { validLogin } from "../../actions/login.js";
import "./Login.css";

const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
});

const SignInContainer = styled(Stack)(({ theme }) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

const Login = (props) => {
    let { loginFailed } = props;
    const initialValues = {
        username: "",
        password: "",
    };

    const submit = (data) => {
        const { username, password } = data;
        if (username && password) {
            props.dispatch(
                validLogin({ username, password })
            );
            if (!username || !password) {
                loginFailed = true;
            }
        };
    }

    return (
        //     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
        //         <Paper elevation={3} style={{ padding: '40px', borderRadius: '10px', width: '350px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        //             <div>
        //                 <Formik
        //                     initialValues={initialValues}
        //                     validationSchema={validationSchema}
        //                     onSubmit={(values, { resetForm }) => {
        //                         // Call the custom submit method
        //                         submit(values);
        //                         resetForm({ values: initialValues });
        //                     }}
        //                 >
        //                     {({ values, handleChange, handleBlur, errors, touched, handleSubmit }) => (
        //                         <Form onSubmit={handleSubmit}>
        //                             <h3 style={{ textAlign: "center", marginTop: '30px', marginBottom: '40px', fontFamily: 'garamond' }}>Patton Score Card</h3>
        //                             <p style={{ textAlign: "center" }}>
        //                                 <Tooltip title="Patton-Labs" placement="right">
        //                                     {/* Add your logo here */}
        //                                 </Tooltip>
        //                             </p>

        //                             {loginFailed === true && (
        //                                 <Alert severity="error" sx={{ mb: 2 }}>
        //                                     Invalid Username/Password
        //                                 </Alert>
        //                             )}

        //                             {/* <Form.Group className="mb-3" controlId="formUsername">
        //                             <Form.Label>Username</Form.Label>
        //                             <Form.Control
        //                                 type="text"
        //                                 placeholder="Enter username"
        //                                 name="username"
        //                                 value={values.username}
        //                                 onChange={handleChange}
        //                                 onBlur={handleBlur}
        //                                 isInvalid={touched.username && !!errors.username}
        //                                 required
        //                             >
        //                             </Form.Control>
        //                             <Form.Control.Feedback type="invalid">
        //                                 {errors.username}
        //                             </Form.Control.Feedback>
        //                         </Form.Group> */}

        //                             <Box sx={{ mb: 5 }}> {/* Use MUI Box for margin-bottom (mb: 3) instead of Form.Group className="mb-3" */}
        //                                 <TextField
        //                                     label="Username"
        //                                     variant="outlined"
        //                                     name="username"
        //                                     type="text" // Specify type as text
        //                                     value={values.username}
        //                                     onChange={handleChange}
        //                                     onBlur={handleBlur}
        //                                     error={touched.username && !!errors.username}
        //                                     helperText={touched.username && errors.username}
        //                                     required
        //                                     fullWidth
        //                                 />
        //                             </Box>

        //                             <Box sx={{ mb: 4 }}>
        //                                 <TextField
        //                                     label="Password"
        //                                     variant="outlined"
        //                                     name="password"
        //                                     type="password" // Specify type as password
        //                                     value={values.password}
        //                                     onChange={handleChange}
        //                                     onBlur={handleBlur}
        //                                     error={touched.password && !!errors.password}
        //                                     helperText={touched.password && errors.password}
        //                                     required
        //                                     fullWidth
        //                                 />
        //                             </Box>

        //                             {/* <Form.Group className="mb-3" controlId="formPassword">
        //                             <Form.Label>Password</Form.Label>
        //                             <Form.Control
        //                                 type="password"
        //                                 placeholder="Password"
        //                                 name="password"
        //                                 value={values.password}
        //                                 onChange={handleChange}
        //                                 onBlur={handleBlur}
        //                                 isInvalid={touched.password && !!errors.password}
        //                             />
        //                             <Form.Control.Feedback type="invalid">
        //                                 {errors.password}
        //                             </Form.Control.Feedback>
        //                         </Form.Group> */}

        //                             <Button variant="primary" type="submit">
        //                                 Login
        //                             </Button>
        //                         </Form>
        //                     )}
        //                 </Formik>
        //             </div>
        //         </Paper>
        //     </div>
        <div className="login-wrapper">
            <div className="login-card">
                <h1 className="login-title">Patton Labs</h1>

                <Formik initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={submit}>
                    {({ values, handleChange, handleBlur, errors, touched, handleSubmit, isSubmitting }) => (
                        <Form className="login-form" onSubmit={handleSubmit}>
                            {loginFailed === true && (
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    Invalid Username/Password
                                </Alert>
                            )}
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Field autoComplete="username" type="text" name="username" placeholder="your@email.com" value={values.username} onChange={handleChange} />
                                <ErrorMessage name="username" component="div" className="error" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field autoComplete="password" type="password" name="password" placeholder="••••••" value={values.password} onChange={handleChange} />
                                <ErrorMessage name="password" component="div" className="error" />
                            </div>

                            <button type="submit" className="btn" style={{ marginTop: '20px' }}>
                                Sign In
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        loginFailed: state.login.error,
    };
};

export default connect(mapStateToProps)(Login);