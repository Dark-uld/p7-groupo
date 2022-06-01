import { getLinkPreview, getPreviewFromContent } from "link-preview-js"
import axios from 'axios'



export default (content, contentId) => {
    axios.post(
        'http://localhost:3000/api/urls', {
            content: content
        }
    ).then(resp => {
        (addElement(resp.data))
    }).catch(err => {
        // something went wrong
        console.log(err)
    })

    function addElement(data){
        const images = data.images
        const desc = data.description
        let previewConteneur = ""

        if (images.length>0){
            previewConteneur = `
                <a class="app-flex-col app-center max-w-full" href="${data.url}" target="_blank" rel="noopener noreferrer" aria-label="Lien Article intitulé ${data.title}" >
                <article class="preview-content app-center">
                <div class="preview-img-container">
                <img src="${data.images}" alt="preview de l'article" class="preview-img"/>
                </div>
                <div>
                    <h3 class="preview-title app-olap">${data.title}</h3>
                    <div class="preview-desc  app-olap">${data.description}</div>
                </div>
                
                </article>
                </a>
            `;
        } else if(desc.length>0) {
            previewConteneur = `
                <a class="app-flex-col app-center max-w-full" href="${data.url}" target="_blank" rel="noopener noreferrer" >
                <article class="preview-content app-center">
                <div class="w-full">
                    <h3 class="preview-title  app-olap">${data.title}</h3>
                    <div class="preview-desc  app-olap ">${data.description}</div>
                </div>
                
                </article>
                </a>
            `;
        } else {
            previewConteneur = `
                <a class="app-flex-col app-center max-w-full" href="${data.url}" target="_blank" rel="noopener noreferrer" >
                <article class="preview-content app-center">
                <div>
                    <h3 class="preview-title  app-olap">${data.title}</h3>
                </div>
                </article>
                </a>
            `;
        }
        

        const preview = document.getElementById(contentId);
        preview.innerHTML= previewConteneur;

        return preview;
    }
}