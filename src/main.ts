import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Eder's super spectacular game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//add button incrementer
let click_count: number = 0;
let previous: number = performance.now();

const button = document.querySelector(".favorite") as HTMLButtonElement;

//amount was only being displayed when button was
//clicked so this now constantly updates the amount of units being displayed
function updateButtonText() {
  button.textContent = `😏 Oh My x ${click_count.toFixed(2)}`;
}

button.addEventListener("click", () => {
  click_count++;
  updateButtonText();
});

function interval_incr(current: number) {
  const diff = (current - previous) / 1000;
  click_count += diff;
  updateButtonText();
  previous = current;

  requestAnimationFrame(interval_incr);
}

requestAnimationFrame(interval_incr);

