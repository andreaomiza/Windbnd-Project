/**
 * Aquí estará la lógica principal de la aplicación.
 * Este bloque de código contiene la funcionalidad principal
 * que define el comportamiento del programa.
 */import { formatGuests, getGuestCount, filterStays } from "./utils.js";
import { stays } from "./stays.js";

// Selección de elementos del DOM
const staysContainer = document.getElementById("stays-container");
const staysCount = document.getElementById("stays-count");
const locationInput = document.getElementById("location-input");
const guestInfo = document.getElementById("guest-info");
const filterButton = document.getElementById("filter-button");
const filterModal = document.getElementById("filter-modal");
const closeFilterModal = document.getElementById("close-filter-modal");
const applyFilters = document.getElementById("apply-filters");
const guestsToggle = document.getElementById("guests-toggle");
const guestsOptions = document.getElementById("guests-options");
const adultsCount = document.getElementById("adults-count");
const childrenCount = document.getElementById("children-count");
const increaseAdults = document.getElementById("increase-adults");
const decreaseAdults = document.getElementById("decrease-adults");
const increaseChildren = document.getElementById("increase-children");
const decreaseChildren = document.getElementById("decrease-children");
const dataList = document.getElementById("custom-datalist");

let selectedLocation = "";
let selectedCountry = "";
let selectedAdults = 0;
let selectedChildren = 0;

// Función para renderizar las estancias con animación
function renderStays(staysList) {
    staysContainer.innerHTML = "";
    staysList.forEach((stay, index) => {
        const stayElement = document.createElement("div");
        stayElement.classList.add(
            "bg-white", "rounded-lg", "shadow-md", "p-4",
            "opacity-0", "translate-y-5", "transition-all", "duration-500"
        );

        stayElement.innerHTML = `
            <img src="${stay.photo}" alt="${stay.title}" class="w-full h-48 object-cover rounded-lg">
            <div class="flex justify-between items-center mt-2">
                <span class="text-gray-500">${stay.type}${stay.beds ? ` • ${stay.beds} beds` : ""}</span>
                <span class="flex items-center text-red-500">⭐ ${stay.rating}</span>
            </div>
            ${stay.superHost ? '<span class="text-xs font-bold text-red-500 border border-red-500 px-2 py-1 rounded-full">Super Host</span>' : ''}
            <h3 class="font-semibold mt-1">${stay.title}</h3>
            <p class="text-gray-500">${stay.city}, ${stay.country}</p>
            <p class="text-gray-600">Max Guests: ${stay.maxGuests}</p>
        `;

        staysContainer.appendChild(stayElement);
        setTimeout(() => {
            stayElement.classList.remove("opacity-0", "translate-y-5");
        }, index * 100);
    });

    staysCount.textContent = `${staysList.length} stays`;
}

// Función para aplicar filtros
function applyFilter() {
  let filteredStays = filterStays(stays, selectedLocation, selectedCountry, selectedAdults + selectedChildren);
  renderStays(filteredStays);
  filterModal.classList.add("-translate-y-full");
}

// Eventos para abrir/cerrar el modal de filtros
filterButton.addEventListener("click", () => filterModal.classList.remove("-translate-y-full"));
closeFilterModal.addEventListener("click", () => filterModal.classList.add("-translate-y-full"));
applyFilters.addEventListener("click", applyFilter);

// Evento para manejar la selección de ubicación con sugerencias dinámicas
locationInput.addEventListener("input", () => {
  const query = locationInput.value.toLowerCase();
  dataList.innerHTML = "";

  if (query) {
      const uniqueLocations = ["All", ...new Set(stays.map(stay => `${stay.city}, ${stay.country}`))];
      const filteredLocations = uniqueLocations.filter(location => location.toLowerCase().includes(query));

      if (filteredLocations.length > 0) {
          dataList.classList.remove("hidden");
          filteredLocations.forEach(location => {
              const item = document.createElement("li");
              item.textContent = location;
              item.classList.add("p-2", "hover:bg-gray-200", "cursor-pointer");
              item.addEventListener("click", () => {
                  locationInput.value = location;
                  if (location === "All") {
                      selectedLocation = "";
                      selectedCountry = "";
                  } else {
                      [selectedLocation, selectedCountry] = location.split(", ").map(str => str.trim());
                  }
                  dataList.classList.add("hidden");
                  applyFilter();
              });
              dataList.appendChild(item);
          });
      } else {
          dataList.classList.add("hidden");
      }
  } else {
      dataList.classList.add("hidden");
  }
});


// Evento para mostrar las opciones de huéspedes
guestsToggle.addEventListener("click", () => {
    guestsOptions.classList.toggle("hidden");
});

// Manejo de incremento y decremento de huéspedes
increaseAdults.addEventListener("click", () => {
    selectedAdults++;
    adultsCount.textContent = selectedAdults;
    guestInfo.textContent = formatGuests(selectedAdults, selectedChildren);
});
decreaseAdults.addEventListener("click", () => {
    if (selectedAdults > 0) {
        selectedAdults--;
        adultsCount.textContent = selectedAdults;
        guestInfo.textContent = formatGuests(selectedAdults, selectedChildren);
    }
});
increaseChildren.addEventListener("click", () => {
    selectedChildren++;
    childrenCount.textContent = selectedChildren;
    guestInfo.textContent = formatGuests(selectedAdults, selectedChildren);
});
decreaseChildren.addEventListener("click", () => {
    if (selectedChildren > 0) {
        selectedChildren--;
        childrenCount.textContent = selectedChildren;
        guestInfo.textContent = formatGuests(selectedAdults, selectedChildren);
    }
});




// Renderizar todas las estancias al cargar la página
renderStays(stays);
