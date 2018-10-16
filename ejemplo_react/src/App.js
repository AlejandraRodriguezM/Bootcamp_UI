import React, { Component } from 'react';
import './App.css';


// Componente Padre
// Stateful
class App extends Component {
    
    //new
    constructor(props){
        super(props);
        
        // El estado solo se debe inicializar en el constructor
		// Nunca editar this.state directamente en otro método del ciclo de vida
        this.state={
            
            all:[],
            favorites:[]  
        };
        
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
    
    componentDidUpdate(){
        
    }
    
    componentWillUnmount(){
        
        
    }
    
    
  render() {
    return (
        
       //Cuando tengo componentes hermanitos que son los mismos, les pongo un key que los identifique
      <div className="App">
            
            <ContactList contacts={this.state.all} title="Todos" key="1" />
            <ContactList contacts={this.state.favorites} title="Favoritos" key='2'/>
            
      </div>
    );
  }
}

//new

//componente
// Sin estado - Stateless - Componente como función
// Recibo un array de contactos dentro de props.contacts y retorno un componente
// con un array de componentes ContactCard
const ContactList=(props)=>{
    
  return (
		<div>
			<h2>{props.title}</h2>
			{ props.contacts.map(contact => <ContactCard key={contact.name.first} contact={contact} />) }
		</div>
      //por cada contacto se va a tener un ContactCard
	);
};


// Stateful
class ContactCard extends Component{
    
    render(){
        return(
            <div className="contact-card">
    
                <figure>
                    <img src={this.props.contact.picture.medium} alt="Autor"/>
                    <figcaption>{this.props.contact.name.first}</figcaption>

                </figure>
                <button>Favorito</button>
                <button>Eliminar</button>
    
            </div>
        );
    
    
    }
    
    
    
}



export default App;
