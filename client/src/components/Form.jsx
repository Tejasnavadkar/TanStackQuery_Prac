import { useMutation, useQueryClient } from "@tanstack/react-query"
import React, { useState } from "react"

const CreateTodo = async (text) =>{
    const res = await fetch('http://localhost:8000/todo/create',{
         method:'post',
         headers:{
             'Content-Type':'application/json',
 
         },
         body: JSON.stringify({title:text})
     })
     if(res.ok){
         console.log(res.json())
     }
    }

export const Form = () =>{

   

   const [text,setText] = useState("")
   const queryClient = useQueryClient()
  

//    const AddMutation = useMutation(CreateTodo(text),{
//     onSuccess:()=> console.log("created"),
//     onError:(error)=>console.log("err--",error)
//    })

const AddMutation = useMutation({   // used when we update or create in serverside 
    mutationFn:(text)=>CreateTodo(text),
    onSuccess:()=> {
        console.log("created")
        queryClient.invalidateQueries(['todo']) // the line queryClient.invalidateQueries(['todo']) is used to ensure that any query with the key ['todo'] gets invalidated and refetched after the mutation (the creation of a new todo) succeeds.
    
        // You trigger the mutation to create a new todo (todoMutation.mutate()).
        // On success, the onSuccess callback is called.
        // In this callback, queryClient.invalidateQueries(['todo']) is called to invalidate the ['todo'] query.
        // The next time the app tries to read from the ['todo'] query, it will be refetched to include the newly created todo.
        // This ensures that after a successful mutation (like creating a todo), your UI reflects the most up-to-date data.
    
    },
    onError:(error)=>console.log("err--",error)
})

    return (
        <div>
          <input type="text" value={text} onChange={(e)=>setText(e.target.value)} />
           <button onClick={()=>AddMutation.mutate(text)} >Create</button>
        </div>
    )
}