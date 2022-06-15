


const API_URL = "https://nextjs-api-a0f30-default-rtdb.firebaseio.com/events.json";

export const getAllEvents = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
}


export const getFeaturedEvents = async () => {
    const allEvents = await getAllEvents();
    return allEvents.filter((event)=>event.isFeatured);
}


export const getEventById=async(id)=> {
    const allEvents = await getAllEvents();
    return allEvents.find((event) => event.id === id);
  }