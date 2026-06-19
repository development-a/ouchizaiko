// 削除ボタン

card
.querySelector(".delete-button")
.onclick =
e =>
{

e.stopPropagation();



const result =
confirm(
`「${item.name}」を削除しますか？`
);



if(result)
{

deleteItem(item.id);


render();


}

};
