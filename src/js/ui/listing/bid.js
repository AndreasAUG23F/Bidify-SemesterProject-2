import { fetchBid } from '../../api/listing/bid';

export const onBid = async (event) => {
  event.preventDefault();

  console.log('click');

  const formData = new FormData(event.target);

  const bidAmount = formData.get('bidAmount');

  const listingData = JSON.parse(localStorage.getItem('listingData'));

  const id = listingData.id;

  const amount = Number(bidAmount);

  fetchBid(amount, id);
};
