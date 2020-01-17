// JavaScript source code
var Frame = function () {
    return new Frame.prototype.init
}
Frame.prototype = {
       
        init: function () {
        },
        removeClass: function (element, class_name) {//element DOM 对象， class_name 要删除的css样式
          
            if (!element || !class_name) return false;
            if (!element.className || element.className.match(/^[ ]+$/)) return false; //如果没有样式或全是空格
            var all_names = element.className.split(" ");
            for (var i = 0 , max = all_names.length ; i < max; i++) {
                if (all_names[i] === class_name) {
                    all_names.splice(i, 1);
                    element.className = "";
                    for (var j = 0 ,max = all_names.length ; j < max; j++) {
                        element.className += " ";
                        element.className += all_names[j];
                    }

                }
            }
            return this
        },
        allRemoveClass: function (elements,class_name) { //element DOM对象或对象集合， class_name 要删除的样式
            if (!elements || !class_name) return false;
            for (var i = 0,max = elements.length; i < max; i++) {
                (function (i) {

                    if (elements[i].className && elements[i].className.split(' ').indexOf(class_name) > -1) {
                        var old_class_name = elements[i].className.split(' ');
                        var index = old_class_name.indexOf(class_name);
                        old_class_name.splice(index, 1)
                        var new_class_name = old_class_name.join(' ')

                        elements[i].className = new_class_name;
                    }
                })(i)
            }
            return this
        },
        allAddClass: function (elements, class_name) { //element DOM对象或对象集合， class_name 要添加的样式
            if (!elements || !class_name) return false;
            for (var i = 0,max = elements.length; i < max; i++) {
                (function (i) {

                    if (elements[i].className) {//有样式并且没有要添加的样式
                        if (elements[i].className.indexOf(class_name) < 0) {
                            var old_class_name = elements[i].className;
                            elements[i].className = old_class_name.trim() + " " + class_name;
                        }
                       
                    } else {
                        elements[i].className = class_name;
                    }
                })(i)
            }
            return this
        },
        addClass: function (element, class_name) {//element DOM 对象， class_name 要添加的css样式
            if (!element || !class_name) return false;
            if (element.className) {//有样式并且没有要添加的样式
                if (element.className.indexOf(class_name) < 0) {                
                    var old_class_name = element.className;             
                    element.className = old_class_name.trim() + " " + class_name;
                }
            } else {
                element.className = class_name;
            }
            return this
        },
        htmlEncode :function(html) { //html转义
            var temp = document.createElement("div");
            (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
            var output = temp.innerHTML;
            temp = null;
            return output;
         },
       htmlDecode:function(text) { //html反转义
            var temp = document.createElement("div");
            temp.innerHTML = text;
            var output = temp.innerText || temp.textContent;
            temp = null;
            return output;
        },
        targetFilter: function(targetName, filterName) { //targetName:筛选对象样式名 ，filterName需要被筛选出来的 data-*  
            if (!targetName || !filterName) {
                return false
            }
            var targetArr = document.getElementsByClassName(targetName);
            if (targetArr.length == 0 || !targetArr) {
                return false
            }
            for (var i = 0,max = targetArr.length; i < max; i++) {
                    if (targetArr[i].getAttribute('data-dropname') === filterName) {
                        return targetArr[i];
                        break;
                    }
            }
        },
        targetElseAddClass: function (targetName, filterName,className) {//targetName:要被筛选的html 集合 ，需要被排除的data-*属性，要添加的样式
            if (!targetName || !filterName) {
                return false
            }
            var targetArr = document.getElementsByClassName(targetName);
            if (targetArr.length == 0 || !targetArr) {
                return false
            }
            for (var i = 0 , max = targetArr.length; i < max; i++) {
                if (targetArr[i].getAttribute('data-dropname') != filterName) {
                    if (targetArr[i].className) {//有样式并且没有要添加的样式
                        if (targetArr[i].className.indexOf(className) < 0) {
                            var old_class_name = targetArr[i].className;
                            targetArr[i].className = old_class_name.trim() + " " + className;
                        }
                    } else {
                        targetArr[i].className = className;
                    }
                }
               
            }
            return this
        },
        lhIE9: function () {
            if (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE", "")) < 9) {
                return true
            } else {
                return false
            }
        },
        imgSlide2D: function (target, set, timer) { //初始化2d 图片banner
            var timer = timer || 2000,slideIndex = 0,slides=0;//自动播放时间间隔
            var tar = document.getElementsByClassName(target)[0];
            var slide = tar.getElementsByClassName('slide'), slides = slide.length, slide_w = slide[0].clientWidth, slide_h = slide[0].clientHeight, arrow_font_size = slide_w * 0.1 + 'px';
            var left = document.createElement('a'), right = document.createElement('a'), page = document.createElement('div');
            left.className = 'slide-left'; //左箭头
            right.className = 'slide-right';//右箭头
            page.className = 'pagination'; //分页
            left.innerHTML = ' <i class="fa fa-angle-left "> </i>';
            right.innerHTML = ' <i class="fa fa-angle-right "> </i>';
            left.style.fontSize = arrow_font_size; //根据slide的宽度动态定制箭头字体大小
            right.style.fontSize = arrow_font_size;//根据slide的宽度动态定制箭头字体大小
            // left.addEventListener('click', this.slideImg('left', slideIndex,'2d',slide),false)
            left.addEventListener('click', function () { Frame().slideImg('left', '2d', slide,page,'')}, false)
            right.addEventListener('click', function () { Frame().slideImg('right', '2d', slide,page,'') }, false)
            var autoSlide = set.autoSlide || false,//自动切换
                slideArrow = set.slideArrow || false,//显示切换箭头
                pagination = set.pagination || false;//显示分页点点
            for (var i = 0, max = slide.length; i < max; i++) {
                (function (i) {
                    page.innerHTML = page.innerHTML+ '<a href="javascript:void(0)"></a>' //初始化分页
                    slide[i].style.zIndex = (slide.length - i) * 2 + 5 //初始化各个slide 的z-index
                    var img = slide[i].getElementsByTagName('img')[0], img_width = img.clientWidth, img_height = img.clientHeight;
                    Frame().imgMate(img, slide_w, slide_h, img_width, img_height) //图片匹配 
                })(i)             
            }
            if (autoSlide) {              
                setInterval(function () {
                    Frame().slideImg('right', '2d', slide,page)                
                }, timer)
            }
            if (slideArrow) {
                tar.appendChild(left)
                tar.appendChild(right)
            }
            if (pagination) {
                Frame().addClass(page.getElementsByTagName('a')[0], 'active')
                tar.appendChild(page)
                var pointes = page.getElementsByTagName('a')
                for (var i = 0, max = pointes.length; i < max; i++) {
                    (function (i) {
                        pointes[i].addEventListener('click', function () {
                            Frame().slideImgTo(i, slide, pointes)
                        }, false)
                    })(i)
                }
            }

        },
        imgSlide3D: function (target, set, timer) {
            var tar = document.getElementsByClassName(target)[0], tar_width = tar.clientWidth; slide = tar.getElementsByClassName('slide'), slides = slide.length, arrow_font_size = slide[0].clientWidth * 0.1 + 'px';
            if (slide.length < 3) {
                alert('请最少设置3张图片');
                return;
            }
            var data = [];//记录每个slide的位置属性数组
            var auto3D;//是否已经在播放
            var left = document.createElement('a'), right = document.createElement('a'), page = document.createElement('div');
            left.className = 'slide-left'; //左箭头
            right.className = 'slide-right';//右箭头
            page.className = 'pagination'; //分页
            left.innerHTML = ' <i class="fa fa-angle-left "> </i>';
            right.innerHTML = ' <i class="fa fa-angle-right "> </i>';
            left.style.fontSize = arrow_font_size; //根据slide的宽度动态定制箭头字体大小
            right.style.fontSize = arrow_font_size;//根据slide的宽度动态定制箭头字体大小
            // left.addEventListener('click', this.slideImg('left', slideIndex,'2d',slide),false)
            left.addEventListener('click', function () {  Frame().slideImg('left', '3d', slide, '',data) }, false)
            right.addEventListener('click', function () { Frame().slideImg('right', '3d', slide, '',data) }, false)
        
            var autoSlide = set.autoSlide || false,//自动切换
                slideArrow = set.slideArrow || false,//显示切换箭头
                slide_w = set.slideWidth,
                slide_h = set.slideHeight,
                timer = timer || 2000;
                tar.style.width = slide_w;
            tar.style.height = slide_h;
     
            for (var i = 0; i < slides; i++) {
       
                (function (i) {

                    var angle = 0, delt_left = 0, delt_top = 0, slide_width, slide_height;
                    if (i == 0) {
                        angle = 0;
                    } else {
                        angle = i*(180/slides)
                    }
                   
                   // delt_top = Math.abs(Math.round(Math.cos((angle * Math.PI / 180)) * 1000000) / 1000000) * (tar_width / 10);//left集合是sin(0-180)的抛物线，top集合是cos(0-180)的抛物线
                    delt_top = 20;
                    var delt_opacity = 1, delt_zIndex = (slides - i) * 2 + 5;
                    if (i == 0 || i == slides / 2) {
                        if (i == 0) {
                            delt_top = tar.clientHeight * 0.5 - slide[0].clientHeight*0.5;
                        }
                        slide_width = tar_width * 0.7;
                        delt_left = tar_width * 0.5 - tar_width*0.7*0.5
                    }
                    if (slides % 2 == 0) { //偶数张图片
                        if (i == slides / 2 ) { //后面中间张图片
                            slide_width = tar_width * 0.5;
                            delt_left = tar_width * 0.5 - tar_width * 0.5 * 0.5
                        } else if (i != slides / 2 && i != 0) {//非第一张和中间张
                            slide_width = tar_width * 0.4
                        }
                        if (i < slides / 2 && i != 0) {//中间右侧图片
                            delt_left = (i) * 20 ;
                            delt_top = (slides - i) * 20 - 20                    
                            delt_opacity = 1-(i *0.04)
                            data.push({ zIndex: delt_zIndex, opacity: delt_opacity, top: delt_top, left: 'auto', right: delt_left, width: slide_width,height:'' })
                        } else if (i > slides / 2) { //中间左侧图片
                            delt_left = (slides - i) * 20 
                            delt_top = (i) * 20- 20;
                            delt_opacity = 1 - (slides - i) * 0.06
                            delt_zIndex = (i - slides / 2 + 2) * 2 + 5;
                            data.push({ zIndex: delt_zIndex, opacity: delt_opacity, top: delt_top, left: delt_left, right: 'auto', width: slide_width, height: '' })
                        } else if (i == 0 || i == slides / 2) {
                            if (i == slides / 2) {
                                delt_opacity = 1 - (i * 0.06);
                                delt_top = tar.clientHeight * 0.5 - slide[0].clientHeight * 0.6;
                                data.push({ zIndex: delt_zIndex, opacity: delt_opacity, top: delt_top, left: delt_left, right: 'auto', width: slide_width, height: '' })
                            }
                            if (i == 0) {
                              data.push({ zIndex: delt_zIndex, opacity: delt_opacity, top: delt_top, left: delt_left, right: 'auto', width: slide_width, height: '70%' })
                            }
                        }
                    } else { //奇数张图片
                        if (i > 0) {

                            slide_width = tar_width * 0.4
                            if (i != 0 && i < slides / 2) { //右侧图片
                                delt_left = (i) * 20 ;
                                delt_top = (slides - i) * 20 - 20
                                delt_opacity = 1 - (i * 0.04)
                                data.push({ zIndex: delt_zIndex, opacity: delt_opacity, top: delt_top, left: 'auto', right: delt_left, width: slide_width, height: '' })
                            } else if (i != 0 && i > slides / 2) {//左侧图片
                                delt_left = (slides - i) * 20 
                                delt_top = (i) * 20 - 20;
                                delt_opacity = 1 - (slides - i) * 0.06
                                delt_zIndex = (i - slides / 2 + 2) * 2 + 5;
                                data.push({ zIndex: delt_zIndex, opacity: delt_opacity, top: delt_top, left: delt_left, right: 'auto', width: slide_width, height: '' })
                            }
                        } else if (i == 0) {
                            data.push({ zIndex: delt_zIndex, opacity: delt_opacity, top: delt_top, left: delt_left, right: 'auto', width: slide_width, height: '' })
                        }                   
                    }     
                   // console.log('angle', angle, 'delt_left', delt_left, 'delt_top', delt_top, 'delt_opacity', delt_opacity, 'delt_zIndex', delt_zIndex)
                    var img = slide[i].getElementsByTagName('img')[0], img_width = img.clientWidth, img_height = img.clientHeight, slide_w = slide[0].clientWidth, slide_h = slide[0].clientHeight;
                    Frame().imgMate(img, slide_w, slide_h, img_width, img_height) //图片匹配 
                })(i)
            }
           
            for (var i = 0,max = data.length; i < max; i++) {              
                slide[i].style.zIndex = data[i].zIndex
                slide[i].style.opacity = data[i].opacity
                slide[i].style.top = data[i].top + 'px'
                slide[i].style.left = data[i].left + 'px'
                slide[i].style.right = data[i].right + 'px'
                slide[i].style.width = data[i].width + 'px' 
                slide[i].style.height = data[i].height
                slide[i].style.WebkitTransition = 'all 0.5s'
                slide[i].style.MozTransition = 'all 0.5s'
                slide[i].style.MsTransition = 'all 0.5s'
            }
            console.log(data)
            if (autoSlide) { //自动播放
                auto3D =  setInterval(function () {
                        Frame().slideImg('right', '3d', slide,'',data)                
                    }, timer)
            }
            if (slideArrow) {
                tar.appendChild(left)
                tar.appendChild(right)
            }
            tar.addEventListener('mouseover', function () {
                if (auto3D) {
                    clearInterval(auto3D)
                }
            }, false)
            tar.addEventListener('mouseout', function () {
                if (autoSlide) {
                    auto3D = setInterval(function () {
                        Frame().slideImg('right', '3d', slide, '', data)
                    }, timer)
                }
            }, false)
        },
        slideImg: function (direction, transway, slide,page,data) { //切换 img_banner的图片  data是3d时使用
            var dir = direction, wave = transway, slideIndex = 0, slideIndexArr = [], posIndex;
            if (page) {
                pagePoints = page.getElementsByTagName('a');
            } 
            for (var i = 0, max = slide.length; i < max; i++) {
                slideIndexArr.push(parseInt(slide[i].style.zIndex))
            }
            slideIndex = slideIndexArr.indexOf(Math.max.apply(Math, slideIndexArr));//这里要求每个slide的zIndex不要一样高
            posIndex = slide.length - slideIndex;
            if (wave === '2d') {
                if (dir === 'left') {
                    if (slideIndex == 0) {
                        slideIndex = slide.length -1
                        slide[slideIndex].style.zIndex = 250;
                        if (pagePoints) {
                            Frame().allRemoveClass(pagePoints, 'active').addClass(pagePoints[slideIndex], 'active');
                        }     
                        slide[0].style.zIndex = posIndex * 2 + 5;;
                    } else {
                        slide[slideIndex].style.zIndex = posIndex * 2 + 5;
                        slide[slideIndex - 1].style.zIndex = 250;
                        if (pagePoints) {
                            Frame().allRemoveClass(pagePoints, 'active').addClass(pagePoints[slideIndex - 1], 'active');
                        }
                    }
                } else if (dir === 'right') {
                    if (slideIndex == slide.length - 1) {
                        slideIndex = 0
                        slide[slideIndex].style.zIndex = 250;
                        slide[slide.length - 1].style.zIndex = posIndex * 2 + 5;
                        if (pagePoints) {
                            Frame().allRemoveClass(pagePoints, 'active').addClass(pagePoints[slideIndex], 'active');
                        }
                    } else {
                        slide[slideIndex].style.zIndex = posIndex * 2 + 5;
                        slide[slideIndex + 1].style.zIndex = 250;
                        if (pagePoints) {
                            Frame().allRemoveClass(pagePoints, 'active').addClass(pagePoints[slideIndex + 1], 'active');
                        }
                    }
                      
          
                }
            } else if (wave === '3d') {
                if (dir === 'left') {
                    var last = data.pop();
                    data.unshift(last);
                    for (var i = 0; i < data.length; i++) {
                        slide[i].style.zIndex = data[i].zIndex
                        slide[i].style.opacity = data[i].opacity
                        slide[i].style.top = data[i].top + 'px'
                        if (data[i].left === 'auto') {
                            slide[i].style.left = 'auto'
                        } else {
                            slide[i].style.left = data[i].left + 'px'
                        }
                        slide[i].style.right = data[i].right + 'px'
                        slide[i].style.width = data[i].width + 'px'
                        slide[i].style.height = data[i].height
                       
                    }
                    Frame().allAddClass(slide, 'trans-right')
                } else if (dir === 'right') {
                    var last = data.shift();
                    data.push(last);
                    for (var i = 0; i < data.length; i++) {
                        slide[i].style.zIndex = data[i].zIndex
                        slide[i].style.opacity = data[i].opacity
                        slide[i].style.top = data[i].top + 'px'
                        if (data[i].left === 'auto') {
                            slide[i].style.left = 'auto'
                        } else {
                            slide[i].style.left = data[i].left + 'px'
                        }
                        slide[i].style.right = data[i].right + 'px'
                        slide[i].style.width = data[i].width + 'px'
                        slide[i].style.height = data[i].height
                    }
                    Frame().allRemoveClass(slide, 'trans-right')
                }

            }           
        },
        slideImgTo: function (index, slide, pagePoints) {
            for (var i = 0; i < slide.length; i++) {
                (function (i) {
                    slide[i].style.zIndex = (slide.length - i) * 2 + 5 //初始化各个slide 的z-index
                })(i)
            }
            slide[index].style.zIndex = 250;
            Frame().allRemoveClass(pagePoints, 'active').addClass(pagePoints[index], 'active');
        },
        imgMate: function (img, parentwidth, parentheight, imgwidth, imgheight) {
            if (parentwidth > parentheight) {
                if (imgwidth > imgheight) {
                    if (imgwidth / imgheight > parentwidth / parentheight) {
                        //$(this).css({ 'height': '100%', 'width': 'auto' });
                        img.style.height = '100%';
                        img.style.width = 'auto';
                        return

                    } else {
                        // $(this).css('width', '100%');
                        img.style.width = '100%';
                        img.style.height = 'auto';
                        img.style.top = -(img.clientHeight -parentheight) / 2 + 'px';
                        img.style.left = 0 + 'px';
                        return
                    }
                    return;
                } else if (imgwidth < imgheight) {
                   // $(this).css('width', '100%')
                   // $(this).css({ 'top': -(imgheight - imgwidth) / 64 + 'rem', 'left': '0rem' });
                    img.style.width = '100%';
                    img.style.top = -(img.clientHeight - parentheight) / 2 + 'px';
                    img.style.left = 0 + 'px';

                    return;
                } else {
                    //$(this).css({ 'width': '100%', 'height': 'auto' })
                    img.style.width = '100%';
                    img.style.height = 'auto';
                    return;
                }
            } else {
                if (imgwidth > imgheight) {
                    // $(this).css('height', '100%');
                    img.style.height = '100%';
                    img.style.width = 'auto';
                } else if (imgwidth < imgheight || imgwidth == imgheight ) {
                   // $(this).css('width', '100%')
                    img.style.width = '100%';
                    img.style.height = 'auto';
                }
            }
        },
        setImagePreview: function (buttonId,previewId) {

        },
        initPop:function(set){
              var conname = set.class_name
              var height = set.height
              var width = set.width
              var overlay = document.createElement('div')
              var pop = document.createElement('div')
              var closePop = document.createElement('div')
              var content = document.getElementsByClassName(conname)[0]
              Frame().removeClass(content, 'hide')
              pop.className = 'pop-frame'
              closePop.className = 'close-pop'
              closePop.addEventListener('click', function () { Frame().closePopDiv(this, conname) }, false)
              overlay.className = 'black-over popdiv'
              overlay.style.height = window.innerHeight
              if (height !== 'undefined') {
                pop.style.height = parseInt(height) + 'px'
              }
              if (width !== 'undefined') {
                pop.style.width = parseInt(width) + 'px'
              }
              pop.appendChild(content)
              pop.appendChild(closePop)
              overlay.appendChild(pop)
              document.body.appendChild(overlay)
              pop.style.marginLeft = '-' + pop.clientWidth / 2 + 'px'
              pop.style.marginTop = '-' + pop.clientHeight / 2 + 'px'
            
        },
        closePopDiv:function(a) {
             var overlay = a.parentNode.parentNode;
             var popContent = overlay.getElementsByClassName('pop-content')[0]
             Frame().addClass(popContent,'hide')
             document.body.appendChild(popContent);
             document.body.removeChild(overlay);
            
        },
        createWhiteOver: function () {
            var overlay = document.createElement('div')
            overlay.className = "white-over "
            document.body.appendChild(overlay)
        },
        removeWhiteOver: function () {
            var overlay = document.getElementsByClassName('white-over')[0]
            document.body.removeChild(overlay)
        },
        tip:function (msg, time, callback) {
          var timeer = time || 3000
          var tip = document.createElement('div')
          tip.className = 'c-tip'
          let html = '<div>' + msg + '</div>';
          tip.innerHTML = html
          document.body.appendChild(tip)
          let tipWidth = tip.clientWidth
          tip.style.marginLeft = '-' + tipWidth / 2 + 'px'
          setTimeout(function () {
            document.body.removeChild(tip)
            if (callback) {
              callback()
            }
          }, timeer)
        },
        errorTip:function (msg, time, callback) {
          var timeer = time || 3000
          var tip = document.createElement('div')
          tip.className = 'error-tip'
          let html = '<div>' + msg + '</div>'
          tip.innerHTML = html
          document.body.appendChild(tip)
          let tipWidth = tip.clientWidth
          tip.style.marginLeft = '-' + tipWidth / 2 + 'px'

          setTimeout(function () {
            document.body.removeChild(tip)
            if (callback) {
              callback()
            }
          },timeer)
        },
        showLoading: function (msg) {
            Frame().createWhiteOver();
            var tip = document.createElement('div')
            tip.className = 'c-loading'
            let html = '<div>' + msg + '</div>'
            tip.innerHTML = html
            document.body.appendChild(tip)
            let tipWidth = tip.clientWidth
            tip.style.marginLeft = '-' + tipWidth / 2 + 'px'
        },
        removeLoading: function () {
            Frame().removeWhiteOver();
            var loading = document.getElementsByClassName('c-loading')[0];
            document.body.removeChild(loading)
        }
       
    }
    Frame.prototype.init.prototype = Frame.prototype;
  
    window.resizeLayoutRight = function () {//计算右侧宽度
        var winheight = window.innerHeight, winwidth = window.innerWidth, layout = document.getElementsByClassName('layout')[0], layoutRight = document.getElementsByClassName('layout-right')[0];
        if (layout) {
            layout.style.height = winheight - 50 + 'px';
            layoutRight.style.width = winwidth - 200 + 'px';
        }
       
    }
    window.debounce = function(fn, wait,time){//防抖函数
        var previous = null; //记录上一次运行的时间
        var timer = null;
        return function () {
            var now = +new Date();

            if (!previous) previous = now;
            //当上一次执行的时间与当前的时间差大于设置的执行间隔时长的话，就主动执行一次
            if (now - previous > time) {
                clearTimeout(timer);
                fn();
                previous = now;// 执行函数后，马上记录当前时间
            } else {
                clearTimeout(timer);
                timer = setTimeout(function () {
                    fn();
                }, wait);
            }
        }
    }
    window.onload = function () { //进行一系列初始化动作
         
     resizeLayoutRight();
        (function () { //左侧导航hover事件
            var leftLayOut = document.getElementsByClassName('layout-left-nav')[0];
            if (leftLayOut) {

           
            var leftNavs = leftLayOut.getElementsByClassName('navli'), slideMenus = [];
            var links = leftLayOut.getElementsByClassName('link'), iframe = document.getElementsByTagName('iframe')[0];
            var winheight = window.innerHeight, layout = document.getElementsByClassName('layout')[0];
            layout.style.height = winheight -50 + 'px'
            for (var i = 0; i < links.length; i++) {
                (function (i) {
                    links[i].addEventListener('click', function () {
                        var target = links[i].getAttribute('data-frame')
                        if (target) {
                            iframe.src = target+ '.html'
                        }
                    }, false)
                })(i)
            }
            for (var i = 0; i < leftNavs.length; i++) {
                if (leftNavs[i].className.indexOf('show-on-menu') > -1) {
                    slideMenus.push(leftNavs[i]);
                }
            }
            for (var i = 0; i < leftNavs.length; i++) {
                (function (i) {
                    leftNavs[i].addEventListener('click', function () {
                        Frame().allRemoveClass(leftNavs, 'active');
                        Frame().addClass(leftNavs[i], 'active')
                    }, false)
                })(i)           
                if (leftNavs[i].className.indexOf('show-on-menu') > -1) {
                    slideMenus.push(leftNavs[i]);
                }
            }
            for (var i = 0; i < slideMenus.length; i++) {
                (function (i) {
                    slideMenus[i].addEventListener('mouseover', function () {
                        var slideMenu = slideMenus[i].getElementsByClassName('slide-menu')[0];
                        Frame().removeClass(slideMenu, 'move-left').addClass(slideMenu, 'move-right');
                      //  Frame.addClass(slideMenu, 'move-right');
                    }, false)
                    slideMenus[i].addEventListener('mouseout', function () {
                        var slideMenu = slideMenus[i].getElementsByClassName('slide-menu')[0];
                        Frame().removeClass(slideMenu, 'move-right').addClass(slideMenu, 'move-left');
                      //  Frame.addClass(slideMenu, 'move-left');
                    }, false)
                })(i)
            }

            }
            //给dropmenu 添加点击事件
            var dropMenus = document.getElementsByClassName('dropdown');
            var dropDownMenus = document.getElementsByClassName('dropdown-menu');
     
            for (var i = 0; i < dropMenus.length; i++) {
                (function (i) {
                    dropMenus[i].addEventListener('click', function () {
                     //   var angle = dropMenus[i].getElementsByClassName('fa-sort-down')[0];
                        var thisTop = dropMenus[i].offsetTop, thisLeft = dropMenus[i].offsetLeft, thisWidth = dropMenus[i].clientWidth, thisHeight = dropMenus[i].clientHeight ;
                                          
                        var dropName = dropMenus[i].getAttribute('data-dropname')
                        var dropDownMenu = Frame().targetFilter('dropdown-menu', dropName)
                        dropDownMenu.style.right = window.innerWidth - thisLeft- thisWidth+ 'px';
                        dropDownMenu.style.top = thisTop + thisHeight + 'px'
                        if (dropDownMenus.length > 1) { //页面中有两个或以上多个dropDownmenus 时进行隐藏操作                        
                            Frame().targetElseAddClass('dropdown-menu',dropName, 'hide')
                        }
                        if (dropDownMenu.className.indexOf('hide') < 0) { //显示或隐藏当前关联的dropMenuDown
                            Frame().addClass(dropDownMenu, 'hide')
                            //if (angle) {
                            //    Frame().addClass(angle, 'rotate0').removeClass(angle, 'rotate180')
                            //}
                        } else {
                            Frame().removeClass(dropDownMenu, 'hide')
                            //if (angle) {
                            //    Frame().addClass(angle, 'rotate180').removeClass(angle, 'rotate0')
                            //}
                        }
                       
                    }, false)
                })(i)
            }
            //点击非弹框外的区域隐藏弹框
            //document.body.addEventListener('click', function (e) {
            //    var containers = document.getElementsByClassName('popover');
            //    var isPopTricker = false;//是否会显示弹框的按钮
            //    for (var i = 0; i < e.path.length; i++){
            //        if (e.path[i].className && (e.path[i].className.indexOf('dropdown') > -1 || e.path[i].className.indexOf('showpop') > -1)) {
            //            isPopTricker = true;
            //            break;
            //        }
            //     }
            //    for (var i = 0; i < containers.length; i++) {
            //        if (containers[i].className.indexOf('hide') < 0 || containers[i].style.display === 'block') {
            //            if (e.path.indexOf(containers[i]) < 0 && !isPopTricker) { //判断当前点击对象是否在显示的弹框中,并且是非会触发弹框的target
            //                console.log('hide')
            //                Frame().addClass(containers[i],'hide')
            //            }
            //        }
            //    }
               
            //},
            //false)

        })()
        window.onresize = debounce(resizeLayoutRight, 100,1000)
}

function addLoadEvent(func) {
    var oldonload = window.onload; //把现在有window.onload事件处理函数的值存入变量oldonload。  
    if (typeof window.onload != 'function') { //如果这个处理函数还没有绑定任何函数，就像平时那样把新函数添加给它  
        window.onload = func;
    } else { //如果在这个处理函数上已经绑定了一些函数。就把新函数追加到现有指令的末尾  
        window.onload = function () {
            oldonload();
            func();
        }
    }

}  