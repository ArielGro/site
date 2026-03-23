function likeUp(button) {
    const whiteHeart = button.querySelector(".white_heart");
    const redHeart = button.querySelector(".red_heart");
    
    const liked = button.classList.contains("liked");
    const likeCountSpan = button.querySelector(".like-count");
    let likeCount = parseInt(likeCountSpan.textContent);

    if (liked) {
        whiteHeart.style.display = "block";
        redHeart.style.display = "none";
        button.classList.remove("liked");
        likeCount--;
        likeCountSpan.textContent = likeCount;
    } else {
        whiteHeart.style.display = "none";
        redHeart.style.display = "block";
        button.classList.add("liked");
        likeCount++;
        likeCountSpan.textContent = likeCount;
    }
}

function viewUp(element) {
    let viewCountSpan = element.querySelector(".view-count");
    if (!viewCountSpan) {
        const card = element.closest(".items") || element.closest(".services");
        if (card) {
            viewCountSpan = card.querySelector(".view-count");
        }
    }
    if (viewCountSpan) {
        let currentCount = parseInt(viewCountSpan.textContent);
        currentCount++;
        viewCountSpan.textContent = currentCount;
    }
}