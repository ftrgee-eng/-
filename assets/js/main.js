const formatPrice = (value) => new Intl.NumberFormat("ar-SA").format(value) + " ريال";
const $ = (selector) => document.querySelector(selector);

const year = $("#year");
if (year) year.textContent = new Date().getFullYear();

const menuToggle = $(".menu-toggle");
const navLinks = $(".nav-links");
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => navLinks.classList.toggle("visible"));
}

function uniqueValues(key) {
  return [...new Set(PROPERTIES.map((property) => property[key]))];
}

function fillSelect(id, values) {
  const select = $(id);
  if (!select) return;
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

function propertyCard(property) {
  const badge = property.featured ? '<span class="badge">مميز</span>' : '';
  return `
    <article class="property-card">
      <div class="property-image">
        <img src="${property.image}" alt="${property.title}">
        ${badge}
      </div>
      <div class="property-body">
        <div class="property-meta"><span>${property.purpose}</span><span>${property.type}</span></div>
        <h3>${property.title}</h3>
        <p>${property.city} - ${property.district}</p>
        <strong class="price">${formatPrice(property.price)}</strong>
        <div class="features">
          <span>${property.area} م²</span>
          ${property.rooms ? `<span>${property.rooms} غرف</span>` : ""}
          ${property.baths ? `<span>${property.baths} دورات مياه</span>` : ""}
        </div>
        <div class="card-actions">
          <a class="btn btn-small" href="property.html?id=${property.id}">التفاصيل</a>
          <a class="btn btn-small btn-outline" href="https://wa.me/${property.whatsapp}?text=${encodeURIComponent('السلام عليكم، أريد الاستفسار عن ' + property.title)}" target="_blank" rel="noreferrer">واتساب</a>
        </div>
      </div>
    </article>
  `;
}

function renderProperties() {
  const grid = $("#propertiesGrid");
  if (!grid) return;

  const city = $("#cityFilter")?.value || "all";
  const type = $("#typeFilter")?.value || "all";
  const purpose = $("#purposeFilter")?.value || "all";
  const maxPrice = Number($("#priceFilter")?.value || 0);

  const filtered = PROPERTIES.filter((property) => {
    return (city === "all" || property.city === city) &&
      (type === "all" || property.type === type) &&
      (purpose === "all" || property.purpose === purpose) &&
      (!maxPrice || property.price <= maxPrice);
  });

  grid.innerHTML = filtered.length
    ? filtered.map(propertyCard).join("")
    : '<div class="empty-state">لا توجد عقارات مطابقة للبحث الحالي.</div>';

  const resultCount = $("#resultCount");
  if (resultCount) resultCount.textContent = `${filtered.length} نتيجة`;
}

function renderDetails() {
  const details = $("#propertyDetails");
  if (!details) return;

  const id = Number(new URLSearchParams(window.location.search).get("id"));
  const property = PROPERTIES.find((item) => item.id === id) || PROPERTIES[0];

  details.innerHTML = `
    <div class="details-grid">
      <img class="details-image" src="${property.image}" alt="${property.title}">
      <div>
        <p class="eyebrow">${property.purpose} - ${property.type}</p>
        <h1>${property.title}</h1>
        <p class="location">${property.city} - ${property.district}</p>
        <strong class="price big">${formatPrice(property.price)}</strong>
        <p>${property.description}</p>
        <div class="features details-features">
          <span>المساحة: ${property.area} م²</span>
          ${property.rooms ? `<span>الغرف: ${property.rooms}</span>` : ""}
          ${property.baths ? `<span>دورات المياه: ${property.baths}</span>` : ""}
        </div>
        <div class="hero-actions">
          <a class="btn" href="https://wa.me/${property.whatsapp}?text=${encodeURIComponent('السلام عليكم، أريد معاينة ' + property.title)}" target="_blank" rel="noreferrer">تواصل واتساب</a>
          <a class="btn btn-outline" href="${property.mapUrl}" target="_blank" rel="noreferrer">عرض الموقع</a>
        </div>
      </div>
    </div>
  `;
}

fillSelect("#cityFilter", uniqueValues("city"));
fillSelect("#typeFilter", uniqueValues("type"));
["#cityFilter", "#typeFilter", "#purposeFilter", "#priceFilter"].forEach((id) => {
  const input = $(id);
  if (input) input.addEventListener("input", renderProperties);
});
renderProperties();
renderDetails();
