import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Eder's super spectacular game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//add button incrementer
let click_count: number = 0;

const button = document.querySelector(".favorite") as HTMLButtonElement;

button.addEventListener("click", () => {
  click_count++;
  button.textContent = `😏 Oh My x ${click_count}`;
});
