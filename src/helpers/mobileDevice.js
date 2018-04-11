export const mobileLandscape = (height) => {
    if ( (height < 480) && (/Android|webOS|iPhone|iPod|BlackBerry|BB|IEMobile|Windows Phone|Opera Mini/i.test(navigator.userAgent)) ) {
        return true;
    } else {
        return false;
    }
};

export const mobilePortrait = (height) => {
    if ( (height >= 480) && (/Android|webOS|iPhone|iPod|BlackBerry|BB|IEMobile|Windows Phone|Opera Mini/i.test(navigator.userAgent)) ) {
        return true;
    } else {
        return false;
    }
}
