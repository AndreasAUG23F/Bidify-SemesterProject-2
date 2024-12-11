import { placeBid } from '../../api/listing/bid';

export const onBid = async (event) => {
  event.preventDefault();

  console.log('click');

  const formData = new FormData(event.target);

  const bidAmount = formData.get('bidAmount');

  const listingId = JSON.parse(localStorage.getItem('listingId'));

  const id = listingId.id;

  const amount = Number(bidAmount);

  placeBid(amount, id);
};
