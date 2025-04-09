import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

type OpeningHour = {
  id: number;
  day: string;
  open_time: string;
  close_time: string;
  restaurant_id: number;
};

type CardRestoProps = {
  id: number;
  resto_name: string;
  // open_time: string;
  // close_time: string;
  opening_hours: OpeningHour[];
};

export default function CardResto({
  id,
  resto_name,
  opening_hours,
}: CardRestoProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/restaurant/${id}`);
  };
  return (
    <Card sx={{ width: 345 }} onClick={handleClick} style={{ cursor: "pointer" }}>
      <CardActionArea>
        <CardMedia
          component='img'
          height='250'
          image='/restaurant_ava.png'
          alt='resto'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {resto_name}
          </Typography>
          <Typography variant='body2' sx={{ color: "text.secondary" }}>
            {/* {open_time} - {close_time} */}
          </Typography>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginTop:12
            }}
          >
            {opening_hours.map((items, index) => (
              <Chip color="success" key={index} label={items.day} />
            ))}
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
