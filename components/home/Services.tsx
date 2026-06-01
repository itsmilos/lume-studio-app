import ServicesClient from "./ServicesClient"

export default async function Services() {
    const res = await fetch("/api/services")
    const data = await res.json()

    return <ServicesClient data={data} />
}