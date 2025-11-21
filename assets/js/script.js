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
        { 'label': 'Email', 'type': 'text', 'id': 'email'},
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
        inputType.placeholder = `masukkan ${input.id}`;
        inputType.name = input.id;
        inputType.setAttribute('id', input.id);
        wrapper.appendChild(inputType);
        if (input.id === 'password') {
            const toggle = document.createElement('span');
            toggle.textContent = '👁️';
            toggle.classList.add('toggle-pass');
            toggle.setAttribute('id', 'toggle-pass');
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
    showPassword();
    validateForm();
});

function showPassword() {
    const toggle = document.getElementById('toggle-pass');
    toggle.addEventListener('click', function() {
        const passwordInput = document.getElementById('password');
        if(passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggle.textContent = '🙈';
        } else {
            passwordInput.type = 'password';
            toggle.textContent = '👁️';
        }
    })
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
            error.textContent = 'Silahkan masukkan email terlebih dahulu.';
        } else if(!emailPattern.test(email)) {
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
    const loader = document.getElementById('loader');
    const header = document.querySelector('header');
    const section = document.querySelector('section');
    const footer = document.querySelector('footer');
    if(email.value && password.value) {
        setTimeout(() => {
            loader.remove();
            setTimeout(() => {
                showAlert('Login sukses.');
                email.value = '';
                password.value = '';
                header.remove();
                section.remove();
                footer.remove();
            }, 50);
        }, 2000);
    };
};

function showAlert(text) {
    const section = document.querySelector('section');
    const divContainer = document.createElement('div');
    divContainer.classList.add('popup-container');
    divContainer.setAttribute('id', 'popup-container');
    const divContent = document.createElement('div');
    divContent.classList.add('popup-content');
    const pContent = document.createElement('p');
    pContent.textContent = text;
    divContent.appendChild(pContent);
    divContainer.appendChild(divContent);
    section.insertAdjacentElement('afterend', divContainer);
}