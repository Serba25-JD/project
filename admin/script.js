document.addEventListener('DOMContentLoaded', function() {
    const header = document.createElement('header');
    header.setAttribute('id','header-container');
    const main = document.createElement('main');
    main.setAttribute('id', 'main-container');
    const footer = document.createElement('footer');
    footer.setAttribute('id', 'footer-container');
    document.body.append(header, main, footer);
    showLayout();
});

function showLayout() {
    showLayoutHeader();
    showLayoutTop();
    refreshData();
    showFooter();
};

function removeTag(id) {
    const tag = document.getElementById(id);
    if(tag) tag.remove();
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
    const p = document.createElement('p');
    p.textContent = 'Admin';
    divRight.append(userIcon, p, userLogout);
    header.append(divLeft, divRight);
    feather.replace();
    const userLogoutButton = document.getElementById('user_log-out');
    userLogoutButton.addEventListener('click', function() {
        window.location.href = '../';
    });
};

function showLayoutTop() {
    const main = document.getElementById('main-container');
    const section = document.createElement('section');
    section.classList.add('container');
    section.setAttribute('id', 'container');
    const divAdd = document.createElement('div');
    divAdd.classList.add('container-top');
    divAdd.setAttribute('id', 'container-top');
    const divDataIcon = [
        { 'id': 'container-add', 'icon': 'user-plus', 'text': 'Add User'},
        { 'id': 'container-refresh', 'icon': 'refresh-cw', 'text': 'Refresh Data'}
    ];
    divDataIcon.forEach(list => {
        const divIcon = document.createElement('div');
        divIcon.classList.add('container-top-icon');
        divIcon.setAttribute('id', list.id);
        const icon = document.createElement('i');
        icon.setAttribute('data-feather', list.icon);
        const pIcon = document.createElement('p');
        pIcon.textContent = list.text;
        divIcon.append(icon, pIcon);
        divAdd.appendChild(divIcon);
    });
    section.appendChild(divAdd);
    main.insertAdjacentElement('beforeend', section);
    feather.replace();
    showAddUser();
    showDataTable();
};

function showDataTable() {
    const storageData = localStorage.getItem('refreshData');
    if(storageData) {
        showLoadDataTable();
        clearShowLoading();
    } else {
        showLoadDataTable();
        clearShowLoading();
    };
};

function showLoadDataTable() {
    const storageData = localStorage.getItem('refreshData');
    const parseData = storageData ? JSON.parse(storageData) : { lastHash: null, users: [] };
    const lastHash = parseData.lastHash || null;
    const users = parseData.users || [];
    fetch('https://sukasehat.com/API/public/absen/user-list')
    .then(response => response.json())
    .then(data => {
        result = data.result;
        const currentHash = result.cache;
        if(!result.status && !users || users.length === 0) {
            const divContainer = document.getElementById('container-top');
            removeTag('text-message');
            removeTag('container-table');
            removeTag('absen');
            if(document.getElementById('text-message')) return;
            const pData = document.createElement('p');
            pData.setAttribute('id', 'text-message');
            pData.textContent = result.message;
            localStorage.removeItem('refreshData');
            divContainer.insertAdjacentElement('afterend', pData);
            clearShowLoading();
        };
        if(currentHash === lastHash) {
            const divContainerData = document.getElementById('container-table');
            if(!divContainerData) {
                createDataTableContainer();
                createDataTable(users);
            } else {
                createDataTable(users);
            };
        } else {
            localStorage.setItem('refreshData', JSON.stringify({lastHash: currentHash, users: result.users}));
            const divContainerData = document.getElementById('container-table');
            if(!divContainerData) {
                createDataTableContainer();
                createDataTable(result.users);
            } else {
                createDataTable(result.users);
            };
        };
    });
};

