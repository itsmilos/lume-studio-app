import ServicesClient from "./ServicesClient"

export const dynamic = 'force-dynamic'

export default async function Services() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/services`, { cache: 'no-store' })
    const data = await res.json()

    return <ServicesClient data={data} />
}