
var arrayAllAuthors=[];
var favAuthors=[];

//llamado a la promesa

let e = fetch('https://randomuser.me/api/?results=12');
let sisas=e.then(function(resultados){
                 return resultados.json();
}).then(aqui=>{
    
    //llenar array de todos los autores
    fillArrayAllAuthors(aqui);
    
    //Imprimir lista de todos los autores
    printAuthors(arrayAllAuthors,"#gral-authors");
  
    
});


//Función para Imprimir autores
function printAuthors(arr,selector){
    
    var i=-1;
    const miSection=document.querySelector(selector);
    miSection.innerHTML="";
    
    arr.forEach((author)=>{
        
        i+=1;
        
        miSection.innerHTML+= "<article><figure><img class='imgine' id=figura"+i+" "+"src="+author.image+" alt='foto autor'>"+
                                   "<figcaption>"+ author.name+"</figcaption></figure></article>";
    }) 
   
}



//Función para llenar array de lista general de autores
function fillArrayAllAuthors(aqui){
    const authors=aqui.results;
    
    for(var i=0;i<authors.length;i++){
        arrayAllAuthors.push({image:authors[i].picture.medium,
                              name:authors[i].name.first+' '+authors[i].name.last,
                              id:authors[i].login.uuid
                             
                             });
        
    }
    
    return arrayAllAuthors;
}

    
    
 //EventListener para los clicks de All Authors
var gral_authors=document.querySelector("#gral-authors");

gral_authors.addEventListener("click",(e)=>{
    
        if(e.target && e.target.nodeName == "IMG") {
            
            //guardar info de autor clickeado en array favAuthors
            favAuthors.push({image:e.target.src,
                              name:e.target.nextSibling.innerHTML //tomar info del figcaption
                          });
            
            //Imprimir array favAuthors
            printAuthors(favAuthors,"#favorite-authors");   
            
            //Eliminar de arrayAllAuthors al que se le dio click e imprimir los que quedaron
            arrayAllAuthors.splice(e.target.id.replace("figura",""),1);
            printAuthors(arrayAllAuthors,"#gral-authors");
            
            
	}
    
})


 //EventListener para los clicks de fav Authors
var favorite_authors=document.querySelector("#favorite-authors");

favorite_authors.addEventListener("click",(e)=>{
    
        if(e.target && e.target.nodeName == "IMG") {
		     
            //Eliminar info de autor clickeado de array favAuthors
            favAuthors.splice(e.target.id.replace("figura",""),1);
            
            //Imprimir array favAuthors
            printAuthors(favAuthors,"#favorite-authors");    
           
            //guardar info de autor clickeado en array arrayAllAuthors
            arrayAllAuthors.push({image:e.target.src,
                              name:e.target.nextSibling.innerHTML
                          });
            //Imprimir array arrayAllAuthors 
           printAuthors(arrayAllAuthors,"#gral-authors"); 
	}
    
})

                                                                                                               
                                                                 
    
    







