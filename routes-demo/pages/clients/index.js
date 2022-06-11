import Link from 'next/link'

const ClientsPage = () => {
    const clients=[
        {id:"isaac",name:"Isaac Home"},
        {id:"mercy",name:"Mercy Home"}
    ]
  return (
    <div>
         <h1>The Projects of a given client.</h1>
         <ul>
            {
                clients.map((c)=>{
                    return  (<li key={c.id}>
                    <Link href={`/clients/${c.id}`}>{c.name}</Link>
                </li>)
                })
            }
           
         </ul>
    </div>
  )
}

export default ClientsPage