function createDataTableContainer() {
    removeTag('text-message');
    if(document.getElementById('container-table')) return;
    const container = document.getElementById('container-top');
    const divContainer = document.createElement('div');
    divContainer.classList.add('container-table');
    divContainer.setAttribute('id', 'container-table');
    const divContainerTable = document.createElement('div');
    divContainerTable.classList.add('container-table-header');
    const divDataTitle = ['No', 'Foto', 'Nama Lengkap', 'Aksi'];
    divDataTitle.forEach(title => {
        const divTitle = document.createElement('div');
        divTitle.classList.add('table-header');
        const h2Title = document.createElement('h2');
        h2Title.textContent = title;
        divTitle.appendChild(h2Title);
        divContainerTable.appendChild(divTitle);
    });
    divContainer.appendChild(divContainerTable);
    container.insertAdjacentElement('afterend', divContainer);
};

function createDataTable(users) {
    const divContainerData = document.getElementById('container-table-content');
    if(!divContainerData) {
        const divContainerTable = document.getElementById('container-table');
        const divContainerContentTable = document.createElement('div');
        divContainerContentTable.classList.add('container-table-content');
        divContainerContentTable.setAttribute('id', 'container-table-content');
        users.forEach((user, index) => {
            const divDataNo = document.querySelector(`.table-container[no='${index + 1}']`);
            if(divDataNo) return;
            const divData = document.createElement('div');
            divData.classList.add('table-container');
            divData.setAttribute('no', index + 1);
            const divNo = document.createElement('div');
            divNo.classList.add('table-content');
            const pNo = document.createElement('p');
            pNo.textContent = index + 1;
            divNo.appendChild(pNo);
            const divImage = document.createElement('div');
            divImage.classList.add('table-content');
            const image = new Image();
            image.src = user.image;
            image.alt = user.name;
            image.width = 472;
            image.height = 709;
            divImage.appendChild(image);
            const divName = document.createElement('div');
            divName.classList.add('table-content');
            const pName = document.createElement('p');
            pName.textContent = user.name;
            divName.appendChild(pName);
            const divButton = document.createElement('div');
            divButton.classList.add('button-container');
            divButton.setAttribute('user', user.name);
            const buttonData = [
                { 'class': 'edit-user', 'icon': 'edit'},
                { 'class': 'check-user', 'icon': 'calendar'},
                { 'class': 'delete-user', 'icon': 'trash'}
            ];
            buttonData.forEach(btn => {
                const divButtonContent = document.createElement('div');
                divButtonContent.classList.add('button-container-content', btn.class);
                const button = document.createElement('i');
                button.setAttribute('data-feather', btn.icon);
                divButtonContent.appendChild(button);
                divButton.appendChild(divButtonContent);
            });
            divData.append(divNo, divImage, divName, divButton);
            divContainerContentTable.appendChild(divData);
            divContainerTable.appendChild(divContainerContentTable);
            feather.replace();
        });
    } else {
        const divContainerContentTable = document.getElementById('container-table-content');
        users.forEach((user, index) => {
            const divDataNo = document.querySelector(`.table-container[no='${index + 1}']`);
            if(divDataNo) return;
            const divData = document.createElement('div');
            divData.classList.add('table-container');
            divData.setAttribute('no', index + 1);
            const divNo = document.createElement('div');
            divNo.classList.add('table-content');
            const pNo = document.createElement('p');
            pNo.textContent = index + 1;
            divNo.appendChild(pNo);
            const divImage = document.createElement('div');
            divImage.classList.add('table-content');
            const image = new Image();
            image.src = user.image;
            image.alt = user.name;
            image.width = 472;
            image.height = 709;
            divImage.appendChild(image);
            const divName = document.createElement('div');
            divName.classList.add('table-content');
            const pName = document.createElement('p');
            pName.textContent = user.name;
            divName.appendChild(pName);
            const divButton = document.createElement('div');
            divButton.classList.add('button-container');
            divButton.setAttribute('user', user.name);
            const buttonData = [
                { 'class': 'edit-user', 'icon': 'edit'},
                { 'class': 'check-user', 'icon': 'calendar'},
                { 'class': 'delete-user', 'icon': 'trash'}
            ]
            buttonData.forEach(btn => {
                const divButtonContent = document.createElement('div');
                divButtonContent.classList.add('button-container-content', btn.class);
                const button = document.createElement('i');
                button.setAttribute('data-feather', btn.icon);
                divButtonContent.appendChild(button);
                divButton.appendChild(divButtonContent);
            });
            divData.append(divNo, divImage, divName, divButton);
            divContainerContentTable.appendChild(divData);
            feather.replace();
        });
    };
    showAllAction();
};

