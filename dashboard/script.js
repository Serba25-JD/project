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

// Function Show All Layout
function showLayout() {
    showLayoutHeader();
    showLayoutMain();
    showLayoutData();
    showFooter();
};
// All Layout END

// Function Show Header
function showLayoutHeader() {
    const header = document.getElementById('header-container');
    // Left
    const divLeft = document.createElement('div');
    divLeft.classList.add('header-container-content');
    const imageLeft = new Image();
    imageLeft.src = 'https://smk-katolik-mariana.infinityfreeapp.com/assets/image/SMK.png';
    imageLeft.width = '150';
    imageLeft.height = '124';
    imageLeft.loading = 'lazy';
    const h1 = document.createElement('h1');
    h1.textContent = 'SMK Swasta Katolik Mariana';
    divLeft.append(imageLeft, h1);
    // Right
    const divRight = document.createElement('div');
    divRight.classList.add('header-container-content');
    const userData = localStorage.getItem('user');
    const userIcon = document.createElement('i');
    userIcon.setAttribute('data-feather', 'user');
    const userLogout = document.createElement('i');
    userLogout.setAttribute('data-feather', 'log-out');
    userLogout.setAttribute('id', 'user_log-out');
    fetch(`https://sukasehat.com/API/public/absen/login/user?username=${userData}`)
    .then(response => response.json())
    .then(data => {
        const p = document.createElement('p');
        p.textContent = data.email;
        divRight.append(userIcon, p, userLogout);
        feather.replace();
        const userLogoutBtn = document.getElementById('user_log-out');
        userLogoutBtn.addEventListener('click', function() {
            localStorage.removeItem('user');
            window.location.href = '../';
        });
    });
    header.append(divLeft, divRight);
};
// Show Header END

// Function Change Format Date
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
// Format Date END

// Function Change Clock
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
// Change Clock END

// Function Greetings
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
// Greetings END

// Function Show Layout Left
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
        h2Left.textContent = `${startGreetings()}, ${data.name}.`;
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
            const divIconClass = document.createElement('div');
            divIconClass.classList.add('icon');
            const icon = document.createElement('i');
            icon.classList.add('icon');
            icon.setAttribute('data-feather', dataDivRightList.feather);
            divIconClass.appendChild(icon);
            divIcon.appendChild(divIconClass);
            divDataRightContainer.append(h2DivRight, divIcon);
            divRight.appendChild(divDataRightContainer);
        });
        sectionMid.append(divLeft, divRight);
        // main.appendChild(sectionMid);
        main.insertAdjacentElement('afterbegin', sectionMid);
        feather.replace();
        startClock();
        showData();
        clearShowLoading();
    });
};
// Show Layout Left END

// Function Show All Layout Right 
function showData() {
    showWorkData();
    showWorkIn();
    showWorkOut();
};
// Show All Layout Right END

// Function Change Time
function decimalToHourMinute(decimal) {
    const hours = Math.floor(decimal);
    const minutes = Math.round((decimal - hours) * 60);
    return `${hours} jam ${minutes} menit`;
};
// Change Time END

// Function Layout Left
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
            };
        };
    });
};
// Layout Left END

// Function Check Location
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
};
// Check Location END

// Function Absen In
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
        };
    });
};
// Absen In END

// Function Absen Out
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
        };
    });
};
// Absen Out END

// Function Show Layout Data
function showLayoutData() {
    const main = document.getElementById('main-container');
    const section = document.createElement('section');
    section.classList.add('data-content');
    const divButtonShow = document.createElement('div');
    divButtonShow.setAttribute('id', 'show-data');
    const pButtonShow = document.createElement('p');
    pButtonShow.textContent = 'Show';
    divButtonShow.appendChild(pButtonShow);
    section.appendChild(divButtonShow);
    main.insertAdjacentElement('afterbegin', section);
    showLoadDataAbsen();
}
// Show Layout Data END

// Function Show Load Data Absen
function showLoadDataAbsen() {
    const button = document.getElementById('show-data');
    button.addEventListener('click', function(e) {
        showLoading();
        const p = e.target.closest('p');
        if(p) {
            if (p.textContent.trim() === "Show") {
                p.textContent = "Hide";
                loadDataAbsen();
            } else {
                p.textContent = "Show";
                const pCheck = document.getElementById('text-error');
                if (pCheck) pCheck.style.display = 'none';
                const container = document.getElementById('absen-container');
                if (container) {
                    if (container.classList.contains('active')) {
                        container.classList.remove('active');
                        container.classList.add('hide');
                        container.addEventListener('animationend', () => {
                            container.style.display = 'none';
                            container.classList.remove('hide'); 
                        }, { once: true });
                    }
                };
                clearShowLoading();
            };
        };
    });
};

