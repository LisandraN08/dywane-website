

document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0;

    const carouselImages = document.querySelector('#carouselImages');
    const totalImages = carouselImages.children.length;
    const bulletsContainer = document.querySelector('.carousel-bullets');
    const caption = document.getElementById('carouselCaption');

    const captions = [
        {
            title: "Hyundai Stargazer",
            description: "MPV modern dengan desain futuristik, fitur canggih, dan kabin luas yang dirancang untuk kenyamanan keluarga di perjalanan.",
            link: "products.html"
        },
        {
            title: "Hyundai IONIQ 5",
            description: "Mobil listrik dengan desain aerodinamis dan teknologi canggih, memberikan pengalaman berkendara yang ramah lingkungan.",
            link: "products.html"
        },
        {
            title: "Hyundai Palisade",
            description: "SUV besar dengan tujuh kursi yang menawarkan desain mewah, teknologi canggih, dan performa yang kuat untuk keluarga yang membutuhkan ruang dan kenyamanan.",
            link: "products.html"
        }
    ];

    for (let i = 0; i < totalImages; i++) {
        const bullet = document.createElement('button');
        bullet.addEventListener('click', () => showSlide(i));
        bulletsContainer.appendChild(bullet);
    }

    function showSlide(index) {
        currentIndex = index;
        carouselImages.style.transform = `translateX(-${currentIndex * 100}%)`; // Move carousel to the selected slide
        updateActiveBullet();
        updateCaptionPosition();
    }

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % totalImages;
        showSlide(currentIndex);
    }

    function updateActiveBullet() {
        const bullets = document.querySelectorAll('.carousel-bullets button');
        bullets.forEach((bullet, index) => {
            bullet.classList.toggle('active', index === currentIndex);
        });
    }

    function updateCaptionPosition() {
        caption.querySelector('h2').textContent = captions[currentIndex].title;
        caption.querySelector('p').textContent = captions[currentIndex].description;
        caption.querySelector('a').href = captions[currentIndex].link;
        
        if (currentIndex === 0 || currentIndex === 1) {
            caption.classList.remove('caption-right-bottom');
            caption.classList.add('caption-left-bottom');
        } else if (currentIndex === 2) {
            caption.classList.remove('caption-left-bottom');
            caption.classList.add('caption-right-bottom');
        } else {
            caption.classList.remove('caption-left-bottom', 'caption-right-bottom');
            caption.style.top = '50%';
            caption.style.left = '50%';
            caption.style.transform = 'translate(-50%, -50%)';
        }

        if (currentIndex !== 3) {
            caption.style.top = '';
            caption.style.left = '';
            caption.style.transform = '';
        }
    }

    function adjustFloatingButtons() {
        const floatingContainer = document.querySelector(".floating-container");
        const footer = document.querySelector("footer");
        const footerTop = footer.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (footerTop < windowHeight - 20) {
            floatingContainer.style.bottom = `${windowHeight - footerTop + 20}px`;
        } else {
            floatingContainer.style.bottom = "20px";
        }
    }

    window.addEventListener("scroll", adjustFloatingButtons);
    window.addEventListener("resize", adjustFloatingButtons);
    adjustFloatingButtons();

    setInterval(showNextSlide, 5000); 

    showSlide(0);

    const counters = document.querySelectorAll('.count');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 100;

        const updateCounter = () => {
            const currentValue = +counter.innerText;
            if (currentValue < target) {
                counter.innerText = Math.ceil(currentValue + increment);
                setTimeout(updateCounter, 30);
            } else {
                counter.innerText = target;
            }
        };
        updateCounter();
    });
});

