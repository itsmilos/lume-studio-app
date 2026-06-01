import ServicesListClient from "./Client/ServicesListClient";

export default async function ServicesList() {
    const res = await fetch("http://localhost:3000/api/services", { cache: 'no-store' });
    const data = await res.json();

    return (
        <>
            <ServicesListClient data={data} />
        </>
    )
}