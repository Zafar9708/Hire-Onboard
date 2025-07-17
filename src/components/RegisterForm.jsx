import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  CircularProgress,
  Box,
  Alert,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // 👈 To show error for duplicate
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("https://hire-onboardbackend-production.up.railway.app/user/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } else {
        const errorMsg = data?.error?.toLowerCase() || "";

        if (errorMsg.includes("email already in use")) {
          setErrorMessage("UserName or Email already exists.");
        } else if (errorMsg.includes("username already in use")) {
          setErrorMessage("Username is already taken.");
        } else if (errorMsg.includes("email or username already exists")) {
          setErrorMessage("Username or Email already exists.");
        } else if (errorMsg.includes("passwords must match")) {
          setErrorMessage("Passwords do not match.");
        } else {
          setErrorMessage("Registration failed. Please try again.");
        }

        setIsLoading(false);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(to right, #e0eafc, #cfdef3)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          backgroundColor: "#fff",
          padding: 4,
          borderRadius: 3,
          width: "100%",
          maxWidth: 420,
        }}
      >
        {/* Logo and Branding */}
        <Box textAlign="center" mb={3}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/190/190411.png" // Updated logo (user icon for registration)
            alt="Register Logo"
            style={{ width: 60, height: 60,marginLeft:128, marginBottom:20 }}
          />
          <Typography variant="h5" fontWeight="600" mt={1}>
            Create Your Account
          </Typography>
        </Box>

        {/* Subtext */}
        <Typography variant="subtitle2" align="center" color="textSecondary" mb={2}>
          Sign up to access the Admin Panel and manage users
        </Typography>

        {/* Success/Loading Message */}
        {isSuccess ? (
          <Box textAlign="center" mb={4}>
            <Typography variant="h6" color="green" className="mb-4">
              User created successfully! Please wait for login...
            </Typography>
            <CircularProgress size={50} />
          </Box>
        ) : (
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirm_password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Grid container spacing={2}>
                  {/* Show error alert if exists */}
                  {errorMessage && (
                    <Grid item xs={12} className="w-full">
                      <Alert severity="error">{errorMessage}</Alert>
                    </Grid>
                  )}

                  <Grid item xs={12} className="w-full">
                    <Field
                      as={TextField}
                      name="username"
                      label="Username"
                      fullWidth
                      variant="outlined"
                      error={touched.username && Boolean(errors.username)}
                      helperText={touched.username && errors.username}
                      className="mb-4"
                    />
                  </Grid>

                  <Grid item xs={12} className="w-full">
                    <Field
                      as={TextField}
                      name="email"
                      label="Email"
                      fullWidth
                      variant="outlined"
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      className="mb-4"
                    />
                  </Grid>

                  <Grid item xs={12} className="w-full">
                    <Field
                      as={TextField}
                      name="password"
                      label="Password"
                      type="password"
                      fullWidth
                      variant="outlined"
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      className="mb-4"
                    />
                  </Grid>

                  <Grid item xs={12} className="w-full">
                    <Field
                      as={TextField}
                      name="confirm_password"
                      label="Confirm Password"
                      type="password"
                      fullWidth
                      variant="outlined"
                      error={
                        touched.confirm_password &&
                        Boolean(errors.confirm_password)
                      }
                      helperText={
                        touched.confirm_password && errors.confirm_password
                      }
                      className="mb-4"
                    />
                  </Grid>

                  <Grid item xs={12} className="w-full">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="large"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Register"
                      )}
                    </Button>
                  </Grid>

                  <Grid item xs={12} className="w-full">
                    <Typography variant="body2" align="center">
                      Already have an account?{" "}
                      <Link href="/login" underline="hover" color="primary">
                        Login here
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        )}
      </Paper>
    </div>
  );
};

export default RegisterForm;
