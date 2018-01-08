(function () {

  var data = {caption:'信息统计',
             thead:{'head1':'姓名','head2':'年龄','head3':'性别'},
             tbody:[{name:'xiaoxiao',age:10,gender:'male0'},{name:'xiao',age:11,gender:'male1'},{name:'hh',age:12,gender:'female2'},{name:'ran',age:13,gender:'female3'}]};
    /**把对象转化为表格字符串 */
    function createTable(obj){
        var theadTh = '';
        var theadNode = '';
        for (let tdkey in obj.thead) { 
            theadTh += '<th><span class="ft-bold">'+obj.thead[tdkey]+'</span></th>';
        }
        theadNode ='<thead><tr>'+theadTh+'</span></tr></thead>';

        var tbodyTr = '';
        obj.tbody.forEach(function(item){ 
            var tbodytd = '';
            for (let tdkey in item) { 
                tbodytd += '<td>'+item[tdkey]+'</td>';
            }
            tbodytd = tbodytd.replace(/^<td>/,'<td nowrap>');
            // console.log(index);
            tbodyTr +='<tr>'+tbodytd+'</tr>';
         });
        var tbodyNode = '<tbody>'+tbodyTr+'<tbody>';
        var tableNode = '<p><table><caption>'+ obj.caption+'</caption>'+theadNode+tbodyNode+'</table></p>';
        console.log( tableNode);
        return tableNode; 
    }
    var tab = document.getElementById('tab');
    tab.innerHTML = createTable(data);

    /**获取对象包含属性个数 */
    function attributeCount(obj) {
        var count = 0;
        for(var i in obj) {
            if(obj.hasOwnProperty(i)) {  // 建议加上判断,如果没有扩展对象属性可以不加
                count++;
            }
        }
        return count;
    }
    //textarea的光标位置插入文字，obj为文本框元素

    function insertAtCaret(textObj,textFeildValue){
        if(document.all && textObj.createTextRange){
            var caretPos = document.selection.createTextRange().duplicate();
            caretPos.text = caretPos.text.charAt(caretPos.text.length-1) === '' ?
            textFeildValue+'' : textFeildValue;
        }
        else if(textObj.setSelectionRange){
            var rangeStart=textObj.selectionStart;
            var rangeEnd=textObj.selectionEnd;
            var tempStr1=textObj.value.substring(0,rangeStart);
            var tempStr2=textObj.value.substring(rangeEnd);
            textObj.value=tempStr1+textFeildValue+tempStr2;
            textObj.focus();
            var len=textFeildValue.length;
            textObj.setSelectionRange(rangeStart+len,rangeStart+len);
            // textObj.blur();
        }
        else {
            textObj.value+=textFeildValue;
        }
    }
    function addAtCaret(textObj,textFeildValue1,textFeildValue2){
        if(document.all && textObj.createTextRange){
            var caretPos = document.selection.createTextRange().duplicate();
            caretPos.text = caretPos.text.charAt(caretPos.text.length-1) === '' ?
            textFeildValue1 + caretPos.text + textFeildValue2 + '' : textFeildValue1 + caretPos.text + textFeildValue2;
        }
        else if(typeof textObj.selectionStart === 'number' && typeof textObj.selectionEnd === 'number'){
            var rangeStart=textObj.selectionStart;
            var rangeEnd=textObj.selectionEnd;
            var tempStr1=textObj.value.substring(0,rangeStart);
            var tempStr2=textObj.value.substring(rangeEnd);
            var tempStr3=textObj.value.substring(rangeStart,rangeEnd);
            textObj.value=tempStr1 + textFeildValue1 + tempStr3 + textFeildValue2 + tempStr2;
            textObj.focus();
            var len=(textFeildValue1 + textFeildValue2 + tempStr3).length;
            textObj.setSelectionRange(rangeStart+len,rangeStart+len);
            // textObj.blur();
            
        }
        else {
            textObj.value+=textFeildValue1 + textFeildValue2;
        }
    }

   
    // 应该直接在textarea选中，它本身默认有,所以只要获取光标位置，获取选中的内容
    /**
     * 选中内容标红，当选中会一直增长，有bug
     */
    function selectContents(ele){
        console.log(window.getSelection);
        if(window.getSelection() instanceof Object) { 
            var textObj = document.getElementById(ele); 
            var selectedText = window.getSelection().toString(); 
            console.log(selectedText); 
            selectedText = '<span style="background:red">'+selectedText+'</span>'; 
            var start = window.getSelection().anchorOffset; 
            var end = window.getSelection().focusOffset; 

            var tempStr1 = textObj.innerHTML.substring(0,start); 
            var tempStr2 = textObj.innerHTML.substring(end); 

            textObj.innerHTML = tempStr1 + selectedText + tempStr2 ;
        } 
    }
    /**
     * 显示输入框的文字个数
     */
    function showinputchar(objid , charlen , msgid) {
        var charvalue = $('#'+objid).val();
        var k = 0;
        for(var i = 0;i<charvalue.length;i++){
            if(charvalue.charCodeAt(i) >255){
                k += 2;
            } else {
                k += 1;
            }
        }
        k=Math.ceil(k/2);
        if(k > charlen) {
            $('#'+msgid).html(charlen-k).append('/' + charlen);
            $('#'+msgid).attr('class','char_error');
        }else {
            $('#'+msgid).html(k).append('/' + charlen);
            $('#'+msgid).attr('class','char_ok');
        }
    }
    /**
     * 显示单词的输入个数
     */
    function wordcount(objid , charlen , msgid) {
        var charvalue = $('#'+objid).val();
        var k;
        k=charvalue.split(/[\s]/).length;
        $('#'+msgid).html(k);
        $('#'+msgid).attr('class','char_ok');
    }

    /**
     * 获取中英文段数
     */
    function highlightSelectedText(textObj){
        textObj.focus();
        textObj.setSelectionRange(0,10);
        
    }
    /**
     * 获取光标位置
     * 如果光标在段落的前10个字之内，则获取光标后面10个字；如果光标在段落的后10个字之内，则获取光标前面10个字；如果光标的前后都不超过10个字，则获取光标前后所有字；如果光标的前后有任何一边超过10个字，则获取光标超过10个字那边的10个字；
     * 如果字体总长度不超过20呢？
     */
    function getTextCloseToCaret(textObj,oneParaText){
        var compareLen = 10;
        var oneParaLen = oneParaText.length;
        var compareText = '';
        var rangeStart=textObj.selectionStart;
        var rangeEnd=textObj.selectionEnd;
        var textBeforeCaret=textObj.value.substring(rangeStart-5,rangeStart);
        var textAfterCaret=textObj.value.substring(rangeEnd,rangeEnd+5);
        textObj.focus();
        // textObj.setSelectionRange(rangeStart-5,rangeStart+5);
        
        if (rangeStart <= compareLen && oneParaLen-rangeEnd >= compareLen){
            // 左边剩余量小于10,右边量大于10
            compareText = textObj.value.substring(rangeStart,rangeStart+compareLen);
            textObj.setSelectionRange(rangeStart,rangeStart+compareLen);
        }else if(rangeStart >= compareLen  && compareLen <= oneParaLen-rangeEnd){
            // 右边剩余量大于10,左边量大于10
            compareText = textObj.value.substring(rangeEnd-compareLen,rangeEnd);
            textObj.setSelectionRange(rangeEnd-compareLen,rangeEnd);
        }else if(rangeStart > compareLen && oneParaLen-rangeEnd < compareLen ){
            // 左边量大于10，右边剩余量小于10
            compareText = textObj.value.substring(rangeStart-compareLen,rangeStart);
            textObj.setSelectionRange(rangeStart-compareLen,rangeStart);
        }else if(rangeStart < compareLen && oneParaLen-rangeEnd < compareLen){
            // 左边量小于10，右边剩余量小于10
            compareText = textObj.value.substring(rangeStart-compareLen,rangeStart+compareLen);
            textObj.setSelectionRange(rangeStart-compareLen,rangeStart+compareLen);
        }else{
            compareText = textObj.value.substring(rangeStart-compareLen,rangeEnd+compareLen);
            textObj.setSelectionRange(rangeStart-compareLen,rangeEnd+compareLen);
        }
        
        return compareText;
    }
    /**
     * textarea获取光标所在段落
     */
    function getParaIndexFromCaret(){
        // var c = textObj.offset().top;
        var cParaArr;
        var eParaArr;
        var compareText= '';
        var paraIndex= '';
        var cbody = document.getElementById('cbody');
        var ebody = document.getElementById('ebody');
        cParaArr=$('#cbody').val().replace(/[\r\n]+ +[\r\n]+/gm,'\r\n').replace(/\n$/gm, '').split(/\n/);
        eParaArr=$('#ebody').val().replace(/[\r\n]+ +[\r\n]+/gm,'\r\n').replace(/\n$/gm, '').split(/\n/);
        console.log('len'+eParaArr);
        cParaArr.forEach(function(item,i){ 
            compareText= getTextCloseToCaret(cbody,cParaArr[i]);
            if (item.indexOf(compareText) > 0) {
                paraIndex = i;
            }
        });
        console.log('paraIndex：'+paraIndex);
        let eSelectedPara = eParaArr[paraIndex];
        console.log('Caret text：'+eSelectedPara);
        let eLength = eSelectedPara.length;
        eParaArr.forEach(function(item,i){ 
            compareText= getTextCloseToCaret(cbody,cParaArr[i]);
            if (item.indexOf(compareText) > 0) {
                paraIndex = i;
            }
        });
        let frontLength = 0;
        for (var i = 0; i < paraIndex; i++) {
            frontLength += eParaArr[i].length;
        }
        ebody.focus();
        ebody.setSelectionRange(frontLength,frontLength+eLength);
        // return paraIndex 
    } 
    /**
     * textarea滚动到指定位置
     * 思路：获取一个textarea鼠标位置，得到第几段指数，然后获取另一个textarea对应段，然后加亮。
     * 怎么加亮textarea中文本？直接选中那段，把光标定位到那段，光标前后为段落前长度+被选段落长度
     */
    function scrollToSpecifiedText(){
        // var paraIndex = getParaIndexFromCaret();

    }
    /**
     * textarea计算段落总数
     */
    function paragraphCount(){
        var alertmessage=''; 
        var alerti=0;
        var cParaLen;
        var eParaLen;
        var ceParaLenDiff;
        cParaLen=$('#cbody').val().replace(/[\r\n]+ +[\r\n]+/gm,'\r\n').replace(/\n$/gm, '').split(/\n/).length;
        eParaLen=$('#ebody').val().replace(/[\r\n]+ +[\r\n]+/gm,'\r\n').replace(/\n$/gm, '').split(/\n/).length;
        ceParaLenDiff = cParaLen - eParaLen;
        if ((ceParaLenDiff>2 || ceParaLenDiff<0) && cParaLen>=3 && eParaLen>=3) {
            alerti ++;
            alertmessage += alerti + '. 中英文的段落数不一致，中文' + $('#cbody').val().replace(/\n$/gm, '').split(/\n/).length + '段，英文' + $('#ebody').val().replace(/\n$/gm, '').split(/\n/).length + "段\r\n\r\n";
            $('#ebody').css('background-color','#990000').css('color','#FFF');
        }
        
        // 1. 中英文的段落数不一致，中文6段，英文3段
        console.log('cParaLen:'+cParaLen+ 'eParaLen:' +  eParaLen + 'alertmessage:'+ alertmessage);
    }
    $('#imgbutton').click(function(){   
        var genre = document.getElementById('genre');
        var c = genre.scrollTop; //jquery的使用方式：c = group.offset().top; 
        console.log('#imgbutton'+c);
        paragraphCount();
        getParaIndexFromCaret();
        
    });
    // $('#content').mouseup(function(e){ 
        // selectContents('content');
    // });
    /**点击段落能定位到相应段落 */

    /**链接打开本地excel或者word */ 
    // b = $(this).scrollTop();   //页面滚动的高度  
    // c = group.offset().top;    //元素距离文档（document）顶部的高度 
})();