const letters = document.querySelectorAll(".letter");
const especialBtn = document.querySelector("#filler-gif");

letters.forEach((element) => {
  const letter = element.textContent.trim();
  console.log(letter);

  const img = document.createElement("img");

  if (letter == "???") {
    img.src = `img/si.gif`;
    console.log(img);
  } else {
    img.src = `img/${letter}.jpeg`;
  }

  img.classList.add("letter-img");

  element.appendChild(img);

  element.addEventListener("mouseenter", () => {
    element.classList.add("active");
  });

  element.addEventListener("mouseleave", () => {
    element.classList.remove("active");
  });
});
const button = document.getElementById("randomColorsBtn");

button.addEventListener("click", () => {

  // volver todo a verde
  letters.forEach((el) => {
    el.style.color = "rgb(70, 117, 0)";
  });

  const arr = Array.from(letters);

  // mezclar aleatorio
  const shuffled = arr.sort(() => Math.random() - 0.5);

  // 3 azules
  shuffled.slice(0, 3).forEach((el) => {
    el.style.color = "blue";
  });

  // 1 roja
  shuffled[3].style.color = "red";
});

// Foro básico: guardar posts en localStorage y renderizar
const forumKey = "forumPosts_v1";

function loadPosts() {
  try {
    const raw = localStorage.getItem(forumKey);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Error parsing posts", e);
    return [];
  }
}

function savePosts(posts) {
  localStorage.setItem(forumKey, JSON.stringify(posts));
}

function renderPosts() {
  const container = document.getElementById("postsList");
  if (!container) return;
  const posts = loadPosts();
  if (posts.length === 0) {
    container.innerHTML = "<p class='text-muted'>Aún no hay mensajes. Sé el primero en publicar.</p>";
    return;
  }
  container.innerHTML = posts
    .slice()
    .reverse()
    .map(
      (p) => `
    <div class="card mb-2" data-id="${p.id}">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <strong>${escapeHtml(p.name || 'Anónimo')}</strong>
          <small class="text-muted">${new Date(p.time).toLocaleString()}</small>
        </div>
        <p class="mt-2 mb-1">${escapeHtml(p.message)}</p>
        <div class="text-end"><button class="btn btn-sm btn-outline-danger delete-post">Eliminar</button></div>
      </div>
    </div>`
    )
    .join("");

  // attach delete handlers
  container.querySelectorAll(".delete-post").forEach((btn) => {
    btn.addEventListener("click", (ev) => {
      const card = ev.target.closest(".card");
      if (!card) return;
      const id = card.getAttribute("data-id");
      deletePost(id);
    });
  });
}

function deletePost(id) {
  const posts = loadPosts().filter((p) => String(p.id) !== String(id));
  savePosts(posts);
  renderPosts();
}

function addPost(name, message) {
  if (!message || message.trim() === "") return;
  const posts = loadPosts();
  posts.push({ id: Date.now(), name: name || 'Anónimo', message: message.trim(), time: Date.now() });
  savePosts(posts);
  renderPosts();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

document.addEventListener("DOMContentLoaded", () => {
  // inicializar render de posts
  renderPosts();

  const form = document.getElementById("forumForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("forumName").value;
      const message = document.getElementById("forumMessage").value;
      addPost(name, message);
      form.reset();
    });
  }
});