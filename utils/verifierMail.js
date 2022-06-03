export default () => {
    let counter=0;
    const mailRegex= /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    
    let mail = document.getElementById("userMail");
    if(mailRegex.test(mail.value)){
        document.getElementById('mailError').setAttribute('hidden', true)
        counter=0
      } else {
        document.getElementById('mailError').removeAttribute('hidden')
        document.getElementById('mailError').innerText="Mail incorrect (test@test.com)"
        counter++
      }

      return counter
}