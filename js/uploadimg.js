var imgbigPreviewstr = [], imgindex, pimgObj, imgarr = [], gifirstload = true
var imgObjPreviewstr = [];
function setImagePreview(pid, pimg, limit, callback, delCallback) { //pid ,上传按钮id  pimg,预览图片div的id, limit 上传图片数量的限制 
    Frame().showLoading('正在读取文件')
    var docObj = document.getElementById(pid);  
    var imgObjPreview = document.getElementById(pimg);
  
    var imgs = imgObjPreview.getElementsByTagName('img');
    pimgObj = document.getElementById(pimg);
    if (!limit) {
        limit = 200
    }
    if (typeof (callback) == "function") {
        callback(docObj.files);
    }
    if (docObj.files) {
        //objFiles = docObj.files
        //console.log('objFiles', objFiles)


        if (docObj.files.length > limit && gifirstload) {//判断第一次是否选择了9张以上  

            alert("最多上传200张");
            return;

        }
        var html = "";
        if (pimgObj && pimgObj.getElementsByClassName('preview-list').length == 0) {
            var pdiv = document.createElement('div');
            pdiv.className = "preview-list break"
        } else {
            pdiv = pimgObj.getElementsByClassName('preview-list')[0]
        }
        if (imgs.length + docObj.files.length < 200) {
            var isOverSize = false
            imgObjPreviewstr = []
            for (var i = 0; i < docObj.files.length; i++) {
				isOverSize =false;
                //imgObjPreviewstr[i].url = window.URL.createObjectURL(docObj.files[i]);
                //imgObjPreviewstr[i].name = docObj.files[i].name
                // console.log('图片',docObj.files[i])
                if (docObj.files[i].size / 1024 > 200) {
                    isOverSize = true
                }
                imgObjPreviewstr.push({ 'url': window.URL.createObjectURL(docObj.files[i]), 'name': docObj.files[i].name, oversize: isOverSize })
            }
            imgObjPreviewstr.reverse();
            var addimg = imgObjPreview.getElementsByClassName('addimg')[0]
            for (var i = 0; i < imgObjPreviewstr.length; i++) {
                var deleteFun = 'deleteimg(this)';
                if (typeof (delCallback) == "function") {
                    deleteFun = 'deleteimg(this,' + delCallback + ')';
                }
                html += '<div style="padding:15px;position:relative" class="inlineb-m">'
                html += '<div class="fa fa-times panel-remove" data-index="' + i + '" onclick="' + deleteFun  + '" style="position:absolute;right:4px;top:4px"></div>';
                if (imgObjPreviewstr[i].oversize) {
                    html += '<div class="img-preview"  style="border:2px solid red"> ';
                    html += '<div class="oversizetip">图片大小超出200K</div>'
                } else {
                    html += '<div class="img-preview" > ';
                }
                html += '<img  style="width:100%;"  data-imgindex="' + parseInt(imgbigPreviewstr.length + i) + '"   src="' + imgObjPreviewstr[i].url + '" onclick="showImg(this)" onload="caculate(this)" />';
                html += ' </div>'
                html += '<div class="upimg_word">' + imgObjPreviewstr[i].name + '</div>'
                html += '</div>'
            }
            pdiv.innerHTML = pdiv.innerHTML + html
            //imgObjPreview.insertBefore(pdiv, addimg);
            imgObjPreview.appendChild(pdiv);
            gifirstload = false;
            Frame().removeLoading()

            for (var i = 0; i < docObj.files.length; i++) {
                imgbigPreviewstr.push(window.URL.createObjectURL(docObj.files[i]))
            }
           docObj.value = '' //解决不能重复上传同一张图片问题
        }
        else {
            alert("每次最多上传200张");
        }
    }
    else if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
        //IE下，使用滤镜
        docObj.select();
        var imgSrc = document.selection.createRange().text;
        console.log('ie下的图片路径', imgSrc);
        //     var localImagId = document.getElementById(pimg);
        //     //必须设置初始大小
        //     imgObjPreview.style.width = 'auto';
        //     imgObjPreview.style.maxWidth = '400px';
        //     localImagId.style.height = "180px";
        // //图片异常的捕捉，防止用户修改后缀来伪造图片
        // try{
        //     localImagId.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
        //     localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
        // }
        // catch(e)
        // {
        //     alert("您上传的图片格式不正确，请重新选择!");
        //     return false;
        // }
        //     imgObjPreview.style.display = 'none';
        //     document.selection.empty();
        // }
        // return true;
    }
    
}
function deleteImage(pimg) {
    var imgObjPreview = document.getElementById(pimg);
    imgObjPreview.src = "normal/images/default.png";
    imgObjPreview.style.height = 'auto';

}
function deleteimg(a, delCallback) {
    var tindex = parseInt(a.getAttribute('data-index'));
    if (typeof (delCallback) == "function") {
        delCallback(tindex);
    }
    imgbigPreviewstr.splice(tindex, 1);
    var grandparent = a.parentNode.parentNode
  grandparent.removeChild(a.parentNode);
    if (imgbigPreviewstr.length == 1) {
        gifirstload = true;
    }
}

