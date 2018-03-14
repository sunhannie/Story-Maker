class publicFun {
    constructor () {
        this.getAttrElement = this.getAttrElement.bind(this);
        this.getEmptyIndex = this.getEmptyIndex.bind(this);
        this.getEmptyCount = this.getEmptyCount.bind(this);
    }

    getAttrElement(attr,val){
        var e= document.all;
        var a= new Array();
        for(var i=0;i<e.length;i++){
            if(e[i].getAttribute(attr)===val){
                a.push(e[i]);
            }
        }
        return a;
    }
    getEmptyIndex(arr){
       
        var len = arr.length;
        var indexArr = [];
        var tempIndex = '0';
         for(var i=0;i<len;i++){
             tempIndex = '0';
                 for(let k=i+1;k<len;k++){
                    if(arr[i]!==''&&(arr[k]===''||arr[k]==="")){
                        tempIndex = i;
                    }else{
                        break;
                    }
                 }
                 if (tempIndex!=='0'){
                    indexArr.push(tempIndex);
                 }
           }
           console.log('k:'+indexArr);
    }
    // var arr = ["文字2", "", "文字2", "", "文字4", "文字5", "文字6"]
    // var arr = ['a','','','','b','',''];
    // getEmptyIndex(arr);
    getEmptyCount(arr){
        var len = arr.length;
        var countArr = [];
        var diff = 0;
        for(var i=0,j=i+1;i<len,j<len;i++,j++){
                diff = arr[j]-arr[i];
                countArr.push(diff);  
        }
        console.log('countArr:'+countArr);
    }
     // var arr1 = ["", "", "文字2", "文字3", "文字4", "文字5", "文字6"]
    //  var arr1 = [1,5,8,14];
    // getEmptyCount(arr1);


}
export {publicFun};
// export default publicFun;