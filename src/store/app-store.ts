import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
    state: () => ({
        isDarkMode: null,
        sidebar: {
            isCollapsed: false
        }
    }),
    persist: true,
    actions: {
        updateDarkMode(){
            if(this.isDarkMode === null){
                this.isDarkMode = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
            }

            if (this.isDarkMode) {
                document.documentElement.classList.add('dark')
                document.documentElement.classList.remove('light')
              } else {
                document.documentElement.classList.add('light')
                document.documentElement.classList.remove('dark')
              }
        },
        toggleSideBar(){
            this.sidebar.isCollapsed = !this.sidebar.isCollapsed
        }
    }
})