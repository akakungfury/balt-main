import "../scss/app.scss";
import AOS from "aos";
import Parallax from 'parallax-js'
import Swiper from 'swiper'
import {Navigation, Autoplay, EffectFade, EffectFlip, EffectCube, EffectCreative} from 'swiper/modules'
import Lenis from '@studio-freight/lenis'

import('../assets/images/baltika/top-wave-img.png')
import('../assets/images/baltika/top-wave-img-m-2.png')
import('../assets/images/baltika/bottom-wave-img.png')
import('../assets/images/baltika/bottom-wave-img-m-2.png')
import('../assets/images/baltika/footer-block-med.jpg')
import('../assets/images/baltika/footer-block-mob.jpg')

AOS.init({
    offset: 50,
    delay: 50,
    duration: 500,
    easing: "ease-in-out",
    once: true,
    disableMutationObserver: true,
    startEvent: "DOMContentLoaded",
});

const topWaveBg = document.querySelector('.main-intro__wave-img');
const topWaveMobBg = document.querySelector('.main-intro__wave-img-mob');
const bottomWaveBg = document.querySelector('.footer__wave-img');
const bottomWaveMobBg = document.querySelector('.footer__wave-img-mob');
const footer = document.querySelector('.footer');

if (window.innerWidth > 760) {
    topWaveBg.style.backgroundImage = `url(${window.location.origin}${topWaveBg.dataset.src})`;
} else {
    topWaveMobBg.style.backgroundImage = `url(${window.location.origin}${topWaveMobBg.dataset.src})`;
}

if (window.innerWidth > 450) {
    bottomWaveBg.style.backgroundImage = `url(${window.location.origin}${bottomWaveBg.dataset.src})`;
} else {
    bottomWaveMobBg.style.backgroundImage = `url(${window.location.origin}${bottomWaveMobBg.dataset.src})`;
}


export const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    touchInertiaMultiplier: 5,
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

