import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const SearchComponent = ({ onCloseHandler, onEnterHandler }) => {
  const [closeIconVisibility, setcloseIconVisibility] = useState(false);
  const [keyword, setKeyword] = useState("");

  const searchInputHandler = (event) => {
    setKeyword(event.target.value);
  };

  const onCloseClickHandler = () => {
    setKeyword("");
    onCloseHandler();
  };

  const onSearchHandler = (event) => {
    if (event.key === "Enter") {
      // console.log(keyword);
      onEnterHandler(keyword);
    }
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        value={keyword}
        onChange={searchInputHandler}
        placeholder="Search…"
        onKeyDown={(event) => onSearchHandler(event)}
      />{" "}
      {keyword && (
        <IconButton onClick={onCloseClickHandler}>
          <CloseIcon />
        </IconButton>
      )}
    </Search>
  );
};

export default SearchComponent;
