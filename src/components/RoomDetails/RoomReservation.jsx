import { useState } from "react";
import { DateRange } from "react-date-range";
import { addDays, isWithinInterval } from "date-fns";
import Button from "../Shared/Button/Button";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import BookingModal from "./BookingModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const RoomReservation = ({ room }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingInfo, setBookingInfo] = useState(null);

  // --- Fetch bookings for this room ---
  const { data: bookings = [], isFetching } = useQuery({
    queryKey: ["bookings", room?._id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${room?._id}`);
      return res.data;
    },
    enabled: !!room?._id,
  });

  // --- Compute booked date ranges ---
  const bookedRanges = bookings.map((b) => ({
    start: new Date(b.from),
    end: new Date(b.to),
  }));

  // --- Availability range from room data ---
  const minDate = new Date(room?.availability?.startDate);
  const maxDate = new Date(room?.availability?.endDate);

  const [range, setRange] = useState([
    {
      startDate: minDate,
      endDate: minDate,
      key: "selection",
    },
  ]);

  const handleRangeChange = (item) => {
    setRange([item.selection]);
  };


 

  const isDateBooked = (date) =>
    bookedRanges.some((r) =>
      isWithinInterval(date, { start: r.start, end: r.end })
    );

  const calcTotal = () => {
    const { startDate, endDate } = range[0];
    const days = Math.max(1, Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)));
    return days * room?.price;
  };

  const handleReserve = () => {
    if (!user) return toast.error("Please log in to reserve.");

    const info = {
      roomId: room?._id,
      title: room?.title,
      location: room?.location,
      guest: {
        name: user?.displayName,
        email: user?.email,
      },
      from: range[0].startDate,
      to: range[0].endDate,
      price: calcTotal(),
    };

    setBookingInfo(info);
    setIsModalOpen(true);
  };

  // --- Disable all dates if fully booked ---
  const allDatesBooked = (() => {
    const allDates = [];
    let current = new Date(minDate);
    while (current <= maxDate) {
      allDates.push(new Date(current));
      current = addDays(current, 1);
    }
    return allDates.every(isDateBooked);
  })();

  return (
    <>
      <div className="rounded-xl border border-neutral-200 overflow-hidden bg-white shadow-sm">
        <div className="flex items-center gap-1 p-4">
          <div className="text-2xl font-semibold">$ {room?.price}</div>
          <div className="font-light text-neutral-600">/night</div>
        </div>
        <hr />
        <div className="flex justify-center">
          {!isFetching ? (
            <DateRange
              editableDateInputs={true}
              onChange={handleRangeChange}
              moveRangeOnFirstSelection={false}
              ranges={range}
              rangeColors={["#fb7185"]}
              minDate={minDate}
              maxDate={maxDate}
              disabledDates={(() => {
                const dates = [];
                let current = new Date(minDate);
                while (current <= maxDate) {
                  if (isDateBooked(current)) dates.push(new Date(current));
                  current = addDays(current, 1);
                }
                return dates;
              })()}// Immediately Invoked Function Expression (IIFE). called by ()
            />
          ) : (
            <p className="text-gray-500 py-6">Loading calendar...</p>
          )}
        </div>
        <hr />
        <div className="p-4">
          <Button
            label={allDatesBooked ? "Fully Booked" : "Reserve"}
            onClick={handleReserve}
            disabled={allDatesBooked}
          />
        </div>
        <hr />
        <div className="p-4 flex items-center justify-between font-semibold text-lg">
          <div>Total</div>
          <div>${calcTotal()}</div>
        </div>
      </div>

      {/* Booking Modal */}
      {bookingInfo && (
        <BookingModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          bookingInfo={bookingInfo}
          onBookingSuccess={() => {
            // ✅ Immediately refetch bookings
            queryClient.invalidateQueries(["bookings", room?._id]);
            toast.success("Booking successful!");
            setIsModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default RoomReservation;
