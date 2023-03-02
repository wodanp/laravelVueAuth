import { onBeforeMount, onBeforeUnmount, ref } from "vue";

// TODO bessere filename?
export const isMobile = () => {
    const WIDTH = 992
    const isMobile = ref(false)
    onBeforeMount(() => {
        checkIsMobile()
        window.addEventListener('resize', checkIsMobile)
    })
    onBeforeUnmount(() => {
        window.removeEventListener('resize', checkIsMobile)
    })
    function checkIsMobile() {
        const rect = document.body.getBoundingClientRect()
        isMobile.value = rect.width < WIDTH
    }
    return isMobile
}