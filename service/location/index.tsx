const getPlaces = async (value: string) => {
    const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${value}&limit=5`);
    return response.json()
}
export { getPlaces };