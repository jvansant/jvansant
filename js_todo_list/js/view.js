/* jshint esversion: 6 */
/* jshint node: true */
/* jshint browser: true */
/* jshint jquery: true */
"use strict";

class ToDoListView {
    constructor(model) {
        model.subscribe(this.redrawList.bind(this));
    }

    redrawList(todolist, msg) {
        let plDiv = document.querySelector("#toDoListDiv");
        let tbl = plDiv.querySelector("table");
        if (!tbl) {
            tbl = document.createElement("table");
            tbl.setAttribute("id", "toDoListTable");//style here
            tbl.setAttribute("class", "table")
            plDiv.appendChild(tbl);
        }

        
        tbl.innerHTML = "";
        let row = document.createElement("tr");
        let th = document.createElement("th");
        let th1 = document.createElement("th");
        let th2 = document.createElement("th");
        let th4 = document.createElement("th");
        th.innerText = "Complete";
        row.appendChild(th);
        th1.innerText = "Task";
        row.appendChild(th1);
        th2.innerText = "Assigned To";
        row.appendChild(th2);
        th4.innerText = "Due-Date";
        row.appendChild(th4);
        row.setAttribute("class", "thead-dark");
        let row2=row.cloneNode(true);

        tbl.appendChild(row);

        for (let task of todolist) {
        
            this.addRow(task, tbl);
        }
        // tbl.appendChild(row2);
    }


    addRow(task, parent) {
        let row = document.createElement("tr");

        let cb = document.createElement("input");
        cb.type = "checkbox";
        cb.onclick = function() {
            task.removed = !task.removed;
            cleanList();
        };
        let cbCell = document.createElement("td");
        cbCell.appendChild(cb);
        row.appendChild(cbCell);

        for (let val of ["name", "collab", "dueDate"]) {
            let td = document.createElement("td");
            td.innerText = task[val];
            row.appendChild(td);
        }
        if (task.priority=="High"){
            row.setAttribute("class", "table-danger");
        }
        else if (task.priority=="Medium"){
            row.setAttribute("class", "table-warning");
        }
        else if (task.priority=="Low"){
            row.setAttribute("class", "table-success");
        }
        
        parent.appendChild(row);
    }
}
