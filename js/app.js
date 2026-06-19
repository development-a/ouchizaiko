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


<button

class="delete-button"

onclick="event.stopPropagation();removeItem(${item.id})">

×

</button>


</div>

`;
