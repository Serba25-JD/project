document.addEventListener('DOMContentLoaded', function() {
    const gameLevel = ['noob', 'easy', 'medium', 'hard', 'extreme'];
    function getRandomLevel() {
        return gameLevel[Math.floor(Math.random() * gameLevel.length)];
    };
    const apiUrl = `https://api-nanzz.my.id/docs/api/game/matematika.php?level=${getRandomLevel()}`;
    let answerRight = null;
    let playGame = false;
    let scoreGame = 0;
    let score = Number(sessionStorage.getItem('scoreGame')) || 0;
    const questText = document.getElementById('quest');
    const answerText = document.getElementById('answer-text');
    document.getElementById('play').addEventListener('click', function() {
        playGame = true;
        clearShowAlert();
        fetch(apiUrl)
        .then(response => {
            if(!response.ok) {
                throw new Error('Gagal mengambil data');
            }
            return response.json();
        })
        .then(data => {
            const quest = data.result.str;
            answerRight = data.result.result;
            scoreGame = data.result.bonus;
            questText.textContent = quest;
        })
        .catch(error => {
            console.error(error);
        });
    });
    document.getElementById('answer-btn').addEventListener('click', function() {
        clearShowAlert();
        if(!playGame) {
           showAlert('Silahkan klik mulai game terlebih dahulu!');
        } else {
            const value = answerText.value.trim();
            if(value === '') {
               showAlert('Masukkan jawaban dulu!');
                return;
            };
            if (isNaN(value)) {
               showAlert('Harus angka!');
                answerText.value = '';
                return;
            };
            const answerUser = Number(value);
            if(answerRight === answerUser) {
               showAlert(`Jawaban Benar! Kamu Mendapatkan ${scoreGame} poin`);
               score += scoreGame;
               updateScore();
               answerText.value = '';
               questText.textContent = 'Silahkan mulai game kembali!';
               playGame = false;
            } else {
               showAlert('Salah! Coba Jawab lagi.');
                answerText.value = '';
            };
        };
    });
    document.getElementById('reset').addEventListener('click', function() {
        answerRight = null;
        playGame = false;
        questText.textContent = 'Soal muncul disini!';
        answerText.value = '';
    });
    function showAlert(text) {
        const popupContent = document.getElementById('popup');
        popupContent.classList.remove('hidden');
        const popupText = document.getElementById('popup-text');
        popupText.textContent = text;
    };
    function clearShowAlert() {
        const popupContent = document.getElementById('popup');
        if (!popupContent.classList.contains('hidden')) {
            popupContent.classList.add('hidden');
        };
    };
    function updateScore() {
        sessionStorage.setItem('scoreGame', score);
        const scoreText = document.getElementById('score');
        scoreText.textContent = score;
    };
});