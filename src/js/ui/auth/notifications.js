import { NOTIFICATIONS } from '../../api/constants';

/* import { NOTIFICATIONS } from '../constants.js';
 */
export const createNotificationBell = () => {
  const notificationBell = document.createElement('div');
  notificationBell.className = 'relative cursor-pointer mr-4';

  const bellIcon = document.createElement('i');
  bellIcon.className =
    'fa-solid fa-bell text-2xl text-gray-700 hover:text-gray-900 transition-colors duration-300';
  notificationBell.appendChild(bellIcon);

  const notificationBadge = document.createElement('span');
  notificationBadge.className =
    'absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center hidden';
  notificationBadge.textContent = '0';
  notificationBell.appendChild(notificationBadge);

  const dropdownMenu = document.createElement('div');
  dropdownMenu.className =
    'absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10 hidden flex-col';
  dropdownMenu.style.maxHeight = '300px';
  dropdownMenu.style.overflowY = 'auto';

  const emptyMessage = document.createElement('div');
  emptyMessage.className = 'text-gray-500 text-sm text-center py-2';
  emptyMessage.textContent = 'No notifications yet';
  dropdownMenu.appendChild(emptyMessage);

  notificationBell.appendChild(dropdownMenu);

  const updateDropdown = (notifications) => {
    dropdownMenu.innerHTML = '';
    if (notifications.length === 0) {
      dropdownMenu.appendChild(emptyMessage);
    } else {
      notifications.forEach((notification) => {
        const notificationItem = document.createElement('div');
        notificationItem.className =
          'px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer';
        notificationItem.textContent = notification.message;
        dropdownMenu.appendChild(notificationItem);
      });
    }
  };

  // Funksjon for å oppdatere antall varsler
  const updateNotifications = (count, notifications) => {
    if (count > 0) {
      notificationBadge.textContent = count;
      notificationBadge.classList.remove('hidden');
    } else {
      notificationBadge.textContent = '0';
      notificationBadge.classList.add('hidden');
    }
    updateDropdown(notifications); // Oppdater dropdown
  };

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token'); // Hent token fra lokal lagring
      if (!token) {
        console.warn('User is not logged in');
        return;
      }

      const response = await fetch(NOTIFICATIONS, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Bruk token for autentisering
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch notifications: ${response.status}`);
      }

      const data = await response.json();
      updateNotifications(data.count, data.notifications); // Oppdater UI med data fra API-et
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Hent varsler hvert 30. sekund
  setInterval(fetchNotifications, 30000);

  // Initialiser varsler når bjellen opprettes
  fetchNotifications();

  // Vis/skjul dropdown ved klikk
  let isDropdownVisible = false;
  notificationBell.addEventListener('click', () => {
    isDropdownVisible = !isDropdownVisible;
    dropdownMenu.classList.toggle('hidden', !isDropdownVisible);
  });

  // Lukk dropdown når du klikker utenfor
  document.addEventListener('click', (event) => {
    if (!notificationBell.contains(event.target)) {
      isDropdownVisible = false;
      dropdownMenu.classList.add('hidden');
    }
  });

  return notificationBell;
};
