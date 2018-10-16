

var Persona={
    name:"Aleja",
    lastName:"Rodriguez"
    
}


Persona.gender='F';
console.log(Persona);

//si necesito crear un objeto para muchas personas

//js da una funcion constructora que nos va a servir como molde

//se declara con la palabra function, recibe parametros 

function Person(name,lastName,gender){
    //var this={}
    this.name=name;
    this.lastName=lastName;
    this.gender=gender;
    
}

//si hago Person("Aleja","Rodriguez","F"); va a mostrar undefined
//se ejecutan asi

var me=new Person("Aleja","Rodriguez","F");


//se pueden crear metodos
Person.prototype.introduce=function(){
    console.log(`Hi I'm ${this.name} ${this.lastName}`);
}

//para ejecutar el metodo

me.introduce();


//heredando en un nuevo nivel
function Developer(name,lastName,gender,yearsOfExperience){
    
    //invocar a person que es el objeto que tiene las 3 primeros atributos
    Person.call(this.name,lastName,gender);
    this.yearsOfExperience=yearsOfExperience;
    
}

var me2=new Developer("Pepito", "Perez","M",2);

//me2.introduce(); //esto saca error ya que no hemos heredado la capacidad de presentarse

Developer.prototype=Object.create(Person.prototype); //hereda la capacidad de presentarse - que cree un objeto basado en el prototype de persona


var me2=new Developer("Pepito", "Perez","M",2)
console.log(me2);
me2.introduce();



//herencia encadenada o delegacion

//developer esta cnstruido a partir de un prototipo=si

//Person tiene el metodo presentarse? - si


//podemos crear nuevos metodos
Developer.prototype=function introduceAboutJob(){
    console.log(`Hi I'm ${this.name} ${this.lastName} and I have ${this.yearsOfExperience}`);
}


var me4=new Developer("Andres", "Perez","M",3);
//me4.introduce();
//me4.introduceAboutJob();



////CLASES
//SUGAR SYNTAX
//Escribimos lo anterior en una clase


class PersonWithClass{
    constructor(name,lastName,gender){
        
        this.name=name;
        this.lastName=lastName;
        this.gender=gender;
        
    }
    
    introduce(){
        console.log(`Hi I'm ${this.name} ${this.lastName}`);
    }
}


var me5=new PersonWithClass("Aleja","Rodriguez","F");

console.log(me5.introduce(),"introduce");


class DeveloperWithClass extends PersonWithClass{
    constructor(name,lastName,gender,yearsOfExperience){
        super(name,lastName,gender);
        this.yearsOfExperience=yearsOfExperience;
        
    }
    
    introduceAboutJob(){
        console.log(`Hi I'm ${this.name} ${this.lastName} and I have ${this.yearsOfExperience}`);
    }
}

var me6=new DeveloperWithClass("Aleja","Rodriguez","F",2);























