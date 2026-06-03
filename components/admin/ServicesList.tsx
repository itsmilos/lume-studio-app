import ServicesListClient from "./Client/ServicesListClient";

export default async function ServicesList() {
    const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000'

    const res = await fetch(`${baseUrl}/api/services`, { cache: 'no-store' })
    const data = await res.json();

    return <ServicesListClient data={data} />
}