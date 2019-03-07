let productState  = [];
$(window).on('load',function(){
    // fetching product from ajax via select 2
    $('.product-search').select2({
        ajax : {
            url: "/product-list",
            dataType: "json"
        }
    })
    // select2 change event 

    // render products

    $(document).on('keyup','#quantity',function(){
        let index = $(this).parents('li').attr('data-array-index');
        let currentValue = Number($(this).val())  
        productState[index].quantity = currentValue;
    })

    $('.product-search').on('select2:select',function(e){
        var data = e.params.data;
        var ifExist = productState.filter(function(ps){
            if(ps.id == data.id) {
                return ps
            }
        })
        if(!ifExist.length) {
            productState.push(data);
            renderHtml();
        }
        // $('.product-search').val("").trigger('change');
    })
})



function renderHtml() {
    let html = ``;
    for (let i = 0; i < productState.length; i++) {
        const element = productState[i];
        html+= `
            <li class="list-group-item" data-array-index="${i}">
                <div class="align-items-center">
                    <h2> ${element.name} <span class="badge badge-secondary">${element.brand}</span></h2>
                    <div class="col row mb-3">
                        <button class="col-auto btn-primary btn-xs">-</button>
                        <input type="text" value="${element.quantity ? element.quantity : 0}" class="col" id="quantity">
                        <button class="col-auto btn-primary btn-xs">+</button>
                    </div>
                </div>
            </li>
        `
    }
    
    $('#selectedProduct').html(html);
}