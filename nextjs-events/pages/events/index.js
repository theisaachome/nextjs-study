import {useRouter} from 'next/router'
import EventsList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import { getAllEvents, getFilteredEvents } from '../../helpers/api-util'

const AllEventsPage = (props) => {
  const {events} = props;
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
export const getStaticProps =async()=>{
  const events = await getAllEvents();
  return {
    props:{events:events},
    revalidate:60,
  }
}
export default AllEventsPage