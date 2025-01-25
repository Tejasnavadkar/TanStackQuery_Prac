import './App.css';
import { useQuery } from '@tanstack/react-query'
import { Form } from './components/Form';


function App() {

  const {data,isLoading} = useQuery({
    queryKey:["todo"],   // usefull for cashing we can get cashed value through this key
    queryFn:async ()=>{
      await fetch('http://localhost:8000/todo')
    },
  })

  console.log("Todo-Data--",data)

  return (
   <div>
       <Form/>
   </div>
  );
}

export default App;
