import React, { Component } from 'react';
import './App.css';
import guia from './guia-telefonica.png';
import {BrowserRouter, Route, Link} from 'react-router-dom'
import PropTypes from 'prop-types';


// Componente Padre
// Stateful
class App extends Component {
    
    //new
    constructor(props){
        super(props);
        
        this.state={ 
           
        };
       
    }
    
  render() {
      //dentro de BrowserRouter debe tener 1 hijo , por eso está el div o sino sale error
      //ya dentro de ese div se puede colocar todo lo que se quiera
      //el exact dentro del Route es para que solo muestre ese componente
      return (
        
            <div className="main">
                <BrowserRouter>
                    <div>
                        <Navigation/>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/contactlist" component={ContactListSection}/>
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
                    <li><Link to={`/contactlist`}>Lista de contactos</Link></li>
                </ul>
            </nav>
        
        );
    
}

const Home=(props)=>{
    
    return(
        <div className='home'>
            
             <img src={guia} alt="guia telefonica"/>
        
        </div>
    )
    
}

//COPIA DE CLASE APP

class ContactListSection extends Component {
    
    //new
    constructor(props){
        super(props);
        
        // El estado solo se debe inicializar en el constructor
		// Nunca editar this.state directamente en otro método del ciclo de vida
        this.state={
            
            all:[],
            favorites:[]  
        };
        
        
        this.addToFavorites=this.addToFavorites.bind(this);
        this.deleteContact=this.deleteContact.bind(this);
    }
    
    //método
        addToFavorites(contact,titleList){
            
            if(titleList==="Todos"){

                //filtramos el contacto que pasamos
                const newAll=this.state.all.filter(c=>c.id.value!==contact.id.value);

                //añadimos el contacto a favoritos
                const newFavorites=this.state.favorites.concat(contact);

                //console.log('index',contactIndex);

                this.setState({
                    all:newAll,
                    favorites:newFavorites
                });
           
            }else{

                //filtramos el contacto que pasamos
                const newFavorites=this.state.favorites.filter(c=>c.id.value!==contact.id.value);

                //añadimos el contacto a Todos
                const newAll=this.state.all.concat(contact);

               
                this.setState({
                    all:newAll,
                    favorites:newFavorites
                });
                
            }
            
        }
    
    //metodo
        deleteContact(contact,titleList){
            
            if(titleList==="Todos"){

                //filtramos el contacto que pasamos
                const newAll=this.state.all.filter(c=>c.id.value!==contact.id.value);

                this.setState({
                    all:newAll
                 });
                
            }else{

                //filtramos el contacto que pasamos
                const newFavorites=this.state.favorites.filter(c=>c.id.value!==contact.id.value);

                this.setState({
                    favorites:newFavorites
                 });
                
            }
            
        }
    
    
    //new - consultar datos - Después de montar el componente en el DOM
	
    componentDidMount(){
        
        
        fetch('https://randomuser.me/api/?results=10')
            .then(results=>results.json())
            .then(data=>{
                // Editar el estado siempre con this.setState
				// Nunca editarlo desde el render -> loop infinito
                this.setState({
                    all: data.results  }
                );
            });

  
    }
    
    
    
  render() {
    return (
        
       //Cuando tengo componentes hermanitos que son los mismos, les pongo un key que los identifique
        //añadir prop addToFavorites
      <div className="App">
            <h1>mi lista de contactos</h1>
            <div className="contact-list">
                <ContactList contacts={this.state.all} title="Todos" key="1" addToFavorites={this.addToFavorites} deleteContact={this.deleteContact}  buttonName="Favorito"/>
            </div>
        
            <div className="contact-list">
                <ContactList contacts={this.state.favorites} title="Favoritos" key='2' addToFavorites={this.addToFavorites} deleteContact={this.deleteContact} buttonName="Todos"/>  
            </div>
            
      </div>
    );
  }
}

//----------------------------------

//new

//componente
// Sin estado - Stateless - Componente como función
// Recibo un array de contactos dentro de props.contacts y retorno un componente
// con un array de componentes ContactCard
const ContactList=(props)=>{
    
  return (
		<div>
			<h2>{props.title}</h2>
			{ props.contacts.map(contact => <ContactCard key={contact.name.first} contact={contact} addToFavorites={props.addToFavorites} deleteContact={props.deleteContact} title={props.title} buttonName={props.buttonName}/>) }
		</div>
      //por cada contacto se va a tener un ContactCard
	);
    
    
};


//chequea que las props cumplan las condiciones especificadas
ContactList.propTypes={
        addToFavorites:PropTypes.func.isRequired,   //isRequired- es obligatorio
        contacts:PropTypes.array.isRequired,
        title:PropTypes.string.isRequired
    }

//por defecto se le pasa a la prop title lo definido acá. (sI no viene por ejemplo algo en esa prop)
ContactList.defaultProps={
    title:'Titulo'
}

// Stateful
class ContactCard extends Component{
    
    constructor(props){      
        super(props);
        
        this.onClickFavorites=this.onClickFavorites.bind(this);
        this.onClickDelete=this.onClickDelete.bind(this);
    }
    
    onClickFavorites(){
        this.props.addToFavorites(this.props.contact,this.props.title);
    }
    
    onClickDelete(){
        this.props.deleteContact(this.props.contact,this.props.title);
    }
    
    render(){
        return(
            <div className="contact-card">
    
                <figure>
                    <img src={this.props.contact.picture.large} alt="Autor"/>
                    <figcaption>{this.props.contact.name.first+" "+this.props.contact.name.last}<span>{this.props.contact.phone}</span></figcaption>
                    

                </figure>
                <button onClick={()=>this.onClickFavorites()}>{this.props.buttonName}</button>
                <button onClick={()=>this.onClickDelete()}>Eliminar</button>
    
            </div>
        );
    
    
    }
    
    
    
}

export default App;
