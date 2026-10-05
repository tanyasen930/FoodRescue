import React, { useState } from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData
      );

      const { token, accountType } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("accountType", accountType);

      if (accountType === "donor") {
        navigate("/donor-dashboard");
      } else if (accountType === "organization") {
        navigate("/organization-dashboard");
      } else if (accountType === "pickup") {
        navigate("/pickup-dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 70px)",
        backgroundColor: "#f1f8f3",
        display: "flex",
        alignItems: "center",
        py: 5,
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: "0 10px 35px rgba(0,0,0,0.10)",
          }}
        >
          <CardContent
            sx={{
              p: { xs: 3, sm: 5 },
            }}
          >
            <Box textAlign="center" sx={{ mb: 4 }}>
              <Typography sx={{ fontSize: "3rem" }}>
                🌱
              </Typography>

              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ color: "#1b5e20" }}
              >
                Welcome Back
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                Login to continue your FoodRescue journey.
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit}
            >
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: "bold",
                  backgroundColor: "#2e7d32",
                  "&:hover": {
                    backgroundColor: "#1b5e20",
                  },
                }}
              >
                {loading
                  ? "Logging in..."
                  : "Login 🔐"}
              </Button>
            </Box>

            <Typography
              textAlign="center"
              color="text.secondary"
              sx={{ mt: 3 }}
            >
              Don't have an account?{" "}
              <Typography
                component={Link}
                to="/register"
                sx={{
                  color: "#2e7d32",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Register
              </Typography>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;