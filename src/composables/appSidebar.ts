import { ref, Ref } from 'vue';

const ENABLE_SWIPE_PRESENT = 60;

type direction = 'right'|'left'|'top'|'bottom'

export default function appSidebar(isMinMode: Ref<boolean>) {
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
    function setShow(bool: boolean) {
        isOpen.value = bool;
    }
    function swipeHandler(direction: direction, event: TouchEvent) {
        if (!window.TouchEvent || event.type !== 'touchend') {
            return;
        }
        if (direction === 'right' && isMinMode && event.changedTouches[0].clientX <= ignoreSwipeUp.value) {
            setShow(true);
        }
        if (direction === 'left') {
            setShow(false);
        }
    }
}
