const goRight = () => {
    const keyboardEvent = new Event('keydown')
    keyboardEvent.which = 39

    document.dispatchEvent(keyboardEvent);
}

const stopGoRight = () => {
    const keyboardEvent = new Event('keyup')
    keyboardEvent.which = 39

    document.dispatchEvent(keyboardEvent);
}


const goLeft = () => {
    const keyboardEvent = new Event('keydown')
    keyboardEvent.which = 37

    document.dispatchEvent(keyboardEvent);
}

const stopGoLeft = () => {
    const keyboardEvent = new Event('keyup')
    keyboardEvent.which = 37

    document.dispatchEvent(keyboardEvent);
}

const clearAction = () => {
    stopGoRight()
    stopGoLeft()
}

const jump = () => {
    const keyboardEvent = new Event('keydown')
    keyboardEvent.which = 32

    document.dispatchEvent(keyboardEvent);
}
const stopJump = () => {
    const keyboardUpEvent = new Event('keyup')
    keyboardUpEvent.which = 32

    document.dispatchEvent(keyboardUpEvent);
}

const handleOrientation = (event) => {
    if (event.gamma > 7.5) {
        goRight()
        return
    }

    if (event.gamma < -7.5) {
        goLeft()
        return
    }

    clearAction()
}

const init = () => {
    if (typeof( DeviceMotionEvent ) !== "undefined" && typeof( DeviceMotionEvent.requestPermission) === "function" ) {
        document.getElementById('ios-fire-button').addEventListener('click', () => {
            DeviceOrientationEvent.requestPermission().then(res => {
                if (res === 'granted') {
                    window.addEventListener("deviceorientation", handleOrientation, true);
                }
            })
        })
    } else {
        window.addEventListener("deviceorientation", handleOrientation, true);
    }

    window.addEventListener('mousedown', jump)
    window.addEventListener('touchstart', jump)
    window.addEventListener('mouseup', stopJump)
    window.addEventListener('touchend', stopJump)
}

init()

