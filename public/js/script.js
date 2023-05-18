var leftimg=document.getElementsByClassName('left')[0];
var centerimg=document.getElementsByClassName('center')[0];
var rightimg=document.getElementsByClassName('right')[0];
var fileaccess=document.getElementById('file');
var dropper=document.getElementsByClassName('dropzone')[0];
var browse=document.getElementById('browse');
const uploadlink="./api/files"
dropper.addEventListener('dragover',(e)=>{
    e.preventDefault();
    console.log('aaa');
    if(!leftimg.classList.contains('shift2'))
    {
        leftimg.classList.add('shift2');
        rightimg.classList.add('shift1');
        centerimg.classList.add('shift3');
    }
})
dropper.addEventListener('dragleave',(e)=>{
    if(leftimg.classList.contains('shift2'))
    {
        leftimg.classList.remove('shift2');
        rightimg.classList.remove('shift1');
        centerimg.classList.remove('shift3');
    }
  
})
dropper.addEventListener('drop',(e)=>{
    e.preventDefault();
    if(leftimg.classList.contains('shift2'))
    {
        leftimg.classList.remove('shift2');
        rightimg.classList.remove('shift1');
        centerimg.classList.remove('shift3');
    }
    const files=e.dataTransfer.files;
    console.log(files);
    if(files.length!=0){
        fileaccess.files=files;
        uploadFile();
    }
})
browse.addEventListener('click',()=>{
    fileaccess.click();
})
fileaccess.addEventListener('change',()=>{
    uploadFile();
})
const uploadFile=()=>{
    const file=fileaccess.files[0];
    const formData= new FormData();
    formData.append('myfile',file);
    const xhrRequest=new  XMLHttpRequest();
    xhrRequest.onload=()=>{
        console.log(xhrRequest.response);
    };
    xhrRequest.upload.onprogress=updateprogress;
    xhrRequest.open('POST',uploadlink);
    xhrRequest.send(formData);
}
const updateprogress=(e)=>{
    const percentloaded=Math.round((e.loaded/e.total)*100);
    console.log(e);
}



















