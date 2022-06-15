import {useEffect,useState} from 'react'
import useSWR from 'swr';

const API_URL ="https://nextjs-api-a0f30-default-rtdb.firebaseio.com/sales.json";

const LastSalesPage = (props) => {
    const [sales, setSales] = useState(props.sales)
    // const [loading, setLoading] = useState(false);
    const {data,error} = useSWR(API_URL,(url) => fetch(url).then(res => res.json()));
    // useEffect(() => {
    //     setLoading(true);
    //   fetch(API_URL)
    //   .then((response)=>response.json())
    //   .then((data)=>{
    //     setSales(data);
    //     setLoading(false);
    //   })
    // }, []);

    useEffect(() => {
       if(data){
        setSales(data);
       }
    }, [data])
    if(error){
        return <p>Failed to load data...</p>
    }
    if(!data && !sales){
        return <p>loading...</p>
    }
  return (
    <ul>
        {sales.map((data)=><li key={data.id}>{data.username} -${data.volume}</li>)}
    </ul>
  )
}

export const getStaticProps=async()=>{
   const response = await fetch(API_URL);
   const data = await response.json();
   return {props:{ sales:data}};
}
export default LastSalesPage;