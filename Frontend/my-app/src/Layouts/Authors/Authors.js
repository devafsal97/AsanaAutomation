import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import AuthorCard from "./AuthorCard";

const Authors = () => {
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
        <AuthorCard></AuthorCard>
        <AuthorCard></AuthorCard>
      </Box>
    </Card>
  );
};

export default Authors;
