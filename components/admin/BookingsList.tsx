import BookingsListClient from "./Client/BookingListClient";

export default async function BookingsList() {
    const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000'

    const res = await fetch(`${baseUrl}/api/services`, { cache: 'no-store' })
    const data = await res.json();

    return <BookingsListClient data={data} />
}