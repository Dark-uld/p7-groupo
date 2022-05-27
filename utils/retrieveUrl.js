export default (content) => {
    const contentSplit = content.split(' ');
    let url = "";
    let reg = /^(http|https):/;
    for (let i = 0; i<contentSplit.length ; ++i){
        if ( reg.test(contentSplit[i]) || reg.test(contentSplit[i])){
            url = contentSplit[i];
        }
    }

    if(url.includes("instagram")){
        url="";
    }

    return url;
    
}