/* jshint esversion: 7 */
/* jshint node: true */
'use strict';


let urla="http://numbersapi.com/"

async function getData(url) {
    return fetch(url)
        .then(response => response.text())
        .catch(error => console.log(error));
}

// function getDataPiece(url){
//     return fetch(url);
// }

async function get_individual(num, all_numbers) {
    let one=document.createElement("p");
    let two=document.createElement("p");
    let three=document.createElement("p");
    let he1=document.createElement("h1");
    let he2=document.createElement("h1");
    let he3=document.createElement("h1");
    he1.innerHTML=(num-1).toString();
    he2.innerHTML=num.toString();
    he3.innerHTML=(num+1).toString();
    he1.setAttribute("class", "alert-success");
    he2.setAttribute("class", "alert-success");
    he3.setAttribute("class", "alert-success");

    one.innerHTML= await getData(urla+(num-1).toString());
    all_numbers.appendChild(he1);
    all_numbers.appendChild(one);

    two.innerHTML= await getData(urla+num.toString());
    all_numbers.appendChild(he2);
    all_numbers.appendChild(two);

    three.innerHTML= await getData(urla+(num+1).toString());
    all_numbers.appendChild(he3);
    all_numbers.appendChild(three);

}

async function get_batch(num, all_numbers) {
    let one=document.createElement("p");
    let two=document.createElement("p");
    let three=document.createElement("p");


    [one.innerHTML, two.innerHTML, three.innerHTML] = await Promise.all([
        getData(urla+(num-1).toString()),
        getData(urla+num.toString()),
        getData(urla+(num+1).toString()),
    ]);
    
    let he1=document.createElement("h1");
    let he2=document.createElement("h1");
    let he3=document.createElement("h1");
    he1.innerHTML=(num-1).toString();
    he2.innerHTML=num.toString();
    he3.innerHTML=(num+1).toString();
    he1.setAttribute("class", "alert-success");
    he2.setAttribute("class", "alert-success");
    he3.setAttribute("class", "alert-success");

    all_numbers.appendChild(he1);
    all_numbers.appendChild(one);
    all_numbers.appendChild(he2);
    all_numbers.appendChild(two);
    all_numbers.appendChild(he3);
    all_numbers.appendChild(three);
}

async function clickedon() {
    let num = parseInt(document.querySelector('#number').value);
    console.log(num.toString());
    let all_numbers = document.querySelector('#number_info');
    all_numbers.innerHTML="";

    if (document.querySelector('#batch').checked) {
        get_batch(num, all_numbers);
    } else {
        get_individual(num, all_numbers);
    }
}
