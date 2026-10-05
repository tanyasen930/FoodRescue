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

const PickupDashboard = () => {
  const navigate = useNavigate();

  const [availablePickups, setAvailablePickups] = useState([]);
  const [myPickups, setMyPickups] = useState([]);
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

      const [availableRes, myRes] = await Promise.all([
        axios.get(`${API_URL}/pickups/donations`, config),
        axios.get(`${API_URL}/pickups/my-pickups`, config),
      ]);

      setAvailablePickups(availableRes.data.donations || []);
      setMyPickups(myRes.data.donations || []);
    } catch (error) {
      console.error("Pickup Dashboard Error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setMessage(
          error.response?.data?.message ||
            "Unable to load pickup data"
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

  const acceptPickup = async (id) => {
    try {
      setActionLoading(id);
      setMessage("");

      const response = await axios.put(
        `${API_URL}/pickups/donations/${id}/accept`,
        {},
        config
      );

      setMessage(response.data.message);
      await fetchData();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Unable to accept pickup"
      );
    } finally {
      setActionLoading("");
    }
  };

  const markPickedUp = async (id) => {
    try {
      setActionLoading(id);
      setMessage("");

      const response = await axios.put(
        `${API_URL}/pickups/donations/${id}/picked-up`,
        {},
        config
      );

      setMessage(response.data.message);
      await fetchData();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Unable to update pickup status"
      );
    } finally {
      setActionLoading("");
    }
  };

  const markDelivered = async (id) => {
    try {
      setActionLoading(id);
      setMessage("");

      const response = await axios.put(
        `${API_URL}/pickups/donations/${id}/delivered`,
        {},
        config
      );

      setMessage(response.data.message);
      await fetchData();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Unable to mark delivery"
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
        return "warning";
      case "pickup_assigned":
        return "info";
      case "picked_up":
        return "secondary";
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

  const assignedCount = myPickups.filter(
    (item) => item.status === "pickup_assigned"
  ).length;

  const pickedUpCount = myPickups.filter(
    (item) => item.status === "picked_up"
  ).length;

  const deliveredCount = myPickups.filter(
    (item) => item.status === "delivered"
  ).length;

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
              Pickup Dashboard 🚚
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Manage food pickups and deliveries
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
                  Available Pickups
                </Typography>

                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{
                    color: "#1b5e20",
                    mt: 1,
                  }}
                >
                  {availablePickups.length}
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
                  Assigned
                </Typography>

                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{
                    color: "#0288d1",
                    mt: 1,
                  }}
                >
                  {assignedCount}
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
                  Picked Up
                </Typography>

                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{
                    color: "#7b1fa2",
                    mt: 1,
                  }}
                >
                  {pickedUpCount}
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
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Available Pickups */}
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            color: "#1b5e20",
            mb: 2,
          }}
        >
          Available Pickups 🚚
        </Typography>

        {availablePickups.length === 0 ? (
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
                🚚
              </Typography>

              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ mt: 1 }}
              >
                No pickups available
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                New accepted donations will appear here.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Grid container spacing={3} sx={{ mb: 5 }}>
            {availablePickups.map((donation) => (
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
                        label="Ready for Pickup"
                        color="success"
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
                      <strong>City:</strong>{" "}
                      {donation.pickupCity}
                    </Typography>

                    <Typography sx={{ mt: 1 }}>
                      <strong>Address:</strong>{" "}
                      {donation.pickupAddress}
                    </Typography>

                    <Typography sx={{ mt: 1 }}>
                      <strong>Pickup Window:</strong>{" "}
                      {formatDate(donation.pickupStart)}
                      {" - "}
                      {formatDate(donation.pickupEnd)}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography fontWeight="bold">
                      Donor
                    </Typography>

                    <Typography color="text.secondary">
                      {donation.donor?.fullName || "N/A"}
                    </Typography>

                    <Typography color="text.secondary">
                      📞 {donation.donor?.phone || "N/A"}
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
                        acceptPickup(donation._id)
                      }
                      disabled={
                        actionLoading === donation._id
                      }
                    >
                      {actionLoading === donation._id
                        ? "Accepting..."
                        : "Accept Pickup 🚚"}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* My Pickups */}
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            color: "#1b5e20",
            mb: 2,
          }}
        >
          My Assigned Pickups 📦
        </Typography>

        {myPickups.length === 0 ? (
          <Card sx={{ borderRadius: 3 }}>
            <CardContent
              sx={{
                textAlign: "center",
                py: 5,
              }}
            >
              <Typography color="text.secondary">
                You have no assigned pickups yet.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {myPickups.map((donation) => (
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

                    <Typography sx={{ mt: 1 }}>
                      <strong>Pickup Address:</strong>{" "}
                      {donation.pickupAddress}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography fontWeight="bold">
                      Organization
                    </Typography>

                    <Typography color="text.secondary">
                      {donation.organization?.fullName ||
                        "N/A"}
                    </Typography>

                    <Typography color="text.secondary">
                      📞{" "}
                      {donation.organization?.phone ||
                        "N/A"}
                    </Typography>

                    {donation.status ===
                      "pickup_assigned" && (
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{
                          mt: 3,
                          backgroundColor: "#0288d1",
                        }}
                        onClick={() =>
                          markPickedUp(donation._id)
                        }
                        disabled={
                          actionLoading === donation._id
                        }
                      >
                        {actionLoading === donation._id
                          ? "Processing..."
                          : "Mark as Picked Up 🚚"}
                      </Button>
                    )}

                    {donation.status === "picked_up" && (
                      <Button
                        fullWidth
                        variant="contained"
                        color="success"
                        sx={{
                          mt: 3,
                          py: 1.2,
                          fontWeight: "bold",
                        }}
                        onClick={() =>
                          markDelivered(donation._id)
                        }
                        disabled={
                          actionLoading === donation._id
                        }
                      >
                        {actionLoading === donation._id
                          ? "Processing..."
                          : "Mark as Delivered ✅"}
                      </Button>
                    )}

                    {donation.status === "delivered" && (
                      <Alert
                        severity="success"
                        sx={{ mt: 3 }}
                      >
                        Food successfully delivered! 🎉
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

export default PickupDashboard;