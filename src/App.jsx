import React from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { Routes, Route, Link, useLocation } from "react-router-dom";

import Register from "./Register";
import Login from "./login";

import DonorDashboard from "./pages/DonorDashboard";
import ReportDonation from "./pages/ReportDonation";
import OrganizationDashboard from "./pages/OrganizationDashboard";
import PickupDashboard from "./pages/PickupDashboard";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";

const Home = () => {
  return (
    <Box sx={{ backgroundColor: "#f1f8f3", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, #1b5e20 0%, #2e7d32 55%, #43a047 100%)",
          color: "white",
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              maxWidth: 750,
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{
                fontSize: { xs: "2.5rem", md: "4.5rem" },
                lineHeight: 1.1,
              }}
            >
              Rescue Food.
              <br />
              Reduce Waste. 🌱
            </Typography>

            <Typography
              variant="h6"
              sx={{
                mt: 3,
                opacity: 0.92,
                lineHeight: 1.7,
                maxWidth: 650,
              }}
            >
              FoodRescue connects surplus food donors with
              organizations and pickup partners so that
              good food reaches people who need it.
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                mt: 4,
                flexWrap: "wrap",
                justifyContent: {
                  xs: "center",
                  md: "flex-start",
                },
              }}
            >
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "white",
                  color: "#1b5e20",
                  px: 4,
                  py: 1.5,
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#e8f5e9",
                  },
                }}
              >
                Donate Food 🍱
              </Button>

              <Button
                component={Link}
                to="/register"
                variant="outlined"
                size="large"
                sx={{
                  color: "white",
                  borderColor: "white",
                  px: 4,
                  py: 1.5,
                  fontWeight: "bold",
                  "&:hover": {
                    borderColor: "white",
                    backgroundColor:
                      "rgba(255,255,255,0.1)",
                  },
                }}
              >
                Join as Organization
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* How It Works */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          sx={{ color: "#1b5e20" }}
        >
          How FoodRescue Works
        </Typography>

        <Typography
          textAlign="center"
          color="text.secondary"
          sx={{ mt: 1, mb: 5 }}
        >
          A simple journey from surplus food to someone
          who needs it.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        >
          {[
            {
              icon: "🍱",
              title: "Donate",
              text: "Report safe surplus food available for donation.",
            },
            {
              icon: "🏢",
              title: "Match",
              text: "Organizations find suitable available donations.",
            },
            {
              icon: "🚚",
              title: "Pickup",
              text: "Pickup partners collect food from the donor.",
            },
            {
              icon: "❤️",
              title: "Deliver",
              text: "Food reaches organizations and people in need.",
            },
          ].map((item) => (
            <Box
              key={item.title}
              sx={{
                backgroundColor: "white",
                p: 3,
                borderRadius: 3,
                textAlign: "center",
                boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.12)",
                },
              }}
            >
              <Typography sx={{ fontSize: "3rem" }}>
                {item.icon}
              </Typography>

              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ mt: 1 }}
              >
                {item.title}
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ mt: 1, lineHeight: 1.6 }}
              >
                {item.text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Impact */}
      <Box
        sx={{
          backgroundColor: "#163d1b",
          color: "white",
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
          >
            Our Impact 🌍
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(3, 1fr)",
              },
              gap: 4,
              mt: 5,
              textAlign: "center",
            }}
          >
            <Box>
              <Typography
                variant="h3"
                fontWeight="bold"
              >
                0+
              </Typography>
              <Typography sx={{ opacity: 0.8 }}>
                Food Rescued
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="h3"
                fontWeight="bold"
              >
                0+
              </Typography>
              <Typography sx={{ opacity: 0.8 }}>
                Donations Completed
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="h3"
                fontWeight="bold"
              >
                0+
              </Typography>
              <Typography sx={{ opacity: 0.8 }}>
                Organizations Served
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* CTA */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Box
          sx={{
            textAlign: "center",
            backgroundColor: "#e8f5e9",
            p: { xs: 4, md: 6 },
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: "#1b5e20" }}
          >
            Have Surplus Food?
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 2 }}
          >
            Don't waste it. Let someone benefit from it.
          </Typography>

          <Button
            component={Link}
            to="/register"
            variant="contained"
            size="large"
            sx={{
              mt: 3,
              backgroundColor: "#2e7d32",
              px: 4,
              py: 1.5,
            }}
          >
            Get Started 🚀
          </Button>
        </Box>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: "#102d14",
          color: "white",
          py: 3,
          textAlign: "center",
        }}
      >
        <Typography>
          🍱 FoodRescue — Rescue Food. Reduce Waste. 🌱
        </Typography>

        <Typography
          variant="body2"
          sx={{ mt: 1, opacity: 0.7 }}
        >
          Connecting surplus food with people in need.
        </Typography>
      </Box>
    </Box>
  );
};

const Navbar = () => {
  const location = useLocation();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "white",
        color: "#1b5e20",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            px: "0 !important",
            minHeight: "70px",
          }}
        >
          <Typography
            component={Link}
            to="/"
            variant="h5"
            fontWeight="bold"
            sx={{
              color: "#1b5e20",
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            🍱 FoodRescue
          </Typography>

          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              alignItems: "center",
              gap: 1,
            }}
          >
            <Button
              component={Link}
              to="/"
              sx={{ color: "#1b5e20" }}
            >
              Home
            </Button>

            <Button
              component={Link}
              to="/analytics"
              sx={{ color: "#1b5e20" }}
            >
              Impact 📊
            </Button>

            <Button
              component={Link}
              to="/login"
              sx={{ color: "#1b5e20" }}
            >
              Login
            </Button>

            <Button
              component={Link}
              to="/register"
              variant="contained"
              sx={{
                backgroundColor: "#2e7d32",
                "&:hover": {
                  backgroundColor: "#1b5e20",
                },
              }}
            >
              Register
            </Button>
          </Box>

          {/* Mobile buttons */}
          <Box
            sx={{
              display: {
                xs: "flex",
                md: "none",
              },
              gap: 1,
            }}
          >
            <Button
              component={Link}
              to="/login"
              size="small"
              sx={{ color: "#1b5e20" }}
            >
              Login
            </Button>

            <Button
              component={Link}
              to="/register"
              size="small"
              variant="contained"
              sx={{
                backgroundColor: "#2e7d32",
              }}
            >
              Register
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/donor-dashboard"
          element={<DonorDashboard />}
        />

        <Route
          path="/report-donation"
          element={<ReportDonation />}
        />

        <Route
          path="/organization-dashboard"
          element={<OrganizationDashboard />}
        />

        <Route
          path="/pickup-dashboard"
          element={<PickupDashboard />}
        />

        <Route
          path="/analytics"
          element={<AnalyticsDashboard />}
        />
      </Routes>
    </>
  );
};

export default App;