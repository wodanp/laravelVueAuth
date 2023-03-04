import { ref } from "vue"

export const useElDialog = () => {

    const showDialog = ref(false)

    const openDialog = () =>{
        showDialog.value = true
    }

    return{
        showDialog,
        openDialog,

    }
}