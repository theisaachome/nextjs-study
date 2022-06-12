import { useRouter } from 'next/router';
import EventsList from '../../components/events/event-list';
import ResultsTitle from '../../components/results-title/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert/error-alert';
import { getFilteredEvents } from '../../dummy-data';

const FilteredEventsPage = () => {
  const router = useRouter();
  const filterData = router.query.slug; // slug is from file name [...slug].js
  
  if (!filterData) {
    return <p className='center'>loading...</p>
  }
  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;
  if (
    isNaN(numYear) ||
    isNaN(numMonth)|| 
    numYear > 2030 || 
    numYear < 2021|| 
    numMonth < 1 || 
    numMonth > 12) {
      return <>
      <ErrorAlert>
      <p> Invalid filter Please adjust your  value.</p>
      </ErrorAlert>
      <div className='center'>
       <Button link="/events">Show all events</Button>
       </div>
      </>
  }

  const filteredEvents = getFilteredEvents({year:numYear,month:numMonth});
  if(!filteredEvents || filteredEvents.length===0){
    return <>
    <ErrorAlert>
      <p>No Events found for the chosen filters!.</p>
    </ErrorAlert>
       <div className='center'>
       <Button link="/events">Show all events</Button>
       </div>
    </>
  }
  const date = new Date(numYear,numMonth-1);
  return (
    <>
      <ResultsTitle date={date}/>
      <EventsList  items={filteredEvents}/>
    </>
  )
}

export default FilteredEventsPage;