function showAddUser() {
    const divTop = document.getElementById('container-top');
    const divContainer = document.getElementById('container-add');
    divContainer.addEventListener('click', function() {
        removeTag('text-message');
        removeTag('container-table');
        removeTag('absen');
        const divContainerContent = document.getElementById('container-add-user');
        if(!divContainerContent) {
            const pText = document.getElementById('text-message');
            if(pText) pText.remove();
            const divContent = document.createElement('div');
            divContent.setAttribute('id', 'container-add-user');
            const dataInput = [
                { 'type': 'text', 'label': 'Nama Lengkap', 'id': 'name', 'min': 1, 'max': 15, 'placeholder': 'masukkan nama lengkap'},
                { 'type': 'text', 'label': 'Username', 'id': 'username', 'min': 1, 'max': 15, 'placeholder': 'masukkan username'},
                { 'type': 'text', 'label': 'Password', 'id': 'password', 'min': 1, 'max': 15, 'placeholder': 'masukkan password'},
                { 'type': 'text', 'label': 'Email', 'id': 'email', 'min': 1, 'max': 40, 'placeholder': 'masukkan email'},
                { 'type': 'file', 'label': 'Upload Foto', 'id': 'photo' },
            ];
            dataInput.forEach(item => {
                const divContentList = document.createElement('div');
                divContentList.classList.add('container-add-user-content');
                const label = document.createElement('label');
                label.textContent = item.label;
                label.htmlFor = item.id;
                const input = document.createElement('input');
                input.type = item.type;
                input.setAttribute('id', item.id);
                if(item.type !== 'file') {
                    input.placeholder = item.placeholder;
                    input.minLength = item.min;
                    input.maxLength = item.max;
                };
                divContentList.append(label, input);
                divContent.appendChild(divContentList);
            });
            const button = document.createElement('button');
            button.setAttribute('id', 'add-user-btn');
            button.type = 'submit';
            button.textContent = 'Add User';
            divContent.appendChild(button);
            divTop.insertAdjacentElement('afterend', divContent);
            sendAddUser();
        };
    });
};

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

function sendAddUser() {
    showLoading();
    const button = document.getElementById('add-user-btn');
    if(!button) return;
    button.addEventListener('click', function() {
        showLoading();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const photo = document.getElementById('photo');
        const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        const tanggal = `${formatDate(new Date())}`;
        const file = photo.files[0];
        if(!name && !email && !username && !password) {
            clearShowLoading();
            return showAlert('Silahkan masukkan data terlebih dahulu.');
        } else if(!name) {
            clearShowLoading();
            return showAlert('Silahkan masukkan nama lengkap terlebih dahulu.');
        } else if(!email) {
            clearShowLoading();
            return showAlert('Silahkan masukkan email terlebih dahulu.');
        } else if(!username) {
            clearShowLoading();
            return showAlert('Silahkan masukkan username terlebih dahulu.');
        } else if(!password) {
            clearShowLoading();
            return showAlert('Silahkan masukkan password terlebih dahulu.');
        } else if(!emailPattern.test(email)) {
            clearShowLoading();
            return showAlert('Silahkan masukkan email dengan berformat @gmail.com');
        } else if(!photo.files[0]) {
            clearShowLoading();
            return showAlert('Silahkan upload foto terlebih dahulu.');
        }
        const reader = new FileReader();
        reader.onload = function (event) {
            const base64Image = event.target.result.split(',')[1];
            fetch('https://sukasehat.com/API/public/absen/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    username: username,
                    password: password,
                    image: base64Image,
                    tanggal: tanggal
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data.data.message) {
                    clearShowLoading();
                    showAlert(data.data.message);
                    const name = document.getElementById('name').value = '';
                    const email = document.getElementById('email').value = '';
                    const username = document.getElementById('username').value = '';
                    const password = document.getElementById('password').value = '';
                    const photo = document.getElementById('photo').value = '';
                } else {
                    clearShowLoading();
                    showAlert(data.data.message);
                }
            })
        }
        reader.readAsDataURL(file);
    });
    clearShowLoading();
};

