import { useState } from "react";
import PropTypes from "prop-types";
import { DateRange } from "react-date-range";
import Button from "../Shared/Button/Button";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";

const RoomReservation = ({ room }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // default date range from room availability
  const [range, setRange] = useState([
    {
      startDate: new Date(room?.availability?.startDate),
      endDate: new Date(room?.availability?.endDate),
      key: "selection",
    },
  ]);

  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(room?.availability?.startDate),
    endDate: new Date(room?.availability?.startDate),
  });

  const handleRangeChange = (item) => {
    setSelectedRange({
      startDate: item.selection.startDate,
      endDate: item.selection.endDate,
    });
    setRange([item.selection]);
  };

  // calculate total nights and price
  const calcTotal = () => {
    const start = selectedRange.startDate;
    const end = selectedRange.endDate;
    const days = Math.max(
      1,
      Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    );
    return days * room?.price;
  };

  const handleReserve = async () => {
    try {
      const bookingData = {
        roomId: room._id,
        guest: {
          name: user?.displayName,
          email: user?.email,
          photo: user?.photoURL,
        },
        startDate: selectedRange.startDate,
        endDate: selectedRange.endDate,
        totalPrice: calcTotal(),
      };

      const res = await axiosSecure.post(`/book-room/${room._id}`, bookingData);

      if (res.data.success) {
        toast.success("Room booked successfully!");
      } else {
        toast.error(res.data.message || "Booking failed!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="rounded-xl border border-neutral-200 overflow-hidden bg-white shadow-md">
      <div className="flex items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {room?.price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <div className="flex justify-center">
        <DateRange
          editableDateInputs={true}
          onChange={handleRangeChange}
          moveRangeOnFirstSelection={false}
          ranges={range}
          rangeColors={["#fb7185"]}
          minDate={new Date(room?.availability?.startDate)}
          maxDate={new Date(room?.availability?.endDate)}
        />
      </div>
      <hr />
      <div className="p-4">
        <Button label={"Reserve"} onClick={handleReserve} />
      </div>
      <hr />
      <div className="p-4 flex items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>${calcTotal()}</div>
      </div>
    </div>
  );
};

RoomReservation.propTypes = {
  room: PropTypes.object,
};

export default RoomReservation;
