import {useRouter} from 'next/router'
import EventsList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import { getAllEvents, getFilteredEvents } from '../../dummy-data'

const AllEventsPage = () => {
  const events = getAllEvents();
  const router = useRouter();
  const findEventsHandler = (year,month)=>{
      const fullPath = `/events/${year}/${month}`;
      router.push(fullPath)
  }
  return (
    <>
       <EventsSearch onSearch={findEventsHandler}/>
        <EventsList items={events} />
    </>
  )
}

export default AllEventsPage