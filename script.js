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