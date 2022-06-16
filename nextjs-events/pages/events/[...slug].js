import { useRouter } from 'next/router';
import { useEffect,useState } from 'react';
import useSWR from 'swr';
import EventsList from '../../components/events/event-list';
import ResultsTitle from '../../components/results-title/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert/error-alert';
import { API_URL, getFilteredEvents } from '../../helpers/api-util';

const FilteredEventsPage = (props) => {
  const [loadedEvents, setLoadedEvents] = useState()
  const router = useRouter();
  const filterData = router.query.slug; // slug is from file name [...slug].js
  const {data,error} = useSWR(API_URL,(url)=>fetch(url).then(res => res.json()));

  useEffect(()=>{
    setLoadedEvents(data);
  },[data]);

  if (!loadedEvents) {
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
    numMonth > 12 ||
    error) {
      return <>
      <ErrorAlert>
      <p> Invalid filter Please adjust your  value.</p>
      </ErrorAlert>
      <div className='center'>
       <Button link="/events">Show all events</Button>
       </div>
      </>
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
});

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
  const date = new Date(numYear,numMonth - 1);
  return (
    <>
      <ResultsTitle date={date}/>
      <EventsList  items={filteredEvents}/>
    </>
  )
}


/*
// we will use server side propse
// since we don't know the number pages that we would need to generate

export const getServerSideProps = async(contex)=>{

  const {params}=contex;
  const filterData = params.slug; // slug is from file name [...slug].js
  
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
      return {
        props:{hasError:true},
        // notFound:true,
        // redirect:{
        //   destination:"/error"
        // }
      }
  }

  const filteredEvents =await getFilteredEvents({year:numYear,month:numMonth});
  return {
    props:{
      events:filteredEvents,
      date:{
        year:numYear,
        month:numMonth,
      }
    }
  }
}
*/
export default FilteredEventsPage;