function showImg(target) {
    var tarsrc = target.src;
    var overlay = document.createElement('div');
    overlay.className = 'black-over';
    overlay.innerHTML = '<div class="fa fa-times panel-remove"  onclick="removeOver(this)" style="position:absolute;right:80px;top:60px;color:#fff;font-size:32px"></div>' +
        '<img  class="preview-bigimg" style="position:absolute;top:0;right:0;bottom:0;left:0;margin:auto;max-height:600px;max-width:'+ window.innerWidth*0.6 + 'px" src="' + tarsrc + '"  >'  +
                        '<a href="javascript:void(0)"  onclick="prevImg()" class="prev" style="font-size:' + window.innerWidth * 0.05 +'px "> </a>' +
                        '<a href="javascript:void(0)"  onclick="nextImg()" class="next" style="font-size:' + window.innerWidth*0.05 +'px "> </a>'

    document.body.appendChild(overlay)
    addMouseWheelEvent('preview-bigimg', imgZoom)
    overlay.style.height = window.innerHeight
    scaleMe('preview-bigimg');
    imgarr = [];
	if(!pimgObj){
		pimgObj = document.getElementById('previewimg')
	}
    var imgs = pimgObj.getElementsByTagName('img')
    for (var i = 0; i < imgs.length; i++) {
        imgarr.push(imgs[i].src);
    }
    imgindex = imgarr.indexOf(tarsrc);
}
function removeOver(a) {  
    var overlay = a.parentNode;
    document.body.removeChild(overlay)
}
function prevImg() {
    var overlay = document.getElementsByClassName('black-over')[0];
    var bigimg = overlay.getElementsByTagName('img')[0];
    if (imgindex > 0) {
        bigimg.src =  imgarr[imgindex - 1]
        imgindex--;
    } else if (imgindex == 0) {
        imgindex = imgarr.length - 1;
        bigimg.src = imgarr[imgindex]
    }
}
function nextImg() {
    var overlay = document.getElementsByClassName('black-over')[0];
    var bigimg = overlay.getElementsByTagName('img')[0];
    if (imgindex < imgarr.length - 1) {
        bigimg.src= imgarr[imgindex + 1]
        imgindex++;
    } else if (imgindex == imgarr.length - 1) {
        imgindex = 0;
        bigimg.src= imgarr[imgindex]
    }
}
function caculate(a) {
    var imgwidth = a.naturalWidth, imgheight = a.naturalHeight, parentwidth = a.parentNode.clientWidth, parentHeight = a.parentNode.clientHeight;
    Frame().imgMate(a, parentwidth, parentHeight, imgwidth, imgheight)
}
function imgZoom(obj,event) {
    var zoom = parseInt(obj.style.zoom, 10) || 100;
 
    if (event.wheelDelta) {
        console.log(zoom)
        zoom += event.wheelDelta / 12;
      
    } else if (event.detail) { //兼容火狐
       
        zoom += -event.detail / 3
       obj.style.transform = 'scale(' + zoom/50 +')'
    }
    if (zoom > 0)
        obj.style.zoom = zoom + '%';
  
    return false;
}

