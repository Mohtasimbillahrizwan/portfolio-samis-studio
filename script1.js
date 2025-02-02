

document.addEventListener("DOMContentLoaded", function () {
    let galleryItems = document.querySelectorAll(".gallery-item img ");
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

    let currentIndex = 0;
    let mediaItems = Array.from(galleryItems);

    function openLightbox(index) {
        currentIndex = index;
        lightboxContent.innerHTML = "";

        let selectedItem = mediaItems[currentIndex].cloneNode(true);
        selectedItem.style.maxWidth = "100%";
        selectedItem.style.maxHeight = "100%";

        if (selectedItem.tagName.toLowerCase() === "video") {
            selectedItem.setAttribute("controls", "");
            selectedItem.removeAttribute("autoplay"); // Prevent autoplay
        }

        lightboxContent.appendChild(selectedItem);
        lightbox.style.display = "flex";
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener("click", function (event) {
            event.stopPropagation(); // Prevent bubbling issues
            openLightbox(mediaItems.indexOf(item)); // Ensure correct index is passed
        });
    });

    function navigateLightbox(direction) {
        currentIndex += direction;
        if (currentIndex < 0) currentIndex = mediaItems.length - 1;
        if (currentIndex >= mediaItems.length) currentIndex = 0;
        openLightbox(currentIndex);
    }

    closeBtn.addEventListener("click", function () {
        lightbox.style.display = "none";
        let video = lightboxContent.querySelector("video");
        if (video) {
            video.pause(); // Ensure video stops playing when lightbox is closed
        }
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
                let video = lightboxContent.querySelector("video");
                if (video) {
                    video.pause(); // Pause video when exiting lightbox
                }
            }
        }
    });

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            lightbox.style.display = "none";
            let video = lightboxContent.querySelector("video");
            if (video) {
                video.pause(); // Pause video when clicking outside
            }
        }
    });
});











// document.addEventListener("DOMContentLoaded", function () {
//     let galleryItems = document.querySelectorAll(".gallery-item img, .gallery-item video");
//     let lightbox = document.createElement("div");
//     lightbox.classList.add("lightbox");
//     lightbox.innerHTML = `
//         <button class="lightbox-close">&times;</button>
//         <button class="lightbox-prev">&#10094;</button>
//         <div class="lightbox-content"></div>
//         <button class="lightbox-next">&#10095;</button>
//     `;
//     document.body.appendChild(lightbox);

//     let lightboxContent = lightbox.querySelector(".lightbox-content");
//     let closeBtn = lightbox.querySelector(".lightbox-close");
//     let prevBtn = lightbox.querySelector(".lightbox-prev");
//     let nextBtn = lightbox.querySelector(".lightbox-next");

//     let currentIndex = 0;
//     let mediaItems = Array.from(galleryItems);

//     function openLightbox(index) {
//         currentIndex = index;
//         lightboxContent.innerHTML = "";

//         let selectedItem = mediaItems[currentIndex].cloneNode(true);
//         selectedItem.style.maxWidth = "100%";
//         selectedItem.style.maxHeight = "100%";
//         selectedItem.removeAttribute("autoplay");

//         if (selectedItem.tagName.toLowerCase() === "video") {
//             selectedItem.setAttribute("controls", ""); // Ensure controls are enabled
//         }

//         lightboxContent.appendChild(selectedItem);
//         lightbox.style.display = "flex";
//     }

//     function navigateLightbox(direction) {
//         currentIndex += direction;
//         if (currentIndex < 0) currentIndex = mediaItems.length - 1;
//         if (currentIndex >= mediaItems.length) currentIndex = 0;
//         openLightbox(currentIndex);
//     }

//     galleryItems.forEach((item, index) => {
//         item.addEventListener("click", function () {
//             openLightbox(index);
//         });
//     });

//     closeBtn.addEventListener("click", function () {
//         lightbox.style.display = "none";
//     });

//     prevBtn.addEventListener("click", function () {
//         navigateLightbox(-1);
//     });

//     nextBtn.addEventListener("click", function () {
//         navigateLightbox(1);
//     });

//     document.addEventListener("keydown", function (event) {
//         if (lightbox.style.display === "flex") {
//             if (event.key === "ArrowLeft") {
//                 navigateLightbox(-1);
//             } else if (event.key === "ArrowRight") {
//                 navigateLightbox(1);
//             } else if (event.key === "Escape") {
//                 lightbox.style.display = "none";
//             }
//         }
//     });

//     lightbox.addEventListener("click", function (event) {
//         if (event.target === lightbox) {
//             lightbox.style.display = "none";
//         }
//     });
// });
