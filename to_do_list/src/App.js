import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Link} from 'react-router-dom'
import to_do from './to_do.jpg';


class AllApp extends Component {
    
    constructor(props){
        super(props);
        
        this.state={
            
           
        };
        

        
    }
 
    
    render() {
      
      return (
        
            <div className="main">
                <BrowserRouter>
                    <div>
                        <Navigation/>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/todolist" component={App}/>
                    </div>
                </BrowserRouter>
           </div>
      );
  }
   
    
 
}

const Navigation=(props)=>{
    
        return(
        
            <nav>
                <ul>
                    <li><Link to={`/`}>Home </Link></li>
                    <li><Link to={`/todolist`}>To do List</Link></li>
                </ul>
            </nav>
        
        );
    
}

const Home=(props)=>{
    
    return(
        <div className='home'>
            
             <img src={to_do} alt="lista to do"/>
        
        </div>
    )
    
}






class App extends Component {
    
    constructor(props){
        super(props);
        
        this.state={
            
            tasks:[],
            countId:1
        };
        
        this.addTask=this.addTask.bind(this);
        this.deleteTask=this.deleteTask.bind(this);
        
    }
 
    addTask(taskname){
        
        let taskObj={
            taskId:this.state.countId,
            taskName:taskname,
            taskState:''
        }
        
        const newTasks=this.state.tasks;
        newTasks.push(taskObj);
        console.log(newTasks);
        
        this.setState((prevState)=>{
             return {     
                tasks:   newTasks,   
                countId: prevState.countId+1
         };
        });     
    }
    
    deleteTask(task){
               
        const newTasks=this.state.tasks.filter(t=>t.taskId!==task.taskId);

        this.setState({
            tasks:   newTasks     
        });

  
    }
    
  render() {
    return (
        
      <div className="App">
            <TaskRegister addTask={this.addTask}/>
            <section>
                <ul id="lista">
                    { this.state.tasks.map(task => <TaskItem task={task} key={task.taskId} deleteTask={this.deleteTask}/>) }
                </ul>
            </section>
      </div>
    );
  }
}


class TaskRegister extends Component{
    
    constructor(props){      
        super(props);
        
        this.state={value:''};
        this.onClickAddTask=this.onClickAddTask.bind(this);
        
        this.handleChange=this.handleChange.bind(this);
    }
  
    
    onClickAddTask(event,taskname){
        event.preventDefault();
        console.log(taskname);
        this.props.addTask(taskname);
        this.state.value='';
    }
    
    
    handleChange(event){
        this.setState({
            value:event.target.value
        });
    }
    
    
    render(){
        return(
            <header className="App-header">
                <div> 
                    <h1>TO DO LIST</h1>
                    <form className="formulario">
                        <input type="text" value={this.state.value}  onChange={this.handleChange} placeholder="Add an item"></input>
                        <button onClick={(event)=>this.onClickAddTask(event,this.state.value)}>Submit</button>
                     </form>
                </div>
            </header>
        );
    
    
    }   
    
}


class TaskItem extends Component{
    
    constructor(props){      
        super(props);
        
        this.state={
            checkState:false,
            pClass:''
        };        
        this.handleChange=this.handleChange.bind(this);
        this.onClickDeleteTask=this.onClickDeleteTask.bind(this);
    }
    
     handleChange(event){
         let nameClass='';
         if(event.target.checked){
             nameClass='strike';
         }
         
        this.setState({
            checkState:event.target.checked,
            pClass:nameClass
        });
         console.log(event.target.checked);
    }
    
    onClickDeleteTask(){
        this.props.deleteTask(this.props.task);
        
    }
    
    
    render(){
        return(
            <li className="task-item">
                <input type="checkbox" checked={this.state.checkState} onChange={this.handleChange}/>
                <p className={this.state.pClass}>{this.props.task.taskName}</p>
                <button onClick={()=>this.onClickDeleteTask()}>Eliminar</button>
    
            </li>
        );
    
    
    }
 
}





export default AllApp;
