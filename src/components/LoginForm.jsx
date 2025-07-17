import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Box,
  Alert,
  Link,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true); 
    setErrorMessage("");
    try {
      const response = await fetch("https://hire-onboardbackend-production.up.railway.app/user/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);

        const userDetailsResponse = await fetch("https://hire-onboardbackend-production.up.railway.app/user/details/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        });

        const userDetailsData = await userDetailsResponse.json();

        if (userDetailsResponse.ok) {
          localStorage.setItem("user_name", userDetailsData.username);
          localStorage.setItem("user_email", userDetailsData.email);
          navigate("/dashboard");
        } else {
          setErrorMessage("Failed to fetch user details.");
        }
      } else {
        if (data.error?.toLowerCase().includes("invalid email or password")) {
          setErrorMessage("Email or password is incorrect.");
        } else {
          setErrorMessage(data.error || "Login failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
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
        elevation={6}
        sx={{
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          padding: 4,
          borderRadius: 3,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Box textAlign="center" mb={2}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/295/295128.png"
            alt="App Logo"
            style={{ width: 60, height: 60, marginLeft: 120 }}
          />
          <Typography variant="h5" fontWeight="bold" mt={1}>
            HR Admin Portal
          </Typography>
        </Box>

        {/* Welcome Text */}
        <Typography variant="subtitle1" align="center" color="textSecondary" mb={3}>
          Please login to access your dashboard
        </Typography>

        {/* Error Message */}
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        {/* Formik Form */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Grid container spacing={2} direction="column">
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    fullWidth
                    variant="outlined"
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    InputLabelProps={{ shrink: true }}
                  />
                  <Box textAlign="right" mt={1}>
                    <Link href="/forgot-password" variant="body2" underline="hover" color="primary">
                      Forgot Password?
                    </Link>
                  </Box>
                </Grid>

                {isLoading ? (
                  <Grid item xs={12} textAlign="center">
                    <CircularProgress size={50} color="primary" />
                    <Typography variant="body1" color="primary" mt={2}>
                      Logging in, please wait...
                    </Typography>
                  </Grid>
                ) : (
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="large"
                      sx={{ borderRadius: 2, padding: "10px 20px", textTransform: "none" }}
                    >
                      Login
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Form>
          )}
        </Formik>

        {/* Sign up + Support */}
        <Box mt={3} textAlign="center">
          <Typography variant="body2">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </Typography>
        </Box>

        <Box mt={2} textAlign="center">
          <Typography variant="caption" color="textSecondary">
            Trouble logging in?{" "}
            <a href="/support" className="text-blue-600 hover:underline">
              Contact Support
            </a>
          </Typography>
        </Box>
      </Paper>
    </div>
  );
};

export default LoginForm;
