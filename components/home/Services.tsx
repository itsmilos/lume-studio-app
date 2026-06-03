import ServicesClient from "./ServicesClient"

export const dynamic = 'force-dynamic'

export default async function Services() {
    const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000'

    const res = await fetch(`${baseUrl}/api/services`, { cache: 'no-store' })
    const data = await res.json()

    return <ServicesClient data={data} />
}