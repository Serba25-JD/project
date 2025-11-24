document.addEventListener('DOMContentLoaded', function() {
    const header = document.createElement('header');
    header.setAttribute('id', 'header-container');
    const main = document.createElement('main');
    main.setAttribute('id', 'main-container');
    const footer = document.createElement('footer');
    footer.setAttribute('id', 'footer-container');
    document.body.append(header, main, footer);
    showLayout();
});

function showLayout() {
    showLayoutHeader();
    showLayoutMain();
};

function showLayoutHeader() {
    const header = document.getElementById('header-container');
    // Left
    const divLeft = document.createElement('div');
    divLeft.classList.add('header-container-content');
    const imageLeft = new Image();
    imageLeft.src = 'https://smk-katolik-mariana.infinityfreeapp.com/assets/image/SMK.png';
    imageLeft.width = '150';
    imageLeft.height = '123.56';
    imageLeft.loading = 'lazy';
    const h1 = document.createElement('h1');
    h1.textContent = 'SMK Swasta Katolik Mariana';
    divLeft.append(imageLeft, h1);
    // Right
    const divRight = document.createElement('div');
    divRight.classList.add('header-container-content');
    const userIcon = document.createElement('i');
    userIcon.setAttribute('data-feather', 'user');
    const userLogout = document.createElement('i');
    userLogout.setAttribute('data-feather', 'log-out');
    userLogout.setAttribute('id', 'user_log-out');
    const userData = localStorage.getItem('user');
    const p = document.createElement('p');
    p.textContent = userData.email;
    divRight.append(userIcon, p, userLogout);
    header.append(divLeft, divRight);
    feather.replace();
    showHeaderLogout();
};

function showHeaderLogout() {
    const userLogoutBtn = document.getElementById('user_log-out');
    userLogoutBtn.addEventListener('click', function() {
        localStorage.removeItem('user');
        window.location.href = '../';
    })
}

