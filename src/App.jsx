import Navbar from "./components/navbar"
import { useState , useEffect} from "react"
import { v4 as uuidv4 } from 'uuid';
function App() {
 
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState("")
  const [showFinished, setShowFinished] = useState(false)
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])
  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  const handleChange = (e)=>{
    setTodo(e.target.value)
  }
  const handleAdd = ()=>{
    setTodos([...todos, {id:uuidv4(), desc:todo, isCompleted: false}])
    setTodo("")
    saveToLS()
  }
  const handleCheckbox = (e)=>{
    let id = e.target.name
    let index = todos.findIndex(item =>{
      return item.id === id;
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS()
  }
  const handleDelete = (id)=>{
    let newTodos = todos.filter(item =>{
      return item.id !==id
    })
    setTodos(newTodos)
    saveToLS()
  }
  const handleEdit = (e,desc,id)=>{
    setTodo(desc)
    let newTodos = todos.filter(item =>{
      return item.id !==id
    })
    setTodos(newTodos)
    saveToLS()
  }
  const toggleFinished = ()=>{
    setShowFinished(!showFinished)
  }
  return (
    <>
      <Navbar/>
      <div className="bg-violet-100 min-h-[80vh] m-10 rounded-2xl">
        <div className="font-bold p-4 mx-3">ToDo</div>
        <div className="flex gap-7 mx-7 w-[80%]">
          <input type="text" className="rounded-lg w-1/2 h-7 p-2" value={todo} onChange={handleChange}/>
          <button name="" className="bg-violet-400 rounded-lg px-4 py-1 hover:bg-violet-600" disabled={todo.length<=3} onClick={handleAdd}>Add</button>
        </div>
        <div className="font-bold p-4 mx-3 flex gap-2 items-center"><input type="checkbox" id="showfinished" onChange={toggleFinished}/><label for="showfinished">Show Finished</label></div>
        <div className="font-bold p-4 mx-3">Your ToDos</div>
        {todos.length===0 && <div className="min-h-[40vh] w-full flex justify-center items-center"><div className="font-semibold">No todos to Display</div></div>}
        {todos.map(todo =>{
        return (showFinished || !todo.isCompleted) && <div key={todo.id} className="flex justify-between gap-5 p-3 mx-4 my-2">
            <input name={todo.id} className="ml-8" type="checkbox" onChange={handleCheckbox} checked={todo.isCompleted}/>
            <div className={todo.isCompleted?"line-through w-[70vw] rounded-lg bg-violet-50 p-2":"w-[70vw] rounded-lg bg-violet-50 p-2"}>{todo.desc}</div>
            <div className="flex gap-3 h-full">
              <button className="bg-violet-500 px-3 py-1 rounded-lg hover:bg-violet-600" onClick={(e)=>handleEdit(e,todo.desc,todo.id)}>Edit</button>
              <button className="bg-violet-500 px-3 py-1 rounded-lg hover:bg-violet-600" onClick={()=>{handleDelete(todo.id)}}>Delete</button>
            </div>
          </div>  
        })}
      </div>
    </>
  )
}

export default App
