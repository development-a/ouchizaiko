document.addEventListener(
"DOMContentLoaded",
initShopping
);



let shoppingFilter="all";





function initShopping()
{


document
.getElementById("shopping-filter")
?.addEventListener(
"change",
e =>
{

shoppingFilter=e.target.value;

renderShopping();

});



renderShopping();

}









function renderShopping()
{


renderShoppingFilter();



const area =
document
.getElementById("shopping-list");



if(!area)
return;



area.innerHTML="";




let items =
getItems()
.filter(
x=>x.stock===false
);





if(shoppingFilter!=="all")
{

items =
items.filter(
x =>
x.category===shoppingFilter
);

}






if(items.length===0)
{

area.innerHTML=
`

<div class="empty">

買うものはありません

</div>

`;

updateShoppingCount();

return;

}







items.forEach(
item =>
{


const div =
document.createElement("div");



div.className="item";




div.onclick =
() =>
{

if(
confirm(
`${item.name}を購入済みにしますか？`
)
)
{

item.stock=true;

updateItem(item);


renderShopping();

}

};






div.innerHTML =
`

<div class="item-info">


<span class="item-name">

${item.name}

</span>



<span class="item-category">

${item.category}

</span>


</div>


`;





area.appendChild(div);


});





updateShoppingCount();

}








function renderShoppingFilter()
{


const filter =
document
.getElementById("shopping-filter");



if(!filter)
return;



filter.innerHTML =
`

<option value="all">

すべて

</option>

`;




getCategories()
.forEach(
c=>
{

filter.innerHTML +=

`
<option value="${c}">

${c}

</option>
`;

});



filter.value=shoppingFilter;

}








function updateShoppingCount()
{


const count =
getItems()
.filter(
x=>x.stock===false
)
.length;



const target =
document
.getElementById("shopping-count");



if(target)
{

target.textContent =
`買い物 ${count}件`;

}


}
