import { useRouter } from 'next/router'
import React from 'react'
import { getEventById } from '../../dummy-data';

const EventDetailPage = () => {
  const router = useRouter();
  const eventId= router.query.eventId
  const event = getEventById(eventId);
  if(!event){
    return <p>No Event Found</p>
  }
  return (
    <div>
        <h2>{event.title}
        </h2>
    </div>
  )
}

export default EventDetailPage