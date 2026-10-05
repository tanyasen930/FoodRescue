import React, { useEffect, useState } from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

const DonorDashboard = () => {
  const navigate = useNavigate();

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchDonations = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${API_URL}/donations/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDonations(response.data.donations || []);
    } catch (err) {
      console.error("Donor Dashboard Error:", err);

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError(
          err.response?.data?.message ||
            "Unable to load donations"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchDonations();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accountType");
    navigate("/login");
  };

  const totalDonations = donations.length;

  const pendingDonations = donations.filter(
    (donation) =>
      donation.status === "pending" ||
      donation.status === "accepted" ||
      donation.status === "pickup_assigned" ||
      donation.status === "picked_up"
  ).length;

  const deliveredDonations = donations.filter(
    (donation) => donation.status === "delivered"
  ).length;

  const expiredDonations = donations.filter(
    (donation) => donation.status === "expired"
  ).length;

  const foodRescued = donations
    .filter(
      (donation) => donation.status === "delivered"
    )
    .reduce((total, donation) => {
      if (donation.unit === "kg") {
        return total + Number(donation.quantity || 0);
      }

      return total;
    }, 0);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "accepted":
        return "info";
      case "pickup_assigned":
        return "secondary";
      case "picked_up":
        return "primary";
      case "delivered":
        return "success";
      case "expired":
        return "error";
      case "cancelled":
        return "default";
      default:
        return "default";
    }
  };

  const formatStatus = (status) => {
    if (!status) return "Unknown";

    return status
      .split("_")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(" ");
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f1f8f3",
        py: { xs: 3, md: 5 },
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: {
              xs: "flex-start",
              sm: "center",
            },
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            gap: 2,
            mb: 4,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                color: "#1b5e20",
                fontSize: {
                  xs: "1.9rem",
                  md: "2.5rem",
                },
              }}
            >
              Donor Dashboard 🍱
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Manage your surplus food donations
            </Typography>
          </Box>

          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              onClick={fetchDonations}
              sx={{
                color: "#1b5e20",
                borderColor: "#2e7d32",
              }}
            >
              Refresh
            </Button>

            <Button
              variant="outlined"
              color="error"
              onClick={logout}
            >
              Logout
            </Button>
          </Stack>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Report Button */}
        <Card
          sx={{
            borderRadius: 3,
            mb: 4,
            background:
              "linear-gradient(135deg, #1b5e20, #2e7d32)",
            color: "white",
          }}
        >
          <CardContent
            sx={{
              p: { xs: 3, md: 4 },
            }}
          >
            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              justifyContent="space-between"
              alignItems={{
                xs: "flex-start",
                sm: "center",
              }}
              gap={2}
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                >
                  Have surplus food? 🍱
                </Typography>

                <Typography
                  sx={{
                    mt: 1,
                    opacity: 0.9,
                  }}
                >
                  Report it and help get it to someone
                  who needs it.
                </Typography>
              </Box>

              <Button
                variant="contained"
                onClick={() =>
                  navigate("/report-donation")
                }
                sx={{
                  backgroundColor: "white",
                  color: "#1b5e20",
                  fontWeight: "bold",
                  px: 3,
                  whiteSpace: "nowrap",
                  "&:hover": {
                    backgroundColor: "#e8f5e9",
                  },
                }}
              >
                + Report Food
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                borderRadius: 3,
                height: "100%",
                boxShadow: 2,
              }}
            >
              <CardContent>
                <Typography
                  color="text.secondary"
                  fontWeight="bold"
                >
                  Total Donations
                </Typography>

                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{
                    color: "#1b5e20",
                    mt: 1,
                  }}
                >
                  {totalDonations}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                borderRadius: 3,
                height: "100%",
                boxShadow: 2,
              }}
            >
              <CardContent>
                <Typography
                  color="text.secondary"
                  fontWeight="bold"
                >
                  Active Donations
                </Typography>

                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{
                    color: "#ed6c02",
                    mt: 1,
                  }}
                >
                  {pendingDonations}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                borderRadius: 3,
                height: "100%",
                boxShadow: 2,
              }}
            >
              <CardContent>
                <Typography
                  color="text.secondary"
                  fontWeight="bold"
                >
                  Delivered
                </Typography>

                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{
                    color: "#2e7d32",
                    mt: 1,
                  }}
                >
                  {deliveredDonations}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                borderRadius: 3,
                height: "100%",
                boxShadow: 2,
              }}
            >
              <CardContent>
                <Typography
                  color="text.secondary"
                  fontWeight="bold"
                >
                  Food Rescued
                </Typography>

                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{
                    color: "#1b5e20",
                    mt: 1,
                  }}
                >
                  {foodRescued}
                </Typography>

                <Typography color="text.secondary">
                  kg
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Donation History */}
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: 2,
          }}
        >
          <CardContent
            sx={{ p: { xs: 2, md: 3 } }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 3 }}
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ color: "#1b5e20" }}
                >
                  Donation History
                </Typography>

                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  Track the status of your food donations.
                </Typography>
              </Box>
            </Stack>

            {donations.length === 0 ? (
              <Box
                sx={{
                  textAlign: "center",
                  py: 6,
                }}
              >
                <Typography
                  sx={{ fontSize: "3rem" }}
                >
                  🍱
                </Typography>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ mt: 1 }}
                >
                  No donations yet
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Start by reporting your surplus food.
                </Typography>

                <Button
                  variant="contained"
                  sx={{
                    mt: 3,
                    backgroundColor: "#2e7d32",
                  }}
                  onClick={() =>
                    navigate("/report-donation")
                  }
                >
                  Report First Donation
                </Button>
              </Box>
            ) : (
              <Stack spacing={2}>
                {donations.map((donation) => (
                  <Card
                    key={donation._id}
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                      transition: "0.2s",
                      "&:hover": {
                        boxShadow: 2,
                      },
                    }}
                  >
                    <CardContent>
                      <Stack
                        direction={{
                          xs: "column",
                          sm: "row",
                        }}
                        justifyContent="space-between"
                        alignItems={{
                          xs: "flex-start",
                          sm: "center",
                        }}
                        gap={2}
                      >
                        <Box>
                          <Typography
                            variant="h6"
                            fontWeight="bold"
                          >
                            {donation.foodName}
                          </Typography>

                          <Typography
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                          >
                            {donation.foodCategory} •{" "}
                            {donation.quantity}{" "}
                            {donation.unit}
                          </Typography>
                        </Box>

                        <Chip
                          label={formatStatus(
                            donation.status
                          )}
                          color={getStatusColor(
                            donation.status
                          )}
                          sx={{ fontWeight: "bold" }}
                        />
                      </Stack>

                      <Divider sx={{ my: 2 }} />

                      <Grid container spacing={2}>
                        <Grid
                          size={{ xs: 12, sm: 6 }}
                        >
                          <Typography variant="body2">
                            <strong>
                              Pickup City:
                            </strong>{" "}
                            {donation.pickupCity}
                          </Typography>
                        </Grid>

                        <Grid
                          size={{ xs: 12, sm: 6 }}
                        >
                          <Typography variant="body2">
                            <strong>
                              Best Before:
                            </strong>{" "}
                            {formatDate(
                              donation.bestBefore
                            )}
                          </Typography>
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                          <Typography variant="body2">
                            <strong>Created:</strong>{" "}
                            {formatDate(
                              donation.createdAt
                            )}
                          </Typography>
                        </Grid>
                      </Grid>

                      {donation.status === "delivered" && (
                        <Alert
                          severity="success"
                          sx={{ mt: 2 }}
                        >
                          Your food donation was
                          successfully delivered. ❤️
                        </Alert>
                      )}

                      {donation.status === "expired" && (
                        <Alert
                          severity="error"
                          sx={{ mt: 2 }}
                        >
                          This donation has expired and
                          is no longer available.
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default DonorDashboard;