All right here is all I did for this project! It took me an extra day because it was my first time working with bigcommerce and the documentation was difficult to understand sometimes but all done!

First: created the Special Product and put it into its own category named category-special. I created two files in a custom folder named product-special and category-special to display the new product on the page!

Second:The hover affect:
I put this in responsive-img.html
<div id="product-image-switcher">
    {{#each images}}
        {{#if @index '==' 0}}
            <img style="display: flex" src="{{getImage this}}" />
        {{/if}}
        {{#if @index '==' 1}}
            <img style="display: none" src="{{getImage this}}" />
        {{/if}}
    {{/each}}
</div>
then I added this class method in category.js
toggleImages(images) {
  images.forEach((image, i) => {
      if (image.style.display === 'none') image.style.display = 'flex'
      else if (image.style.display === 'flex') image.style.display = 'none'
  })
}
and then in the onReady method of category.js I added this
$('#product-image-switcher').on('mouseenter', e => {
  const images = document.querySelectorAll('#product-image-switcher > img')
  this.toggleImages(images)
})

$('#product-image-switcher').on('mouseleave', e => {
  const images = document.querySelectorAll('#product-image-switcher > img')
  this.toggleImages(images)
})

I added some styling as well to stop the images from repeating in theme.scss

Next for the add to cart and remove cart button:
styling in theme.scss: 
//add to cart style
.add-to-cart-button {
    position: flex;
    float: right;
    padding: 10px 20px;
    font-size: 1rem;
    color: #fff;
    background-color: #e50914;
    font-weight: 600;
    border: none;
    cursor: pointer;
}

.remove-all-cart-bttn {
    display: none;
    position: flex;
    float: right;
    padding: 10px 20px;
    font-size: 1rem;
    color: #fff;
    background-color: blue;
    font-weight: 600;
    border: none;
    cursor: pointer;
}

in category.html:
 <!--Add and Remove to cart buttons-->
  <button class="add-to-cart-button" id="add-all-to-cart">Add all to cart</button>
  <button class="remove-all-cart-bttn" id="remove-all-from-cart">Remove All Items</button>
  
  
in category.js for function:

addAllToCart() {
        // Do not do AJAX if browser doesn't support FormData
        if (window.FormData === undefined) {
            return;
        }

        // modal
        this.$overlay.show()
      
        
        /**
         * Find all the products on the page
         */
        const products = []
        document.querySelectorAll('[data-product-id]').forEach(product => products.push(product.dataset.productId))
      
        /**
         * Create the form date of all the products
         */
        const lineItems = products.map(product => ({
            quantity: 1,
            productId: product
        }))
      
        for (const lineItem of lineItems) {
            const formData = new FormData()
            formData.append('action', 'add')
            formData.append('product_id', lineItem.productId)
            formData.append('quantity[]', 1)
      
            utils.api.cart.itemAdd(formData, (err, response) => {

                const errorMessage = err || response.data.error

                if (errorMessage) console.error(errorMessage)
                
                this.$overlay.hide()
            
                if (this.previewModal) {
                    this.previewModal.open()
                    this.updateCartContent(this.previewModal, response.data.cart_item.id)
                }
    
            })
        }
        
    }
      
      //remove all from cart function
     
      removeAllFromCart() {
        utils.api.cart.getCartSummary({} , (err, response) => {
            if (err) console.error(err)
            
            const { id } = response
      
            fetch(`/api/storefront/carts/${id}`, {
                method: 'DELETE'
            }).then(async res => {
                console.log(res)
            })
        })
      }
      
      and on the OnReady() function lower down the page
       /* add to cart button */
         
        $('#add-all-to-cart').on('click', () => {
         this.addAllToCart()
         })


         // remove from cart
        $('#remove-all-from-cart').on('click', () => {
          this.removeAllFromCart()
          
         })
    }

So then i wanted the user to know their item was added to cart so I made it so instead of an alert it pulls up the Modal that is in the product page when you buy an item

i had to add this to category.html to get the modal to show on the page 

<!--modal feature-->
  <div id="previewModal" class="modal modal--large" data-reveal>
    {{> components/common/modal/modal-close-btn }}
    <div class="modal-content"></div>
    <div class="loadingOverlay"></div>
  </div>

add this snippet to addAlltoCart:
 this.$overlay.hide()
            
                if (this.previewModal) {
                    this.previewModal.open()
                    this.updateCartContent(this.previewModal, response.data.cart_item.id)
                }
I had to import two functions also

getCartContent(cartItemId, onComplete) {
        const options = {
            template: 'cart/preview',
            params: {
                suggest: cartItemId,
            },
            config: {
                cart: {
                    suggestions: {
                        limit: 4,
                    },
                },
            },
        };

        utils.api.cart.getContent(options, onComplete);
    }

    updateCartContent(modal, cartItemId, onComplete) {
        this.getCartContent(cartItemId, (err, response) => {
            if (err) {
                return;
            }

            modal.updateContent(response);

            // Update cart counter
            const $body = $('body');
            const $cartQuantity = $('[data-cart-quantity]', modal.$content);
            const $cartCounter = $('.navUser-action .cart-count');
            const quantity = $cartQuantity.data('cartQuantity') || 0;
            const $promotionBanner = $('[data-promotion-banner]');
            const $backToShopppingBtn = $('.previewCartCheckout > [data-reveal-close]');
            const $modalCloseBtn = $('#previewModal > .modal-close');
            const bannerUpdateHandler = () => {
                const $productContainer = $('#main-content > .container');

                $productContainer.append('<div class="loadingOverlay pdp-update"></div>');
                $('.loadingOverlay.pdp-update', $productContainer).show();
                window.location.reload();
            };

            $cartCounter.addClass('cart-count--positive');
            $body.trigger('cart-quantity-update', quantity);

            if (onComplete) {
                onComplete(response);
            }

            if ($promotionBanner.length && $backToShopppingBtn.length) {
                $backToShopppingBtn.on('click', bannerUpdateHandler);
                $modalCloseBtn.on('click', bannerUpdateHandler);
            }
        });
    }
    
Finally to hide and show the Remove Cart button i added a script tag underneath the buttons in category.html

 <!-- Hides and shows remove button on click -->
  <script>
    const atc = document.getElementById('add-all-to-cart')
    const remove = document.getElementById('remove-all-from-cart')
    atc.addEventListener('click', () => {
      remove.style.display = 'flex'
    })

    
  And that's all! It was a little difficult at first but after re-reading the documentation and hard work I completed the tasks! 
