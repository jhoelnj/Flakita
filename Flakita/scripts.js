document.addEventListener("DOMContentLoaded", function() {
    const photos = document.querySelectorAll('.photo');
    const modal = document.querySelector('.modal');
    const modalImg = document.getElementById("modal-img");
    const captionText = document.getElementById("caption");
    const closeBtn = document.querySelector('.close');

    photos.forEach(photo => {
        photo.addEventListener('click', () => {
            modal.style.display = "block";
            modalImg.src = photo.style.backgroundImage.slice(5, -2);
            captionText.innerHTML = photo.getAttribute('data-caption');
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    function movePhotos() {
        const row1 = document.getElementById('row1');
        const row2 = document.getElementById('row2');

        const row1Children = row1.children;
        const row2Children = row2.children;

        // Mueve la primera fila hacia la izquierda
        let transform1 = parseFloat(getComputedStyle(row1).transform.split(',')[4]) || 0;
        row1.style.transform = `translateX(${transform1 - 1}px)`;

        if (Math.abs(transform1) >= row1Children[0].offsetWidth) {
            row1.appendChild(row1Children[0].cloneNode(true));
            row1.removeChild(row1Children[0]);
            row1.style.transform = 'translateX(0)';
        }

        // Mueve la segunda fila hacia la derecha
        let transform2 = parseFloat(getComputedStyle(row2).transform.split(',')[4]) || 0;
        row2.style.transform = `translateX(${transform2 + 1}px)`;

        if (Math.abs(transform2) >= row2Children[0].offsetWidth) {
            row2.insertBefore(row2Children[row2Children.length - 1].cloneNode(true), row2Children[0]);
            row2.removeChild(row2Children[row2Children.length - 1]);
            row2.style.transform = 'translateX(0)';
        }
    }

    setInterval(movePhotos, 20);
});

const backgroundAudio = document.getElementById("backgroundAudio");

// Para reproducir el audio
function playAudio() {
    backgroundAudio.play();
}

// Para pausar el audio
function pauseAudio() {
    backgroundAudio.pause();
}

