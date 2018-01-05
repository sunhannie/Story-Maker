(function () {
  var arr = [{name:'xiaoxiao',age:12,gender:'male'},{name:'xiao',age:22,gender:'male'},{name:'hh',age:12,gender:'female'},{name:'ran',age:20,gender:'female'}];
  var data = {caption:"信息统计",
             thead:{"head1":'姓名',"head2":'年龄',"head3":'性别'},
             tbody:[{name:'xiaoxiao',age:10,gender:'male0'},{name:'xiao',age:11,gender:'male1'},{name:'hh',age:12,gender:'female2'},{name:'ran',age:13,gender:'female3'}]};
    /**把对象转化为表格字符串 */
    function createTable(obj){
        var theadTh = '';
        var theadtr = '';
        for (let tdkey in obj['thead']) { 
            theadTh += '<th><span class="ft-bold">'+obj['thead'][tdkey]+'</span></th>';
        }
        theadNode ='<thead><tr>'+theadTh+'</span></tr></thead>';

        var tbodyTr = '';
        obj['tbody'].forEach(function(item,index){ 
            var tbodytd = '';
            for (let tdkey in item) { 
                tbodytd += '<td>'+item[tdkey]+'</td>';
            }
            tbodytd = tbodytd.replace(/^<td>/,"<td nowrap>");
            // console.log( tbodytd);
            tbodyTr +='<tr>'+tbodytd+'</tr>';
         });
        var tbodyNode = '<tbody>'+tbodyTr+'<tbody>'
        var tableNode = '<p><table><caption>'+ obj['caption']+'</caption>'+theadNode+tbodyNode+'</table></p>';
        console.log( tableNode);
        return tableNode; 
    }
    // var tab = document.getElementById('tab');
    // tab.innerHTML = createTable(data);

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
            caretPos.text = caretPos.text.charAt(caretPos.text.length-1) == '' ?
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
            caretPos.text = caretPos.text.charAt(caretPos.text.length-1) == '' ?
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
            console.log('len'+len)
        }
        else {
            textObj.value+=textFeildValue1 + textFeildValue2;
        }
    }

    $('#imgbutton').click(function(){
        console.log('#imgbutton')
        var genre = document.getElementById('genre');
        insertAtCaret(genre,"<i>");
    });
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
            selectedText = "<span style='background:red'>"+selectedText+"</span>"; 
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
        charvalue = $("#"+objid).val();
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
            $('#'+msgid).html(charlen-k).append("/" + charlen);
            $('#'+msgid).attr('class','char_error');
        }else {
            $('#'+msgid).html(k).append("/" + charlen);
            $('#'+msgid).attr('class','char_ok');
        }
    }
    /**
     * 显示单词的输入个数
     */
    function wordcount(objid , charlen , msgid) {
        charvalue = $("#"+objid).val();
        var k;
        k=charvalue.split(/[\s]/).length;
        $('#'+msgid).html(k);
        $('#'+msgid).attr('class','char_ok');
    }

    /**
     * 获取中英文段数
     */
     
    $("#content").mouseup(function(e){ 
        // selectContents('content');
    })
    /**点击段落能定位到相应段落 */

    /**链接打开本地excel或者word */ 
})();