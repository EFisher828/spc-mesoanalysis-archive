// Get a reference to the day dropdown
const dayDropdown = document.getElementById('day');

// Function to populate the days dropdown based on the selected month
function populateDaysDropdown() {
  // Get the selected month value
  const selectedMonth = parseInt(document.getElementById('month').value);

  // Clear the existing options in the days dropdown
  dayDropdown.innerHTML = '';

  // Get the maximum number of days for the selected month
  const maxDays = new Date(parseInt(document.getElementById('year').value), selectedMonth, 0).getDate();

  // Populate the days dropdown with options from 1 to maxDays
  for (let i = 1; i <= maxDays; i++) {
    if (i < 10) {
      i = '0' + String(i)
    } else {
      i = String(i)
    }
    const option = document.createElement('option');
    option.value = i
    option.textContent = i;
    dayDropdown.appendChild(option);
  }
}

// Add event listeners to year and month dropdowns to update days dropdown when changed
document.getElementById('year').addEventListener('change', populateDaysDropdown);
document.getElementById('month').addEventListener('change', populateDaysDropdown);

// Call populateDaysDropdown initially to populate days dropdown based on initial year and month
populateDaysDropdown();

// Get references to HTML elements
const displayedImage = document.getElementById('displayedImage');
const yearInput = document.getElementById('year');
const monthInput = document.getElementById('month');
const dayInput = document.getElementById('day');
const hourInput = document.getElementById('hour');
const sectorSelect = document.getElementById('sector');
const variableSelect = document.getElementById('variable');
const prevHourButton = document.getElementById('prevHour');
const nextHourButton = document.getElementById('nextHour');
let variable = "pmsl"

let dateNow = new Date();
yearInput.value = String(dateNow.getUTCFullYear())
monthInput.value = String(dateNow.getUTCMonth()+1).padStart(2, '0')
dayInput.value = String(dateNow.getUTCDate()).padStart(2, '0')
hour.value = String(dateNow.getUTCHours()-1).padStart(2, '0')

// Function to update the displayed image
function updateImage() {
  const imageURL = `https://www.spc.noaa.gov/exper/mesoanalysis/${sectorSelect.value}/${variable}/${variable}_${yearInput.value.slice(2,4)}${monthInput.value}${dayInput.value}${hourInput.value}.gif`
  console.log(imageURL)
  // Create a temporary image element
  const tempImage = new Image();

  // Set the source of the temporary image to the image URL
  tempImage.src = imageURL;
  // Event listener to handle the case when the image fails to load
  tempImage.onerror = function() {
    // Set the source of the displayed image to the fallback image "unavailable.png"
    displayedImage.src = './unavailable.png';
  };

  // Event listener to handle the case when the image loads successfully
  tempImage.onload = function() {
    // Set the source of the displayed image to the specified image URL
    displayedImage.src = imageURL;
  };
}

const changeVar = (newVar) => {
  variable = newVar
  updateImage()
}

// Function to handle moving to the previous hour
function prevHour() {
  if (Number(hourInput.value) > 0) {
    if (hourInput.value <= 10) {
      hourInput.value = '0' + String(parseInt(hourInput.value) - 1);
    } else {
      hourInput.value = (parseInt(hourInput.value) - 1);
    }
  } else if (Number(hourInput.value) === 0) {
    hourInput.value = '23'
    if (dayInput.value < 9) {
      dayInput.value = '0' + String(parseInt(dayInput.value) - 1);
    } else {
      dayInput.value = String((parseInt(dayInput.value) - 1));
    }
  }
  updateImage();
}

// Function to handle moving to the next hour
function nextHour() {
  if (Number(hourInput.value) < 23) {
    if (hourInput.value < 9) {
      hourInput.value = '0' + String(parseInt(hourInput.value) + 1);
    } else {
      hourInput.value = String((parseInt(hourInput.value) + 1));
    }
  } else if (Number(hourInput.value) === 23) {
    hourInput.value = '00'
    if (dayInput.value < 9) {
      dayInput.value = '0' + String(parseInt(dayInput.value) + 1);
    } else {
      dayInput.value = String((parseInt(dayInput.value) + 1));
    }
  }
  updateImage();
}

// Add event listeners
yearInput.addEventListener('change', updateImage);
monthInput.addEventListener('change', updateImage);
dayInput.addEventListener('change', updateImage);
hourInput.addEventListener('change', updateImage);
sectorSelect.addEventListener('change', updateImage);
prevHourButton.addEventListener('click', prevHour);
nextHourButton.addEventListener('click', nextHour);

// Initial image update
updateImage();
