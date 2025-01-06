import {getUrl} from "@/service/api";

const {url} = getUrl();

const getPlaces = async (value: string) => {
    const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${value}&limit=5`);
    return response.json()
}
const getZone = async () => {
    const response = await fetch(`${url}/carte`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await response.json();
};

export { getPlaces, getZone };