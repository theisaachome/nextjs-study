import Head from 'next/head';
import EventsList from '../components/events/event-list';
import { getFeaturedEvents } from '../helpers/api-util';

export default function Home(props) {

  return (
    <div>
      <Head> 
        <title>NextJS Events</title>
        <meta
        name='description'
        content='Find a lot of great events that allow you to evolve...'/>
      </Head>
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
      events:featuredEvents    
    },
    revalidate:1800,// fetch again every 30 minute
  }
}
