import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import CardResto from "../components/CardResto";
import FilterResto from "../components/FilterResto";
import Navbar from "../components/Navbar";
import { CircularProgress, Typography, Box } from "@mui/material";

type OpeningHour = {
  id: number;
  day: string;
  open_time: string;
  close_time: string;
  restaurant_id: number;
};

type Restaurant = {
  id: number;
  name: string;
  opening_hours: OpeningHour[];
};

export default function Home() {
  const [restos, setRestos] = useState<Restaurant[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTime, setFilterTime] = useState<Dayjs | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestos = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_API}/restaurant`);
        const data = await res.json();
        setRestos(data.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestos();
  }, []);

  const handleSearchChange = (value: string) => setSearchTerm(value);
  const handleFilterChange = (time: Dayjs) => setFilterTime(time);

  let filteredRestos = restos.filter((resto) =>
    resto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filterTime) {
    const selectedDay = filterTime.format("ddd");
    const selectedTime = dayjs(filterTime.format("HH:mm"), "HH:mm");

    filteredRestos = filteredRestos.filter((resto) =>
      resto.opening_hours.some((oh) => {
        const isSameDay = oh.day === selectedDay;

        const openTime = dayjs(oh.open_time, "HH:mm");
        const closeTime = dayjs(oh.close_time, "HH:mm");

        let isOpen = false;

        if (openTime.isBefore(closeTime)) {
          isOpen =
            (selectedTime.isAfter(openTime) &&
              selectedTime.isBefore(closeTime)) ||
            selectedTime.isSame(openTime) ||
            selectedTime.isSame(closeTime);
        } else {
          isOpen =
            selectedTime.isAfter(openTime) ||
            selectedTime.isBefore(closeTime) ||
            selectedTime.isSame(openTime) ||
            selectedTime.isSame(closeTime);
        }

        return isSameDay && isOpen;
      })
    );
  }

  return (
    <div style={{ background: "#f3f3f3", minHeight: "100vh", height: "full" }}>
      <Navbar onSearchChange={handleSearchChange} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ marginTop: 10, marginLeft: 15 }}>
          <FilterResto onFilterChange={handleFilterChange} />
        </div>

        <div
          style={{
            marginTop: 30,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 40,
            padding: 20,
          }}
        >
          {loading ? (
            <Box textAlign="center" mt={10}>
              <CircularProgress />
              <Typography variant="h6" mt={2}>
                Loading restaurants...
              </Typography>
            </Box>
          ) : filteredRestos.length > 0 ? (
            filteredRestos.map((resto, index) => (
              <CardResto
                key={index}
                id={resto.id}
                resto_name={resto.name}
                opening_hours={resto.opening_hours}
              />
            ))
          ) : (
            <Typography variant="h6" color="text.secondary">
              No matching restaurants found.
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
}
