import EventContent from '../../components/event-detail/event-content';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import { getAllEvents, getEventById } from '../../helpers/api-util';
import ErrorAlert from '../../components/ui/error-alert/error-alert';

const EventDetailPage = (props) => {
  const event = props.selectedEvent;

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

export const getStaticProps = async(context)=>{
  const eventId = context.params.eventId;
 const event = await getEventById(eventId);
  return {
    props:{selectedEvent:event}
  }
}

export const getStaticPaths=async()=>{
  const events = await getAllEvents();
  const paths = events.map((event)=>({params:{eventId:event.id}}))
  return {
    paths:paths,
    fallback:false,
  }
}
export default EventDetailPage