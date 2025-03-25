/**
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
        const cityMatch = city ? stay.city.toLowerCase() === city : true;
        const countryMatch = country ? stay.country.toLowerCase() === country : true;
        const guestMatch = guests ? stay.maxGuests >= guests : true;
        return cityMatch && countryMatch && guestMatch;
    });
}

