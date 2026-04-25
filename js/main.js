const photos = window.GALLERY_PHOTOS || [];
let activeFilter = 'Todos';
let currentIndex = 0;

const loader = document.getElementById('loader');
const header = document.getElementById('siteHeader');
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
const galleryGrid = document.getElementById('galleryGrid');
const marqueeTrack = document.getElementById('marqueeTrack');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const currentYearEl = document.getElementById('currentYear');

if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();

window.addEventListener('load', () => {
  setTimeout(() => loader.classList.add('hide'), 450);
});

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

navToggle?.addEventListener('click', () => mainNav.classList.toggle('open'));
mainNav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mainNav.classList.remove('open'));
});

function filteredPhotos() {
  return activeFilter === 'Todos' ? photos : photos.filter(photo => photo.category === activeFilter);
}

function renderGallery() {
  if (!galleryGrid) return;
  galleryGrid.innerHTML = '';

  filteredPhotos().forEach((photo, index) => {
    const item = document.createElement('button');
    item.className = 'gallery-item';
    item.style.animationDelay = `${index * 65}ms`;
    item.innerHTML = `
      <img src="${photo.thumb || photo.src}" alt="${photo.title}" loading="lazy">
      <div class="gallery-overlay">
        <h3>${photo.title}</h3>
        <p>${photo.description}</p>
      </div>`;

    item.addEventListener('click', () => openLightbox(index));
    galleryGrid.appendChild(item);
  });
}

function renderMarquee() {
  if (!marqueeTrack) return;
  const doubled = [...photos, ...photos, ...photos];
  marqueeTrack.innerHTML = doubled.map(photo => `<img src="${photo.thumb || photo.src}" alt="${photo.title}" loading="lazy">`).join('');
}

function openLightbox(index) {
  const list = filteredPhotos();
  currentIndex = index;
  const photo = list[currentIndex];
  if (!photo) return;

  lightboxImg.src = photo.src;
  lightboxCaption.textContent = `${photo.title} · ${photo.category}`;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function moveLightbox(direction) {
  const list = filteredPhotos();
  currentIndex = (currentIndex + direction + list.length) % list.length;
  openLightbox(currentIndex);
}

document.getElementById('closeLightbox')?.addEventListener('click', closeLightbox);
document.getElementById('prevPhoto')?.addEventListener('click', () => moveLightbox(-1));
document.getElementById('nextPhoto')?.addEventListener('click', () => moveLightbox(1));

lightbox?.addEventListener('click', event => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', event => {
  if (!lightbox.classList.contains('open')) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') moveLightbox(-1);
  if (event.key === 'ArrowRight') moveLightbox(1);
});

document.getElementById('filterBar')?.addEventListener('click', event => {
  if (!event.target.matches('button')) return;
  activeFilter = event.target.dataset.filter;
  document.querySelectorAll('#filterBar button').forEach(button => button.classList.remove('active'));
  event.target.classList.add('active');
  renderGallery();
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

document.getElementById('bookingForm')?.addEventListener('submit', event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  const subject = encodeURIComponent(`Solicitud de fotografía - ${data.evento || 'Evento'} - ${data.fecha || ''}`);
  const body = encodeURIComponent(
`Hola Alejandro Castillo Fotografía,

Quiero información para mi evento.

Nombre: ${data.nombre}
Correo: ${data.correo}
Teléfono/WhatsApp: ${data.telefono || 'No indicado'}
Fecha: ${data.fecha}
Tipo de evento: ${data.evento}
Ciudad/locación: ${data.locacion}

Idea del evento:
${data.mensaje || 'No indicado'}

Gracias.`
  );

  const email = (window.SITE_CONFIG && window.SITE_CONFIG.contactEmail) || 'contacto@alejandrocastillofotografia.com';
  const formStatus = document.getElementById('formStatus');
  if (formStatus) formStatus.textContent = 'Abriendo tu correo para enviar la solicitud...';
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
});

renderGallery();
renderMarquee();