window.addEventListener("load", () => {
    document.querySelectorAll(".preload").forEach((el) => el.classList.remove("preload"));
    document.querySelectorAll('.scene').forEach((item) => {
        const parallaxInstance = new Parallax(item);
    });

    if (window.innerWidth > 450) {
        setTimeout(() => {
            footer.style.backgroundImage = `url(${window.location.origin}${footer.dataset.srcDesk})`;
            footer.classList.add('js--desk')
        }, 500)
    } else {
        setTimeout(() => {
            footer.style.backgroundImage = `url(${window.location.origin}${footer.dataset.srcMob})`;
            footer.classList.add('js--mob')
        }, 500)
    }

    if (window.innerWidth > 760) {
        setTimeout(() => {
            topWaveMobBg.style.backgroundImage = `url(${window.location.origin}${topWaveMobBg.dataset.src})`;
        }, 500)
    } else {
        setTimeout(() => {
            topWaveBg.style.backgroundImage = `url(${window.location.origin}${topWaveBg.dataset.src})`;
        }, 500)
    }

    if (window.innerWidth > 450) {
        setTimeout(() => {
            bottomWaveMobBg.style.backgroundImage = `url(${window.location.origin}${bottomWaveMobBg.dataset.src})`;
        }, 500)
    } else {
        setTimeout(() => {
            bottomWaveBg.style.backgroundImage = `url(${window.location.origin}${bottomWaveBg.dataset.src})`;
        }, 500)
    }

    const bodyOverlay = document.querySelector('#body-overlay')
    const openVideoPopupBtn = document.querySelector('.main-intro__video-btn')

    const displayBodyOverlay = () => bodyOverlay.classList.add('body-overlay--shown')
    const hideBodyOverlay = () => bodyOverlay.classList.remove('body-overlay--shown')

    const closePopupBtns = document.querySelectorAll('.popup__close-btn')
    const popupOpenBtns = document.querySelectorAll('[data-popup]')
    const allPopups = document.querySelectorAll('.popup')

    function closePopup() {
        const popup = this.closest('.popup')
        if (popup) {
            popup.classList.remove('popup--shown')
            // if (popup.querySelector('form')) {
            //   resetForm.apply(popup.querySelector('form'))
            // }
            hideBodyOverlay()
            //TODO:
            // unlockBodyScroll(lenis)

            const formFields = document.querySelectorAll('.form-field')
            const popupVideoIframe = popup.querySelector('.video-container iframe')

            if (popupVideoIframe) {
                videopPlayer.pause()
            }
            formFields.forEach((field) => {
                field.classList.remove('field-error')
            })
            // popup.removeEventListener('pointermove', preventDefault)
        }
    }

    function lockBodyScroll(lenisInstance) {
        document.body.classList.add('lock-scroll');
        // !isTouchDeviceType && !communityArticlePage && lenis.stop()
        // !isTouchDeviceType && lenis.stop()
        console.log(lenisInstance)
        if (lenisInstance) {
            lenisInstance.stop()
        }
    }

    function unlockBodyScroll(lenisInstance) {
        document.body.classList.remove('lock-scroll');
        // !isTouchDeviceType && !communityArticlePage && lenis.start()
        // !isTouchDeviceType && lenis.start()
        console.log(lenisInstance)
        if (lenisInstance) {
            lenisInstance.start()
        }
    }

    let videoIframe = null
    let videopPlayer;

    function openPopup(id) {
        let popup
        // if (this.dataset.popup.includes('step')) {
        //   popup = document.querySelector(`#${this.dataset.popup}`)
        // } else {
        popup = document.querySelector(`#${id}-popup`)
        // this.dataset.extraField ? popup.classList.add('popup--extra-fields') : popup.classList.remove('popup--extra-fields')
        // }
        if (popup) {
            if (id.includes('video') && videoIframe === null) {
                videoIframe = document.querySelector('iframe');
                videopPlayer = new Vimeo.Player(videoIframe);
            }
            popup.classList.add('popup--shown')
            displayBodyOverlay()
            //TODO:
            // closeHamburgerNavigationMenu();
            // lockBodyScroll(lenis)
            // popup.addEventListener('pointermove', preventDefault)
        }
    }

    const closeAllPopups = () => {
        const step3Block = document.querySelector('.success-order__content')

        if (window.innerWidth > 1050) {
            allPopups.forEach((popup) => {
                const popupVideoIframe = popup.querySelector('.video-container iframe')
                popup.classList.remove('popup--shown')

                if (popupVideoIframe) {
                    videopPlayer.pause()
                    // popupVideoIframe.src = ''
                }
                if (popup.querySelector('form')) {
                    resetForm.apply(popup.querySelector('form'))
                }
            })
            hideBodyOverlay()
            //TODO:
            // unlockBodyScroll(lenis)
            //TODO: FOR ALL POPUPS
            //popup.removeEventListener('pointermove', preventDefault)

            const formFields = document.querySelectorAll('.form-field')

            formFields.forEach((field) => {
                field.classList.remove('field-error')
            })
        }
    }

    openVideoPopupBtn.addEventListener('click', () => {
        console.log("FIREDDD")
        openPopup('video');
    })

    document.addEventListener('keydown', (e) => {
        if (bodyOverlay.classList.contains('body-overlay--shown') && e.code === 'Escape') {
            closeAllPopups()
        }
    })

    bodyOverlay.addEventListener('click', (e) => {
        if (!e.target.closest('.popup')) closeAllPopups()
    })

    closePopupBtns.forEach((btn) => btn.addEventListener('click', closePopup))


    // document.addEventListener('resize', () => {
    //     if (window.innerWidth > 450 && !footer.classList.contains('js--desk')) {
    //         footer.style.backgroundImage = `url(${window.location.origin}${footer.dataset.srcDesk})`;
    //         footer.classList.add('js--desk')
    //         footer.classList.remove('js--mob')
    //     } else if (!footer.classList.contains('js--mob')) {
    //         footer.style.backgroundImage = `url(${window.location.origin}${footer.dataset.srcMob})`;
    //         footer.classList.add('js--mob')
    //         footer.classList.remove('js--desk')
    //     }
    // })


    if (document.querySelector('.product-slider')) {
        const productSlider = new Swiper('.product-slider', {
            // modules: [Navigation, Autoplay, EffectFlip],
            modules: [Navigation, Autoplay, EffectCube],
            navigation: {
                nextEl: '.product-slider__navigation .product-slider__button-next',
                prevEl: '.product-slider__navigation .product-slider__button-prev',
            },
            // effect: "flip",
            // flipEffect: {
            //     slideShadows: false,
            // },
            effect: "cube",
            cubeEffect: {
                shadow: false,
                slideShadows: false,
            },
            lazy: true,
            loop: true,
            loopedSlides: 2,
            speed: 800,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            // breakpoints: {
            //   1101: {
            //     slidesPerView: '4',
            //     centeredSlides: false,
            //   }
            // },
        })

        const productThumbs = document.querySelector('.product-slider__thumbs')

        productSlider.on('realIndexChange', function () {
            productThumbs.classList.toggle('js-flipped');
        });

        productThumbs.addEventListener('click', () => {
            productSlider.slideNext()
        })
        productThumbs.addEventListener('mouseover', () => {
            // console.log(productSlider.autoplay)
            // productSlider.pause()
            // productSlider.stopAutoplay();
            // productSlider.stop()
            // productSlider.autoplay.paused = true;
            // console.log(productSlider.autoplay)
        })
        productThumbs.addEventListener('mouseleave', () => {
            // productSlider.autoplay = true
            // productSlider.autoplay.paused = false;
        })
    }
});