function formatDate(date) {
    const months = [
        "Januari","Februari","Maret","April","Mei","Juni",
        "Juli","Agustus","September","Oktober","November","Desember"
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
};

function startClock() {
    const pLeft = document.getElementById('wib-clock');
    function updateTime() {
        const options = {
            timeZone: "Asia/Jakarta",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        };
        const timeWIB = new Intl.DateTimeFormat("id-ID", options).format(new Date());
        pLeft.textContent = `Waktu: ${timeWIB}`;
    }
    updateTime();
    setInterval(updateTime, 1000);
};

function startGreetings() {
    const options = { timeZone: "Asia/Jakarta", hour: "2-digit", hour12: false };
    const hourWIB = parseInt(new Intl.DateTimeFormat("id-ID", options).format(new Date()));
    if (hourWIB >= 5 && hourWIB < 11) {
        return "Selamat pagi";
    } else if (hourWIB >= 11 && hourWIB < 15) {
        return "Selamat siang";
    } else if (hourWIB >= 15 && hourWIB < 18) {
        return "Selamat sore";
    } else {
        return "Selamat malam";
    }
};

function showLayoutMain() {
    const main = document.getElementById('main-container');
    const userData = localStorage.getItem('user');
    fetch(`https://sukasehat.com/API/public/absen/login/user?username=${userData}`)
    .then(response => response.json())
    .then(data => {
        const sectionMid = document.createElement('section');
        // Content Left
        const divLeft = document.createElement('div');
        divLeft.classList.add('left-container-content');
        sectionMid.classList.add('mid-content');
        const h2Left = document.createElement('h2');
        h2Left.textContent = `${startGreetings()}, ${data.name}.`
        const imageLeft = new Image();
        imageLeft.src = data.image;
        imageLeft.width = '110';
        imageLeft.height = '110';
        imageLeft.loading = 'lazy';
        const pLeftDataTanggal = document.createElement('p');
        pLeftDataTanggal.textContent = `Tanggal: ${formatDate(new Date())}`;
        const pLeftDataWaktu = document.createElement('p');
        pLeftDataWaktu.setAttribute('id', 'wib-clock');
        divLeft.append(h2Left, imageLeft, pLeftDataTanggal, pLeftDataWaktu);
        // Content Right
        const divRight = document.createElement('div');
        divRight.classList.add('right-container-content');
        const dataDivRight = [
            { 'title': 'Total jam kerja hari ini', 'id': 'today-work', 'feather': 'activity'},
            { 'title': 'Total jam kerja minggu ini', 'id': 'week-work', 'feather': 'calendar'},
            { 'title': 'Total jam kerja bulan ini', 'id': 'month-work', 'feather': 'calendar'},
            { 'title': 'Total terlambat bulan ini', 'id': 'late-work', 'feather': 'alert-triangle'},
            { 'title': 'Presensi masuk', 'id': 'in-work', 'feather': 'log-in'},
            { 'title': 'Presensi pulang', 'id': 'out-work', 'feather': 'log-out'}
        ];
        dataDivRight.forEach(dataDivRightList => {
            const divDataRightContainer = document.createElement('div');
            divDataRightContainer.classList.add('right-container-content-list');
            const h2DivRight = document.createElement('h2');
            h2DivRight.textContent = dataDivRightList.title;
            const divIcon = document.createElement('div');
            divIcon.classList.add('right-container-content-desc');
            divIcon.setAttribute('id', dataDivRightList.id);
            const icon = document.createElement('i');
            icon.classList.add('icon');
            icon.setAttribute('data-feather', dataDivRightList.feather);
            divIcon.appendChild(icon);
            divDataRightContainer.append(h2DivRight, divIcon);
            divRight.appendChild(divDataRightContainer);
        });
        sectionMid.append(divLeft, divRight);
        main.appendChild(sectionMid);
        feather.replace();
        startClock();
        showMidData();
    });
}

function showMidData() {
    showWorkToday();
    showWorkWeek();
    showWorkMonth();
    showWorkLate();
    showWorkIn();
    showWorkOut();
}

function showWorkToday() {
    const userData = localStorage.getItem('user');
    const container = document.getElementById('today-work');
    const p = document.createElement('p');
    if(userData.work_today) {
        p.textContent = `${userData.work_today}`;
        container.appendChild(p);
    } else {
        p.textContent = 'Tidak ada data.';
    }
}

function showWorkWeek() {
    const userData = localStorage.getItem('user');
    const container = document.getElementById('week-work');
    const p = document.createElement('p');
    if(userData.work_week) {
        p.textContent = `${userData.work_week}`;
        container.appendChild(p);
    } else {
        p.textContent = 'Tidak ada data.';
    }
}

function showWorkMonth() {
    const userData = localStorage.getItem('user');
    const container = document.getElementById('month-work');
    const p = document.createElement('p');
    if(userData.work_month) {
        p.textContent = `${userData.work_month}`;
        container.appendChild(p);
    } else {
        p.textContent = 'Tidak ada data.';
    }
}

function showWorkLate() {
    const userData = localStorage.getItem('user');
    const container = document.getElementById('late-work');
    const p = document.createElement('p');
    if(userData.work_late) {
        p.textContent = `${userData.work_late}`;
        container.appendChild(p);
    } else {
        p.textContent = 'Tidak ada data.';
    }
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
}

function showWorkIn() {
    const userData = localStorage.getItem('user');
    const container = document.getElementById('main-container');
    const inWork = document.getElementById('in-work');
    inWork.addEventListener('click', function () {
        const waktuAbsen = new Date().toLocaleTimeString("id-ID", { timeZone: "Asia/Jakarta" });
        const sekolahLat = '3.5992882';
        const sekolahLng = '98.6448291';
        const radiusMeter = 20;
        if(!navigator.geolocation) {
            alert('Browser tidak mendukung lokasi.');
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const userLat = pos.coords.latitude;
                const userLng = pos.coords.longitude;
                const jarakKm = getDistanceFromLatLonInKm(userLat, userLng, sekolahLat, sekolahLng);
                const jarakMeter = jarakKm * 1000;
                if (jarakMeter <= radiusMeter) {
                    alert(`Bisa absen. Jarakmu ${jarakMeter.toFixed(2)} meter dari sekolah.`);
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.setAttribute('id', 'camera-input');
                    input.accept = 'image/*';
                    input.capture = 'camera';
                    input.style.display = 'none';
                    container.appendChild(input);
                    input.click();
                    input.addEventListener('change', function(e) {
                        const file = e.target.files[0];
                        if(!file) return;
                        const tanggal = `${formatDate(new Date())}`;
                        const waktuAbsen = new Date().toLocaleTimeString("id-ID", { timeZone: "Asia/Jakarta" });
                        const image = file;
                        const latitude = userLat;
                        const longitude = userLng;
                        fetch('https://sukasehat.com/API/public/absen/login/user_upload', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ username: userData, tanggal: tanggal, time: waktuAbsen, image: image, latitude: latitude, longitude: longitude})
                        })
                        .then(response => response.json())
                        .then(data => {
                            alert(data.data.message);
                            let p = document.getElementById('in-work-text');
                            if(!p) {
                                p = document.createElement('p');
                                p.setAttribute('id', 'in-work-text');
                                p.textContent = `${waktuAbsen}`;
                                inWork.appendChild(p);
                            }
                        })
                    })
                } else {
                    alert(`Terlalu jauh: ${jarakMeter.toFixed(2)} meter. Absen ditolak.`);
                }
            }
        )
    });
}


function showWorkOut() {
    const userData = localStorage.getItem('user');
    const container = document.getElementById('out-work');
    const p = document.createElement('p');
    if(userData.work_out) {
        p.textContent = `${userData.work_out}`;
        container.appendChild(p);
    } else {
        p.textContent = 'Tidak ada data.';
    }
}