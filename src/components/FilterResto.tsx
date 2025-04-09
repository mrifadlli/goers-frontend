import { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

type FilterRestoProps = {
  onFilterChange: (dateTime: Dayjs) => void;
};

export default function FilterResto({ onFilterChange }: FilterRestoProps) {
  return (
    <div style={{ width: "300px" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateTimePicker"]}>
          <DemoItem label='Filter'>
            <DateTimePicker
              ampm={false}
              onChange={(value) => {
                if (value) onFilterChange(value);
              }}
              // defaultValue={dayjs()}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}
