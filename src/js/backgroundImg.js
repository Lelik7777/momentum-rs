export const getImage = (url, time, randomNum) => `${url}/${time}/${randomNum}.jpg`;

export const getBackgroundImg = (url, time, randomNum) => {
    const img = new Image();
    img.src = `${getImage(url, time, randomNum)}`;
    img.onload = () => document.body.style.backgroundImage = `url(${img.src})`;
}

