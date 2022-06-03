export default () => {
    let counter=0;
    const mdpRegex= /^(?=.{10,}$)(?=(?:.*?[A-Z]){1})(?=.*?[a-z])(?=(?:.*?[0-9]){2}).*$/;
    
    let pass = document.getElementById('userPass');
    if(mdpRegex.test(pass.value)){
        document.getElementById('passError').setAttribute('hidden', true)
        counter=0
    } else {
        document.getElementById('passError').removeAttribute('hidden')
        document.getElementById('passError').innerHTML="Le mot de passe doit contenir:<br>- 8 caractères min<br>- au moins 1 majuscule, 1 minuscule et 2 chiffres"
        counter++
    }
      
      return counter
}