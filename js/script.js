"use strict"

window.addEventListener('load', windowLoad);

function windowLoad() {

    document.body.classList.add('loaded');

    // swiper
    if (document.querySelector('.main-slider')) {
        new Swiper('.main-slider', {
            speed: 2000,
            effect: "fade",
            autoplay: {
                delay: 3000
            },
            pagination: {
                el: '.bullets__items',
                type: 'bullets',
                clickable: true
            },
        });
    }


    document.addEventListener("click", documentActions);

    function documentActions(e) {
        const targetElement = e.target;
        // tabs
        if (targetElement.closest('.nav-popular__item')) {
            const tabNavItem = targetElement.closest('.nav-popular__item');
            if (!tabNavItem.classList.contains('active')) {
                const activeTabNavItem = document.querySelector('.nav-popular__item.active');
                activeTabNavItem.classList.remove('active');
                tabNavItem.classList.add('active');

                const tabItems = document.querySelectorAll('.popular__tab');
                const activeTabItem = document.querySelector('.popular__tab.active');

                activeTabItem.classList.remove('active');
                tabItems[getIndex(tabNavItem)].classList.add('active');
            }

            function getIndex(el) {
                return Array.from(el.parentNode.children).indexOf(el);
            }

        }
        //Up
        if (targetElement.closest('.footer__up')) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }


    // Watcher 
    const items = document.querySelectorAll('[data-item]');
    const options = {
        threshold: 0.2
    }

    const callback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }

    const observer = new IntersectionObserver(callback, options);

    items.forEach(item => {
        observer.observe(item);
    });
}