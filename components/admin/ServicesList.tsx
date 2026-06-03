export const dynamic = 'force-dynamic'

import ServicesListClient from "./Client/ServicesListClient";
import { connectionDB } from "@/lib/db";

export default async function ServicesList() {
    await connectionDB();
    const Service = (await import('@/lib/models/Service')).default;
    const data = await Service.find().lean();
    const serialized = JSON.parse(JSON.stringify(data));

    return <ServicesListClient data={serialized} />
}