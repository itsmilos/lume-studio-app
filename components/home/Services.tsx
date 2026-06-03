import ServicesClient from "./ServicesClient"
import { connectionDB } from "@/lib/db"

export const dynamic = 'force-dynamic'

export default async function Services() {
    await connectionDB()
    const Service = (await import('@/lib/models/Service')).default
    const data = await Service.find().lean()
    const serialized = JSON.parse(JSON.stringify(data))

    return <ServicesClient data={serialized} />
}