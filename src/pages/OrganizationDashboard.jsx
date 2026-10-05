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

const OrganizationDashboard = () => {
  const navigate = useNavigate();

  const [availableDonations, setAvailableDonations] = useState([]);
  const [acceptedDonations, setAcceptedDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      const [availableRes, acceptedRes] = await Promise.all([
        axios.get(
          `${API_URL}/organizations/donations`,
          config
        ),
        axios.get(
          `${API_URL}/organizations/my-donations`,
          config
        ),
      ]);

      setAvailableDonations(
        availableRes.data.donations || []
      );

      setAcceptedDonations(
        acceptedRes.data.donations || []
      );
    } catch (error) {
      console.error("Organization Dashboard Error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setMessage(
          error.response?.data?.message ||
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

    fetchData();
  }, []);

  const acceptDonation = async (id) => {
    try {
      setActionLoading(id);
      setMessage("");

      const response = await axios.put(
        `${API_URL}/organizations/donations/${id}/accept`,
        {},
        config
      );

      setMessage(response.data.message);

      await fetchData();
    } catch (error) {
      console.error("Accept Donation Error:", error);

      setMessage(
        error.response?.data?.message ||
          "Unable to accept donation"
      );
    } finally {
      setActionLoading("");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "info";
      case "pickup_assigned":
        return "secondary";
      case "picked_up":
        return "primary";
      case "delivered":
        return "success";
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
          word.charAt(0).toUpperCase() + word.slice(1)
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

  const activeCount = acceptedDonations.filter(
    (item) => item.status !== "delivered"
  ).length;

  const deliveredCount = acceptedDonations.filter(
    (item) => item.status === "delivered"
  ).length;

  const totalAcceptedFood = acceptedDonations.reduce(
    (total, item) => {
      if (item.unit === "kg") {
        return total + Number(item.quantity || 0);
      }

      return total;
    },
    0
  );

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
              Organization Dashboard 🏢
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Find and manage available food donations
            </Typography>
          </Box>

          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              onClick={fetchData}
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

        {/* Message */}
        {message && (
          <Alert
            severity={
              message.toLowerCase().includes("unable")
                ? "error"
                : "success"
            }
            sx={{ mb: 3 }}
            onClose={() => setMessage("")}
          >
            {message}
          </Alert>
        )}

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
                  Available Donations
                </Typography>

                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{
                    color: "#1b5e20",
                    mt: 1,
                  }}
                >
                  {availableDonations.length}
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
                  Accepted
                </Typography>

                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{
                    color: "#0288d1",
                    mt: 1,
                  }}
                >
                  {acceptedDonations.length}
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
                  Active Pickups
                </Typography>

                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{
                    color: "#ed6c02",
                    mt: 1,
                  }}
                >
                  {activeCount}
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
                  {deliveredCount}
                </Typography>

                <Typography color="text.secondary">
                  {totalAcceptedFood} kg accepted
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Available Donations */}
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            color: "#1b5e20",
            mb: 2,
          }}
        >
          Available Food Donations 🍱
        </Typography>

        {availableDonations.length === 0 ? (
          <Card
            sx={{
              borderRadius: 3,
              mb: 5,
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                py: 6,
              }}
            >
              <Typography sx={{ fontSize: "3rem" }}>
                🍃
              </Typography>

              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ mt: 1 }}
              >
                No donations available
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                New suitable food donations will appear
                here.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Grid container spacing={3} sx={{ mb: 5 }}>
            {availableDonations.map((donation) => (
              <Grid
                size={{ xs: 12, md: 6 }}
                key={donation._id}
              >
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    boxShadow: 2,
                    transition: "0.2s",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardContent>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
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
                          {donation.foodCategory}
                        </Typography>
                      </Box>

                      <Chip
                        label="Available"
                        color="success"
                        size="small"
                      />
                    </Stack>

                    <Divider sx={{ my: 2 }} />

                    <Grid container spacing={1.5}>
                      <Grid size={{ xs: 6 }}>
                        <Typography variant="body2">
                          <strong>Quantity</strong>
                        </Typography>

                        <Typography color="text.secondary">
                          {donation.quantity}{" "}
                          {donation.unit}
                        </Typography>
                      </Grid>

                      <Grid size={{ xs: 6 }}>
                        <Typography variant="body2">
                          <strong>City</strong>
                        </Typography>

                        <Typography color="text.secondary">
                          {donation.pickupCity}
                        </Typography>
                      </Grid>

                      <Grid size={{ xs: 12 }}>
                        <Typography variant="body2">
                          <strong>Pickup Address</strong>
                        </Typography>

                        <Typography color="text.secondary">
                          {donation.pickupAddress}
                        </Typography>
                      </Grid>

                      <Grid size={{ xs: 12 }}>
                        <Typography variant="body2">
                          <strong>Best Before</strong>
                        </Typography>

                        <Typography color="text.secondary">
                          {formatDate(
                            donation.bestBefore
                          )}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 2 }} />

                    <Typography fontWeight="bold">
                      Donor
                    </Typography>

                    <Typography
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      {donation.donor?.fullName || "N/A"}
                    </Typography>

                    <Typography
                      color="text.secondary"
                    >
                      📞{" "}
                      {donation.donor?.phone || "N/A"}
                    </Typography>

                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 3,
                        backgroundColor: "#2e7d32",
                        py: 1.2,
                        fontWeight: "bold",
                        "&:hover": {
                          backgroundColor: "#1b5e20",
                        },
                      }}
                      onClick={() =>
                        acceptDonation(donation._id)
                      }
                      disabled={
                        actionLoading === donation._id
                      }
                    >
                      {actionLoading === donation._id
                        ? "Accepting..."
                        : "Accept Donation ❤️"}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* My Accepted Donations */}
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            color: "#1b5e20",
            mb: 2,
          }}
        >
          My Accepted Donations 📦
        </Typography>

        {acceptedDonations.length === 0 ? (
          <Card sx={{ borderRadius: 3 }}>
            <CardContent
              sx={{
                textAlign: "center",
                py: 5,
              }}
            >
              <Typography color="text.secondary">
                You haven't accepted any donations yet.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {acceptedDonations.map((donation) => (
              <Grid
                size={{ xs: 12, md: 6 }}
                key={donation._id}
              >
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    boxShadow: 2,
                  }}
                >
                  <CardContent>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      gap={2}
                    >
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                      >
                        {donation.foodName}
                      </Typography>

                      <Chip
                        label={formatStatus(
                          donation.status
                        )}
                        color={getStatusColor(
                          donation.status
                        )}
                        size="small"
                      />
                    </Stack>

                    <Divider sx={{ my: 2 }} />

                    <Typography>
                      <strong>Quantity:</strong>{" "}
                      {donation.quantity}{" "}
                      {donation.unit}
                    </Typography>

                    <Typography>
                      <strong>Category:</strong>{" "}
                      {donation.foodCategory}
                    </Typography>

                    <Typography>
                      <strong>City:</strong>{" "}
                      {donation.pickupCity}
                    </Typography>

                    <Typography sx={{ mt: 1 }}>
                      <strong>Donor:</strong>{" "}
                      {donation.donor?.fullName || "N/A"}
                    </Typography>

                    <Typography>
                      <strong>Phone:</strong>{" "}
                      {donation.donor?.phone || "N/A"}
                    </Typography>

                    {donation.status === "delivered" && (
                      <Alert
                        severity="success"
                        sx={{ mt: 2 }}
                      >
                        Food successfully delivered. ❤️
                      </Alert>
                    )}

                    {donation.status ===
                      "pickup_assigned" && (
                      <Alert
                        severity="info"
                        sx={{ mt: 2 }}
                      >
                        Pickup partner has been assigned.
                      </Alert>
                    )}

                    {donation.status === "picked_up" && (
                      <Alert
                        severity="warning"
                        sx={{ mt: 2 }}
                      >
                        Food has been picked up and is on
                        the way.
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default OrganizationDashboard;