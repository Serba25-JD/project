document.addEventListener('DOMContentLoaded', function() {
    const header = document.createElement('header');
    const logo = new Image();
    logo.src = 'https://smk-katolik-mariana.infinityfreeapp.com/assets/image/SMK.png';
    logo.width = '150';
    logo.height = '123.56';
    logo.loading = 'lazy';
    const h1 = document.createElement('h1');
    h1.textContent = 'SMK Swasta Katolik Mariana';
    header.append(logo, h1);
    const main = document.createElement('main');
    const section = document.createElement('section');
    const data = [
        { 'label': 'Email/Username', 'type': 'text', 'id': 'email'},
        { 'label': 'Password', 'type': 'password', 'id': 'password'}
    ];
    data.forEach(input => {
        const labelType = document.createElement('label');
        labelType.textContent = input.label;
        labelType.htmlFor = input.id;
        const wrapper = document.createElement('div');
        wrapper.classList.add('input-wrapper');
        const inputType = document.createElement('input');
        inputType.type = input.type;
        inputType.placeholder = `Masukkan ${input.label}`;
        inputType.name = input.id;
        inputType.setAttribute('id', input.id);
        wrapper.appendChild(inputType);
        if (input.id === 'password') {
            const toggle = document.createElement('i');
            toggle.setAttribute('data-feather', 'eye');
            toggle.classList.add('toggle-pass');
            wrapper.appendChild(toggle);
        }
        section.append(labelType, wrapper);
    });
    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Login';
    button.setAttribute('id', 'login-btn');
    section.appendChild(button);
    main.appendChild(section);
    const footer = document.createElement('footer');
    const pFooter = document.createElement('p');
    pFooter.textContent = 'Made with ❤️: Jeremi. (2025)';
    footer.appendChild(pFooter);
    document.body.append(header, main, footer);
    feather.replace();
    showPassword();
    validateForm();
});

function showPassword() {
    feather.replace();
    let icon = document.querySelector('.input-wrapper svg');
    const password = document.getElementById('password');
    function toggle() {
        const isHidden = password.type === 'password';
        password.type = isHidden ? 'text' : 'password';
        icon.setAttribute('data-feather', isHidden ? 'eye-off' : 'eye');
        feather.replace();
        icon = document.querySelector('.input-wrapper svg');
        icon.addEventListener('click', toggle);
    }
    icon.addEventListener('click', toggle);
}


function validateForm() {
    const button = document.getElementById('login-btn');
    button.addEventListener('click', function() {
        let error = document.getElementById('login-error');
        if(!error) {
            error = document.createElement('p');
            error.setAttribute('id', 'login-error');
            button.insertAdjacentElement('afterend', error);
        };
        const email = document.getElementById('email').value;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        const password = document.getElementById('password').value;
        if(!email && !password) {
            error.textContent = 'Silahkan masukkan email dan password terlebih dahulu.';
        } else if(!email) {
            error.textContent = 'Silahkan masukkan email atau username terlebih dahulu.';
        } else if(email.includes('@') && !emailPattern.test(email)) {
            error.textContent = 'Silahkan masukkan email dengan berformat @gmail.com';
        } else if(!password) {
            error.textContent = 'Silahkan masukkan password terlebih dahulu.';
        } else {
            error.remove();
            showLoading();
        };
    });
};

function showLoading() {
    const section = document.querySelector('section');
    const loadingContainer = document.createElement('div');
    loadingContainer.classList.add('loader-wrapper');
    loadingContainer.setAttribute('id', 'loader');
    const loadingContent = document.createElement('div');
    loadingContent.classList.add('loader');
    loadingContainer.appendChild(loadingContent);
    section.insertAdjacentElement('afterend', loadingContainer);
    showForm();
};

function showForm() {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    fetch('https://sukasehat.com/API/public/absen/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.value, password: password.value })
    })
    .then(response => response.json())
    .then(data => {
        clearLoader();
        result = data.data;
        if(result.success) {
            if(result.token) {
                clearFormLoginSuccess();
                showAlert(result.message);
                setTimeout(() => {
                    window.location.href = 'admin';
                }, 1000);
            } else {
                clearFormLoginSuccess();
                showAlert(result.message);
                localStorage.setItem('user', result.user);
                setTimeout(() => {
                    window.location.href = 'dashboard';
                }, 1000);
            };
        } else {
            showAlert(result.message);
            password.value = '';
            clearPopup();
        };
    })
    .catch(err => { 
        showAlert('Server sedang down.');
        clearPopup();
    })
};

function clearFormLoginSuccess() {
    setTimeout(() => {
        const header = document.querySelector('header');
        const main = document.querySelector('main');
        const footer = document.querySelector('footer');
        header.remove();
        main.remove();
        footer.remove();
    }, 100);
}

function clearLoader() {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.remove();
    }, 100);
}

function clearPopup() {
    setTimeout(() => {
        const popup = document.getElementById('popup-container');
        if(popup) popup.remove();
    }, 1500);
}


function showAlert(text) {
    const divContainer = document.createElement('div');
    divContainer.classList.add('popup-container');
    divContainer.setAttribute('id', 'popup-container');
    const divContent = document.createElement('div');
    divContent.classList.add('popup-content');
    const pContent = document.createElement('p');
    pContent.textContent = text;
    divContent.appendChild(pContent);
    divContainer.appendChild(divContent);
    document.body.appendChild(divContainer);
}