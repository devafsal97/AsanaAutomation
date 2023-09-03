import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
import Typography from "@mui/material/Typography";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ActiveIcon from "../../assets/workinprogress.png";
import AverageIcon from "../../assets/average.png";
import CompletedIcon from "../../assets/files.png";
import NewTaskIcon from "../../assets/new-task.png";
import { useState } from "react";

const DataCard = ({ title, value }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  console.log(title, value);
  let imageSrc;
  if (title === "Active Tasks") {
    imageSrc = ActiveIcon;
  } else if (title === "Average Turn Around Time(minutes)") {
    imageSrc = AverageIcon;
  } else if (title === "Completed Task") {
    imageSrc = CompletedIcon;
  } else if (title === "New Tasks") {
    imageSrc = NewTaskIcon;
  }
  return (
    <Card
      sx={{
        width: "250px",
        padding: "20px",
        transition: "transform 0.3s",
        transform: isHovered ? "translateY(-10px)" : "none",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography>{title}</Typography>
          <Typography variant="h3">{value}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
        >
          <img style={{ width: "50px" }} src={imageSrc} alt={title}></img>
        </Box>
      </Box>
    </Card>
  );
};
export default DataCard;
