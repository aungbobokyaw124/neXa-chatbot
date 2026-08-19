export function getAppShell() {
  return document.getElementById('app');
}

export function hidePreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) preloader.remove();
}
