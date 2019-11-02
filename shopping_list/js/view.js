/* jshint esversion: 6 */
/* jshint node: true */
'use strict';
let fillHead=["", "Item", "Quantity", "Price", "Store", "Section"];

class ShoppingView {
    constructor(model) {
        model.subscribe(this.redrawList.bind(this));
    }

    redrawList(shoppingList, msg) {
        console.log(msg);
        let ldiv = document.querySelector("#shoppingListDiv");
        let tbl = document.querySelector("#shoppingListTable");
        if (!tbl) {
            tbl = document.createElement("table");
            tbl.setAttribute("id", "shoppingListTable");
            tbl.setAttribute("class", "table table-bordered");
        }
        tbl.innerHTML="";
        let headrow=document.createElement("tr");
        for(let head of fillHead){
            let th = document.createElement("th");
            th.innerHTML=head;
            headrow.appendChild(th);
        }
        headrow.setAttribute("class", "thead-dark");
        tbl.appendChild(headrow);
        let itemsArray = shoppingList.allItems;
        for(let item of itemsArray){   
            this.addRow(item, tbl);
        }
        let second= headrow.cloneNode(true);
        tbl.appendChild(second);
        if (shoppingList.size==0){
            tbl.innerHTML="";
        }
        ldiv.appendChild(tbl);
    }

    addRow(item, parent) {
        let row = document.createElement("tr");

        let cb = document.createElement("input");
        cb.type = "checkbox";
        if(item.acquired){ 
            cb.checked="checked";
        }
        cb.onclick = function() {
            item.acquired = !item.acquired;
            checked();
        };

        let cbCell = document.createElement("td");
        cbCell.appendChild(cb);
        row.appendChild(cbCell);

        for (let val of ["name", "quantity", "price", "store", "section"]) {
            let td = document.createElement("td");
            if(item.acquired){
                let st=document.createElement("strike");
                st.innerText = item[val];
                td.appendChild(st);
                row.appendChild(td);
            }
            else{
            td.innerText = item[val];
            row.appendChild(td);
            }
        }


        if (item.priority=="High"){
            row.setAttribute("class", "table-danger");
        }
        else if (item.priority=="Medium"){
            row.setAttribute("class", "table-warning");
        }
        else if (item.priority=="Low"){
            row.setAttribute("class", "table-success");
        }
        
        parent.appendChild(row);
    }
}
