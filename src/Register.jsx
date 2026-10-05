import React, { useState } from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    accountType: "donor",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.password
    ) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        formData
      );

      setMessage(
        response.data.message || "Registration successful!"
      );

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
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
                🍱
              </Typography>

              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ color: "#1b5e20" }}
              >
                Create Account
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                Join FoodRescue and help reduce food waste.
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {message && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {message}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit}
            >
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                margin="normal"
                required
              />

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
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                margin="normal"
                required
              />

              <TextField
                fullWidth
                select
                label="Account Type"
                name="accountType"
                value={formData.accountType}
                onChange={handleChange}
                margin="normal"
                required
              >
                <MenuItem value="donor">
                  🍱 Food Donor
                </MenuItem>

                <MenuItem value="organization">
                  🏢 Organization / NGO
                </MenuItem>

                <MenuItem value="pickup">
                  🚚 Pickup Partner
                </MenuItem>
              </TextField>

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
                  ? "Creating Account..."
                  : "Create Account 🚀"}
              </Button>
            </Box>

            <Typography
              textAlign="center"
              color="text.secondary"
              sx={{ mt: 3 }}
            >
              Already have an account?{" "}
              <Typography
                component={Link}
                to="/login"
                sx={{
                  color: "#2e7d32",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Login
              </Typography>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Register;