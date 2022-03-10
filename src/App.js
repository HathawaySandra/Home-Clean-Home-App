import React, { useState } from 'react';
import './App.css';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import { v4 } from "uuid";
// import RightIcon from '../public/right.png';
let quote = document.getElementById("quote");
const url = "https://api.quotable.io/random";
fetch(url)
  .then((data) => data.json())
  .then((item) => {
    quote.innerText = item.content;
  });
 

const item = {
  id: v4(),
  name: "Wash the clothes"
}

const item2 = {
  id: v4(),
  name: "Wash the dishes"
}

function App() {
  const [text, setText] = useState("")
  const [click, setClick] = useState()
  const [state, setState] = useState({
    "todo": {
      title: "To clean",
      items: [item, item2]
    },
    "Monday": {
      title: "Monday",
      items: []
    },
    "Tuesday": {
      title: "Tuesday",
      items: []
    },
    "Wednesday": {
      title: "Wednesday",
      items: []
    },
    "Thursday": {
      title: "Thursday",
      items: []
    },
    "Friday": {
      title: "Friday",
      items: []
    },
    "Saturday": {
      title: "Saturday",
      items: []
    },
    "Sunday": {
      title: "Sunday",
      items: []
    }
    
  })

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return
    }

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return
    }

    // Creating a copy of item before removing it from state
    const itemCopy = { ...state[source.droppableId].items[source.index] }

    setState(prev => {
      prev = { ...prev }
      // Remove from previous items array
      prev[source.droppableId].items.splice(source.index, 1)


      // Adding to new items array location
      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)


      return prev
    })
  }

  const addItem = () => {
    setState(prev => {
      return {
        ...prev,
        todo: {
          title: "To clean",
          items: [
            {
              id: v4(),
              name: text
            },
            ...prev.todo.items
          ]
        }
      }
    })

    setText("")
  }


  return (
    <div className="big main-background">

      <div className="main-title">
        <h2 >Home Clean Home</h2>
      </div>
      <div className='left add-sections'>
        <input type="text" re placeholder='item to clean' value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={addItem}>Add</button>
        

      </div>
      <div className="App main-table-section">
        <DragDropContext onDragEnd={handleDragEnd}>
          {_.map(state, (data, key) => {
            return (
              <div key={key} className={"column"}>
                <h3>{data.title}</h3>
                <Droppable droppableId={key}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={"droppable-col"}
                      >
                        {data.items.map((el, index) => {
                          return (
                            <Draggable key={el.id} index={index} draggableId={el.id}>
                              {(provided, snapshot) => {
                                console.log(snapshot)
                                return (
                                  <div
                                    className={`item ${snapshot.isDragging && "dragging"}`}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    {el.name}
                                    {el.id != click ?
                                      <div class="tick-btn">
                                     
                      
                                        {/* <img src='right.png' alt="text"/> */}
                                        {/* <img src={require("image/right.png")}/> */}
                                        <input type="checkbox"/>
                                      </div>
                                      :
                                      <a href="" class="tick-btn" title="Completed">
                                        <img src='right.png' alt="text" />
                                      </a>}
                                      
                                  </div>
                        
                                )
                              }}
                            </Draggable>
                          )
                        })}
                        {provided.placeholder}
                      </div>
                    )
                  }}
                </Droppable>
              </div>
            )
          })}
        </DragDropContext>
      </div>
    </div>
    
  );
  
}
export default App