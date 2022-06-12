import { useRouter } from 'next/router'
import React from 'react'
import EventContent from '../../components/event-detail/event-content';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import { getEventById } from '../../dummy-data';
import ErrorAlert from '../../components/ui/error-alert/error-alert';

const EventDetailPage = () => {
  const router = useRouter();
  const eventId= router.query.eventId
  const event = getEventById(eventId);
  console.log(event);
  if(!event){
    return <ErrorAlert>
      <p>No Event Found</p>
    </ErrorAlert> ;
  }
  return (
    <>
      <EventSummary title={event.title}/>
      <EventLogistics 
      date={event.date}  
      address={event.location}
      image={event.image}
      alt={event.title}/>
        <EventContent>
          <p>{event.description}</p>
        </EventContent>
    </>
  )
}

export default EventDetailPage