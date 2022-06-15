import EventsList from '../components/events/event-list';
import { getFeaturedEvents } from '../helpers/api-util';

export default function Home(props) {

  return (
    <div>
      <EventsList items={props.events}/>
    </div>
  )
}

// we should use getStaticProps due to SEO since
// user want to see fully loaded page 
// so pre-generated must be food choice
export const getStaticProps = async()=>{
  const featuredEvents = await getFeaturedEvents();
  return {
    props:{
      events:featuredEvents,
    }
  }
}
