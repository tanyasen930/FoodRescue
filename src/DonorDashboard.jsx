import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Card,
  CardContent,
  Grid,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

function DonorDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f8f5",
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "#ffffff",
          color: "#1b5e20",
          borderBottom: "1px solid #e0e8e1",
        }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
            }}
          >
            🍱 FoodRescue
          </Typography>

          <Typography
            sx={{
              mr: 3,
              display: { xs: "none", sm: "block" },
              color: "#68756b",
            }}
          >
            {user?.fullName || "Donor"}
          </Typography>

          <Button
            onClick={handleLogout}
            sx={{
              color: "#d32f2f",
              fontWeight: "bold",
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#17351b",
            }}
          >
            Welcome, {user?.fullName || "Donor"} 👋
          </Typography>

          <Typography
            sx={{
              color: "#68756b",
              mt: 1,
              fontSize: "17px",
            }}
          >
            Help reduce food waste by reporting safe surplus food.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
              }}
            >
              <CardContent>
                <Typography sx={{ fontSize: "35px" }}>
                  📦
                </Typography>

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    color: "#17351b",
                    mt: 1,
                  }}
                >
                  0
                </Typography>

                <Typography sx={{ color: "#68756b" }}>
                  Total Donations
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
              }}
            >
              <CardContent>
                <Typography sx={{ fontSize: "35px" }}>
                  ⏳
                </Typography>

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    color: "#ed6c02",
                    mt: 1,
                  }}
                >
                  0
                </Typography>

                <Typography sx={{ color: "#68756b" }}>
                  Pending
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
              }}
            >
              <CardContent>
                <Typography sx={{ fontSize: "35px" }}>
                  ✅
                </Typography>

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    color: "#2e7d32",
                    mt: 1,
                  }}
                >
                  0
                </Typography>

                <Typography sx={{ color: "#68756b" }}>
                  Completed
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
              }}
            >
              <CardContent>
                <Typography sx={{ fontSize: "35px" }}>
                  ❤️
                </Typography>

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    color: "#c62828",
                    mt: 1,
                  }}
                >
                  0 kg
                </Typography>

                <Typography sx={{ color: "#68756b" }}>
                  Food Rescued
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Card
          sx={{
            mt: 5,
            borderRadius: 4,
            backgroundColor: "#e8f5e9",
            boxShadow: "none",
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#17351b",
              }}
            >
              Have surplus food? 🍱
            </Typography>

            <Typography
              sx={{
                color: "#68756b",
                mt: 1,
                mb: 3,
                maxWidth: 650,
              }}
            >
              Report safe surplus food and FoodRescue will help
              connect it with a suitable verified organization.
            </Typography>

            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#2e7d32",
                px: 4,
                py: 1.5,
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#1b5e20",
                },
              }}
            >
              + Report Surplus Food
            </Button>
          </CardContent>
        </Card>

        <Box sx={{ mt: 5 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#17351b",
              mb: 2,
            }}
          >
            Recent Donations
          </Typography>

          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
            }}
          >
            <CardContent>
              <Typography
                align="center"
                sx={{
                  py: 5,
                  color: "#68756b",
                }}
              >
                No donations yet.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}

export default DonorDashboard;