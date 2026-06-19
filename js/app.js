document.addEventListener(
"DOMContentLoaded",
init
);


let currentFilter="all";

let dragId=null;




function init()
{

document
.getElementById("add-button")
?.addEventListener(
"click",
addItemForm
);



document
.getElementById("filter-category")
?.addEventListener(
"change",
e =>
{

currentFilter=e.target.value;

renderInventory();

});


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


const name =
document
.getElementById("item-name")
.value.trim();



const category =
document
.getElementById("item-category")
.value;



if(name==="")
return;



addItem(
{
name:name,
category:category,
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


const categories =
getCategories();



const itemSelect =
document
.getElementById("item-category");



const filterSelect =
document
.getElementById("filter-category");



if(!itemSelect)
return;



itemSelect.innerHTML="";


filterSelect.innerHTML =
`
<option value="all">
すべて
</option>
`;




categories.forEach(
c=>
{

itemSelect.innerHTML+=
`
<option value="${c}">
${c}
</option>
`;



filterSelect.innerHTML+=
`
<option value="${c}">
${c}
</option>
`;

});



filterSelect.value=currentFilter;

}









function renderInventory()
{


const area =
document
.getElementById("inventory-list");



area.innerHTML="";



let items=getItems();





if(currentFilter!=="all")
{

items =
items.filter(
x=>x.category===currentFilter
);

}





items.forEach(
item=>
{


const card =
document.createElement("div");



card.className =
item.stock
?
"item"
:
"item no-stock";



card.draggable=true;



card.dataset.id=item.id;






card.innerHTML =
`

<div class="watermark">

${item.stock ? "" : "在庫なし"}

</div>



<div class="item-info">

<span class="item-name">

${item.name}

</span>


<span class="item-category">

${item.category}

</span>


</div>



<button class="delete-button">

削除

</button>

`;






// 在庫切替

card.onclick =
e =>
{

if(
e.target.classList.contains(
"delete-button"
)
)
return;



toggleStock(item.id);

};







// 削除

card
.querySelector(".delete-button")
.onclick =
e =>
{

e.stopPropagation();



if(
confirm(
`${item.name}を削除しますか？`
)
)
{

deleteItem(item.id);


render();

}

};








// ドラッグ開始

card.addEventListener(
"dragstart",
()=>{

dragId=item.id;

}
);





card.addEventListener(
"dragover",
e=>
{

e.preventDefault();

}
);






card.addEventListener(
"drop",
e=>
{

e.preventDefault();


moveItem(
dragId,
item.id
);


render();

}

);







area.appendChild(card);


});

}









function moveItem(
from,
to
)
{


const data =
getData();



const items =
data.items;



const fromIndex =
items.findIndex(
x=>x.id===from
);



const toIndex =
items.findIndex(
x=>x.id===to
);



if(
fromIndex===-1 ||
toIndex===-1
)
return;





const move =
items.splice(
fromIndex,
1
)[0];



items.splice(
toIndex,
0,
move
);



saveData(data);

}









function toggleStock(id)
{


const items=getItems();



const item =
items.find(
x=>x.id===id
);



if(!item)
return;



item.stock=!item.stock;



updateItem(item);



render();

}








function updateCount()
{


const items=getItems();



document
.getElementById("total-items")
.textContent =
`登録 ${items.length}件`;




document
.getElementById("shopping-count")
.textContent =
`
買い物 ${
items.filter(
x=>!x.stock
).length
}件
`;

}
