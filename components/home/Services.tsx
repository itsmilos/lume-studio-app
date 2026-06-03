import ServicesClient from "./ServicesClient"

export default async function Services() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/services`)
    const data = await res.json()

    return <ServicesClient data={data} />
}