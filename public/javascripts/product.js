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

    // render cart
    $('.product-search').on('select2:select',function(e){
        var {name,brand,point} = e.params.data;
        $('.product-search').val("").trigger('change');
    })
})

