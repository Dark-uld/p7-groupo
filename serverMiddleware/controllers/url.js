import { getLinkPreview, getPreviewFromContent } from "link-preview-js"


exports.getUrlPreview = (req, res, next ) => {
    getLinkPreview(
        req.body.content, {
            timeout: 2000
        }
    ).then(resp => {
        res.status(200).json(resp)
    }).catch(err => {
        // something went wrong
        console.log(err.response.status)
    })
};