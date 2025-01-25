import { useMutation } from "@tanstack/react-query"
import React, { useState } from "react"



export const Form = () =>{

    const CreateTodo = async (text) =>{
       const res = await fetch('http://localhost:8000/todo/create',{
            method:'post',
            headers:{
                'Content-Type':'application/json',
    
            },
            body: JSON.stringify({title:text})
        })
        if(res.ok){
            console.log(res.bodyc)
        }
       }

   const [text,setText] = useState("")

  

//    const AddMutation = useMutation(CreateTodo(text),{
//     onSuccess:()=> console.log("created"),
//     onError:(error)=>console.log("err--",error)
//    })

const AddMutation = useMutation({
    mutationFn:(text)=>CreateTodo(text),
    onSuccess:()=> console.log("created"),
    onError:(error)=>console.log("err--",error)
})

    return (
        <div>
          <input type="text" value={text} onChange={(e)=>setText(e.target.value)} />
           <button onClick={()=>AddMutation.mutate(text)} >Create</button>
        </div>
    )
}