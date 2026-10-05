import { useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const ReportDonation = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    foodName: "",
    foodCategory: "",
    quantity: "",
    unit: "kg",
    description: "",
    preparedAt: "",
    bestBefore: "",
    pickupAddress: "",
    pickupCity: "",
    pickupStart: "",
    pickupEnd: "",
    safetyConfirmed: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login first.");
      navigate("/login");
      return;
    }

    if (!formData.safetyConfirmed) {
      setError(
        "Please confirm that the food is safe for donation."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/donations`,
        {
          ...formData,
          quantity: Number(formData.quantity),
          preparedAt: new Date(
            formData.preparedAt
          ).toISOString(),
          bestBefore: new Date(
            formData.bestBefore
          ).toISOString(),
          pickupStart: new Date(
            formData.pickupStart
          ).toISOString(),
          pickupEnd: new Date(
            formData.pickupEnd
          ).toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setMessage("Donation reported successfully! 🎉");

        setTimeout(() => {
          navigate("/donor-dashboard");
        }, 1500);
      }
    } catch (err) {
      console.error("Donation Error:", err);

      setError(
        err.response?.data?.message ||
          "Something went wrong while reporting donation."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f1f8f3",
        py: 5,
        px: 2,
      }}
    >
      <Box maxWidth="900px" mx="auto">
        <Card
          elevation={4}
          sx={{
            borderRadius: 3,
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="#1b5e20"
              gutterBottom
            >
              🍱 Report Surplus Food
            </Typography>

            <Typography
              color="text.secondary"
              mb={4}
            >
              Tell us about the surplus food so we can
              connect it with an organization for pickup
              and distribution.
            </Typography>

            {message && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {message}
              </Alert>
            )}

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                color="#2e7d32"
                mb={2}
              >
                Food Details
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Food Name"
                    name="foodName"
                    value={formData.foodName}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Vegetable Biryani"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    select
                    fullWidth
                    label="Food Category"
                    name="foodCategory"
                    value={formData.foodCategory}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="Cooked Food">
                      Cooked Food
                    </MenuItem>

                    <MenuItem value="Packaged Food">
                      Packaged Food
                    </MenuItem>

                    <MenuItem value="Fruits">
                      Fruits
                    </MenuItem>

                    <MenuItem value="Vegetables">
                      Vegetables
                    </MenuItem>

                    <MenuItem value="Bakery">
                      Bakery
                    </MenuItem>

                    <MenuItem value="Other">
                      Other
                    </MenuItem>
                  </TextField>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    inputProps={{ min: 1 }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    select
                    fullWidth
                    label="Unit"
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="kg">
                      Kilograms (kg)
                    </MenuItem>

                    <MenuItem value="servings">
                      Servings
                    </MenuItem>
                  </TextField>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the food, packing condition, etc."
                  />
                </Grid>
              </Grid>

              <Typography
                variant="h6"
                fontWeight="bold"
                color="#2e7d32"
                mt={4}
                mb={2}
              >
                Food Timing
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="datetime-local"
                    label="Prepared At"
                    name="preparedAt"
                    value={formData.preparedAt}
                    onChange={handleChange}
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="datetime-local"
                    label="Best Before"
                    name="bestBefore"
                    value={formData.bestBefore}
                    onChange={handleChange}
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>

              <Typography
                variant="h6"
                fontWeight="bold"
                color="#2e7d32"
                mt={4}
                mb={2}
              >
                Pickup Details
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Pickup Address"
                    name="pickupAddress"
                    value={formData.pickupAddress}
                    onChange={handleChange}
                    required
                    placeholder="Enter complete pickup address"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="City"
                    name="pickupCity"
                    value={formData.pickupCity}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Indore"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="datetime-local"
                    label="Pickup Start"
                    name="pickupStart"
                    value={formData.pickupStart}
                    onChange={handleChange}
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="datetime-local"
                    label="Pickup End"
                    name="pickupEnd"
                    value={formData.pickupEnd}
                    onChange={handleChange}
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>

              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  backgroundColor: "#e8f5e9",
                  borderRadius: 2,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      name="safetyConfirmed"
                      checked={formData.safetyConfirmed}
                      onChange={handleChange}
                      color="success"
                    />
                  }
                  label="I confirm that this food is safe and suitable for donation."
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mt: 4,
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },
                }}
              >
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() =>
                    navigate("/donor-dashboard")
                  }
                  sx={{
                    borderColor: "#2e7d32",
                    color: "#2e7d32",
                  }}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    backgroundColor: "#2e7d32",
                    "&:hover": {
                      backgroundColor: "#1b5e20",
                    },
                  }}
                >
                  {loading
                    ? "Submitting..."
                    : "Report Donation 🍱"}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ReportDonation;