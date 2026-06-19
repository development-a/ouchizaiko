document.addEventListener(
"DOMContentLoaded",
init
);



let currentFilter="all";

let dragId=null;

let placeholder=null;





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

render();

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

let name =
document
.getElementById("item-name")
.value;



let category =
document
.getElementById("item-category")
.value;



if(!name)return;



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

let categories=getCategories();


let select =
document
.getElementById("item-category");


let filter =
document
.getElementById("filter-category");



if(!select||!filter)return;



select.innerHTML="";

filter.innerHTML=
`
<option value="all">
すべて
</option>
`;



categories.forEach(
c =>
{

select.innerHTML+=
`
<option value="${c}">
${c}
</option>
`;

filter.innerHTML+=
`
<option value="${c}">
${c}
</option>
`;

});



filter.value=currentFilter;

}








function renderInventory()
{

let area =
document
.getElementById("inventory-list");



if(!area)return;



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
item =>
{


let wrap =
document.createElement("div");


wrap.className="item-wrapper";



wrap.draggable=true;



wrap.dataset.id=item.id;



wrap.innerHTML=
`
<div class="swipe-delete">
×
</div>


<div class="item ${item.stock?"":"no-stock"}">


<div class="watermark">

${item.stock?"":"在庫なし"}

</div>



<div class="item-info">

<span class="item-name">

${item.name}

</span>


<span class="item-category">

${item.category}

</span>


</div>


</div>

`;




let card =
wrap.querySelector(".item");




/* ドラッグ */

wrap.ondragstart =
() =>
{

dragId=item.id;

};


wrap.ondragover =
e =>
{

e.preventDefault();

};


wrap.ondrop =
() =>
{

reorder(
dragId,
item.id
);

render();

};





/* タップ */

card.onclick =
() =>
{

toggleStock(item.id);

};





/* 長押し */

let timer;


card.onmousedown =
() =>
{

timer=setTimeout(
() =>
openMenu(item.id),
700
);

};


card.onmouseup =
() =>
clearTimeout(timer);






/* スワイプ */

let startX=0;



card.addEventListener(
"touchstart",
e =>
{

startX =
e.touches[0].clientX;

});




card.addEventListener(
"touchend",
e =>
{

let endX =
e.changedTouches[0].clientX;



if(startX-endX>50)
{

card.classList.add(
"swiped"
);

}


if(endX-startX>50)
{

card.classList.remove(
"swiped"
);

}

});





wrap
.querySelector(".swipe-delete")
.onclick =
() =>
{

deleteItem(item.id);

render();

};






area.appendChild(wrap);



});

}









function openMenu(id)
{

let item =
getItems()
.find(
x=>x.id===id
);



let result =
prompt(
"1 編集\n2 削除"
);



if(result==="1")
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



if(result==="2")
{

deleteItem(id);

render();

}


}









function toggleStock(id)
{

let item =
getItems()
.find(
x=>x.id===id
);



item.stock =
!item.stock;



updateItem(item);



render();

}









function reorder(from,to)
{

let data=getData();


let items=data.items;



let a =
items.findIndex(
x=>x.id===from
);


let b =
items.findIndex(
x=>x.id===to
);



let move =
items.splice(a,1)[0];


items.splice(
b,
0,
move
);



saveData(data);

}







function updateCount()
{

let items=getItems();



document
.getElementById("total-items")
.textContent =
`登録 ${items.length}件`;



document
.getElementById("shopping-count")
.textContent =
`買い物 ${
items.filter(
x=>!x.stock
).length
}件`;

}
