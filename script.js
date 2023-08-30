const totalImages = 6900;
const imageFolder = "bulls/assets/";
const metadataFolder = "bulls/metadata/";
let currentIndex = Math.floor(Math.random() * totalImages);

function getRandomIndex() {
  let newIndex = Math.floor(Math.random() * totalImages);
  while (newIndex === currentIndex) {
    newIndex = Math.floor(Math.random() * totalImages);
  }
  currentIndex = newIndex;
  return newIndex;
}

const traitRarity = {
  "Cope": 1231,
  "Mario": 549,
  "Phunk": 1232,
  "Inscribe": 1226,
  "Windows": 571,
  "Punk": 1198,
  "Matrix": 591,
  "Lambo": 302,
  "Dark Bull": 1047,
  "Alien Bull": 395,
  "Greyscale Bull": 376,
  "Cope Bull": 1042,
  "Devil Bull": 358,
  "Pepe Bull": 1069,
  "Pale Bull": 1097,
  "Phunk Bull": 1135,
  "Ape Bull": 381,
  "Hoodie": 898,
  "Wild Hair": 1384,
  "Crazy Hair": 1010,
  "Colorful Hat": 559,
  "Top Hat": 397,
  "Luxury Beard": 1508,
  "Buck Teeth": 497,
  "Handle Bars": 1200,
  "Big Beard": 882,
  "Gold Chain": 675,
  "Gold Ear Ring": 1017,
  "Gold Ring": 499,
  "Big Shades": 1247,
  "3D Glasses": 505,
  "VR Goggles": 902,
  "Shades": 1491,
  "420": 462,
  "Smoke": 1044,
  "Pipe": 648,
};

function randomizeImage() {
  const randomIndex = getRandomIndex();
  const randomImage = imageFolder + randomIndex + ".png";
  document.getElementById("randomImage").src = randomImage;

  // Fetch metadata and display the traits of the image
  const metadataUrl = metadataFolder + randomIndex + ".json";
  fetch(metadataUrl)
    .then((response) => response.json())
    .then((data) => displayTraits(data.name, data.attributes));
}

function findImage() {
  const imageNameNumber = parseInt(document.getElementById("imageNameInput").value);
  if (!isNaN(imageNameNumber) && imageNameNumber >= 1 && imageNameNumber <= totalImages) {
    const imageUrl = imageFolder + (imageNameNumber - 1) + ".png"; // Subtract 1 from the imageNameNumber
    document.getElementById("randomImage").src = imageUrl;

    // Fetch metadata and display the traits of the image
    const metadataUrl = metadataFolder + (imageNameNumber - 1) + ".json"; // Subtract 1 from the imageNameNumber
    fetch(metadataUrl)
      .then((response) => response.json())
      .then((data) => displayTraits(data.name, data.attributes));
  } else {
    alert("Invalid image name number. Please enter a number between 1 and " + totalImages);
  }
}

function displayTraits(imageName, attributes) {
  // Display the traits of the image on the page
  const traitsElement = document.getElementById("traits");
  traitsElement.innerHTML = `<h2>${imageName}</h2><h3>Traits</h3>`;

  attributes.forEach((attribute) => {
    const traitType = attribute.trait_type;
    const traitValue = attribute.value;
    const rarityValue = traitRarity[traitValue] || 0; // Get the rarity value from the traitRarity object

    const percentage = ((rarityValue / totalImages) * 100).toFixed(2);

    traitsElement.innerHTML += `
      <p>
        <strong>${traitType}:</strong>
        ${traitValue} (Rarity: ${percentage}%)
      </p>
    `;
  });
}

// Call randomizeImage initially to show a random picture on page load
randomizeImage();