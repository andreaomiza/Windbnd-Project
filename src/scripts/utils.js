/**
 * Módulo de funciones utilitarias.
 * Este archivo contiene funciones auxiliares que serán utilizadas y llamadas
 * desde el archivo principal para realizar varias operaciones.
 */

/*
 * Módulo de funciones utilitarias.
 * Este archivo contiene funciones auxiliares que serán utilizadas y llamadas
 * desde el archivo principal para realizar varias operaciones.
 */
export function formatGuests(adults, children) {
    const totalGuests = adults + children;
    return totalGuests === 1 ? "1 guest" : `${totalGuests} guests`;
}

export function getGuestCount(elementId) {
    return parseInt(document.getElementById(elementId).textContent, 10) || 0;
}

export function filterStays(stays, city, country, guests) {
    return stays.filter(stay => {
        const cityMatch = city && city !== "All" ? stay.city.toLowerCase() === city.toLowerCase() : true;
        const countryMatch = country && country !== "All" ? stay.country.toLowerCase() === country.toLowerCase() : true;
        const guestMatch = guests ? stay.maxGuests >= guests : true;
        return cityMatch && countryMatch && guestMatch;
    });
}




