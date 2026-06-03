import ServicesListClient from "./Client/ServicesListClient";

export default async function ServicesList() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/services`, { cache: 'no-store' });
    const data = await res.json();

    return <ServicesListClient data={data} />
}