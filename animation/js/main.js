let delayedCall;
let slow = 20;
var animation = gsap.timeline({
    scrollTrigger: {
        trigger: '#animation',
        pin: true,
        start: 'top',
        end: (screen.height * slow),
        scrub: 1,
        onUpdate: (self) => {
            if (self.direction === 1) {
                ((0.307 < self.progress && self.progress < 0.368) || self.progress > 0.407) ? flipHorizontal(-1) : flipHorizontal(1)
            }
            else { flipHorizontal(-1) }
            $("#character").addClass("run")
            if (delayedCall) { delayedCall.kill() }
            delayedCall = gsap.delayedCall(0.2, () => $("#character").removeClass("run"))
        },
    }
}).to('#character', {
    motionPath: {
        path: ".path",
        align: ".path",
        alignOrigin: [0.5, 0.5],
        // autoRotate: true,
    }
})

var flipHorizontal = (direction) => gsap.to("#character", { scaleX: direction, overwrite: 'auto', duration: 0.1 });