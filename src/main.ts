import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Pushing Politics";
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
    button: document.querySelector("#Flyers") as HTMLButtonElement,
    cost: 10,
    rate: 0.1,
  },
  {
    button: document.querySelector("#Public_Speech") as HTMLButtonElement,
    cost: 100,
    rate: 2.0,
  },
  {
    button: document.querySelector("#TV_AD") as HTMLButtonElement,
    cost: 1000,
    rate: 5.0,
  },
];

//amount was only being displayed when button was
//clicked so this now constantly updates the amount of units being displayed
function updateButtonText() {
  button.textContent = `Supporters 🇺🇸 x ${click_count.toFixed(2)}`;

  //check to see if player has amount required to upgrade
  upgrades.forEach((upgrade) => {
    if (click_count >= upgrade.cost) {
      upgrade.button.disabled = false;
    } else {
      upgrade.button.disabled = true;
    }

    upgrade.button.textContent = `Buy ${upgrade.button.id} (${upgrade.cost.toFixed(2)} units, +${upgrade.rate} unit/sec)`;
  });

  updateGrowthRate();
  updateUpgradesCount();
}

function updateGrowthRate() {
  growthRateDisplay.textContent = `Current Growth Rate is ${growthRate.toFixed(2)} supporters/sec`;
}

function updateUpgradesCount() {
  upgradeCountDisplay.innerHTML = `
    Upgrades Purchased:
    <ul>
      <li>Flyers: ${upgradeCount.A}</li>
      <li>Public Speech: ${upgradeCount.B}</li>
      <li>TV AD: ${upgradeCount.C}</li>
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
      upgradeCount[upgrade.button.id]++;
      upgrade.cost = upgrade.cost * 1.15;
      updateButtonText();
    }
  });
});

requestAnimationFrame(interval_incr);
