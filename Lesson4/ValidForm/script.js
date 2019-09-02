const sendBtn = document.querySelector('.send-form');
const name = document.querySelector('.input-name');
const email = document.querySelector('.input-email');
const tel = document.querySelector('.input-tel');

sendBtn.addEventListener('click', (e) =>{
  e.preventDefault();
if(name.value.match(/\d|[\.\?\'\_\"\#\$\%\^\&\*\(\)\!\@]/)){
  name.classList.add('error');
}
else{
  name.classList.remove('error');
}

if(!email.value.match(/(^([a-z]{1,})|(^[a-z]{1,}(\.|\-)[a-z]{1,}))@mail\.ru$/)){
  email.classList.add('error');
}
else{
  email.classList.remove('error');
}
if(!tel.value.match(/^\+\d\(\d{3}\)\d{3}\-\d{4}$/)){
  tel.classList.add('error');
}
else{
  tel.classList.remove('error');
}
});
