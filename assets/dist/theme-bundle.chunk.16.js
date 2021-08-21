(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[16],{

/***/ "./assets/js/theme/category.js":
/*!*************************************!*\
  !*** ./assets/js/theme/category.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Category; });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalog */ "./assets/js/theme/catalog.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");
/* harmony import */ var _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/faceted-search */ "./assets/js/theme/common/faceted-search.js");
/* harmony import */ var _theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../theme/common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var Category = /*#__PURE__*/function (_CatalogPage) {
  _inheritsLoose(Category, _CatalogPage);

  function Category(context) {
    var _this;

    _this = _CatalogPage.call(this, context) || this;
    _this.validationDictionary = Object(_theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__["createTranslationDictionary"])(context); //for add to cart modal

    _this.$overlay = $('[data-cart-item-add] .loadingOverlay');
    _this.previewModal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_5__["default"])('#previewModal')[0];
    return _this;
  }

  var _proto = Category.prototype;

  _proto.toggleImages = function toggleImages(images) {
    images.forEach(function (image, i) {
      if (image.style.display === 'none') image.style.display = 'flex';else if (image.style.display === 'flex') image.style.display = 'none';
    });
  };

  _proto.getCartContent = function getCartContent(cartItemId, onComplete) {
    var options = {
      template: 'cart/preview',
      params: {
        suggest: cartItemId
      },
      config: {
        cart: {
          suggestions: {
            limit: 4
          }
        }
      }
    };
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.cart.getContent(options, onComplete);
  };

  _proto.updateCartContent = function updateCartContent(modal, cartItemId, onComplete) {
    this.getCartContent(cartItemId, function (err, response) {
      if (err) {
        return;
      }

      modal.updateContent(response); // Update cart counter

      var $body = $('body');
      var $cartQuantity = $('[data-cart-quantity]', modal.$content);
      var $cartCounter = $('.navUser-action .cart-count');
      var quantity = $cartQuantity.data('cartQuantity') || 0;
      var $promotionBanner = $('[data-promotion-banner]');
      var $backToShopppingBtn = $('.previewCartCheckout > [data-reveal-close]');
      var $modalCloseBtn = $('#previewModal > .modal-close');

      var bannerUpdateHandler = function bannerUpdateHandler() {
        var $productContainer = $('#main-content > .container');
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
  } //image hover
  ;

  _proto.toggleImages = function toggleImages(images) {
    images.forEach(function (image, i) {
      if (image.style.display === 'none') image.style.display = 'flex';else if (image.style.display === 'flex') image.style.display = 'none';
    });
  };

  _proto.addAllToCart = function addAllToCart() {
    var _this2 = this;

    // Do not do AJAX if browser doesn't support FormData
    if (window.FormData === undefined) {
      return;
    } // modal


    this.$overlay.show();
    /**
     * Find all the products on the page
     */

    var products = [];
    document.querySelectorAll('[data-product-id]').forEach(function (product) {
      return products.push(product.dataset.productId);
    });
    /**
     * Create the form date of all the products
     */

    var lineItems = products.map(function (product) {
      return {
        quantity: 1,
        productId: product
      };
    });

    for (var _iterator = _createForOfIteratorHelperLoose(lineItems), _step; !(_step = _iterator()).done;) {
      var lineItem = _step.value;
      var formData = new FormData();
      formData.append('action', 'add');
      formData.append('product_id', lineItem.productId);
      formData.append('quantity[]', 1);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.cart.itemAdd(formData, function (err, response) {
        var errorMessage = err || response.data.error;
        if (errorMessage) console.error(errorMessage);

        _this2.$overlay.hide();

        if (_this2.previewModal) {
          _this2.previewModal.open();

          _this2.updateCartContent(_this2.previewModal, response.data.cart_item.id);
        }
      });
    }
  } //remove all from cart function
  ;

  _proto.removeAllFromCart = function removeAllFromCart() {
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.cart.getCartSummary({}, function (err, response) {
      if (err) console.error(err);
      var id = response.id;
      fetch("/api/storefront/carts/" + id, {
        method: 'DELETE'
      }).then( /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(res) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  console.log(res);

                case 1:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    });
  };

  _proto.setLiveRegionAttributes = function setLiveRegionAttributes($element, roleType, ariaLiveStatus) {
    $element.attr({
      role: roleType,
      'aria-live': ariaLiveStatus
    });
  };

  _proto.makeShopByPriceFilterAccessible = function makeShopByPriceFilterAccessible() {
    var _this3 = this;

    if (!$('[data-shop-by-price]').length) return;

    if ($('.navList-action').hasClass('is-active')) {
      $('a.navList-action.is-active').focus();
    }

    $('a.navList-action').on('click', function () {
      return _this3.setLiveRegionAttributes($('span.price-filter-message'), 'status', 'assertive');
    });
  };

  _proto.onReady = function onReady() {
    var _this4 = this;

    this.arrangeFocusOnSortBy();
    $('[data-button-type="add-cart"]').on('click', function (e) {
      return _this4.setLiveRegionAttributes($(e.currentTarget).next(), 'status', 'polite');
    });
    this.makeShopByPriceFilterAccessible();
    Object(_global_compare_products__WEBPACK_IMPORTED_MODULE_2__["default"])(this.context);

    if ($('#facetedSearch').length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["hooks"].on('sortBy-submitted', this.onSortBySubmit);
    }

    $('a.reset-btn').on('click', function () {
      return _this4.setLiveRegionsAttributes($('span.reset-message'), 'status', 'polite');
    });
    this.ariaNotifyNoProducts(); //hover feature

    $('#product-image-switcher').on('mouseenter', function (e) {
      var images = document.querySelectorAll('#product-image-switcher > img');

      _this4.toggleImages(images);
    });
    $('#product-image-switcher').on('mouseleave', function (e) {
      var images = document.querySelectorAll('#product-image-switcher > img');

      _this4.toggleImages(images);
    });
    /* add to cart button */

    $('#add-all-to-cart').on('click', function () {
      _this4.addAllToCart();
    }); // remove from cart

    $('#remove-all-from-cart').on('click', function () {
      _this4.removeAllFromCart();
    });
  };

  _proto.ariaNotifyNoProducts = function ariaNotifyNoProducts() {
    var $noProductsMessage = $('[data-no-products-notification]');

    if ($noProductsMessage.length) {
      $noProductsMessage.focus();
    }
  };

  _proto.initFacetedSearch = function initFacetedSearch() {
    var _this$validationDicti = this.validationDictionary,
        onMinPriceError = _this$validationDicti.price_min_evaluation,
        onMaxPriceError = _this$validationDicti.price_max_evaluation,
        minPriceNotEntered = _this$validationDicti.price_min_not_entered,
        maxPriceNotEntered = _this$validationDicti.price_max_not_entered,
        onInvalidPrice = _this$validationDicti.price_invalid_value;
    var $productListingContainer = $('#product-listing-container');
    var $facetedSearchContainer = $('#faceted-search-container');
    var productsPerPage = this.context.categoryProductsPerPage;
    var requestOptions = {
      config: {
        category: {
          shop_by_price: true,
          products: {
            limit: productsPerPage
          }
        }
      },
      template: {
        productListing: 'category/product-listing',
        sidebar: 'category/sidebar'
      },
      showMore: 'category/show-more'
    };
    this.facetedSearch = new _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__["default"](requestOptions, function (content) {
      $productListingContainer.html(content.productListing);
      $facetedSearchContainer.html(content.sidebar);
      $('body').triggerHandler('compareReset');
      $('html, body').animate({
        scrollTop: 0
      }, 100);
    }, {
      validationErrorMessages: {
        onMinPriceError: onMinPriceError,
        onMaxPriceError: onMaxPriceError,
        minPriceNotEntered: minPriceNotEntered,
        maxPriceNotEntered: maxPriceNotEntered,
        onInvalidPrice: onInvalidPrice
      }
    });
  };

  return Category;
}(_catalog__WEBPACK_IMPORTED_MODULE_1__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/utils/translations-utils.js":
/*!************************************************************!*\
  !*** ./assets/js/theme/common/utils/translations-utils.js ***!
  \************************************************************/
/*! exports provided: createTranslationDictionary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTranslationDictionary", function() { return createTranslationDictionary; });
var TRANSLATIONS = 'translations';

var isTranslationDictionaryNotEmpty = function isTranslationDictionaryNotEmpty(dictionary) {
  return !!Object.keys(dictionary[TRANSLATIONS]).length;
};

var chooseActiveDictionary = function chooseActiveDictionary() {
  for (var i = 0; i < arguments.length; i++) {
    var dictionary = JSON.parse(i < 0 || arguments.length <= i ? undefined : arguments[i]);

    if (isTranslationDictionaryNotEmpty(dictionary)) {
      return dictionary;
    }
  }
};
/**
 * defines Translation Dictionary to use
 * @param context provides access to 3 validation JSONs from en.json:
 * validation_messages, validation_fallback_messages and default_messages
 * @returns {Object}
 */


var createTranslationDictionary = function createTranslationDictionary(context) {
  var validationDictionaryJSON = context.validationDictionaryJSON,
      validationFallbackDictionaryJSON = context.validationFallbackDictionaryJSON,
      validationDefaultDictionaryJSON = context.validationDefaultDictionaryJSON;
  var activeDictionary = chooseActiveDictionary(validationDictionaryJSON, validationFallbackDictionaryJSON, validationDefaultDictionaryJSON);
  var localizations = Object.values(activeDictionary[TRANSLATIONS]);
  var translationKeys = Object.keys(activeDictionary[TRANSLATIONS]).map(function (key) {
    return key.split('.').pop();
  });
  return translationKeys.reduce(function (acc, key, i) {
    acc[key] = localizations[i];
    return acc;
  }, {});
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMuanMiXSwibmFtZXMiOlsiQ2F0ZWdvcnkiLCJjb250ZXh0IiwidmFsaWRhdGlvbkRpY3Rpb25hcnkiLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCIkb3ZlcmxheSIsIiQiLCJwcmV2aWV3TW9kYWwiLCJtb2RhbEZhY3RvcnkiLCJ0b2dnbGVJbWFnZXMiLCJpbWFnZXMiLCJmb3JFYWNoIiwiaW1hZ2UiLCJpIiwic3R5bGUiLCJkaXNwbGF5IiwiZ2V0Q2FydENvbnRlbnQiLCJjYXJ0SXRlbUlkIiwib25Db21wbGV0ZSIsIm9wdGlvbnMiLCJ0ZW1wbGF0ZSIsInBhcmFtcyIsInN1Z2dlc3QiLCJjb25maWciLCJjYXJ0Iiwic3VnZ2VzdGlvbnMiLCJsaW1pdCIsInV0aWxzIiwiYXBpIiwiZ2V0Q29udGVudCIsInVwZGF0ZUNhcnRDb250ZW50IiwibW9kYWwiLCJlcnIiLCJyZXNwb25zZSIsInVwZGF0ZUNvbnRlbnQiLCIkYm9keSIsIiRjYXJ0UXVhbnRpdHkiLCIkY29udGVudCIsIiRjYXJ0Q291bnRlciIsInF1YW50aXR5IiwiZGF0YSIsIiRwcm9tb3Rpb25CYW5uZXIiLCIkYmFja1RvU2hvcHBwaW5nQnRuIiwiJG1vZGFsQ2xvc2VCdG4iLCJiYW5uZXJVcGRhdGVIYW5kbGVyIiwiJHByb2R1Y3RDb250YWluZXIiLCJhcHBlbmQiLCJzaG93Iiwid2luZG93IiwibG9jYXRpb24iLCJyZWxvYWQiLCJhZGRDbGFzcyIsInRyaWdnZXIiLCJsZW5ndGgiLCJvbiIsImFkZEFsbFRvQ2FydCIsIkZvcm1EYXRhIiwidW5kZWZpbmVkIiwicHJvZHVjdHMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwcm9kdWN0IiwicHVzaCIsImRhdGFzZXQiLCJwcm9kdWN0SWQiLCJsaW5lSXRlbXMiLCJtYXAiLCJsaW5lSXRlbSIsImZvcm1EYXRhIiwiaXRlbUFkZCIsImVycm9yTWVzc2FnZSIsImVycm9yIiwiY29uc29sZSIsImhpZGUiLCJvcGVuIiwiY2FydF9pdGVtIiwiaWQiLCJyZW1vdmVBbGxGcm9tQ2FydCIsImdldENhcnRTdW1tYXJ5IiwiZmV0Y2giLCJtZXRob2QiLCJ0aGVuIiwicmVzIiwibG9nIiwic2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMiLCIkZWxlbWVudCIsInJvbGVUeXBlIiwiYXJpYUxpdmVTdGF0dXMiLCJhdHRyIiwicm9sZSIsIm1ha2VTaG9wQnlQcmljZUZpbHRlckFjY2Vzc2libGUiLCJoYXNDbGFzcyIsImZvY3VzIiwib25SZWFkeSIsImFycmFuZ2VGb2N1c09uU29ydEJ5IiwiZSIsImN1cnJlbnRUYXJnZXQiLCJuZXh0IiwiY29tcGFyZVByb2R1Y3RzIiwiaW5pdEZhY2V0ZWRTZWFyY2giLCJvblNvcnRCeVN1Ym1pdCIsImJpbmQiLCJob29rcyIsInNldExpdmVSZWdpb25zQXR0cmlidXRlcyIsImFyaWFOb3RpZnlOb1Byb2R1Y3RzIiwiJG5vUHJvZHVjdHNNZXNzYWdlIiwib25NaW5QcmljZUVycm9yIiwicHJpY2VfbWluX2V2YWx1YXRpb24iLCJvbk1heFByaWNlRXJyb3IiLCJwcmljZV9tYXhfZXZhbHVhdGlvbiIsIm1pblByaWNlTm90RW50ZXJlZCIsInByaWNlX21pbl9ub3RfZW50ZXJlZCIsIm1heFByaWNlTm90RW50ZXJlZCIsInByaWNlX21heF9ub3RfZW50ZXJlZCIsIm9uSW52YWxpZFByaWNlIiwicHJpY2VfaW52YWxpZF92YWx1ZSIsIiRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciIsIiRmYWNldGVkU2VhcmNoQ29udGFpbmVyIiwicHJvZHVjdHNQZXJQYWdlIiwiY2F0ZWdvcnlQcm9kdWN0c1BlclBhZ2UiLCJyZXF1ZXN0T3B0aW9ucyIsImNhdGVnb3J5Iiwic2hvcF9ieV9wcmljZSIsInByb2R1Y3RMaXN0aW5nIiwic2lkZWJhciIsInNob3dNb3JlIiwiZmFjZXRlZFNlYXJjaCIsIkZhY2V0ZWRTZWFyY2giLCJjb250ZW50IiwiaHRtbCIsInRyaWdnZXJIYW5kbGVyIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsInZhbGlkYXRpb25FcnJvck1lc3NhZ2VzIiwiQ2F0YWxvZ1BhZ2UiLCJUUkFOU0xBVElPTlMiLCJpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5IiwiZGljdGlvbmFyeSIsIk9iamVjdCIsImtleXMiLCJjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5IiwiSlNPTiIsInBhcnNlIiwidmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIiwiYWN0aXZlRGljdGlvbmFyeSIsImxvY2FsaXphdGlvbnMiLCJ2YWx1ZXMiLCJ0cmFuc2xhdGlvbktleXMiLCJrZXkiLCJzcGxpdCIsInBvcCIsInJlZHVjZSIsImFjYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRXFCQSxROzs7QUFDakIsb0JBQVlDLE9BQVosRUFBcUI7QUFBQTs7QUFDakIsb0NBQU1BLE9BQU47QUFDQSxVQUFLQyxvQkFBTCxHQUE0QkMsMEdBQTJCLENBQUNGLE9BQUQsQ0FBdkQsQ0FGaUIsQ0FHakI7O0FBQ0EsVUFBS0csUUFBTCxHQUFnQkMsQ0FBQyxDQUFDLHNDQUFELENBQWpCO0FBQ0EsVUFBS0MsWUFBTCxHQUFvQkMsNkRBQVksQ0FBQyxlQUFELENBQVosQ0FBOEIsQ0FBOUIsQ0FBcEI7QUFMaUI7QUFNcEI7Ozs7U0FHR0MsWSxHQUFBLHNCQUFhQyxNQUFiLEVBQXFCO0FBQ2pCQSxVQUFNLENBQUNDLE9BQVAsQ0FBZSxVQUFDQyxLQUFELEVBQVFDLENBQVIsRUFBYztBQUN6QixVQUFJRCxLQUFLLENBQUNFLEtBQU4sQ0FBWUMsT0FBWixLQUF3QixN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Z0NBQWxDLEdBQXdHOUksT0FBeEcsQ0FBa0M4SSxnQ0FBbEM7QUFBQSxNQUFvRUMsK0JBQXBFLEdBQXdHL0ksT0FBeEcsQ0FBb0UrSSwrQkFBcEU7QUFDQSxNQUFNQyxnQkFBZ0IsR0FBR04sc0JBQXNCLENBQUNHLHdCQUFELEVBQTJCQyxnQ0FBM0IsRUFBNkRDLCtCQUE3RCxDQUEvQztBQUNBLE1BQU1FLGFBQWEsR0FBR1QsTUFBTSxDQUFDVSxNQUFQLENBQWNGLGdCQUFnQixDQUFDWCxZQUFELENBQTlCLENBQXRCO0FBQ0EsTUFBTWMsZUFBZSxHQUFHWCxNQUFNLENBQUNDLElBQVAsQ0FBWU8sZ0JBQWdCLENBQUNYLFlBQUQsQ0FBNUIsRUFBNENyRSxHQUE1QyxDQUFnRCxVQUFBb0YsR0FBRztBQUFBLFdBQUlBLEdBQUcsQ0FBQ0MsS0FBSixDQUFVLEdBQVYsRUFBZUMsR0FBZixFQUFKO0FBQUEsR0FBbkQsQ0FBeEI7QUFFQSxTQUFPSCxlQUFlLENBQUNJLE1BQWhCLENBQXVCLFVBQUNDLEdBQUQsRUFBTUosR0FBTixFQUFXekksQ0FBWCxFQUFpQjtBQUMzQzZJLE9BQUcsQ0FBQ0osR0FBRCxDQUFILEdBQVdILGFBQWEsQ0FBQ3RJLENBQUQsQ0FBeEI7QUFDQSxXQUFPNkksR0FBUDtBQUNILEdBSE0sRUFHSixFQUhJLENBQVA7QUFJSCxDQVZNLEMiLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLjE2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHV0aWxzLCB7IGhvb2tzIH0gZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IENhdGFsb2dQYWdlIGZyb20gJy4vY2F0YWxvZyc7XG5pbXBvcnQgY29tcGFyZVByb2R1Y3RzIGZyb20gJy4vZ2xvYmFsL2NvbXBhcmUtcHJvZHVjdHMnO1xuaW1wb3J0IEZhY2V0ZWRTZWFyY2ggZnJvbSAnLi9jb21tb24vZmFjZXRlZC1zZWFyY2gnO1xuaW1wb3J0IHsgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IH0gZnJvbSAnLi4vdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscyc7XG5pbXBvcnQgbW9kYWxGYWN0b3J5IGZyb20gJy4vZ2xvYmFsL21vZGFsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0ZWdvcnkgZXh0ZW5kcyBDYXRhbG9nUGFnZSB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICBzdXBlcihjb250ZXh0KTtcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeSA9IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeShjb250ZXh0KTtcbiAgICAgICAgLy9mb3IgYWRkIHRvIGNhcnQgbW9kYWxcbiAgICAgICAgdGhpcy4kb3ZlcmxheSA9ICQoJ1tkYXRhLWNhcnQtaXRlbS1hZGRdIC5sb2FkaW5nT3ZlcmxheScpO1xuICAgICAgICB0aGlzLnByZXZpZXdNb2RhbCA9IG1vZGFsRmFjdG9yeSgnI3ByZXZpZXdNb2RhbCcpWzBdXG4gICAgfVxuXG5cbiAgICAgICAgdG9nZ2xlSW1hZ2VzKGltYWdlcykge1xuICAgICAgICAgICAgaW1hZ2VzLmZvckVhY2goKGltYWdlLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGltYWdlLnN0eWxlLmRpc3BsYXkgPT09ICdub25lJykgaW1hZ2Uuc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGltYWdlLnN0eWxlLmRpc3BsYXkgPT09ICdmbGV4JykgaW1hZ2Uuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIFxuXG5cbiAgICBnZXRDYXJ0Q29udGVudChjYXJ0SXRlbUlkLCBvbkNvbXBsZXRlKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2NhcnQvcHJldmlldycsXG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgICBzdWdnZXN0OiBjYXJ0SXRlbUlkLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgICAgIGNhcnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbWl0OiA0LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIHV0aWxzLmFwaS5jYXJ0LmdldENvbnRlbnQob3B0aW9ucywgb25Db21wbGV0ZSk7XG4gICAgfVxuXG4gICAgdXBkYXRlQ2FydENvbnRlbnQobW9kYWwsIGNhcnRJdGVtSWQsIG9uQ29tcGxldGUpIHtcbiAgICAgICAgdGhpcy5nZXRDYXJ0Q29udGVudChjYXJ0SXRlbUlkLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbW9kYWwudXBkYXRlQ29udGVudChyZXNwb25zZSk7XG5cbiAgICAgICAgICAgIC8vIFVwZGF0ZSBjYXJ0IGNvdW50ZXJcbiAgICAgICAgICAgIGNvbnN0ICRib2R5ID0gJCgnYm9keScpO1xuICAgICAgICAgICAgY29uc3QgJGNhcnRRdWFudGl0eSA9ICQoJ1tkYXRhLWNhcnQtcXVhbnRpdHldJywgbW9kYWwuJGNvbnRlbnQpO1xuICAgICAgICAgICAgY29uc3QgJGNhcnRDb3VudGVyID0gJCgnLm5hdlVzZXItYWN0aW9uIC5jYXJ0LWNvdW50Jyk7XG4gICAgICAgICAgICBjb25zdCBxdWFudGl0eSA9ICRjYXJ0UXVhbnRpdHkuZGF0YSgnY2FydFF1YW50aXR5JykgfHwgMDtcbiAgICAgICAgICAgIGNvbnN0ICRwcm9tb3Rpb25CYW5uZXIgPSAkKCdbZGF0YS1wcm9tb3Rpb24tYmFubmVyXScpO1xuICAgICAgICAgICAgY29uc3QgJGJhY2tUb1Nob3BwcGluZ0J0biA9ICQoJy5wcmV2aWV3Q2FydENoZWNrb3V0ID4gW2RhdGEtcmV2ZWFsLWNsb3NlXScpO1xuICAgICAgICAgICAgY29uc3QgJG1vZGFsQ2xvc2VCdG4gPSAkKCcjcHJldmlld01vZGFsID4gLm1vZGFsLWNsb3NlJyk7XG4gICAgICAgICAgICBjb25zdCBiYW5uZXJVcGRhdGVIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0ICRwcm9kdWN0Q29udGFpbmVyID0gJCgnI21haW4tY29udGVudCA+IC5jb250YWluZXInKTtcblxuICAgICAgICAgICAgICAgICRwcm9kdWN0Q29udGFpbmVyLmFwcGVuZCgnPGRpdiBjbGFzcz1cImxvYWRpbmdPdmVybGF5IHBkcC11cGRhdGVcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAkKCcubG9hZGluZ092ZXJsYXkucGRwLXVwZGF0ZScsICRwcm9kdWN0Q29udGFpbmVyKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJGNhcnRDb3VudGVyLmFkZENsYXNzKCdjYXJ0LWNvdW50LS1wb3NpdGl2ZScpO1xuICAgICAgICAgICAgJGJvZHkudHJpZ2dlcignY2FydC1xdWFudGl0eS11cGRhdGUnLCBxdWFudGl0eSk7XG5cbiAgICAgICAgICAgIGlmIChvbkNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgb25Db21wbGV0ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkcHJvbW90aW9uQmFubmVyLmxlbmd0aCAmJiAkYmFja1RvU2hvcHBwaW5nQnRuLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICRiYWNrVG9TaG9wcHBpbmdCdG4ub24oJ2NsaWNrJywgYmFubmVyVXBkYXRlSGFuZGxlcik7XG4gICAgICAgICAgICAgICAgJG1vZGFsQ2xvc2VCdG4ub24oJ2NsaWNrJywgYmFubmVyVXBkYXRlSGFuZGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgXG4gICAgXG4gICAgLy9pbWFnZSBob3ZlclxuICAgIHRvZ2dsZUltYWdlcyhpbWFnZXMpIHtcbiAgICAgICAgaW1hZ2VzLmZvckVhY2goKGltYWdlLCBpKSA9PiB7XG4gICAgICAgICAgICBpZiAoaW1hZ2Uuc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnKSBpbWFnZS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXG4gICAgICAgICAgICBlbHNlIGlmIChpbWFnZS5zdHlsZS5kaXNwbGF5ID09PSAnZmxleCcpIGltYWdlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgICAgfSlcbiAgICB9XG5cblxuXG4gICAgYWRkQWxsVG9DYXJ0KCkge1xuICAgICAgICAvLyBEbyBub3QgZG8gQUpBWCBpZiBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCBGb3JtRGF0YVxuICAgICAgICBpZiAod2luZG93LkZvcm1EYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1vZGFsXG4gICAgICAgIHRoaXMuJG92ZXJsYXkuc2hvdygpXG4gICAgICBcbiAgICAgICAgXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaW5kIGFsbCB0aGUgcHJvZHVjdHMgb24gdGhlIHBhZ2VcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IHByb2R1Y3RzID0gW11cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcHJvZHVjdC1pZF0nKS5mb3JFYWNoKHByb2R1Y3QgPT4gcHJvZHVjdHMucHVzaChwcm9kdWN0LmRhdGFzZXQucHJvZHVjdElkKSlcbiAgICAgIFxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIHRoZSBmb3JtIGRhdGUgb2YgYWxsIHRoZSBwcm9kdWN0c1xuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgbGluZUl0ZW1zID0gcHJvZHVjdHMubWFwKHByb2R1Y3QgPT4gKHtcbiAgICAgICAgICAgIHF1YW50aXR5OiAxLFxuICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0XG4gICAgICAgIH0pKVxuICAgICAgXG4gICAgICAgIGZvciAoY29uc3QgbGluZUl0ZW0gb2YgbGluZUl0ZW1zKSB7XG4gICAgICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpXG4gICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ2FjdGlvbicsICdhZGQnKVxuICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdwcm9kdWN0X2lkJywgbGluZUl0ZW0ucHJvZHVjdElkKVxuICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdxdWFudGl0eVtdJywgMSlcbiAgICAgIFxuICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuaXRlbUFkZChmb3JtRGF0YSwgKGVyciwgcmVzcG9uc2UpID0+IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGVyciB8fCByZXNwb25zZS5kYXRhLmVycm9yXG5cbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JNZXNzYWdlKSBjb25zb2xlLmVycm9yKGVycm9yTWVzc2FnZSlcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLiRvdmVybGF5LmhpZGUoKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJldmlld01vZGFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlld01vZGFsLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNhcnRDb250ZW50KHRoaXMucHJldmlld01vZGFsLCByZXNwb25zZS5kYXRhLmNhcnRfaXRlbS5pZClcbiAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbiAgICAgIFxuICAgICAgLy9yZW1vdmUgYWxsIGZyb20gY2FydCBmdW5jdGlvblxuICAgICBcbiAgICAgIHJlbW92ZUFsbEZyb21DYXJ0KCkge1xuICAgICAgICB1dGlscy5hcGkuY2FydC5nZXRDYXJ0U3VtbWFyeSh7fSAsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSBjb25zb2xlLmVycm9yKGVycilcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgeyBpZCB9ID0gcmVzcG9uc2VcbiAgICAgIFxuICAgICAgICAgICAgZmV0Y2goYC9hcGkvc3RvcmVmcm9udC9jYXJ0cy8ke2lkfWAsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnXG4gICAgICAgICAgICB9KS50aGVuKGFzeW5jIHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH1cblxuXG4gICAgc2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMoJGVsZW1lbnQsIHJvbGVUeXBlLCBhcmlhTGl2ZVN0YXR1cykge1xuICAgICAgICAkZWxlbWVudC5hdHRyKHtcbiAgICAgICAgICAgIHJvbGU6IHJvbGVUeXBlLFxuICAgICAgICAgICAgJ2FyaWEtbGl2ZSc6IGFyaWFMaXZlU3RhdHVzLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtYWtlU2hvcEJ5UHJpY2VGaWx0ZXJBY2Nlc3NpYmxlKCkge1xuICAgICAgICBpZiAoISQoJ1tkYXRhLXNob3AtYnktcHJpY2VdJykubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKCQoJy5uYXZMaXN0LWFjdGlvbicpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xuICAgICAgICAgICAgJCgnYS5uYXZMaXN0LWFjdGlvbi5pcy1hY3RpdmUnKS5mb2N1cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgJCgnYS5uYXZMaXN0LWFjdGlvbicpLm9uKCdjbGljaycsICgpID0+IHRoaXMuc2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMoJCgnc3Bhbi5wcmljZS1maWx0ZXItbWVzc2FnZScpLCAnc3RhdHVzJywgJ2Fzc2VydGl2ZScpKTtcbiAgICB9XG5cbiAgICBvblJlYWR5KCkge1xuICAgICAgICB0aGlzLmFycmFuZ2VGb2N1c09uU29ydEJ5KCk7XG5cbiAgICAgICAgJCgnW2RhdGEtYnV0dG9uLXR5cGU9XCJhZGQtY2FydFwiXScpLm9uKCdjbGljaycsIChlKSA9PiB0aGlzLnNldExpdmVSZWdpb25BdHRyaWJ1dGVzKCQoZS5jdXJyZW50VGFyZ2V0KS5uZXh0KCksICdzdGF0dXMnLCAncG9saXRlJykpO1xuXG4gICAgICAgIHRoaXMubWFrZVNob3BCeVByaWNlRmlsdGVyQWNjZXNzaWJsZSgpO1xuXG4gICAgICAgIGNvbXBhcmVQcm9kdWN0cyh0aGlzLmNvbnRleHQpO1xuXG4gICAgICAgIGlmICgkKCcjZmFjZXRlZFNlYXJjaCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdEZhY2V0ZWRTZWFyY2goKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub25Tb3J0QnlTdWJtaXQgPSB0aGlzLm9uU29ydEJ5U3VibWl0LmJpbmQodGhpcyk7XG4gICAgICAgICAgICBob29rcy5vbignc29ydEJ5LXN1Ym1pdHRlZCcsIHRoaXMub25Tb3J0QnlTdWJtaXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgJCgnYS5yZXNldC1idG4nKS5vbignY2xpY2snLCAoKSA9PiB0aGlzLnNldExpdmVSZWdpb25zQXR0cmlidXRlcygkKCdzcGFuLnJlc2V0LW1lc3NhZ2UnKSwgJ3N0YXR1cycsICdwb2xpdGUnKSk7XG5cbiAgICAgICAgdGhpcy5hcmlhTm90aWZ5Tm9Qcm9kdWN0cygpO1xuICAgICAgICAvL2hvdmVyIGZlYXR1cmVcbiAgICAgICAgJCgnI3Byb2R1Y3QtaW1hZ2Utc3dpdGNoZXInKS5vbignbW91c2VlbnRlcicsIGUgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3Byb2R1Y3QtaW1hZ2Utc3dpdGNoZXIgPiBpbWcnKVxuICAgICAgICAgICAgdGhpcy50b2dnbGVJbWFnZXMoaW1hZ2VzKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgXG4gICAgICAgICAgJCgnI3Byb2R1Y3QtaW1hZ2Utc3dpdGNoZXInKS5vbignbW91c2VsZWF2ZScsIGUgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3Byb2R1Y3QtaW1hZ2Utc3dpdGNoZXIgPiBpbWcnKVxuICAgICAgICAgICAgdGhpcy50b2dnbGVJbWFnZXMoaW1hZ2VzKVxuICAgICAgICAgIH0pXG5cblxuICAgICAgICAgIC8qIGFkZCB0byBjYXJ0IGJ1dHRvbiAqL1xuICAgICAgICAgXG4gICAgICAgICQoJyNhZGQtYWxsLXRvLWNhcnQnKS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICB0aGlzLmFkZEFsbFRvQ2FydCgpXG4gICAgICAgICB9KVxuXG5cbiAgICAgICAgIC8vIHJlbW92ZSBmcm9tIGNhcnRcbiAgICAgICAgJCgnI3JlbW92ZS1hbGwtZnJvbS1jYXJ0Jykub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgIHRoaXMucmVtb3ZlQWxsRnJvbUNhcnQoKVxuICAgICAgICAgIFxuICAgICAgICAgfSlcbiAgICB9XG5cbiAgICBhcmlhTm90aWZ5Tm9Qcm9kdWN0cygpIHtcbiAgICAgICAgY29uc3QgJG5vUHJvZHVjdHNNZXNzYWdlID0gJCgnW2RhdGEtbm8tcHJvZHVjdHMtbm90aWZpY2F0aW9uXScpO1xuICAgICAgICBpZiAoJG5vUHJvZHVjdHNNZXNzYWdlLmxlbmd0aCkge1xuICAgICAgICAgICAgJG5vUHJvZHVjdHNNZXNzYWdlLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0RmFjZXRlZFNlYXJjaCgpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgcHJpY2VfbWluX2V2YWx1YXRpb246IG9uTWluUHJpY2VFcnJvcixcbiAgICAgICAgICAgIHByaWNlX21heF9ldmFsdWF0aW9uOiBvbk1heFByaWNlRXJyb3IsXG4gICAgICAgICAgICBwcmljZV9taW5fbm90X2VudGVyZWQ6IG1pblByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICAgIHByaWNlX21heF9ub3RfZW50ZXJlZDogbWF4UHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgICAgcHJpY2VfaW52YWxpZF92YWx1ZTogb25JbnZhbGlkUHJpY2UsXG4gICAgICAgIH0gPSB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5O1xuICAgICAgICBjb25zdCAkcHJvZHVjdExpc3RpbmdDb250YWluZXIgPSAkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lcicpO1xuICAgICAgICBjb25zdCAkZmFjZXRlZFNlYXJjaENvbnRhaW5lciA9ICQoJyNmYWNldGVkLXNlYXJjaC1jb250YWluZXInKTtcbiAgICAgICAgY29uc3QgcHJvZHVjdHNQZXJQYWdlID0gdGhpcy5jb250ZXh0LmNhdGVnb3J5UHJvZHVjdHNQZXJQYWdlO1xuICAgICAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3BfYnlfcHJpY2U6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW1pdDogcHJvZHVjdHNQZXJQYWdlLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0TGlzdGluZzogJ2NhdGVnb3J5L3Byb2R1Y3QtbGlzdGluZycsXG4gICAgICAgICAgICAgICAgc2lkZWJhcjogJ2NhdGVnb3J5L3NpZGViYXInLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNob3dNb3JlOiAnY2F0ZWdvcnkvc2hvdy1tb3JlJyxcbiAgICAgICAgfTtcbiAgICBcbiAgICAgICAgdGhpcy5mYWNldGVkU2VhcmNoID0gbmV3IEZhY2V0ZWRTZWFyY2gocmVxdWVzdE9wdGlvbnMsIChjb250ZW50KSA9PiB7XG4gICAgICAgICAgICAkcHJvZHVjdExpc3RpbmdDb250YWluZXIuaHRtbChjb250ZW50LnByb2R1Y3RMaXN0aW5nKTtcbiAgICAgICAgICAgICRmYWNldGVkU2VhcmNoQ29udGFpbmVyLmh0bWwoY29udGVudC5zaWRlYmFyKTtcblxuICAgICAgICAgICAgJCgnYm9keScpLnRyaWdnZXJIYW5kbGVyKCdjb21wYXJlUmVzZXQnKTtcblxuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMCxcbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb25FcnJvck1lc3NhZ2VzOiB7XG4gICAgICAgICAgICAgICAgb25NaW5QcmljZUVycm9yLFxuICAgICAgICAgICAgICAgIG9uTWF4UHJpY2VFcnJvcixcbiAgICAgICAgICAgICAgICBtaW5QcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgICAgICAgbWF4UHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgICAgICAgIG9uSW52YWxpZFByaWNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4iLCJjb25zdCBUUkFOU0xBVElPTlMgPSAndHJhbnNsYXRpb25zJztcbmNvbnN0IGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkgPSAoZGljdGlvbmFyeSkgPT4gISFPYmplY3Qua2V5cyhkaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLmxlbmd0aDtcbmNvbnN0IGNob29zZUFjdGl2ZURpY3Rpb25hcnkgPSAoLi4uZGljdGlvbmFyeUpzb25MaXN0KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWN0aW9uYXJ5SnNvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZGljdGlvbmFyeSA9IEpTT04ucGFyc2UoZGljdGlvbmFyeUpzb25MaXN0W2ldKTtcbiAgICAgICAgaWYgKGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkoZGljdGlvbmFyeSkpIHtcbiAgICAgICAgICAgIHJldHVybiBkaWN0aW9uYXJ5O1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiBkZWZpbmVzIFRyYW5zbGF0aW9uIERpY3Rpb25hcnkgdG8gdXNlXG4gKiBAcGFyYW0gY29udGV4dCBwcm92aWRlcyBhY2Nlc3MgdG8gMyB2YWxpZGF0aW9uIEpTT05zIGZyb20gZW4uanNvbjpcbiAqIHZhbGlkYXRpb25fbWVzc2FnZXMsIHZhbGlkYXRpb25fZmFsbGJhY2tfbWVzc2FnZXMgYW5kIGRlZmF1bHRfbWVzc2FnZXNcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgPSAoY29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHsgdmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiB9ID0gY29udGV4dDtcbiAgICBjb25zdCBhY3RpdmVEaWN0aW9uYXJ5ID0gY2hvb3NlQWN0aXZlRGljdGlvbmFyeSh2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OKTtcbiAgICBjb25zdCBsb2NhbGl6YXRpb25zID0gT2JqZWN0LnZhbHVlcyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pO1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uS2V5cyA9IE9iamVjdC5rZXlzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubWFwKGtleSA9PiBrZXkuc3BsaXQoJy4nKS5wb3AoKSk7XG5cbiAgICByZXR1cm4gdHJhbnNsYXRpb25LZXlzLnJlZHVjZSgoYWNjLCBrZXksIGkpID0+IHtcbiAgICAgICAgYWNjW2tleV0gPSBsb2NhbGl6YXRpb25zW2ldO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9