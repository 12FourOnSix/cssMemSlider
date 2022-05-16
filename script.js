const MEMES_INFO = [
    {
        filePath: 'assets/images/img1.jpg',
        title: 'Hiding from my parents'
    },
    {
        filePath: 'assets/images/img2.jpg',
        title: 'Error on line 144'
    },
    {
        filePath: 'assets/images/img3.jpg',
        title: 'Starting new side project'
    },
    {
        filePath: 'assets/images/img4.jpg',
        title: 'I\'m not a cat'
    },
    {
        filePath: 'assets/images/img5.jpg',
        title: 'Not going back to office'
    }
];

function drawMemeImg(filePath, index) {
    const 
        image = `
            <img data-index="${index}" src="${filePath}" alt="image">
        `;
        imageHolder = document.querySelector('.image-container');

    imageHolder.insertAdjacentHTML('beforeend', image);
}

function drawMemeTitle(title, index) {
    const 
        titleEl = `<div class="title-inner" data-index="${index}">${title}</div>`;
        titleHolder = document.querySelector('.image-title');

    titleHolder.insertAdjacentHTML('beforeend', titleEl);
}

function drawMeme(index) {
    drawMemeImg(MEMES_INFO[index]['filePath'], index);
    drawMemeTitle(MEMES_INFO[index]['title'], index);
}

function drawControlItem(index) {
    const 
        controlItemEl = `
            <div class="control-item" data-index="${index}">
                <div class="control-item-circle"></div>
            </div>
        `;
        controlsHolder = document.querySelector('.controls');

    controlsHolder.insertAdjacentHTML('beforeend', controlItemEl);
}

function drawControls() {
    for (const item of MEMES_INFO) drawControlItem(MEMES_INFO.indexOf(item));
}

function changeControlActivity(control) {
    control.classList.toggle('control-active');
}

function moveInImage(index) {
    const image = document.querySelector(`img[data-index="${index}"]`);
    image.classList.toggle('move-in-img');
}

function moveTitle(index) {
    const title = document.querySelector(`.title-inner[data-index="${index}"]`);

    title.classList.add('move-title');
    setTimeout(()=>{ title.classList.remove('move-title'); }, 1000);
}

function showNewMeme(index) {
    drawMeme(index);
    moveInImage(index);
    moveTitle(index);
}

function onClick(e) {
    const 
        control = e.target.closest('.control-item'),
        index = control.dataset.index,
        prevActiveControl = document.querySelector('.control-active'),
        oldMemeImg = document.querySelector('img'),
        oldMemeTitle = document.querySelector('.title-inner');

    changeControlActivity(prevActiveControl);
    changeControlActivity(control);

    showNewMeme(index);  
    const newMemeEl = document.querySelector(`img[data-index="${index}"]`);

    newMemeEl.onanimationend = () => {
        newMemeEl.classList.toggle('move-in-img');
        oldMemeImg.remove();
    };

    oldMemeTitle.remove();
}

function listenToControls() {
    const controlsList = document.querySelectorAll('.control-item');

    for (const control of controlsList) {
        control.addEventListener('click', onClick);
    }
}

function init() {
    drawMeme(0);
    drawControls();
    listenToControls();

    const firstControl = document.querySelector('.control-item');
    changeControlActivity(firstControl);
}

window.addEventListener('DOMContentLoaded', () => {
    init();
});