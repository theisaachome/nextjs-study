import EventContent from '../../components/event-detail/event-content';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import { getAllEvents, getEventById } from '../../helpers/api-util';
import ErrorAlert from '../../components/ui/error-alert/error-alert';
import { getFeaturedEvents } from '../../dummy-data';
import Head from 'next/head';

const EventDetailPage = (props) => {
  const event = props.selectedEvent;

  if(!event){
    return <div className='center'>
      <h2>loading...</h2>
    </div> ;
  }
  return (
    <>
    <Head> 
        <title>{event.title}</title>
        <meta
        name='description'
        content={event.description}/>
      </Head>
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
    props:{selectedEvent:event},
    revalidate:30, // refresh every 30 sec
  }
}

export const getStaticPaths=async()=>{
  // const events = await getAllEvents();
  const events = await getFeaturedEvents(); 
  // just for only featured event not need for all events
  // to optimize the performance.
  const paths = events.map((event)=>({params:{eventId:event.id}}))
  return {
    paths:paths,
    //fallback:true, // telling more pages are there.
    fallback:"blocking", // telling not to do anything untill page is totally generated.
  }
}
export default EventDetailPage