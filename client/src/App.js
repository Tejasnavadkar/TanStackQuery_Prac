import './App.css';
import { useQuery } from '@tanstack/react-query'
import { Form } from './components/Form';


function App() {

  const {data,status,isFetching} = useQuery({
    queryKey:["todo"],   // usefull for cashing we can get cashed value or refetch using this key (the ['todo'] query key is a likely identifier for this query).
    queryFn:async ()=> await (await fetch('http://localhost:8000/todo')).json() // These queries are cached by the query client to avoid unnecessary re-fetching of data.
    ,
  })

  if(isFetching) return <h1>Loading....</h1>

  console.log("Todo-Data--",data)

  return (
   <div>
       <Form/>
       {data && data.data && data.data.map((todo)=> <li>{todo.title}</li>)}
   </div>
  );
}

export default App;
