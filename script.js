document.addEventListener('DOMContentLoaded', function() {
    const filterItem = document.querySelector('.items');
    const filterImg = document.querySelectorAll('.gallery .image');
    
    filterItem.onclick = (selectedItem) => {
        if (selectedItem.target.classList.contains('item')) {
            filterItem.querySelector('.active').classList.remove('active');
            selectedItem.target.classList.add('active');
            let filterName = selectedItem.target.getAttribute('data-name');
            filterImg.forEach((image) => {
                let filterImges = image.getAttribute('data-name');
                if (filterImges === filterName || filterName === 'all') {
                    image.classList.remove('hide');
                    image.classList.add('show');
                } else {
                    image.classList.add('hide');
                    image.classList.remove('show');
                }
            });
        }
    };

    filterImg.forEach(image => {
        image.setAttribute('onclick', 'preview(this)');
    });
});

const previewBox = document.querySelector('.preview-box'),
      categoryName = previewBox.querySelector('.title p'),
      previewImg = previewBox.querySelector('img'),
      previewVideo = previewBox.querySelector('video'),
      closeIcon = previewBox.querySelector('.icon'),
      shadow = document.querySelector('.shadow');

function preview(element) {
    document.querySelector('body').style.overflow = 'hidden';
    let selectedImgCategory = element.getAttribute('data-name');
    categoryName.textContent = selectedImgCategory;
    if (element.querySelector('img')) {
        let selectedPrevImg = element.querySelector('img').src;
        previewImg.src = selectedPrevImg;
        previewImg.style.display = 'block';
        previewVideo.style.display = 'none';
    } else if (element.querySelector('video')) {
        let selectedPrevVideo = element.querySelector('video').querySelector('source').src;
        previewVideo.querySelector('source').src = selectedPrevVideo;
        previewVideo.load();
        previewImg.style.display = 'none';
        previewVideo.style.display = 'block';
    }
    previewBox.classList.add('show');
    shadow.classList.add('show');
    closeIcon.onclick = () => {
        previewBox.classList.remove('show');
        shadow.classList.remove('show');
        document.querySelector('body').style.overflow = 'auto';
    };
}

function downloadImage() {
    let mediaSrc = previewImg.style.display === 'block' ? previewImg.src : previewVideo.querySelector('source').src;

    let downloadLink = document.createElement('a');
    downloadLink.href = mediaSrc;
    downloadLink.download = mediaSrc.split('/').pop(); // Set file name for download

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

document.addEventListener('DOMContentLoaded', function() {
    const previewBox = document.querySelector('.preview-box');
    const previewImage = previewBox.querySelector('img');
    let isZoomed = false;
    let isDragging = false;
    let startX, startY, scrollLeft, scrollTop;

    previewImage.addEventListener('click', function() {
        if (!isZoomed) {
            previewImage.classList.add('zoomed-in');
            isZoomed = true;
            previewImage.style.cursor = "zoom-out";
        } else {
            previewImage.classList.remove('zoomed-in');
            isZoomed = false;
            previewImage.style.cursor = "zoom-in";
        }
    });

    // Enable image dragging when zoomed in
    previewImage.addEventListener('mousedown', (e) => {
        if (isZoomed) {
            isDragging = true;
            startX = e.pageX - previewImage.offsetLeft;
            startY = e.pageY - previewImage.offsetTop;
            scrollLeft = previewBox.scrollLeft;
            scrollTop = previewBox.scrollTop;
            previewImage.style.cursor = "grabbing";
        }
    });

    previewImage.addEventListener('mouseup', () => {
        isDragging = false;
        previewImage.style.cursor = isZoomed ? "grab" : "zoom-in";
    });

    previewImage.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - previewImage.offsetLeft;
        const y = e.pageY - previewImage.offsetTop;
        const walkX = (x - startX) * 2; // Adjust the scroll speed
        const walkY = (y - startY) * 2; // Adjust the scroll speed
        previewBox.scrollLeft = scrollLeft - walkX;
        previewBox.scrollTop = scrollTop - walkY;
    });

    // Reset dragging on leaving the image
    previewImage.addEventListener('mouseleave', () => {
        isDragging = false;
        previewImage.style.cursor = isZoomed ? "grab" : "zoom-in";
    });
});

