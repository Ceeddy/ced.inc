// Smooth scrolling for in-page links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if(id.length > 1){
      e.preventDefault();
      const el = document.querySelector(id);
      if(el){
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', id);
      }
    }
  });
});

// Mobile menu toggle
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if(toggle){
  toggle.addEventListener('click', () => {
    const open = nav.style.display === 'flex';
    nav.style.display = open ? 'none' : 'flex';
    toggle.setAttribute('aria-expanded', String(!open));
  });
}

// Scroll spy for nav active state
const sections = Array.from(document.querySelectorAll('section[id]'));
const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const spy = () => {
  let current = sections[0].id;
  for(const s of sections){
    const rect = s.getBoundingClientRect();
    if(rect.top <= 120 && rect.bottom >= 120){ current = s.id; break; }
  }
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};
document.addEventListener('scroll', spy, { passive: true });
window.addEventListener('load', spy);

// Reveal on scroll via IntersectionObserver
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
}, { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Fake "Book a Call" handler (replace with actual link)
document.getElementById('book-call')?.addEventListener('click', (e) => {
  e.preventDefault();
  alert('Hook this up to Calendly/Google Meet/Zoom.');
});

// Project modal data
const PROJECTS = {
  dashboard: {
    title: "E‑commerce Dashboard",
    desc: "A modular dashboard with real‑time analytics, inventory insights, and smart alerts for operators.",
    tech: ["React", "TypeScript", "Tailwind"],
    img: "./assets/img/project-dashboard.svg"
  },
  banking: {
    title: "Mobile Banking",
    desc: "Biometric auth, instant transfers, and proactive budgeting cues in a native mobile experience.",
    tech: ["Figma", "Prototyping", "iOS"],
    img: "./assets/img/project-banking.svg"
  },
  crm: {
    title: "AI‑Powered CRM",
    desc: "Predictive lead scoring and churn signals that help sales teams focus on what's likely to convert.",
    tech: ["Python", "TensorFlow", "React"],
    img: "./assets/img/project-crm.svg"
  }
};

// Modal open/close
const modal = document.getElementById('project-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalTech = document.getElementById('modal-tech');
const closeBtn = document.querySelector('.modal-close');

document.querySelectorAll('.open-modal').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.project;
    const data = PROJECTS[key];
    if(!data) return;
    modalImg.src = data.img;
    modalImg.alt = data.title;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    modalTech.innerHTML = data.tech.map(t => `<li>${t}</li>`).join('');
    modal.showModal();
  });
});

closeBtn?.addEventListener('click', () => modal.close());
modal?.addEventListener('click', (e) => {
  const rect = modal.querySelector('.modal-content').getBoundingClientRect();
  const inContent = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
  if(!inContent) modal.close();
});

// Contact form (client-only)
document.getElementById('contact-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const msg = form.querySelector('.form-msg');
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const details = form.details.value.trim();

  if(!name || !email || !details){
    msg.textContent = "Please fill out all fields.";
    return;
  }
  // Simple email check
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    msg.textContent = "Please enter a valid email address.";
    return;
  }
  msg.textContent = "Hey! Thanks for reaching out. I’ll respond within a day, promise.";
});
const lightbox = document.getElementById("lightbox");
const lightboxContent = document.getElementById("lightbox-content");
const lightboxCloseBtn = document.querySelector(".lightbox-close");

document.querySelectorAll(".lightbox-img").forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxContent.src = img.src;
  });
});

lightboxCloseBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Also close when clicking outside image
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});

