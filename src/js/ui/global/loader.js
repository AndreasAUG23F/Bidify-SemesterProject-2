export function showLoader() {
  const loader = document.createElement('div');
  loader.id = 'loader';

  loader.classList.add(
    'fixed',
    'top-0',
    'left-0',
    'w-full',
    'h-full',
    'bg-white',
    'bg-opacity-70',
    'flex',
    'justify-center',
    'items-center',
    'z-50'
  );

  const spinner = document.createElement('div');
  spinner.classList.add(
    'border-8',
    'border-blue-200',
    'border-t-8',
    'border-t-blue-600',
    'rounded-full',
    'w-16',
    'h-16',
    'animate-spin'
  );

  loader.appendChild(spinner);
  document.body.appendChild(loader);
}

export function hideLoader() {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.remove();
  }
}
