const tabla = document.querySelector('#tabla');
const agregar = document.querySelector('#agregar');
const editar = document.querySelector('#editar');

addEventListener("DOMContentLoaded", () => {
    const url = 'https://reqres.in/api/users?page=2';
    fetch(url).then(datos => datos.json()).then(resul => mostrarDatos(resul));
})

agregar.addEventListener('click', ()=>{
    const url = 'https://reqres.in/api/users';
    const nombre = document.querySelector('#nombre').value;
    const apellido = document.querySelector('#apellido').value;
    const correo = document.querySelector('#correo').value;
  
    let datos = {
    id: 10,
    email: correo,
    first_name: nombre,
    last_name: apellido,
    avatar: "https://reqres.in/img/faces/7-image.jpg"
    }
  
    fetch(url, {
    method: "POST",
    body: JSON.stringify(datos),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(response => response.json())
  .then(resul => mostrarDato(resul))
  });
  //location.href = 'index.html'
  function mostrarDato(resul){
    console.log(resul);
    tabla.innerHTML += `   
    <tr>
      <th scope="row">${resul.id}</th>
      <td>${resul.first_name}</td>
      <td>${resul.last_name}</td>
      <td><img style="width:50px; height:50px" src="${resul.avatar}" class="card-img-top"></td>
      <td>${resul.email}</td>
      <td><input class="btn btn-warning" onclick=edit(${resul.id}) type="submit" value="Editar">
      <input class="btn btn-danger" type="submit" value="Eliminar"></td>
    </tr>
    `;
  }

function mostrarDatos(datos){
console.log(datos.data);

datos.data.forEach(d => {
    tabla.innerHTML += `   
    <tr>
      <th scope="row">${d.id}</th>
      <td>${d.first_name}</td>
      <td>${d.last_name}</td>
      <td><img style="width:50px; height:50px" src="${d.avatar}" class="card-img-top"></td>
      <td>${d.email}</td>
      <td><input class="btn btn-warning" onclick=edit(${d.id}) type="submit" value="Editar">
      <input class="btn btn-danger" type="submit" value="Eliminar"></td>
    </tr>
    `;
});
}

function edit(id){
    const url = `https://reqres.in/api/users/${id}`;

    fetch(url).then(request => request.json()).then(resul => mostrarDatosModal(resul.data))
}

function mostrarDatosModal(dato){
  console.log(dato);
  let nombreEdit = document.querySelector('#nombreEdit').value;
  let apellidoEdit = document.querySelector('#apellidoEdit').value;
  let correoEdit = document.querySelector('#correoEdit').value;

  nombreEdit = dato.first_name;
  apellidoEdit = dato.last_name;
  correoEdit = dato.email

  $("#editModal").modal("show");
}

