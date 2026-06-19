document.addEventListener(
    "DOMContentLoaded",
    () =>
    {
        setup();

        renderCategories();
    }
);





/*
--------------------------------
初期化
--------------------------------
*/

function setup()
{

    document
    .getElementById(
        "add-category"
    )
    .addEventListener(
        "click",
        addNewCategory
    );

}






/*
--------------------------------
ジャンル追加
--------------------------------
*/

function addNewCategory()
{

    const input =
        document
        .getElementById(
            "new-category"
        );



    const name =
        input.value.trim();



    if(name === "")
    {

        alert(
            "ジャンル名を入力してください"
        );

        return;

    }



    addCategory(name);



    input.value = "";



    renderCategories();

}







/*
--------------------------------
一覧表示
--------------------------------
*/

function renderCategories()
{

    const area =
        document
        .getElementById(
            "category-list"
        );



    area.innerHTML="";



    const categories =
        getCategories();




    if(categories.length === 0)
    {

        area.innerHTML =
        `
        <div class="empty">
        ジャンルなし
        </div>
        `;

        return;

    }





    categories.forEach(
        category =>
        {


            area.innerHTML +=
`
<div class="category-item">


<span>
${category}
</span>



<button

class="category-delete"

onclick="removeCategory('${category}')">

削除

</button>



</div>
`;

        }
    );


}







/*
--------------------------------
削除
--------------------------------
*/

function removeCategory(name)
{

    if(
        !confirm(
            name +
            "を削除しますか？"
        )
    )
    {
        return;
    }



    deleteCategory(name);



    renderCategories();

}