function loadDataAbsen() {
    let dataContainer = document.getElementById('absen-container');
    if(!dataContainer) {
        const container = document.getElementById('show-data');
        const userData = localStorage.getItem('user');
        fetch(`https://sukasehat.com/API/public/absen/login/user?username=${userData}`)
        .then(response => response.json())
        .then(data => {
            const workData = data.work;
            if (!workData || Object.keys(workData).length === 0) {
                const pCheck = document.getElementById('text-error');
                if(!pCheck) {
                    const p = document.createElement('p');
                    p.textContent = 'Data absen belum ada.';
                    p.setAttribute('id', 'text-error')
                    container.insertAdjacentElement('afterend', p);
                } else {
                    pCheck.style.display = 'block';
                };
                clearShowLoading();
                return;
            };
            const pCheck = document.getElementById('text-error');
            if(pCheck) pCheck.remove();
            const sortedDates = Object.keys(workData).sort((a, b) => {
                return new Date(b) - new Date(a);
            });
            const divContainer = document.createElement('div');
            divContainer.setAttribute('id', 'absen-container');
            divContainer.classList.add('active');
            // Header
            const divHeader = document.createElement('div');
            divHeader.setAttribute('id','absen-header-container');
            const divHeaderContentData = ['No', 'Tanggal', 'Masuk', 'Pulang'];
            divHeaderContentData.forEach(headerText => {
                const divHeaderContent = document.createElement('div');
                divHeaderContent.classList.add('absen-header-content');
                const pHeaderContent = document.createElement('p');
                pHeaderContent.textContent = headerText;
                divHeaderContent.appendChild(pHeaderContent);
                divHeader.appendChild(divHeaderContent);
            });
            // Data
            const divDataContainer = document.createElement('div');
            divDataContainer.setAttribute('id','absen-data-container');
            sortedDates.forEach((date, index) => {
                const entry = workData[date];
                const masuk = entry.in?.time || "-";
                const pulang = entry.out?.time || "-";
                const divDataContent= document.createElement('div');
                divDataContent.classList.add('absen-data-content');
                // Nomor
                const divDataContentNo = document.createElement('div');
                divDataContentNo.classList.add('absen-data-content-list');
                const pDivDataContentNo = document.createElement('p');
                pDivDataContentNo.textContent = `${index + 1}`;
                divDataContentNo.appendChild(pDivDataContentNo);
                // Tanggal
                const divDataContentDate = document.createElement('div');
                divDataContentDate.classList.add('absen-data-content-list');
                const pDivDataContentDate = document.createElement('p');
                pDivDataContentDate.textContent = date;
                divDataContentDate.appendChild(pDivDataContentDate);
                // Masuk
                const divDataContentIn = document.createElement('div');
                divDataContentIn.classList.add('absen-data-content-list');
                const pDivDataContentIn = document.createElement('p');
                pDivDataContentIn.textContent = masuk;
                divDataContentIn.appendChild(pDivDataContentIn);
                // Pulang
                const divDataContentOut = document.createElement('div');
                divDataContentOut.classList.add('absen-data-content-list');
                const pDivDataContentOut = document.createElement('p');
                pDivDataContentOut.textContent = pulang;
                divDataContentOut.appendChild(pDivDataContentOut);
                // Masukkan semuanya
                divDataContent.append(divDataContentNo, divDataContentDate, divDataContentIn, divDataContentOut);
                divDataContainer.appendChild(divDataContent);
            });
            divContainer.append(divHeader, divDataContainer);
            container.insertAdjacentElement('afterend', divContainer);
            clearShowLoading();
        });
    } else {
        dataContainer.classList.add('active');
        dataContainer.style.display = 'block';
        clearShowLoading();
    };
};
// Show Load Data Absen END

// Function Footer
function showFooter() {
    const footer = document.getElementById('footer-container');
    const p = document.createElement('p');
    p.textContent = 'Made with ❤️: Jeremi. (2025)';
    footer.appendChild(p);
};
// Footer END

// Function Alert
function showAlert(text) {
    const main = document.getElementById('main-container');
    const container = document.getElementById('alert-container');
    if(!container) {
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
};
// Alert END

// Function Loading
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
};
// Loading END