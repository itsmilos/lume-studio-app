import BookingsListClient from "./Client/BookingListClient";

export default async function BookingsList() {
    const res = await fetch("http://localhost:3000/api/bookings", { cache: 'no-store' });
    const data = await res.json();

    return (
        <BookingsListClient data={data} />
    )
}