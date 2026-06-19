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




/*
--------------------------------
初期化
--------------------------------
*/

function init()
{

    document
    .getElementById(
        "add-button"
    )
    .addEventListener(
        "click",
        addItemForm
    );



    document
    .getElementById(
        "filter-category"
    )
    .addEventListener(
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









/*
--------------------------------
商品登録
--------------------------------
*/

function addItemForm()
{

    const name =
        document
        .getElementById(
            "item-name"
        )
        .value;



    const category =
        document
        .getElementById(
            "item-category"
        )
        .value;



    if(name==="")
    {
        return;
    }




    addItem(
    {

        name:name,

        category:category

    });



    document
    .getElementById(
        "item-name"
    )
    .value="";



    render();

}







/*
--------------------------------
セレクト
--------------------------------
*/

function renderSelect()
{

    const categories =
        getCategories();



    const select =
        document
        .getElementById(
            "item-category"
        );



    const filter =
        document
        .getElementById(
            "filter-category"
        );



    select.innerHTML="";



    filter.innerHTML =
    `
    <option value="all">
    すべて
    </option>
    `;



    categories.forEach(
        c =>
        {

            select.innerHTML +=
            `
            <option value="${c}">
            ${c}
            </option>
            `;


            filter.innerHTML +=
            `
            <option value="${c}">
            ${c}
            </option>
            `;

        }
    );



    filter.value =
        currentFilter;

}









/*
--------------------------------
在庫一覧
--------------------------------
*/

function renderInventory()
{

    const area =
        document
        .getElementById(
            "inventory-list"
        );



    area.innerHTML="";



    let items =
        getItems();



    if(
        currentFilter !== "all"
    )
    {

        items =
        items.filter(
            item =>
            item.category === currentFilter
        );

    }






    if(items.length===0)
    {

        area.innerHTML =
        `
        <div class="empty">
        商品なし
        </div>
        `;

        return;

    }






    items.forEach(
        item =>
        {


            const div =
            document.createElement(
                "div"
            );



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
            e =>
            {

                if(
                    e.target.closest(
                    "button"
                    )
                    ||
                    e.target.closest(
                    "input"
                    )
                )
                {
                    return;
                }


                toggleStock(
                    item.id
                );

            };








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




<div class="item-actions">


<label class="switch">

<input
type="checkbox"
${item.stock?"checked":""}
onclick="event.stopPropagation()"
onchange="toggleStock(${item.id})">


<span class="slider">
</span>


</label>




<button
class="delete-button"
onclick="event.stopPropagation();removeItem(${item.id})">

🗑

</button>


</div>

`;



            area.appendChild(div);


        }
    );

}









/*
--------------------------------
ドラッグ
--------------------------------
*/

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
        document.createElement(
            "div"
        );


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








function reorder(
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
        x =>
        x.id===from
    );



    const toIndex =
    items.findIndex(
        x =>
        x.id===to
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








/*
--------------------------------
在庫切替
--------------------------------
*/

function toggleStock(id)
{

    const items =
        getItems();



    const item =
        items.find(
            x=>x.id===id
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







/*
--------------------------------
削除
--------------------------------
*/

function removeItem(id)
{

    if(confirm("削除しますか？"))
    {

        deleteItem(id);

        render();

    }

}







/*
--------------------------------
件数
--------------------------------
*/

function updateCount()
{

    const items =
        getItems();



    document
    .getElementById(
        "total-items"
    )
    .textContent =
    `登録 ${items.length}件`;



    document
    .getElementById(
        "shopping-count"
    )
    .textContent =
    `買い物 ${
    items.filter(
        x=>x.shopping
    ).length
    }件`;

}
