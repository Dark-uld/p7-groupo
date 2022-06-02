import { response } from "express";
import { getLinkPreview, getPreviewFromContent } from "link-preview-js"


module.exports = (req, res, next) => {
    getLinkPreview(
        req.body.content, {
            timeout: 3000
        }
    ).then(resp => {
        console.log(resp)
        if(resp.mediaType == "image"){
            req.urlData = {
                url:resp.url,
                images:resp.url,
                title:"",
                desc:"",
            }
        } else {
            req.urlData = {
                url:resp.url,
                title:resp.title,
                desc:resp.description,
                images:resp.images[0],
            }
        }
        return next();
    }).catch(err => {
        req.urlData = {
            url:"",
            title:"",
            desc:"",
            images:"",
        }
        next()
    })
};