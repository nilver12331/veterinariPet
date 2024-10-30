fetch('header.html')
    .then(response =>response.text())
    .then(header =>{
        document.querySelector('.header').innerHTML=header;
    }).catch(error =>{
        console.error('Error al cargar el header:',error)
    })

   fetch('footer.html')
       .then(response =>response.text())
       .then(footer =>{
           document.querySelector('.footer').innerHTML=footer;
       }).catch(error =>{
           console.error('Error al cargar el footer:',error)
       })