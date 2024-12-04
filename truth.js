const cards = document.querySelectorAll('.card');
const modal = document.getElementById('modal');
const questionText = document.getElementById('question-text');
const closeBtn = document.getElementById('close-btn');
const backBtn = document.getElementById('back-btn');

// Daftar pertanyaan yang ada pada kartu
const questions = [
  "Hal apa yang dapat memperbaiki moodmu ketika sedih? (Area tersembunyi)",
  "Apa impian rahasia yang tidak pernah kamu bagikan kepada orang lain? (Area tersembunyi)",
  "Apa komentar terburuk yang pernah kamu terima dari seseorang? (Area tersembunyi)",
  "Apa kebiasaanmu yang orang lain kenal banget? (Area terbuka)",
  "Apa kelebihan dan kekuranganmu yang diketahui orang lain? (Area terbuka)",
  "Bagaimana kamu menggambarkan dirimu sendiri dalam satu kata dan kenapa? (Area tersembunyi)"
];

// Fungsi untuk mengacak urutan pertanyaan
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Tukar elemen
  }
}

// Mengacak daftar pertanyaan dan memasukkan ke kartu
function randomizeCards() {
  shuffle(questions); // Mengacak urutan pertanyaan

  // Menambahkan pertanyaan acak ke setiap kartu
  cards.forEach((card, index) => {
    card.setAttribute('data-question', questions[index]);
    const cardContent = card.querySelector('.card-content');
    cardContent.textContent = "Klik untuk Membuka"; // Reset teks konten
  });
}

// Tambahkan event listener untuk setiap kartu
cards.forEach((card) => {
  card.addEventListener('click', () => {
    const question = card.getAttribute('data-question');
    card.classList.add('open'); // Ubah desain kartu menjadi "terbuka"
    const cardContent = card.querySelector('.card-content');
    cardContent.textContent = question.slice(0, 20) + '...'; // Tampilkan bagian dari pertanyaan di kartu
    showModal(question); // Tampilkan pertanyaan dalam modal
  });
});

// Fungsi untuk menampilkan modal
function showModal(question) {
  questionText.textContent = question; // Tampilkan pertanyaan lengkap
  modal.style.display = 'flex'; // Tampilkan modal
}

// Event untuk menutup modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none'; // Sembunyikan modal
});

// Event untuk tombol Back
backBtn.addEventListener('click', () => {
  const eliminatedPlayers = JSON.parse(localStorage.getItem('eliminatedPlayers')) || [];
  localStorage.setItem('returnFromTruth', JSON.stringify(eliminatedPlayers)); // Simpan data ke LocalStorage
  window.location.href = "game.html"; // Ganti dengan URL halaman roda spin
});

// Tambahkan efek hover animasi pada kartu saat di-load
cards.forEach((card) => {
  card.addEventListener('mouseover', () => {
    card.style.transform = 'scale(1.05)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'scale(1)';
  });
});

// Fungsi untuk mereset kartu saat halaman di-refresh
function resetCards() {
  cards.forEach((card) => {
    card.classList.remove('open');
    const cardContent = card.querySelector('.card-content');
    cardContent.textContent = "Klik untuk Jawaban";
  });
}

// Mengacak kartu dan mereset saat halaman dimuat
window.onload = () => {
  resetCards();
  randomizeCards();
};
