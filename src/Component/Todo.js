import React,{useState,useEffect} from 'react'

function Todo() {
    const [collect, setCollect]=useState(JSON.parse(localStorage.getItem('one'))||[])
    const [count, setCount]=useState(0) 
    const [task, setTask]=useState('') 
    const [date, setDate]=useState('') 
    const [status, setStatus]=useState('Pending') 
    const Submitt=(e)=>{
        e.preventDefault();
        if (task === "" || !date) return alert("please fill all field")
        collect.push({task,date,status})
        localStorage.setItem("one", JSON.stringify(collect))
        setDate('')
        setTask('')
    }
    const handleDelete=(i)=>{
        let ca =collect.filter((objtask,j)=> i!==j)
         setCollect(ca)
        localStorage.setItem("one", JSON.stringify(ca))
        setCount(prev=>prev-1)
    }
    const sComplete=(sts, i)=>{
        let fil=collect.filter((a,j)=>i!==j)
        // const newObj = {...fil[i],status:"completed"}
        // alert("are you sure")
        fil.push({...collect[i],status:"completed"}) //= [...fil.slice(0,i-1),{...fil[i],status:"completed"},...fil.slice(i+1,fil.length+1)]
        console.log(fil)
        localStorage.setItem("one", JSON.stringify(fil))
        setCount(prev=>prev-1)
    }
    useEffect(()=>{
        setCollect(JSON.parse(localStorage.getItem("one")) ||[])
        console.log("first")
      },[count])
    return (
    <div>
        <div className='container'>
        <form onSubmit={Submitt} autocomplete="off">
                    <label>Task</label>
                    <input className='userInput'
                        type="text"
                        name="TaskTaker"
                        value={task}
                        onChange={(e) =>
                            setTask(e.target.value)
                        }
                    ></input>
                    
                    <label> Date:</label>
                    <input
                        type='date'
                        value={date}
                        onChange={(e) =>
                            setDate(e.target.value)
                        }
                    ></input>
                    <br/> <br />
                    <button className='submit' type='submit' >Submit</button>
               </form>
               <div className='container1'>
                <table>
                    <tbody>
                        {
             collect.map((obj, index) => <tr key={index}>
                 <td><h5>{obj.task}</h5></td>
                 <td><h5>{obj.date}</h5></td>
                 <td> <button onClick={()=>sComplete(obj.status,index)}>{obj.status}</button></td>
                <td> <button onClick={()=>handleDelete(index)}> Delete</button></td>
                </tr>)
                       }
                   </tbody>
                </table>
            </div>
            </div>
    </div>
  )
}

export default Todo