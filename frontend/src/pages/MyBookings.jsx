import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import BlurCircle from "../components/BlurCircle";
import timeFormat from "../lib/timeFormat";
import { dateFormat } from "../lib/DateFormat";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { dummyShowsData } from "../assets/assets"; // Fallback ke liye

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY || "$";

  const { axios, getToken, user, image_base_url } = useAppContext();

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMyBookings = async () => {
    try {
      const { data } = await axios.get("/api/user/bookings", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setBookings(data.bookings || []);
      }
    } catch (error) {
      console.log("Backend failed, using dummy bookings fallback:", error);
      
      // Fallback: Agar backend na ho toh testing ke liye ek dummy booking dikha dein
      setBookings([
        {
          show: {
            movie: dummyShowsData[0],
            showDateTime: new Date().toISOString(),
          },
          amount: 450,
          isPaid: true,
          bookedSeats: ["A1", "A2"],
          paymentLink: "#",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Agar user ho ya na ho, testing ke liye data load kar dein (ya user check hata sakte hain)
    if (user !== undefined) {
      getMyBookings();
    }
  }, [user]);

  return !isLoading ? (
    <div className="relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]">
      <BlurCircle top="100px" left="100px" />
      <div>
        <BlurCircle bottom="0px" left="600px" />
      </div>
      <h1 className="text-xl font-semibold mb-6">My Bookings</h1>

      {bookings.length > 0 ? (
        bookings.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg mt-4 p-4 max-w-3xl"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <img
                src={
                  item.show?.movie?.poster_path?.startsWith("http")
                    ? item.show.movie.poster_path
                    : (image_base_url || "") + item.show?.movie?.poster_path
                }
                alt="poster"
                className="md:max-w-45 aspect-video h-auto object-cover object-bottom rounded"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-lg font-semibold">
                    {item.show?.movie?.title}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {timeFormat(item.show?.movie?.runtime)}
                  </p>
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  {item.show?.showDateTime
                    ? dateFormat(item.show.showDateTime)
                    : "Today"}
                </p>
              </div>
            </div>

            <div className="flex flex-col md:items-end md:text-right justify-between pt-4 md:pt-0">
              <div className="flex items-center gap-4">
                <p className="text-2xl font-semibold mb-3">
                  {currency}
                  {item.amount}
                </p>
                {!item.isPaid && item.paymentLink && (
                  <Link
                    to={item.paymentLink}
                    className="bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer"
                  >
                    Pay Now
                  </Link>
                )}
              </div>
              <div className="text-sm">
                <p>
                  <span className="text-gray-400">Total Tickets:</span>{" "}
                  {item.bookedSeats?.length || 0}
                </p>
                <p>
                  <span className="text-gray-400">Seat Number:</span>{" "}
                  {item.bookedSeats?.join(", ")}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center mt-32">
          <p className="text-xl font-medium text-gray-400">
            No bookings found
          </p>
        </div>
      )}
    </div>
  ) : (
    <Loading />
  );
};

export default MyBookings;