document.addEventListener(
"DOMContentLoaded",
init
);


let currentFilter = "all";

let dragId = null;

let placeholder = null;






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


currentFilter =
e.target.value;


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




if(name === "")
{

return;

}



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





if(!itemSelect || !filterSelect)
{

return;

}






itemSelect.innerHTML="";



filterSelect.innerHTML =
`

<option value="all">

すべて

</option>

`;






categories.forEach(
category =>
{


itemSelect.innerHTML +=

`

<option value="${category}">

${category}

</option>

`;




filterSelect.innerHTML +=

`

<option value="${category}">

${category}

</option>

`;

});







if(
[...filterSelect.options]
.some(
x =>
x.value === currentFilter
)
)

{

filterSelect.value =
currentFilter;

}

else

{

currentFilter="all";

filterSelect.value="all";

}



}









function renderInventory()
{


const area =
document
.getElementById("inventory-list");



if(!area)
return;



area.innerHTML="";



let items =
getItems();







if(currentFilter !== "all")
{


items =
items.filter(
item =>
item.category === currentFilter
);


}








if(items.length === 0)
{


area.innerHTML =
`

<div class="empty">

商品がありません

</div>

`;

return;

}







items.forEach(
item =>
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



card.dataset.id =
item.id;






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









/*
在庫切替
*/

card.onclick =
e =>
{


if(
e.target.classList.contains(
"delete-button"
)
)
{

return;

}



toggleStock(
item.id
);


};









/*
削除
*/


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

deleteItem(
item.id
);


render();

}


};










/*
ドラッグ開始
*/

card.addEventListener(
"dragstart",
()=>{


dragId =
item.id;



createPlaceholder();



setTimeout(
()=>{

card.style.display="none";

},
0
);


}

);








/*
ドラッグ終了
*/

card.addEventListener(
"dragend",
()=>{


card.style.display="flex";

removePlaceholder();


}

);









/*
ドラッグ中
*/

card.addEventListener(
"dragover",
e =>
{


e.preventDefault();




const rect =
card.getBoundingClientRect();



const center =
rect.top +
rect.height / 2;






if(
e.clientY < center
)

{

card.before(
placeholder
);

}

else

{

card.after(
placeholder
);

}



}

);










/*
ドロップ
*/

card.addEventListener(
"drop",
e =>
{


e.preventDefault();





const target =
placeholder
.previousElementSibling;



if(target)
{


moveItem(
dragId,
Number(
target.dataset.id
)

);


}




render();


}

);







area.appendChild(card);



}

);


}









function createPlaceholder()
{


if(placeholder)
return;



placeholder =
document.createElement("div");



placeholder.className =
"drag-placeholder";



placeholder.textContent =
"----------";


}







function removePlaceholder()
{


if(placeholder)
{


placeholder.remove();


placeholder=null;


}

}









function moveItem(
fromId,
toId
)
{


const data =
getData();




const items =
data.items;






const from =
items.findIndex(
x =>
x.id === fromId
);



const to =
items.findIndex(
x =>
x.id === toId
);





if(
from === -1 ||
to === -1
)

return;







const move =
items.splice(
from,
1
)[0];




items.splice(
to,
0,
move
);






saveData(data);



}










function toggleStock(id)
{


const items =
getItems();




const item =
items.find(
x =>
x.id === id
);





if(!item)
return;






item.stock =
!item.stock;






updateItem(item);




render();


}










function updateCount()
{


const items =
getItems();





const total =
document
.getElementById("total-items");





if(total)

{

total.textContent =

`登録 ${items.length}件`;

}







const shopping =
document
.getElementById("shopping-count");






if(shopping)

{


shopping.textContent =

`

買い物 ${
items.filter(
x =>
x.stock === false
)
.length
}件

`;


}


}
