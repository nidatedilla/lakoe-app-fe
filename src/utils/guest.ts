import { v4 as uuidv4 } from 'uuid';

export const getGuestId = (): string => {
  let guestId = localStorage.getItem('guestId');

  if (!guestId) {
    guestId = uuidv4(); 
    localStorage.setItem('guestId', guestId);
  }

  console.log("Guest ID utils:", guestId); 
  return guestId;
};
