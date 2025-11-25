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
    showLoading();
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
        clearShowLoading();
    });
}

function showMidData() {
    showWorkData();
    showWorkIn();
    showWorkOut();
}

function decimalToHourMinute(decimal) {
    const hours = Math.floor(decimal);
    const minutes = Math.round((decimal - hours) * 60);
    return `${hours} jam ${minutes} menit`;
}

function showWorkData() {
    const userData = localStorage.getItem('user');
    fetch(`https://sukasehat.com/API/public/absen/login/user_status?username=${userData}`)
    .then(response => response.json())
    .then(data => {
        const stats = data.result.stats;
        const statMap = {
            'today-work': 'today_hours',
            'week-work': 'week_hours',
            'month-work': 'month_hours',
            'late-work': 'late_days'
        };
        for (const [elementId, statKey] of Object.entries(statMap)) {
            const el = document.getElementById(elementId);
            if (!el) continue;
            let valueContainer = el.querySelector('.work-value');
            if (!valueContainer) {
                valueContainer = document.createElement('div');
                valueContainer.classList.add('work-value');
                el.appendChild(valueContainer);
            }
            valueContainer.innerHTML = '';
            const value = stats[statKey];
            if (value && value !== 0) {
                if (statKey === 'late_days') {
                    const p = document.createElement('p');
                    p.textContent = `${value} hari`;
                    valueContainer.appendChild(p);
                } else if (statKey === 'month_hours') {
                    const p1 = document.createElement('p');
                    p1.textContent = decimalToHourMinute(value);
                    valueContainer.appendChild(p1);

                    const workDays = stats['work_days_month'] || 0;
                    const p2 = document.createElement('p');
                    p2.textContent = `${workDays} hari kerja bulan ini`;
                    valueContainer.appendChild(p2);
                } else {
                    const p = document.createElement('p');
                    p.textContent = decimalToHourMinute(value);
                    valueContainer.appendChild(p);
                }
            } else {
                const p = document.createElement('p');
                p.textContent = 'Tidak ada data.';
                valueContainer.appendChild(p);
            }
        }
    });
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
    const classInWork = inWork.closest('.right-container-content-list');
    fetch(`https://sukasehat.com/API/public/absen/login/user_status?username=${userData}`)
    .then(response => response.json())
    .then(data => {
        const result_time = data.result.in.time;
        if(data.result.in.status === false) {
            classInWork.classList.remove('active');
            function handleClick() {
                const waktuAbsen = new Date().toLocaleTimeString("id-ID", { timeZone: "Asia/Jakarta" });
                const tanggal = `${formatDate(new Date())}`;
                const sekolahLat = 3.5992882;
                const sekolahLng = 98.6448291;
                const radiusMeter = 20;
                if (!navigator.geolocation) {
                    showAlert('Browser tidak mendukung lokasi.');
                    return;
                }
                navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const userLat = pos.coords.latitude;
                    const userLng = pos.coords.longitude;
                    const jarakKm = getDistanceFromLatLonInKm(userLat, userLng, sekolahLat, sekolahLng);
                    const jarakMeter = jarakKm * 1000;
                    if (jarakMeter => radiusMeter) {
                        showAlert(`Bisa absen. Jarakmu ${jarakMeter.toFixed(2)} meter dari sekolah.`);
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/*';
                        input.capture = 'camera';
                        input.style.display = 'none';
                        container.appendChild(input);
                        input.click();
                        input.addEventListener('change', function (e) {
                            const file = e.target.files[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onload = function (event) {
                                const base64Image = event.target.result.split(',')[1];
                                fetch('https://sukasehat.com/API/public/absen/login/user_upload', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        username: userData,
                                        tanggal: tanggal,
                                        status: true,
                                        time: waktuAbsen,
                                        image: base64Image,
                                        latitude: userLat,
                                        longitude: userLng,
                                        jenis: 'in'
                                    })
                                })
                                .then(response => response.json())
                                .then(data => {
                                    if(data.data.success === true) {
                                        showAlert('Absen berhasil.');
                                        const p = document.createElement('p');
                                        p.textContent = waktuAbsen;
                                        classInWork.classList.add('active');
                                        inWork.appendChild(p);
                                        inWork.removeEventListener('click', handleClick);
                                    }
                                });
                            };
                            reader.readAsDataURL(file);
                        });
                    } else {
                        showAlert(`Terlalu jauh: ${jarakMeter.toFixed(2)} meter. Absen ditolak.`);
                    }
                });
            };
            inWork.addEventListener('click', handleClick);
        } else {
            const inWork = document.getElementById('in-work');
            classInWork.classList.add('active');
            const p = document.createElement('p');
            p.textContent = result_time;
            inWork.appendChild(p);
            inWork.style.pointerEvents = 'none'
            inWork.style.opacity = '0.6';
            return;
        }
    })
}

function showWorkOut() {
    const userData = localStorage.getItem('user');
    const container = document.getElementById('main-container');
    const outWork = document.getElementById('out-work');
    const classoutWork = outWork.closest('.right-container-content-list');
    fetch(`https://sukasehat.com/API/public/absen/login/user_status?username=${userData}`)
    .then(response => response.json())
    .then(data => {
        const result_time = data.result.out.time;
        if(data.result.out.status === false) {
            classoutWork.classList.remove('active');
            function handleClick() {
                const waktuAbsen = new Date().toLocaleTimeString("id-ID", { timeZone: "Asia/Jakarta" });
                const tanggal = `${formatDate(new Date())}`;
                const sekolahLat = 3.5992882;
                const sekolahLng = 98.6448291;
                const radiusMeter = 20;
                if (!navigator.geolocation) {
                    showAlert('Browser tidak mendukung lokasi.');
                    return;
                }
                navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const userLat = pos.coords.latitude;
                    const userLng = pos.coords.longitude;
                    const jarakKm = getDistanceFromLatLonInKm(userLat, userLng, sekolahLat, sekolahLng);
                    const jarakMeter = jarakKm * 1000;
                    if (jarakMeter => radiusMeter) {
                        showAlert(`Bisa absen. Jarakmu ${jarakMeter.toFixed(2)} meter dari sekolah.`);
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/*';
                        input.capture = 'camera';
                        input.style.display = 'none';
                        container.appendChild(input);
                        input.click();
                        input.addEventListener('change', function (e) {
                            const file = e.target.files[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onload = function (event) {
                                const base64Image = event.target.result.split(',')[1];
                                fetch('https://sukasehat.com/API/public/absen/login/user_upload', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        username: userData,
                                        tanggal: tanggal,
                                        status: true,
                                        time: waktuAbsen,
                                        image: base64Image,
                                        latitude: userLat,
                                        longitude: userLng,
                                        jenis: 'out'
                                    })
                                })
                                .then(response => response.json())
                                .then(data => {
                                    if(data.data.success === true) {
                                        showAlert('Absen berhasil.');
                                        const p = document.createElement('p');
                                        p.textContent = waktuAbsen;
                                        classoutWork.classList.add('active');
                                        outWork.appendChild(p);
                                        outWork.removeEventListener('click', handleClick);
                                    }
                                });
                            };
                            reader.readAsDataURL(file);
                        });
                    } else {
                        showAlert(`Terlalu jauh: ${jarakMeter.toFixed(2)} meter. Absen ditolak.`);
                    }
                });
            };
            outWork.addEventListener('click', handleClick);
        } else {
            const outWork = document.getElementById('out-work');
            classoutWork.classList.add('active');
            const p = document.createElement('p');
            p.textContent = result_time;
            outWork.appendChild(p);
            outWork.style.pointerEvents = 'none'
            outWork.style.opacity = '0.6';
            return;
        }
    })
}

function showAlert(text) {
    const main = document.getElementById('main-container');
    const divContainer = document.createElement('div');
    divContainer.classList.add('alert-container');
    divContainer.setAttribute('id', 'alert-container');
    const divContent = document.createElement('div');
    divContent.classList.add('alert-content');
    const p = document.createElement('p');
    p.textContent = text;
    const button = document.createElement('button');
    button.setAttribute('id', 'alert-close');
    button.textContent = 'Saya mengerti.';
    button.type = 'reset';
    divContent.append(p, button);
    divContainer.appendChild(divContent);
    main.insertAdjacentElement('beforeend', divContainer);
    const buttonClose = document.getElementById('alert-close');
    buttonClose.addEventListener('click', function() {
        const alert = document.getElementById('alert-container');
        alert.remove();
    })
}

function showLoading() {
    const section = document.getElementById('main-container');
    const loadingContainer = document.createElement('div');
    loadingContainer.classList.add('loader-wrapper');
    loadingContainer.setAttribute('id', 'loader');
    const loadingContent = document.createElement('div');
    loadingContent.classList.add('loader');
    loadingContainer.appendChild(loadingContent);
    section.insertAdjacentElement('beforeend', loadingContainer);
};

function clearShowLoading() {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.remove();
    }, 100);
}