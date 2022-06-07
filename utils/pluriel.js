export default (value) => {
    switch(value){
        case 0:
            return "Pas de commentaire";
            break;
        case 1:
            return "1 commentaire";
            break;
        default:
            return `${value} commentaires`
    }
}