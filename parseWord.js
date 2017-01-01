//TODO a lexer need a token struct
//should  second lexer to detect which need be tag 
function parseWorld(root,worlds) {
  var len=root.childNodes.length;
  for(var i=0;i<len;i++){
    var ele=root.childNodes[i];
    if (ele.nodeType==1) {
      parseWorld(ele,worlds);
    }else if (ele.nodeType==3) {
      var val=new String(ele.nodeValue).trim();
      if(val.length>0){
        worlds.push(val)
      }
    }
  }
}