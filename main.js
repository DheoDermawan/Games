let container = document.querySelector(".container");
let startButton = document.getElementById("start");
let spinButton = document.getElementById("spin");
let eliminateButton = document.getElementById("eliminate");
let truthButton = document.getElementById("truth");
let dareButton = document.getElementById("dare");
let namesInput = document.getElementById("names");
let setupSection = document.querySelector(".setup");
let gameSection = document.querySelector(".game");
let resultText = document.getElementById("result-text").querySelector("span");
let resetButton = document.getElementById("reset");
let backToMenuButton = document.getElementById("back-to-menu"); // Tombol Back to Menu

let rotation = 0;
let namesArray = [];

// Fungsi untuk memuat nama-nama dari localStorage
function loadNames() {
  const savedNames = localStorage.getItem('namesArray');
  if (savedNames) {
    namesArray = JSON.parse(savedNames);
    if (namesArray.length > 0) {
      createWheel(namesArray);
      setupSection.style.display = "none";
      gameSection.style.display = "block";
    }
  }
}

// Memuat nama-nama saat halaman dimuat
window.onload = loadNames;

// Event listener untuk tombol "Create Wheel"
startButton.onclick = function () {
  namesArray = namesInput.value.split(",").map((name) => name.trim()).filter(Boolean);

  if (namesArray.length < 2) {
    alert("Please enter at least two names!");
    return;
  }

  createWheel(namesArray);
  localStorage.setItem('namesArray', JSON.stringify(namesArray)); // Simpan nama-nama ke localStorage
  setupSection.style.display = "none";
  gameSection.style.display = "block";
};

// Fungsi untuk membuat roda spin
function createWheel(names) {
  container.innerHTML = "";
  let angle = 360 / names.length;

  names.forEach((name, index) => {
    let segment = document.createElement("div");
    segment.textContent = name;
    segment.style.backgroundColor = getRandomColor();
    segment.style.transform = `rotate(${index * angle}deg)`;
    container.appendChild(segment);
  });
}

// Fungsi untuk memutar roda
spinButton.onclick = function () {
  if (namesArray.length === 0) {
    alert("All names have been chosen! Reset the game to play again.");
    return;
  }

  let randomDegree = Math.ceil(Math.random() * 360) + 720; // Minimal 2 putaran penuh
  rotation += randomDegree;

  container.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {
    let result = getSpinResult(rotation, namesArray.length);
    resultText.textContent = result;

    eliminateButton.style.display = "inline-block";

    eliminateButton.onclick = function () {
      eliminateWinner(result);
    };
  }, 5000); // Sesuai dengan waktu animasi roda
};

// Fungsi untuk menentukan hasil
function getSpinResult(degree, segments) {
  let anglePerSegment = 360 / segments;
  let adjustedDegree = degree % 360;
  let segmentIndex = Math.floor(adjustedDegree / anglePerSegment);
  return container.children[segments - 1 - segmentIndex].textContent;
}

// Fungsi untuk mendapatkan warna acak
function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Fungsi untuk eliminasi nama pemenang dengan animasi
function eliminateWinner(winner) {
  let segments = Array.from(container.children);
  let targetSegment = segments.find((segment) => segment.textContent === winner);

  if (targetSegment) {
    targetSegment.style.transition = "opacity 1s, transform 1s";
    targetSegment.style.opacity = 0;
    targetSegment.style.transform = "scale(0.5)";

    setTimeout(() => {
      namesArray = namesArray.filter((name) => name !== winner);
      localStorage.setItem('namesArray', JSON.stringify(namesArray)); // Simpan nama-nama yang tersisa ke localStorage
      createWheel(namesArray);

      eliminateButton.style.display = "none";
      resultText.textContent = "-";
    }, 1000);
  }
}

// Event listener untuk tombol Truth
truthButton.onclick = function () {
  window.location.href = "truth.html";
};

// Event listener untuk tombol Dare
dareButton.onclick = function () {
  window.location.href = "dare.html";
};

// Event listener untuk tombol Reset
resetButton.onclick = function () {
  // Menghapus data di localStorage
  localStorage.removeItem('namesArray');
  namesArray = [];  // Reset array nama
  createWheel(namesArray);  // Mengupdate roda dengan array kosong

  // Menampilkan kembali halaman setup dan menyembunyikan halaman game
  setupSection.style.display = "block";
  gameSection.style.display = "none";

  // Mengatur ulang teks hasil
  resultText.textContent = "-";
  eliminateButton.style.display = "none";  // Menyembunyikan tombol eliminasi
};

// Menambahkan event listener untuk tombol Back to Menu
backToMenuButton.onclick = function () {
  // Mengarahkan pengguna ke halaman utama
  window.location.href = "index.html";
};

