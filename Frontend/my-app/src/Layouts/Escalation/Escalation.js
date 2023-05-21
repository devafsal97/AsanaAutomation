import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import EscalationCard from "./EscalationCard";

const Escalation = () => {
  return (
    <Card
      sx={{
        width: "100%",
        marginTop: "30px",
        height: "600px",
        background: "#EFEFF2",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "100%",
        }}
      >
        <EscalationCard contact="primary" />
        <EscalationCard contact="secondary" />
        <EscalationCard contact="tertiary" />
      </Box>
    </Card>
  );
};

export default Escalation;
