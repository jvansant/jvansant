/* jshint esversion: 6 */
/* jshint node: true */
/* jshint browser: true */
/* jshint jquery: true */
'use strict';

function input(toAppend){
    var curr = document.getElementById("typed").value;
    curr=curr+toAppend;
    // console.log(curr);
    document.getElementById("typed").value = curr;
}

function clearI(){
    document.getElementById("typed").value = "";
}

function parseCalcInput(){
    var curr = document.getElementById("typed").value;
    console.log(curr);
    var nums="123456789.e";
    var ops = "+-*/";
    var fronts = "";
    var backs = "";
    var operators = "";
    var beforeoperator=true;
    console.log(`${curr}   calculating....`);
    for(var i=0; i<curr.length; i++){
        if(beforeoperator==true){
            if(nums.includes(curr[i])){
                fronts+=curr[i];
            }
            else if(ops.includes(curr[i])){
                operators=curr[i];
                beforeoperator=false;
            }
        }
        else{
            backs+=curr[i];
        }
        
    }
    var contents=[parseFloat(fronts), operators, parseFloat(backs)];
    //console.log(`${fronts} op:${operators} :po ${backs}`);
    return contents;

}

function calculate(){
    var textbox=document.querySelector("#typed");
    var contents= parseCalcInput();
    var op=contents[1];
    var one=contents[0];
    var two=contents[2];
    
    if(op==="+"){
        var a = one+two;
    }
    else if(op==="-"){
        var a = one-two;
    }
    else if(op==="*"){
        var a = one*two;
    }
    else if(op==="/"){
        var a = one/two;
    }
    console.log(a.toString());
    a=a.toString();
    textbox.value=a;


}
