document.addEventListener(
    "DOMContentLoaded",
    () =>
    {
        init();
    }
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
        }
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

    const name =
    document
    .getElementById("item-name")
    .value;


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
        category:category
    });


    document
    .getElementById("item-name")
    .value="";


    render();

}









function renderSelect()
{

    const categories =
    getCategories();


    const select =
    document
    .getElementById("item-category");


    const filter =
    document
    .getElementById("filter-category");



    if(!select || !filter)
    {
        return;
    }



    select.innerHTML="";


    filter.innerHTML =
    `
    <option value="all">
    すべて
    </option>
    `;



    categories.forEach(
        category =>
        {

            select.innerHTML +=
            `
            <option value="${category}">
            ${category}
            </option>
            `;


            filter.innerHTML +=
            `
            <option value="${category}">
            ${category}
            </option>
            `;

        }
    );



    filter.value =
    currentFilter;

}









function renderInventory()
{

    const area =
    document
    .getElementById("inventory-list");



    if(!area)
    {
        return;
    }



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






    items.forEach(
        item =>
        {


            const div =
            document.createElement("div");



            div.className =
            item.stock
            ?
            "item"
            :
            "item no-stock";



            div.draggable=true;


            div.dataset.id =
            item.id;




            div.ondragstart =
            dragStart;


            div.ondragover =
            dragOver;


            div.ondrop =
            dropItem;






            div.onclick =
            () =>
            {
                toggleStock(
                    item.id
                );
            };






            div.innerHTML =
`
${item.stock ? "" :
`
<div class="watermark">
在庫なし
</div>
`
}



<div class="item-info">


<span class="item-name">

${item.name}

</span>


<span class="item-category">

${item.category}

</span>


</div>




<div class="item-actions">


<button
class="delete-button"
onclick="event.stopPropagation();removeItem(${item.id})">

×

</button>


</div>

`;



            area.appendChild(div);


        }
    );

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
    {
        return;
    }



    item.stock =
    !item.stock;



    item.shopping =
    !item.stock;



    updateItem(item);



    render();

}









function dragStart(e)
{

    dragId =
    Number(
        e.currentTarget.dataset.id
    );

}






function dragOver(e)
{

    e.preventDefault();


    const target =
    e.currentTarget;



    if(!placeholder)
    {

        placeholder =
        document.createElement("div");


        placeholder.className =
        "drag-line";

    }


    target.before(
        placeholder
    );

}






function dropItem(e)
{

    e.preventDefault();



    const target =
    Number(
        e.currentTarget.dataset.id
    );



    reorder(
        dragId,
        target
    );



    placeholder?.remove();

    placeholder=null;



    render();

}








function reorder(from,to)
{

    const data =
    getData();



    const items =
    data.items;



    const fromIndex =
    items.findIndex(
        x =>
        x.id === from
    );


    const toIndex =
    items.findIndex(
        x =>
        x.id === to
    );



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








function removeItem(id)
{

    if(confirm("削除しますか？"))
    {

        deleteItem(id);

        render();

    }

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
        `買い物 ${
        items.filter(
            x=>!x.stock
        ).length
        }件`;

    }

}
