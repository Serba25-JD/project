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
    showLayoutMain();
}

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

function showLayoutMain() {
    const main = document.getElementById('main-container');
    // Left
    const sectionLeft = document.createElement('section');
    sectionLeft.classList.add('container');
    const divLeft = document.createElement('div');
    divLeft.classList.add('container-left');
    const dataList = [
        { 'href': '#', 'id': 'create_user', 'text': 'Create User'},
        { 'href': '#', 'id': 'delete_user', 'text': 'Delete User'},
        { 'href': '#', 'id': 'list_user', 'text': 'List User'},
        { 'href': '#', 'id': 'change_password_user', 'text': 'Change Password User'},
    ];
    dataList.forEach(list => {
        const divLeftList = document.createElement('div');
        divLeftList.classList.add('container-left-list');
        const a = document.createElement('a');
        a.href = list.href;
        a.setAttribute('id', list.id);
        a.textContent = list.text;
        divLeftList.appendChild(a);
        divLeft.appendChild(divLeftList);
    });
    sectionLeft.appendChild(divLeft);
    // Right
    const sectionRight = document.createElement('section');
    sectionRight.classList.add('container');
    sectionRight.setAttribute('id', 'container-right');
    main.append(sectionLeft, sectionRight);
    showRightData();
}

function showRightData() {
    const dataList = document.getElementById('create_user');
    dataList.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionRight = document.getElementById('container-right');
        const div = document.createElement('div');
        const inputData = [
            { 'id': 'email', 'type': 'text', 'placeholder': 'masukkan email ataupun username', 'label': 'Email/Username'},
            { 'id': 'password', 'type': 'password', 'placeholder': 'masukkan password', 'label': 'Password'},
        ];
        inputData.forEach(input => {
            const inputTag = document.createElement('input');
            inputTag.placeholder = input.placeholder;
            inputTag.setAttribute('id', input.id);
            div.appendChild(inputTag);
        });
        sectionRight.appendChild(div);
    })
}