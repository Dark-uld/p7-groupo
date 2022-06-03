export default () => {
    let counter=0;
    const nameRegex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\'"+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
    
    let name = document.getElementById('userName');
    if(nameRegex.test(name.value)){
        document.getElementById('nameError').setAttribute('hidden', true)
        counter=0
      } else {
        document.getElementById('nameError').removeAttribute('hidden')
        document.getElementById('nameError').innerText="Le nom contient des caractères interdits"
        counter++
      }
      return counter
}