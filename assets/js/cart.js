$(document).ready(function(){

  var products = $.get('http://portal.batchacademy.com/api/wdfne/amazoon-products', function(products){

    console.log(products);


      var updateView = function(){
      // 1: Hide/show the .empty h3 tags based on the total products in the cart or the saved for later section
      var productsInCart = $('.cart .product');
      var productsSaved = $('.saved .product');

      if(productsInCart.length === 0){
        // Empty cart
        $('.cart .empty').show();
        $('.cart-total').hide();
      } else {
        // Products in cart
        $('.cart .empty').hide();
        $('.cart-total').show();
      }

      if(productsSaved.length === 0){
        // No products saved
        $('.saved .empty').show();
      } else {
        // Products saved
        $('.saved .empty').hide();
      }

      // 2: Update the cart's total

      var total = 0;
      $(productsInCart).each(function(){
        total += Number($(this).data('price'));
      });

      $('.cart-total span').text('$' + total.toFixed(2));

    };

      var productTemplate = $('template#product').html();
   
      for(var i = 0; i < products.length; i++){
   
        var newProduct = $(productTemplate);
        var manufacturer = $('<span/>').addClass('manufacturer').text(' By ' + products[i].manufacturer);
        var productData = products[i];

        $('h2', newProduct).text(products[i].name).append(manufacturer);
        $('img', newProduct).attr('src',(products[i].imageSrc));
        $('h3', newProduct).text(products[i].description);
        $('.price, .mobile-price', newProduct).text(' $ ' + products[i].price.toFixed(2));
        $(newProduct).data('price',products[i].price);

        $('.cart').append(newProduct);
      }

      updateView();

      $('.move').on('click', function() {

        if($(this).parents().eq(4).hasClass('cart')){
          $(this).parents().eq(3).appendTo('.saved');
          $(this).text('Add to cart');
        } else {
          $(this).parents().eq(3).appendTo('.cart');
          $(this).text('Save for later');
        }

        updateView();
      });
  });

  });
