document.addEventListener(
    "DOMContentLoaded",
    () =>
    {

        currentFilter =
            "all";


        setup();

        render();

    }
);



let currentFilter = "all";







/*
--------------------------------
初期設定
--------------------------------
*/

function setup()
{

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


            render();

        }
    );

}








/*
--------------------------------
描画
--------------------------------
*/

function render()
{

    renderFilter();

    renderShopping();

    updateShoppingCount();

}









/*
--------------------------------
フィルター
--------------------------------
*/

function renderFilter()
{

    const filter =
        document
        .getElementById(
            "filter-category"
        );



    const categories =
        getCategories();




    filter.innerHTML =
    `
    <option value="all">
    すべて
    </option>
    `;



    categories.forEach(
        c =>
        {

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
買い物一覧
--------------------------------
*/

function renderShopping()
{

    const area =
        document
        .getElementById(
            "shopping-list"
        );


    area.innerHTML="";



    let items =
        getItems();





    /*
    在庫なしのみ
    */

    items =
        items.filter(
            item =>
            !item.stock
        );






    /*
    ジャンル絞り込み
    */

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

        買い物はありません

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
            "item";



            /*
            タップ購入
            */

            div.onclick =
            () =>
            {

                completeBuy(
                    item.id
                );

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




<div class="item-actions">


<label class="switch">


<input
type="checkbox"
onclick="event.stopPropagation()"
>


<span class="slider">

</span>


</label>


</div>

`;



            area.appendChild(div);



        }
    );

}








/*
--------------------------------
購入完了
--------------------------------
*/

function completeBuy(id)
{

    const items =
        getItems();



    const item =
        items.find(
            x =>
            x.id===id
        );



    if(!item)
    {
        return;
    }



    item.stock =
        true;



    item.shopping =
        false;



    updateItem(item);



    render();


}









/*
--------------------------------
件数
--------------------------------
*/

function updateShoppingCount()
{

    const count =
    getItems()
    .filter(
        x =>
        !x.stock
    )
    .length;



    const area =
        document
        .getElementById(
            "shopping-count"
        );



    if(area)
    {

        area.textContent =
        `買い物 ${count}件`;

    }

}
