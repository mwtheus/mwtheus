window['__id'] = "POnNGSoErq7GLkj";
window['__api'] = "http://localhost:27585";
/**
 * Edite este array para adicionar/remover seus projetos.
 * Cada objeto vira um card na seção "Projetos".
 *
 * image: caminho para o arquivo dentro de assets/projects/
 *        (coloque suas imagens ali). Deixe null para usar um
 *        placeholder de texto no lugar da imagem.
 * link:  URL do projeto (site, repositório, etc). Deixe null
 *        para não mostrar o link.
 */
const PROJECTS = [
  {
    title: "Yrkit",
    description: "IDE em nuvem que venho construindo sozinho desde 2021, com linguagem própria (yr-lang) e sistema de billing integrado.",
    image: null,
    tags: ["Node.js", "IDE", "SaaS"],
    link: "https://yrkit.com"
  },
  {
    title: "Nome do projeto 2",
    description: "Descrição curta do projeto — troque por um resumo real do que foi feito e qual problema resolveu.",
    image: null,
    tags: ["tag1", "tag2"],
    link: null
  },
  {
    title: "Nome do projeto 3",
    description: "Descrição curta do projeto — troque por um resumo real do que foi feito e qual problema resolveu.",
    image: null,
    tags: ["tag1", "tag2"],
    link: null
  }
];
// ---------- Ano no rodapé ----------
document.getElementById("year").textContent = new Date().getFullYear();
// ---------- Renderiza os cards de projeto a partir de js/projects.js ----------
const grid = document.getElementById("projects-grid");
function renderProjects(projects) {
  grid.innerHTML = projects.map(p => `
    <article class="project-card">
      <div class="project-card__media">
        ${p.image
          ? `<img src="${p.image}" alt="${p.title}" loading="lazy">`
          : `<span class="project-card__media--placeholder">adicione uma imagem em<br>assets/projects/</span>`
        }
      </div>
      <div class="project-card__body">
        <h3 class="project-card__title">${p.title}</h3>
        <p class="project-card__desc">${p.description}</p>
        <div class="project-card__tags">
          ${p.tags.map(t => `<span class="project-card__tag">${t}</span>`).join("")}
        </div>
        ${p.link ? `<a class="project-card__link" href="${p.link}" target="_blank" rel="noopener">ver projeto →</a>` : ""}
      </div>
    </article>
  `).join("");
}
if (typeof PROJECTS !== "undefined") renderProjects(PROJECTS);
// ---------- Efeito de digitação no subtítulo do hero ----------
const phrases = [
  "full-stack developer",
  "criador da Yrkit",
  "automações & bots",
  "APIs sob medida"
];
const typewriterEl = document.getElementById("typewriter");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduceMotion) {
  typewriterEl.textContent = phrases[0];
} else {
  let phraseIndex = 0, charIndex = 0, deleting = false;
  function tick() {
    const current = phrases[phraseIndex];
    charIndex += deleting ? -1 : 1;
    typewriterEl.textContent = current.slice(0, charIndex);
    let delay = deleting ? 40 : 80;
    if (!deleting && charIndex === current.length) {
      delay = 1800;
      deleting = true;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 300;
    }
    setTimeout(tick, delay);
  }
  tick();
}
// ---------- Aba ativa + número da linha no gutter, conforme a seção visível ----------
const sections = document.querySelectorAll(".section");
const tabs = document.querySelectorAll(".tab");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      tabs.forEach(t => t.classList.toggle("is-active", t.dataset.tab === id));
    }
  });
}, { rootMargin: "-40% 0px -50% 0px" });
sections.forEach(s => observer.observe(s));
