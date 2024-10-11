import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Eder's super spectacular game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//upgrade count tracker
const upgradeCount: { [key: string]: number } = { 
  A: 0,
  B: 0,
  C: 0,
};

//growthRate and upgradeCount displays
const growthRateDisplay = document.createElement("p");
const upgradeCountDisplay = document.createElement("p");

app.append(growthRateDisplay);
app.append(upgradeCountDisplay);

//add button incrementer
let click_count: number = 0;
let previous: number = performance.now();
let growthRate: number = 0;

//buttons
const button = document.querySelector(".favorite") as HTMLButtonElement;
const upgrades = [
  {
    button: document.querySelector("#AUpgr") as HTMLButtonElement, cost: 10, rate: 0.1, name: "A",
  },
  {
    button: document.querySelector("#BUpgr") as HTMLButtonElement, cost: 100, rate: 2.0, name: "B",
  },
  {
    button: document.querySelector("#CUpgr") as HTMLButtonElement, cost: 1000, rate: 5.0, name: "C",
  },
];

//amount was only being displayed when button was
//clicked so this now constantly updates the amount of units being displayed
function updateButtonText() {
  button.textContent = `😏 Oh My x ${click_count.toFixed(2)}`;

  //check to see if player has amount required to upgrade
  upgrades.forEach(upgrade => {
    if (click_count >= upgrade.cost) {
      upgrade.button.disabled = false;
    } else {
      upgrade.button.disabled = true;
    }
  });

  updateGrowthRate();
  updateUpgradesCount();
}

function updateGrowthRate() {
  growthRateDisplay.textContent = `Current Growth Rate is ${growthRate.toFixed(2)} 😏/sec`;
}

function updateUpgradesCount() {
  upgradeCountDisplay.innerHTML = `
    Upgrades Purchased:
    <ul>
      <li>A: ${upgradeCount.A}</li>
      <li>B: ${upgradeCount.B}</li>
      <li>C: ${upgradeCount.C}</li>
    </ul>`;
}

// Event listener for main button
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

// Add event listeners for each upgrade
upgrades.forEach((upgrade) => {
  upgrade.button.addEventListener("click", () => {
    if (click_count >= upgrade.cost) {
      click_count -= upgrade.cost;
      growthRate += upgrade.rate;
      upgradeCount[upgrade.name as "A" | "B" | "C"]++;      
      updateButtonText();
    }
  });
});



requestAnimationFrame(interval_incr);
