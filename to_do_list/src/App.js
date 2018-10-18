import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    
    constructor(props){
        super(props);
        
        this.state={
            
            tasks:[],
            countId:1
        };
        
        this.addTask=this.addTask.bind(this);
        
    }
 
    addTask(taskname){
        
        console.log(taskname);
        let taskObj={
            taskId:this.state.countId,
            taskName:taskname,
            taskState:''
        }
        
        const newTasks=this.state.tasks;
        newTasks.push(taskObj);
        console.log(newTasks);
        
        this.setState({       
            tasks:   newTasks,   
            countId:this.setState((prevState)=>{
                return{
                    countId:prevState+1
                };
            })
         });
        
    }
    
    componentDidMount(){
        
        
  
    }
    
  render() {
    return (
        
      <div className="App">
            <TaskRegister addTask={this.addTask}/>
            <ul>
                { this.state.tasks.map(task => <TaskItem task={task} key={task.taskId}/>) }
            </ul>
      </div>
    );
  }
}


class TaskRegister extends Component{
    
    constructor(props){      
        super(props);
        
        this.onClickAddTask=this.onClickAddTask.bind(this);
    }
  
    
    onClickAddTask(taskname){
        
        this.props.addTask(taskname);
    }
    
    render(){
        return(
            <header className="App-header">
                <div> 
                    <h1>TO DO LIST</h1>
                    <form className="formulario">
                        <input type="text" placeholder="Agrega tu tarea"></input>
                        <button onClick={()=>this.onClickAddTask("name tarea")}>Agregar</button>
                     </form>
                </div>
            </header>
        );
    
    
    }   
    
}


class TaskItem extends Component{
    
    constructor(props){      
        super(props);
    }
    
    render(){
        return(
            <li className="task-item">
                <input type="checkbox"/>
                <p>Nombre Tarea</p>
                <button>Eliminar</button>
    
            </li>
        );
    
    
    }
 
}





export default App;
