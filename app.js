const products = [
  {
    name: "Relaxed Linen Blazer",
    store: "Mango",
    style: "formal",
    price: 299,
    match: 96,
    category: "Outerwear",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80",
    url: "https://shop.mango.com/"
  },
  {
    name: "Straight Fit Tailored Trousers",
    store: "Zara",
    style: "formal",
    price: 229,
    match: 93,
    category: "Bottoms",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80",
    url: "https://www.zara.com/"
  },
  {
    name: "Ribbed Cotton Tank Top",
    store: "H&M",
    style: "casual",
    price: 59,
    match: 91,
    category: "Tops",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80",
    url: "https://www2.hm.com/"
  },
  {
    name: "Low Profile Leather Sneakers",
    store: "Nike",
    style: "street",
    price: 419,
    match: 88,
    category: "Shoes",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80",
    url: "https://www.nike.com/"
  },
  {
    name: "Oversized Denim Shirt",
    store: "COS",
    style: "casual",
    price: 345,
    match: 86,
    category: "Shirts",
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=80",
    url: "https://www.cos.com/"
  },
  {
    name: "Pleated Midi Skirt",
    store: "ASOS",
    style: "formal",
    price: 185,
    match: 84,
    category: "Bottoms",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d27?auto=format&fit=crop&w=900&q=80",
    url: "https://www.asos.com/"
  },
  {
    name: "Graphic Streetwear Hoodie",
    store: "Farfetch",
    style: "street",
    price: 390,
    match: 81,
    category: "Sweats",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",
    url: "https://www.farfetch.com/"
  },
  {
    name: "Structured Crossbody Bag",
    store: "Charles & Keith",
    style: "casual",
    price: 275,
    match: 79,
    category: "Bags",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80",
    url: "https://www.charleskeith.com/"
  },
  {
    name: "Minimal Satin Slip Dress",
    store: "Net-a-Porter",
    style: "formal",
    price: 440,
    match: 78,
    category: "Dresses",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80",
    url: "https://www.net-a-porter.com/"
  },
  {
    name: "Soft Knit Co-ord Set",
    store: "Ounass",
    style: "casual",
    price: 210,
    match: 90,
    category: "Sets",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
    url: "https://www.ounass.ae/"
  },
  {
    name: "Chunky Sole Ankle Boots",
    store: "Namshi",
    style: "street",
    price: 260,
    match: 87,
    category: "Shoes",
    image: "https://images.unsplash.com/photo-1608256246200-53e8b47b8f3e?auto=format&fit=crop&w=900&q=80",
    url: "https://www.namshi.com/"
  },
  {
    name: "Silk Feel Printed Scarf",
    store: "Massimo Dutti",
    style: "formal",
    price: 125,
    match: 82,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=900&q=80",
    url: "https://www.massimodutti.com/"
  }
];

const uploadInput = document.querySelector("#outfitUpload");
const dropZone = document.querySelector("#dropZone");
const previewCard = document.querySelector("#previewCard");
const previewImage = document.querySelector("#previewImage");
const removeImage = document.querySelector("#removeImage");
const analyzeButton = document.querySelector("#analyzeButton");
const budgetRange = document.querySelector("#budgetRange");
const budgetValue = document.querySelector("#budgetValue");
const productGrid = document.querySelector("#productGrid");
const resultTitle = document.querySelector("#resultTitle");
const sortSelect = document.querySelector("#sortSelect");
const vibeLabel = document.querySelector("#vibeLabel");
const confidenceLabel = document.querySelector("#confidenceLabel");
const todayDate = document.querySelector("#todayDate");
const styleButtons = document.querySelectorAll(".segment");
const trendButtons = document.querySelectorAll(".trend-chips button");

let selectedStyle = "all";
let hasUpload = false;

function money(value) {
  return `AED ${value}`;
}

function setTodayDate() {
  const today = new Date();
  todayDate.dateTime = today.toISOString().slice(0, 10);
  todayDate.textContent = today.toLocaleDateString("en-AE", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function renderProducts() {
  const maxBudget = Number(budgetRange.value);
  const sortMode = sortSelect.value;
  let visibleProducts = products.filter((product) => {
    const matchesStyle = selectedStyle === "all" || product.style === selectedStyle;
    return matchesStyle && product.price <= maxBudget;
  });

  if (sortMode === "price-low") {
    visibleProducts.sort((a, b) => a.price - b.price);
  }

  if (sortMode === "price-high") {
    visibleProducts.sort((a, b) => b.price - a.price);
  }

  if (sortMode === "match") {
    visibleProducts.sort((a, b) => b.match - a.match);
  }

  resultTitle.textContent = `${visibleProducts.length} shoppable matches`;

  if (!visibleProducts.length) {
    productGrid.innerHTML = `
      <div class="empty-state">
        <strong>No matches inside this budget</strong>
        <p>Increase the budget or switch the style focus to see more outfit options.</p>
      </div>
    `;
    return;
  }

  productGrid.innerHTML = visibleProducts.map((product) => `
    <article class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
        <span class="match-badge">${product.match}% match</span>
      </div>
      <div class="product-body">
        <div class="product-meta">
          <span>${product.store}</span>
          <span>${product.category}</span>
        </div>
        <div class="product-name">${product.name}</div>
        <div class="price-row">
          <span class="price">${money(product.price)}</span>
          <a class="shop-link" href="${product.url}" target="_blank" rel="noopener">Buy similar</a>
        </div>
      </div>
    </article>
  `).join("");
}

function setPreview(file) {
  if (!file || !file.type.startsWith("image/")) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    previewImage.src = event.target.result;
    previewCard.classList.add("visible");
    dropZone.style.display = "none";
    hasUpload = true;
    confidenceLabel.textContent = "Image ready";
  };
  reader.readAsDataURL(file);
}

function analyzeOutfit() {
  if (!hasUpload) {
    confidenceLabel.textContent = "Upload needed";
    dropZone.classList.add("dragging");
    setTimeout(() => dropZone.classList.remove("dragging"), 650);
    return;
  }

  const vibes = {
    all: "Balanced wardrobe match",
    casual: "Clean everyday casual",
    formal: "Polished tailored look",
    street: "Relaxed street style"
  };

  vibeLabel.textContent = vibes[selectedStyle];
  confidenceLabel.textContent = "94% visual match";
  renderProducts();
}

uploadInput.addEventListener("change", (event) => {
  setPreview(event.target.files[0]);
});

dropZone.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropZone.classList.add("dragging");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("dragging");
});

dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  dropZone.classList.remove("dragging");
  setPreview(event.dataTransfer.files[0]);
});

removeImage.addEventListener("click", () => {
  uploadInput.value = "";
  previewImage.removeAttribute("src");
  previewCard.classList.remove("visible");
  dropZone.style.display = "grid";
  hasUpload = false;
  confidenceLabel.textContent = "Ready after upload";
});

styleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    styleButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    selectedStyle = button.dataset.style;
    renderProducts();
  });
});

trendButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const style = button.dataset.style;
    const matchingSegment = document.querySelector(`.segment[data-style="${style}"]`);

    if (matchingSegment) {
      matchingSegment.click();
    }
  });
});

budgetRange.addEventListener("input", () => {
  budgetValue.textContent = money(budgetRange.value);
  renderProducts();
});

sortSelect.addEventListener("change", renderProducts);
analyzeButton.addEventListener("click", analyzeOutfit);

setTodayDate();
renderProducts();
