const header = document.querySelector("header");
const canvas = document.getElementById("dots");

canvas.width = header.offsetWidth;
canvas.height = header.offsetHeight;

const ctx = canvas.getContext("2d");

const dots = [];

const colors = [
  "#FFC312",
  "#C4E538",
  "#12CBC4",
  "#FDA7DF",
  "#ED4C67",
  "#F79F1F",
  "#A3CB38",
  "#1289A7",
  "#D980FA",
  "#B53471",
  "#EE5A24",
  "#009432",
  "#0652DD",
  "#9980FA",
  "#833471",
  "#EA2027",
  "#006266",
  "#1B1464",
  "#5758BB",
  "#6F1E51",
];

// create dots randomly
for (let i = 0; i < 100; i++) {
  dots.push({
    x: Math.floor(Math.random() * canvas.width),
    y: Math.floor(Math.random() * canvas.height),
    size: Math.random() * 5 + 2,
    color: colors[Math.floor(Math.random() * colors.length)],
  });
}

// draw dots on canvas
const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dots.forEach((dot) => {
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = dot.color;
    ctx.fill();
  });
};

// clear canvas
const clearRect = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

// create lines between dots and mouse pointer
const createLines = (event) => {
  clearRect();
  draw();
  dots.forEach((dot) => {
    const distance = Math.sqrt(
      Math.pow(event.clientX - dot.x, 2) + Math.pow(event.clientY - dot.y, 2)
    );

    if (distance < 300) {
      ctx.beginPath();
      ctx.moveTo(event.clientX, event.clientY);
      ctx.lineTo(dot.x, dot.y);
      ctx.strokeStyle = dot.color;
      ctx.stroke();
    }
  });
};

draw();

// create lines when mouse moves
document.addEventListener("mousemove", (e) => {
  createLines(e);
});
// clear canvas when mouse leaves
document.addEventListener("mouseleave", () => {
  clearRect();
  draw();
});
