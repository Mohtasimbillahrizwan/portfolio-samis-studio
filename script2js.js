document.addEventListener("DOMContentLoaded", function () {
    let videoItems = document.querySelectorAll(".videoitem video");
    let videoArray = Array.from(videoItems);
    let currentIndex = 0;

    // Create Lightbox
    let lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");
    lightbox.innerHTML = `
        <button class="lightbox-close">&times;</button>
        <button class="lightbox-prev">&#10094;</button>
        <div class="lightbox-content"></div>
        <button class="lightbox-next">&#10095;</button>
    `;
    document.body.appendChild(lightbox);

    let lightboxContent = lightbox.querySelector(".lightbox-content");
    let closeBtn = lightbox.querySelector(".lightbox-close");
    let prevBtn = lightbox.querySelector(".lightbox-prev");
    let nextBtn = lightbox.querySelector(".lightbox-next");

    function openLightbox(index) {
        currentIndex = index;
        lightboxContent.innerHTML = ""; // Clear previous content

        let selectedVideo = document.createElement("video");
        selectedVideo.setAttribute("controls", ""); // Add controls
        selectedVideo.setAttribute("width", "1024");
        selectedVideo.setAttribute("height", "720");

        let source = document.createElement("source");
        source.setAttribute("src", videoArray[currentIndex].querySelector("source").getAttribute("src"));
        source.setAttribute("type", "video/mp4");

        selectedVideo.appendChild(source);
        lightboxContent.appendChild(selectedVideo);
        lightbox.style.display = "flex";
    }

    videoItems.forEach((video, index) => {
        video.addEventListener("click", function (event) {
            event.preventDefault();
            openLightbox(index);
        });
    });

    function navigateLightbox(direction) {
        currentIndex += direction;
        if (currentIndex < 0) currentIndex = videoArray.length - 1;
        if (currentIndex >= videoArray.length) currentIndex = 0;
        openLightbox(currentIndex);
    }

    closeBtn.addEventListener("click", function () {
        lightbox.style.display = "none";
        stopVideoPlayback();
    });

    prevBtn.addEventListener("click", function () {
        navigateLightbox(-1);
    });

    nextBtn.addEventListener("click", function () {
        navigateLightbox(1);
    });

    document.addEventListener("keydown", function (event) {
        if (lightbox.style.display === "flex") {
            if (event.key === "ArrowLeft") {
                navigateLightbox(-1);
            } else if (event.key === "ArrowRight") {
                navigateLightbox(1);
            } else if (event.key === "Escape") {
                lightbox.style.display = "none";
                stopVideoPlayback();
            }
        }
    });

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            lightbox.style.display = "none";
            stopVideoPlayback();
        }
    });

    function stopVideoPlayback() {
        let video = lightboxContent.querySelector("video");
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    }
});


document.addEventListener("DOMContentLoaded", function () {
    let videos = document.querySelectorAll(".videoitem video");

    // Ensure videos are paused on page load
    videos.forEach(video => {
        video.pause();
        video.addEventListener("click", function () {
            // Pause all other videos before playing the clicked one
            videos.forEach(v => {
                if (v !== video) {
                    v.pause();
                }
            });

            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
    });
});
