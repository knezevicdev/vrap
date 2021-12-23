import { SHOW_DIALOG, HIDE_DIALOG } from './types';

export function showDialog(dialogType, dialogProps, overlayCanHide) {
  if (dialogType != 'PanelsDialog') {
    document.body.classList.add('body-noscroll-class');
    document.documentElement.classList.add('body-noscroll-class');
  }
  return {
    type: SHOW_DIALOG,
    dialogType,
    dialogProps,
    overlayCanHide
  };
}

export function hideDialog() {
  document.body.classList.remove('body-noscroll-class');
  document.documentElement.classList.remove('body-noscroll-class');
  return {
    type: HIDE_DIALOG
  };
}
