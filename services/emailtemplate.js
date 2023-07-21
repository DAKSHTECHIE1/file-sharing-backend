module.exports=({sender,downloadlink,size,expires})=>{
    return`
    <div>Yoy friend shared a file with you . click on the link to download</div>
    <a href="${downloadlink}">Link</a>
    `

}
//isme koi external file nhi lagate hai therefore styles inline...