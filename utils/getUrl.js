
export default (url, id) => {
    const urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    const contentSplitted = url.split(' ');
    let content = "";

    for(let i=0; i<contentSplitted.length; i++){
        if(contentSplitted[i].match(urlRegex)){
            content+=`<a href="${contentSplitted[i]}" class="underline"  target="_blank" rel="noopener noreferrer" >${contentSplitted[i]}</a> `
        } else {
            content+=`${contentSplitted[i]} `
        }
    }
   
       //let parser = new DOMParser();
   //let doc = parser.parseFromString(str, 'text/html');
   //return doc.body;

    return content
}