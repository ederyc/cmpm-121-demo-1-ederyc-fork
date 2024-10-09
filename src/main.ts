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
let growthRate: number = 0;


//buttons
const button = document.querySelector(".favorite") as HTMLButtonElement;
const upgradeButton = document.createElement("button");
upgradeButton.textContent = "Automatic 😏'er!!\n(costs 10 😏)";
upgradeButton.disabled = true;
app.append(upgradeButton);

//amount was only being displayed when button was
//clicked so this now constantly updates the amount of units being displayed
function updateButtonText() {
  button.textContent = `😏 Oh My x ${click_count.toFixed(2)}`;

  //check to see if player has at least 10 units to enable upgrade
  if (click_count >= 10) {
    upgradeButton.disabled = false;
  } else {
    upgradeButton.disabled = true;
  }
  
}

button.addEventListener("click", () => {
  click_count++;
  updateButtonText();
});

function interval_incr(current: number) {
  const diff = (current - previous) / 1000;
  click_count += growthRate * diff;
  updateButtonText();
  previous = current;

  requestAnimationFrame(interval_incr);
}

upgradeButton.addEventListener("click", () => {
  if (click_count >= 10) {
    click_count -= 10;
    growthRate += 1;
    updateButtonText();
  }

});

requestAnimationFrame(interval_incr);
