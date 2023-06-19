import { toast } from 'react-toastify';

export const ToastWrapper = (msg, type = 'info') =>
  toast(msg, {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type,
  });
