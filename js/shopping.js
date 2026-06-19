document.addEventListener(
"DOMContentLoaded",
renderShopping
);



function renderShopping()
{

let area =
document
.getElementById("shopping-list");



area.innerHTML="";



let items =
getItems()
.filter(
x=>!x.stock
);



items.forEach(
item =>
{


let div =
document.createElement("div");



div.className =
"item no-stock";



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




div.onclick =
() =>
{

item.stock=true;

updateItem(item);

renderShopping();

};



area.appendChild(div);


});



document
.getElementById("shopping-count")
.textContent =
`買い物 ${items.length}件`;

}
