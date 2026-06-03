import BookingsListClient from "./Client/BookingListClient";

export default async function BookingsList() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bookings`, { cache: 'no-store' });
    const data = await res.json();

    return <BookingsListClient data={data} />
}