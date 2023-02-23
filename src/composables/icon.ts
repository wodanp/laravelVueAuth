import { h } from "vue"
import SvgIcon from "@/components/SvgIcon.vue"

export const useIcon = (params) => {
    return h(SvgIcon, params)
}