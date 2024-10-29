import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Pushing Politics 🧑‍💼👩‍💼";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Define the Item interface with a description field
interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
}

// Available items
const availableItems: Item[] = [
  {
    name: "Flyers 📄",
    cost: 10,
    rate: 0.1,
    description: "Spread the word with flyers to gain supporters!",
  },
  {
    name: "Public Speech 🎤",
    cost: 100,
    rate: 2,
    description: "Capture hearts and minds with powerful speeches!",
  },
  {
    name: "TV AD 📺",
    cost: 1000,
    rate: 5,
    description: "Reach millions through eye-catching TV advertisements!",
  },
  {
    name: "Social Media Campaign 📱",
    cost: 5000,
    rate: 10,
    description:
      "Leverage the power of social media to engage with the masses!",
  },
  {
    name: "Community Events 🎉",
    cost: 20000,
    rate: 20,
    description: "Host fun events to rally community support and engagement!",
  },
];

// Upgrade count tracker
const upgradeCount: { [key: string]: number } = {};
availableItems.forEach((item) => {
  upgradeCount[item.name] = 0;
});

// Growth rate and upgrade count displays
const growthRateDisplay = document.createElement("p");
const upgradeCountDisplay = document.createElement("p");
app.append(growthRateDisplay, upgradeCountDisplay);

// Add button incrementer
let clickCount: number = 0;
let previous: number = performance.now();
let growthRate: number = 0;

// Main button for getting supporters
const button = document.querySelector(".favorite") as HTMLButtonElement;

// Upgrade Buttons
const upgradeButtons: {
  button: HTMLButtonElement;
  cost: number;
  rate: number;
}[] = availableItems.map((item) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.className = "upgrade";
  upgradeButton.id = item.name; // Use the name as the button ID
  upgradeButton.disabled = true; // Start as disabled
  upgradeButton.innerText = `Buy ${item.name} (Cost ${item.cost}, +${item.rate} unit/sec)`;
  app.append(upgradeButton);

  return {
    button: upgradeButton,
    cost: item.cost,
    rate: item.rate,
  };
});

// Amount was only being displayed when the button was clicked, so this now constantly updates the amount of units being displayed
function updateButtonText() {
  button.textContent = `Supporters 🇺🇸 x ${clickCount.toFixed(2)}`;

  // Check to see if the player has the amount required to upgrade
  upgradeButtons.forEach((upgrade) => {
    if (clickCount >= upgrade.cost) {
      upgrade.button.disabled = false;
    } else {
      upgrade.button.disabled = true;
    }

    upgrade.button.textContent = `Buy ${upgrade.button.id} (Cost ${upgrade.cost.toFixed(2)} units, +${upgrade.rate} unit/sec)`;
  });

  updateGrowthRate();
  updateUpgradesCount();
}

function updateGrowthRate() {
  growthRateDisplay.textContent = `You Are Currently Earning ${growthRate.toFixed(2)} supporters/sec!!`;
}

// Updated updateUpgradesCount() to dynamically display upgrades
function updateUpgradesCount() {
  const upgradeList = availableItems
    .map((item) => `<li>${item.name}: ${upgradeCount[item.name]}</li>`)
    .join("");

  upgradeCountDisplay.innerHTML = `
    Upgrades Purchased:
    <ul>${upgradeList}</ul>
  `;
}

// Event listener for main button
button.addEventListener("click", () => {
  clickCount++;
  updateButtonText();
});

// Increment function for growth rate
function intervalIncr(current: number) {
  const diff = (current - previous) / 1000;
  clickCount += growthRate * diff;
  updateButtonText();
  previous = current;

  requestAnimationFrame(intervalIncr);
}

const COST_MULTIPLIER = 1.15;

// Add event listeners for each upgrade button
upgradeButtons.forEach((upgrade) => {
  upgrade.button.addEventListener("click", () => {
    if (clickCount >= upgrade.cost) {
      clickCount -= upgrade.cost;
      growthRate += upgrade.rate;
      upgradeCount[upgrade.button.id]++;
      upgrade.cost = upgrade.cost * COST_MULTIPLIER; // Increase cost for next purchase
      updateButtonText();
    }
  });
});

requestAnimationFrame(intervalIncr);
