(async () => {
    const urlMatch = location.href.match(/^https:\/\/www.amd.com\/.{2}\/direct-buy\/(\d{10})?/);
    if (urlMatch == null) {
        const err = 'You must run this script from www.AMD.com.\nThe script will make the add to cart button appear.';
        alert(err);
        throw new Error(err);
    }

    const pid = urlMatch[1];

    const products = document.querySelectorAll('.view-shop-product-search .views-row');

    products.forEach(p => {
        const idMatch = p.querySelector('.shop-full-specs-link a').getAttribute('href').match(/\d{10}/);
        if (idMatch == null) return;
        if (p.querySelector('.shop-links button') != null) return;

        p.querySelector('.shop-links').insertAdjacentHTML('beforeend', `<button class="btn-shopping-cart btn-shopping-neutral use-ajax" data-progress-type="fullscreen" href="/en/direct-buy/add-to-cart/${idMatch[0]}">PA | Add To Cart</button>`)
    });

    const details = document.querySelector('#product-details-info .product-page-description');
    if (details && pid && !details.querySelector('button')) {
        details.insertAdjacentHTML('beforeend', `<button class="btn-shopping-cart btn-shopping-neutral use-ajax" data-progress-type="fullscreen" href="/en/direct-buy/add-to-cart/${pid}">PA | Add to Cart</button>`)
    }

    Drupal.ajax.bindAjaxLinks(document);

    if (details && details.querySelector('button')) {
        details.querySelector('button').click();
    }
})();
