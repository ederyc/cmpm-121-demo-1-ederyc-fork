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
const upgradeCount: { [key: string]: number } = {
  "Flyers 📄": 0,
  "Public Speech 🎤": 0,
  "TV AD 📺": 0,
  "Social Media Campaign 📱": 0,
  "Community Events 🎉": 0,
};

// Growth rate and upgrade count displays
const growthRateDisplay = document.createElement("p");
const upgradeCountDisplay = document.createElement("p");

app.append(growthRateDisplay);
app.append(upgradeCountDisplay);

// Add button incrementer
let click_count: number = 0;
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
  button.textContent = `Supporters 🇺🇸 x ${click_count.toFixed(2)}`;

  // Check to see if the player has the amount required to upgrade
  upgradeButtons.forEach((upgrade) => {
    if (click_count >= upgrade.cost) {
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

function updateUpgradesCount() {
  upgradeCountDisplay.innerHTML = `
    Upgrades Purchased:
    <ul>
      <li>Flyers 📄: ${upgradeCount["Flyers 📄"]}</li>
      <li>Public Speech 🎤: ${upgradeCount["Public Speech 🎤"]}</li>
      <li>TV AD 📺: ${upgradeCount["TV AD 📺"]}</li>
      <li>Social Media Campaign 📱: ${upgradeCount["Social Media Campaign 📱"]}</li>
      <li>Community Events 🎉: ${upgradeCount["Community Events 🎉"]}</li>
    </ul>`;
}

// Event listener for main button
button.addEventListener("click", () => {
  click_count++;
  updateButtonText();
});

// Increment function for growth rate
function interval_incr(current: number) {
  const diff = (current - previous) / 1000;
  click_count += growthRate * diff;
  updateButtonText();
  previous = current;

  requestAnimationFrame(interval_incr);
}

// Add event listeners for each upgrade button
upgradeButtons.forEach((upgrade) => {
  upgrade.button.addEventListener("click", () => {
    if (click_count >= upgrade.cost) {
      click_count -= upgrade.cost;
      growthRate += upgrade.rate;
      upgradeCount[upgrade.button.id]++;
      upgrade.cost = upgrade.cost * 1.15; // Increase cost for next purchase
      updateButtonText();
    }
  });
});

requestAnimationFrame(interval_incr);
