import { ref } from 'vue';

const ENABLE_SWIPE_PRESENT = 60;

export default function appSidebar(isMinMode) {
    const isOpen = ref(false);
    const ignoreSwipeUp = ref(window.innerWidth * ENABLE_SWIPE_PRESENT / 100);

    return {
        setShow,
        swipeHandler,
        onResize,
        isOpen,
    };

    function onResize() {
        ignoreSwipeUp.value = window.innerWidth * ENABLE_SWIPE_PRESENT / 100;
        if (!isMinMode) {
            setShow(false);
        }
    }
    function setShow(bool) {
        if (isOpen.value !== bool) {
            isOpen.value = bool;
            document.documentElement.style.overflow = (bool) ? 'hidden' : 'auto';
        }
    }
    function swipeHandler(direction, event) {
        if (direction === 'right' && isMinMode && event.changedTouches[0].clientX <= ignoreSwipeUp.value) {
            setShow(true);
        }
        if (direction === 'left') {
            setShow(false);
        }
    }
}
