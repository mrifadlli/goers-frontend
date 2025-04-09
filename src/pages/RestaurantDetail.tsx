import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Container,
  Divider,
  CircularProgress,
} from "@mui/material";

type OpeningHour = {
  id: number;
  day: string;
  open_time: string;
  close_time: string;
};

type Restaurant = {
  id: number;
  name: string;
  opening_hours: OpeningHour[];
};

export default function RestaurantDetail() {
  const { id } = useParams();
  const [resto, setResto] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchResto = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_API}/restaurant/view/${id}`
        );
        const data = await res.json();

        if (!data?.data) {
          setError(true);
        } else {
          setResto(data.data);
        }
      } catch (error) {
        console.error("Error fetching restaurant detail:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchResto();
  }, [id]);

  return (
    <div style={{ background: "#f3f3f3", minHeight: "100vh" }}>
      <Navbar />

      <Container maxWidth="md" sx={{ mt: 4 }}>
        {loading ? (
          <Box textAlign="center" mt={10}>
            <CircularProgress />
            <Typography variant="h6" mt={2}>
              Loading restaurant details...
            </Typography>
          </Box>
        ) : error || !resto ? (
          <Typography variant="h5" color="error" textAlign="center" mt={10}>
            Restaurant not found.
          </Typography>
        ) : (
          <Card elevation={3}>
            <CardMedia
              component="img"
              height="200"
              image="/restaurant_ava.png"
              alt="Restaurant Avatar"
              sx={{
                objectFit: "contain",
                backgroundColor: "#f5f5f5",
                padding: 2,
              }}
            />
            <CardContent>
              <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                textAlign="center"
              >
                {resto.name}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                Opening Hours
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  padding: 2,
                  borderRadius: 2,
                }}
              >
                {resto.opening_hours.map((hour) => (
                  <Paper
                    key={hour.id}
                    elevation={1}
                    sx={{
                      padding: 2,
                      minWidth: 140,
                      flex: "0 1 auto",
                      textAlign: "center",
                      backgroundColor: (theme) => theme.palette.success.main,
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" style={{ color: "white" }}>
                      {hour.day}
                    </Typography>
                    <Typography variant="body1" style={{ color: "white" }}>
                      {hour.open_time} - {hour.close_time}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>
    </div>
  );
}
