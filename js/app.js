document.addEventListener(
"DOMContentLoaded",
init
);



let pressTimer;



function init()
{

document
.getElementById("add-button")
.addEventListener(
"click",
addItemForm
);


document
.getElementById("filter-category")
.addEventListener(
"change",
render
);


render();

}





function render()
{

renderSelect();

renderInventory();

updateCount();

}







function addItemForm()
{

let name =
document
.getElementById("item-name")
.value;


let category =
document
.getElementById("item-category")
.value;



if(!name)
return;



addItem(
{
name,
category,
stock:true
}
);



document
.getElementById("item-name")
.value="";


render();

}







function renderSelect()
{

let categories =
getCategories();


let select =
document
.getElementById("item-category");



select.innerHTML="";



categories.forEach(
c =>
{

select.innerHTML +=
`
<option value="${c}">
${c}
</option>
`;

});

}









function renderInventory()
{

let area =
document
.getElementById("inventory-list");



area.innerHTML="";



let items =
getItems();



let filter =
document
.getElementById("filter-category")
.value;




if(filter!=="all")
{

items =
items.filter(
x =>
x.category===filter
);

}







items.forEach(
item =>
{

let div =
document.createElement("div");



div.className =
item.stock
?
"item"
:
"item no-stock";




div.innerHTML =
`
<div class="watermark">

在庫なし

</div>


<div class="item-info">

<span class="item-name">

${item.name}

</span>


<span class="item-category">

${item.category}

</span>


</div>

`;





let timer;



div.addEventListener(
"mousedown",
() =>
{

timer =
setTimeout(
() =>
openMenu(item.id),
700
);

});



div.addEventListener(
"mouseup",
() =>
clearTimeout(timer)
);




div.onclick =
() =>
toggleStock(item.id);




area.appendChild(div);


});


}







function openMenu(id)
{

let item =
getItems()
.find(
x=>x.id===id
);



let action =
prompt(
"操作を選択\n1:編集\n2:削除"
);



if(action==="1")
{

let name =
prompt(
"商品名",
item.name
);



if(name)
{

item.name=name;

updateItem(item);

render();

}

}




if(action==="2")
{

deleteItem(id);

render();

}


}







function toggleStock(id)
{

let items =
getItems();


let item =
items.find(
x=>x.id===id
);



item.stock =
!item.stock;



updateItem(item);


render();

}






function updateCount()
{

let items =
getItems();



document
.getElementById("total-items")
.textContent =
`登録 ${items.length}件`;





let count =
items.filter(
x =>
!x.stock
).length;



document
.getElementById("shopping-count")
.textContent =
`買い物 ${count}件`;

}
