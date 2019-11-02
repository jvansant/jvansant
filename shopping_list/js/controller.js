/* jshint esversion: 6 */
/* jshint node: true */
'use strict';

var shoppingModel = new ShoppingList();
var shoppingView = new ShoppingView(shoppingModel);

function populateSelect(selectId, selectValues) {
    let sel = document.getElementById(selectId);
    for (let s of selectValues) {
        let opt = document.createElement("option");
        opt.value = s;
        opt.innerHTML = s;
        sel.appendChild(opt);
    }
}


function add_item() {
    if (!document.querySelector("#newItemForm").checkValidity()) {
        alert("Please enter an ITEM NAME and PRICE to add a new item!");
        return;
    }

    let name = document.querySelector("#name").value;
    let quantity = document.querySelector("#sel_quantity").selectedOptions[0].value;
    let price = document.querySelector("#price").value;
    let store = document.querySelector("#sel_store").selectedOptions[0].value;
    let section = document.querySelector("#sel_section").selectedOptions[0].value;
    let priority = document.querySelector("#sel_priority").selectedOptions[0].value;
    let newItem = new Item(name, quantity, price, store, section, priority);
    shoppingModel.add(newItem);
}

function checked(){
    shoppingModel.checked();
}

function save_list() {

    let itemParts = ["name", "quantity", "price", "store", "section", "priority", "acquired"];
    let list = [];
    
    for(let i of shoppingModel){
        let item = {};
        for(let part of itemParts){
            item[part]=i[part];
            // console.log(i[part]);
        }
        list.push(item);
    }

    localStorage.clear();
    localStorage.setItem("storedList", JSON.stringify(list));
}

function clean_list() {
    shoppingModel.cleanList();
    save_list();
}

function empty_list() {
    shoppingModel.clearList();
    localStorage.removeItem("storedList");
}

function populate_list() {
    let list = localStorage.getItem("storedList");
    list = list ? JSON.parse(list) : [];

    for(var item of list){
        shoppingModel.add(item)
    }
    
}

$(document).ready(function () {
    populateSelect("sel_quantity", [1, 2, 3, 4, 6, 8, 12]);
    populateSelect("sel_store", ['Target', 'Wal-Mart', 'Hy-Vee', 'C-Store']);
    populateSelect("sel_section", ['Produce', 'Poultry', 'Dairy', 'Office', 'Electronics', 'Sporting Goods']);
    populateSelect("sel_priority", ['Low', 'Medium', 'High']);
    populate_list();
});