function scaleMe(target) {
    var isdrag = false;
    var prevX, prevY, currentX, currentY,prevLeft,prevTop;
    var tar = document.getElementsByClassName(target)[0]
    var imgTop , imgLeft;
    tar.onmousedown = function (e) {
        isdrag = true
        console.log('isdrag', isdrag)
        prevX = e.clientX
        prevY = e.clientY
        prevLeft = parseInt(tar.style.left)
        prevTop = parseInt(tar.style.top)
    }

    document.onmouseup = function (e) {
        isdrag = false
        console.log('isdrag', isdrag)
    }
    document.onmousemove = function (e) {
        if (isdrag) {

            currentX = e.clientX
            currentY = e.clientY
            if (currentX != prevX && prevX && currentX) {
                if (tar.style.zoom) {
                    console.log('zoom', tar.style.zoom)
                    // tar.style.left = parseInt(tar.style.left) + (currentX - prevX) +'px';
                    tar.style.left = (currentX - prevX ) / (parseInt(tar.style.zoom) / 100) +  prevLeft + 'px';
                } else {
                    tar.style.left = currentX - (prevX - prevLeft) + 'px';
                }
               
            
            }
            if (currentY != prevY && prevY && currentY) {
                if (tar.style.zoom) {
                    // tar.style.top = parseInt(tar.style.top) +  (currentY - prevY) +'px';
                    tar.style.top = (currentY - prevY) / (parseInt(tar.style.zoom) / 100) + prevTop+ 'px';
                } else {
                    // tar.style.top = parseInt(tar.style.top) +  (currentY - prevY) +'px';
                    tar.style.top = currentY - (prevY - prevTop) + 'px';
                }
               
            }
       
            console.log('down moving')
        }

    }
    document.ondragstart = function (e) {
        e.preventDefault();
    };
    document.ondragend = function (e) {
        e.preventDefault();
    };
}

function addMouseWheelEvent(element, func) {
    var element = document.getElementsByClassName(element)[0]
   if (typeof element.onmousewheel == "object") {
        element.onmousewheel = function (e) {
            func(element,e);          
        }  
    }
  if (typeof element.onmousewheel == "undefined") {
      element.addEventListener("DOMMouseScroll", function (e) { func(element,e)}, false);   
    }
}

function onlyShowImg(imgs,index){
    
    var tarsrc = imgs[index];
    var overlay = document.createElement('div');
    overlay.className = 'black-over';
    overlay.innerHTML = '<div class="fa fa-times panel-remove"  onclick="removeOver(this)" style="position:absolute;right:80px;top:60px;color:#fff;font-size:32px"></div>' +
        '<img  class="preview-bigimg" style="position:absolute;top:0;right:0;bottom:0;left:0;margin:auto;max-height:600px;max-width:'+ window.innerWidth*0.6 + 'px" src="' + tarsrc + '"  >'  +
                        '<a href="javascript:void(0)"  onclick="prevImg()" class="prev" style="font-size:' + window.innerWidth * 0.05 +'px "> </a>' +
                        '<a href="javascript:void(0)"  onclick="nextImg()" class="next" style="font-size:' + window.innerWidth*0.05 +'px "> </a>'

    document.body.appendChild(overlay)
    addMouseWheelEvent('preview-bigimg', imgZoom)
    overlay.style.height = window.innerHeight
    scaleMe('preview-bigimg');
    imgarr = [];
    for (var i = 0; i < imgs.length; i++) {
        imgarr.push(imgs[i]);
    }
    imgindex = index;
 
 }