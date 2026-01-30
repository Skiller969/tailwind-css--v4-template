import { products } from "./products.js";

const grid = document.getElementById("product-grid");
const body = document.body;

// Render Products
products.forEach((product, index) => {
  const card = document.createElement("div");
  // Staggered layout for editorial feel: Even items have margin-top
  const marginClass = index % 2 !== 0 ? "md:mt-24" : "";

  card.className = `group cursor-pointer fade-in ${marginClass}`;
  card.innerHTML = `
    <div class="relative overflow-hidden aspect-[3/4] mb-6">
      <img src="${product.image}" alt="${product.name}" 
           class="w-full h-full object-cover grayscale transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:grayscale-0" />
      <div class="absolute inset-0 bg-black/0 group-hover:bg-white/10 transition-colors duration-500"></div>
    </div>
    <div class="flex flex-col items-start space-y-2">
      <h3 class="text-2xl font-serif font-bold tracking-tight">${product.name}</h3>
      <p class="text-xs text-gray-400 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
        View Detail
      </p>
    </div>
  `;

  card.addEventListener("click", () => openModal(product));
  grid.appendChild(card);
});

// Scroll Detection
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.1 });

// Observe existing and dynamic elements
document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

// Modal Logic
function openModal(product) {
  const modal = document.createElement("div");
  modal.id = "product-modal";
  modal.className = "fixed inset-0 z-[100] bg-black text-white flex flex-col md:flex-row animate-fade-in-up";

  modal.innerHTML = `
    <!-- Close Button -->
    <button id="close-modal" class="absolute top-6 right-6 z-50 text-white hover:opacity-50 transition-opacity">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="1" d="M6 18L18 6M6 6l12 12"></path></svg>
    </button>

    <!-- Image -->
    <div class="w-full md:w-1/2 h-1/2 md:h-full relative">
         <img src="${product.image}" class="w-full h-full object-cover grayscale" />
    </div>

    <!-- Details -->
    <div class="w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-24 flex flex-col justify-center items-start bg-black">
        <span class="text-xs text-gray-500 tracking-widest uppercase mb-4">La Riff / Collection 01</span>
        <h2 class="text-5xl md:text-7xl font-serif font-bold mb-6">${product.name}</h2>
        <p class="text-xl italic text-gray-300 mb-8 font-serif leading-relaxed">"${product.description}"</p>
        
        <div class="w-full h-[1px] bg-white/20 mb-8"></div>
        
        <div class="flex items-center space-x-12 mb-12">
            <span class="text-2xl tracking-widest">${product.price}</span>
            <div class="flex items-center space-x-4 text-xs uppercase tracking-widest text-gray-500">
                <span>UPI</span>
                <span>Card</span>
                <span>Net Banking</span>
            </div>
        </div>

        <button class="w-full md:w-auto px-12 py-4 bg-white text-black uppercase tracking-[0.2em] text-sm hover:bg-gray-200 transition-colors">
            Add to Bag
        </button>

        <p class="mt-8 text-[10px] text-gray-600 uppercase tracking-widest">
            Free shipping on all domestic orders.<br>No Cash on Delivery.
        </p>
    </div>
  `;

  body.style.overflow = "hidden"; // Prevent background scroll
  body.appendChild(modal);

  document.getElementById("close-modal").onclick = () => {
    modal.remove();
    body.style.overflow = "auto";
  };
}
