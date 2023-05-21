import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/joy/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmailIcon from "@mui/icons-material/Email";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";

const EscalationCard = ({ contact }) => {
  return (
    <Card sx={{ width: "300px", height: "400px" }}>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <PersonIcon style={{ width: "80px", height: "80px", color: "gray" }} />
        <Typography level="h2" sx={{ marginBottom: "20px", fontSize: "25px" }}>
          Muhammed Afsal
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          <EmailIcon style={{ marginRight: "20px" }} />
          <Typography level="body2">afsal@au-ki.com</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          <PhoneEnabledIcon style={{ marginRight: "20px" }} />
          <Typography level="body2">+918075176645</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          <NaturePeopleIcon style={{ marginRight: "20px" }} />
          <Typography level="body2">{contact}</Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default EscalationCard;
