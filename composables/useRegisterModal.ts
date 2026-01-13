import { ref } from 'vue'

const isRegisterModalOpen = ref(false)

export function useRegisterModal() {
    const openModal = () => {
        isRegisterModalOpen.value = true
    }

    const closeModal = () => {
        isRegisterModalOpen.value = false
    }

    return {
        isOpen: isRegisterModalOpen,
        openModal,
        closeModal,
    }
}