function refreshData() {
    const container = document.getElementById('container-refresh');
    container.addEventListener('click', function() {
        showLoading();
        removeTag('container-add-user');
        removeTag('absen');
        showDataTable();
    });
};

function showAllAction() {
    checkAction();
    deleteAction();
};

function checkAction() {
    const main = document.getElementById('main-container')
    document.querySelectorAll('.check-user').forEach(btn => {
        btn.addEventListener('click', function(e) {
            showLoading();
            const parent = e.target.closest('.button-container');
            const user = parent.getAttribute('user');
            const container = document.getElementById('absen');
            if(!container) {
                const section = document.createElement('section');
                section.classList.add('container');
                section.setAttribute('id', 'absen');
                main.insertAdjacentElement('beforeend', section);
                loadDataAbsen(user);
            } else {
                const absenContainer = document.getElementById('absen-container');
                if(absenContainer) absenContainer.remove();
                const pContainer = document.getElementById('text-error');
                if(pContainer) pContainer.remove();
                loadDataAbsen(user);
            }
            clearShowLoading();
        });
    });
};

function loadDataAbsen(user) {
    fetch(`https://sukasehat.com/API/public/absen/login/user?username=${user}`)
    .then(response => response.json())
    .then(data => {
        const section = document.getElementById('absen');
        const workData = data.work;
        if (!workData || Object.keys(workData).length === 0) {
            const pCheck = document.getElementById('text-error');
            if(!pCheck) {
                const p = document.createElement('p');
                p.textContent = 'Data absen belum ada.';
                p.setAttribute('id', 'text-error')
                section.appendChild(p);
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
        section.append(divContainer);
    })
}

function deleteAction() {
    document.querySelectorAll('.delete-user').forEach(btn => {
        btn.addEventListener('click', function(e) {
            showLoading();
            const parent = e.target.closest('.button-container');
            const user = parent.getAttribute('user');
            const div = parent.closest('.table-container');
            fetch('https://sukasehat.com/API/public/absen/login/check_delete_user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user: user })
            })
            .then(response => response.json())
            .then(data => {
                result = data.data;
                div.remove();
                showAlert(result.message);
                const storage = localStorage.getItem("refreshData");
                if (!storage) return;
                const datas = JSON.parse(storage);
                datas.users = datas.users.filter(users => users.name !== user);
                localStorage.setItem("refreshData", JSON.stringify(datas));
                clearShowLoading();
            });
        });
    });
};

function showFooter() {
    const footer = document.getElementById('footer-container');
    const p = document.createElement('p');
    p.textContent = 'Made with ❤️: Jeremi. (2025)';
    footer.appendChild(p);
}

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
        });
    };
};

function showLoading() {
    const loader = document.getElementById('loader');
    if(!loader) {
        const section = document.getElementById('main-container');
        const loadingContainer = document.createElement('div');
        loadingContainer.classList.add('loader-wrapper');
        loadingContainer.setAttribute('id', 'loader');
        const loadingContent = document.createElement('div');
        loadingContent.classList.add('loader');
        loadingContainer.appendChild(loadingContent);
        section.insertAdjacentElement('beforeend', loadingContainer);
    };
};

function clearShowLoading() {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if(loader) loader.remove();
    }, 500);
};