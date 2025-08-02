import { defineStore } from 'pinia';

export const useOffcanvasStore = defineStore('offcanvas', {
  state: () => ({
    isOpen: false,
  }),

  actions: {
    toggle() {
      this.isOpen = !this.isOpen;
    },

    open() {
      this.isOpen = true;
    },

    close() {
      this.isOpen = false;
    },
  },
});
