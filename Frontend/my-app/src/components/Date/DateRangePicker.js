import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { width } from "@mui/system";
import { format } from "date-fns";

const DateRangePicker = ({ text, ondateChange }) => {
  const onDateChangeHandler = (date) => {
    const formattedDate = format(date.$d, "yyyy/MM/dd");
    ondateChange(formattedDate, text);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        sx={{ marginRight: "10px" }}
        onChange={(date) => onDateChangeHandler(date)}
        label={text}
        slotProps={{
          textField: { size: "small" },
        }}
      />
    </LocalizationProvider>
  );
};

export default DateRangePicker;
