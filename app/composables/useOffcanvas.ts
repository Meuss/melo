import { useOffcanvasStore } from '~/stores/offcanvas';

export const useOffcanvas = () => {
  const store = useOffcanvasStore();

  return {
    isOpen: computed(() => store.isOpen),
    toggle: store.toggle,
    open: store.open,
    close: store.close,
  };
};
