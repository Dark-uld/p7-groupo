import axios from 'axios'
import retrieveUrl from '~/utils/retrieveUrl'


export default (content, contentId) => {
    axios.post(
        'https://api.linkpreview.net',
        {
            q: `${retrieveUrl(content)}`,
            key: '2e232deadb16b2bb1400f58b86d48ddc'
        }).then(resp => {
            (addElement(resp.data))
        }).catch(err => {
            // something went wrong
            console.log(err.response.status)
        })

    function addElement(data){
        const previewConteneur = `
        
        <article class="article-content app-center">
        <div class="article-img-container">
        <img src="${data.image}" alt "preview de l'article" class="article-img"/>
        </div>
        <div>
            <h3 class="article-title">${data.title}</h3>
            <div class="article-desc">${data.description}</div>
        </div>
        <a href="${data.url}">Voir plus</a>
        </article>
        `;

        const preview = document.getElementById(contentId);
        preview.innerHTML= previewConteneur;

        return preview;
    }
}