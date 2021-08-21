import utils, { hooks } from '@bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import compareProducts from './global/compare-products';
import FacetedSearch from './common/faceted-search';
import { createTranslationDictionary } from '../theme/common/utils/translations-utils';
import modalFactory from './global/modal';

export default class Category extends CatalogPage {
    constructor(context) {
        super(context);
        this.validationDictionary = createTranslationDictionary(context);
        //for add to cart modal
        this.$overlay = $('[data-cart-item-add] .loadingOverlay');
        this.previewModal = modalFactory('#previewModal')[0]
    }


        toggleImages(images) {
            images.forEach((image, i) => {
                if (image.style.display === 'none') image.style.display = 'flex'
                else if (image.style.display === 'flex') image.style.display = 'none'
            })
        }
    


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

   
    
    //image hover
    toggleImages(images) {
        images.forEach((image, i) => {
            if (image.style.display === 'none') image.style.display = 'flex'
            else if (image.style.display === 'flex') image.style.display = 'none'
        })
    }



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


    setLiveRegionAttributes($element, roleType, ariaLiveStatus) {
        $element.attr({
            role: roleType,
            'aria-live': ariaLiveStatus,
        });
    }

    makeShopByPriceFilterAccessible() {
        if (!$('[data-shop-by-price]').length) return;

        if ($('.navList-action').hasClass('is-active')) {
            $('a.navList-action.is-active').focus();
        }

        $('a.navList-action').on('click', () => this.setLiveRegionAttributes($('span.price-filter-message'), 'status', 'assertive'));
    }

    onReady() {
        this.arrangeFocusOnSortBy();

        $('[data-button-type="add-cart"]').on('click', (e) => this.setLiveRegionAttributes($(e.currentTarget).next(), 'status', 'polite'));

        this.makeShopByPriceFilterAccessible();

        compareProducts(this.context);

        if ($('#facetedSearch').length > 0) {
            this.initFacetedSearch();
        } else {
            this.onSortBySubmit = this.onSortBySubmit.bind(this);
            hooks.on('sortBy-submitted', this.onSortBySubmit);
        }

        $('a.reset-btn').on('click', () => this.setLiveRegionsAttributes($('span.reset-message'), 'status', 'polite'));

        this.ariaNotifyNoProducts();
        //hover feature
        $('#product-image-switcher').on('mouseenter', e => {
            const images = document.querySelectorAll('#product-image-switcher > img')
            this.toggleImages(images)
          })
          
          $('#product-image-switcher').on('mouseleave', e => {
            const images = document.querySelectorAll('#product-image-switcher > img')
            this.toggleImages(images)
          })


          /* add to cart button */
         
        $('#add-all-to-cart').on('click', () => {
         this.addAllToCart()
         })


         // remove from cart
        $('#remove-all-from-cart').on('click', () => {
          this.removeAllFromCart()
          
         })
    }

    ariaNotifyNoProducts() {
        const $noProductsMessage = $('[data-no-products-notification]');
        if ($noProductsMessage.length) {
            $noProductsMessage.focus();
        }
    }

    initFacetedSearch() {
        const {
            price_min_evaluation: onMinPriceError,
            price_max_evaluation: onMaxPriceError,
            price_min_not_entered: minPriceNotEntered,
            price_max_not_entered: maxPriceNotEntered,
            price_invalid_value: onInvalidPrice,
        } = this.validationDictionary;
        const $productListingContainer = $('#product-listing-container');
        const $facetedSearchContainer = $('#faceted-search-container');
        const productsPerPage = this.context.categoryProductsPerPage;
        const requestOptions = {
            config: {
                category: {
                    shop_by_price: true,
                    products: {
                        limit: productsPerPage,
                    },
                },
            },
            template: {
                productListing: 'category/product-listing',
                sidebar: 'category/sidebar',
            },
            showMore: 'category/show-more',
        };
    
        this.facetedSearch = new FacetedSearch(requestOptions, (content) => {
            $productListingContainer.html(content.productListing);
            $facetedSearchContainer.html(content.sidebar);

            $('body').triggerHandler('compareReset');

            $('html, body').animate({
                scrollTop: 0,
            }, 100);
        }, {
            validationErrorMessages: {
                onMinPriceError,
                onMaxPriceError,
                minPriceNotEntered,
                maxPriceNotEntered,
                onInvalidPrice,
            },
        });
    }
}

