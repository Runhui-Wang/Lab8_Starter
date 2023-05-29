describe('Basic user flow for Website', () => {
  // First, visit the lab 8 website
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:62120/index.html');
  });

  // Next, check to make sure that all 20 <product-item> elements have loaded
  it('Initial Home Page - Check for 20 product items', async () => {
    console.log('Checking for 20 product items...');
    // Query select all of the <product-item> elements and return the length of that array
    const numProducts = await page.$$eval('product-item', (prodItems) => {
      return prodItems.length;
    });
    // Expect there that array from earlier to be of length 20, meaning 20 <product-item> elements where found
    expect(numProducts).toBe(20);
  });

  // Check to make sure that all 20 <product-item> elements have data in them
  it('Make sure <product-item> elements are populated', async () => {
    console.log('Checking to make sure <product-item> elements are populated...');
    // Start as true, if any don't have data, swap to false
    let allArePopulated = true;
    let data, plainValue;
    // Query select all of the <product-item> elements
    const prodItems = await page.$$('product-item');
    console.log(`Checking product item 1/${prodItems.length}`);
    for (const item of prodItems) {
    // Grab the .data property of <product-items> to grab all of the json data stored inside
    data = await prodItems[0].getProperty('data');
    // Convert that property to JSON
    plainValue = await data.jsonValue();
    // Make sure the title, price, and image are populated in the JSON
    if (plainValue.title.length == 0) { allArePopulated = false; }
    if (plainValue.price.length == 0) { allArePopulated = false; }
    if (plainValue.image.length == 0) { allArePopulated = false; }
    // Expect allArePopulated to still be true
    expect(allArePopulated).toBe(true);

    // TODO - Step 1
    // Right now this function is only checking the first <product-item> it found, make it so that
    // it checks every <product-item> it found
    }
  }, 10000);

  // Check to make sure that when you click "Add to Cart" on the first <product-item> that
  // the button swaps to "Remove from Cart"
  it('Clicking the "Add to Cart" button should change button text', async () => {
    console.log('Checking the "Add to Cart" button...');
    const product = await page.$('product-item');
    const shadowRoot = await product.getProperty('shadowRoot');
    const addButton = await shadowRoot.$('button');
    await addButton.click();
    const buttonText = await addButton.getProperty('innerText');
    const textValue = await buttonText.jsonValue();
    expect(textValue).toBe('Remove from Cart');
    await addButton.click();
  }, 2500);

it('Checking number of items in cart on screen', async () => {
    console.log('Checking number of items in cart on screen...');
    const products = await page.$$('product-item');
    for (const product of products) {
      const shadowRoot = await product.getProperty('shadowRoot');
      const addButton = await shadowRoot.$('button');
      await addButton.click();
    }
    const cartCount = await page.$('#cart-count');
    const countText = await cartCount.getProperty('innerText');
    const cartCountValue = await countText.jsonValue();
    expect(cartCountValue).toBe('20');
  }, 10000);

it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');
    await page.reload();
    const products = await page.$$('product-item');
    for (const product of products) {
      const shadowRoot = await product.getProperty('shadowRoot');
      const button = await shadowRoot.$('button');
      const buttonText = await button.getProperty('innerText');
      const buttonValue = await buttonText.jsonValue();
      expect(buttonValue).toBe('Remove from Cart');
    }

    const cartCount = await page.$('#cart-count');
    const countText = await cartCount.getProperty('innerText');
    const cartCountValue = await countText.jsonValue();
    expect(cartCountValue).toBe('20');
  }, 10000);

it('Checking the localStorage to make sure cart is correct', async () => {
    const storedCart = await page.evaluate(() => JSON.parse(localStorage.getItem('cart')));
    expect(storedCart).toEqual([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);
  });

it('Checking number of items in cart on screen after removing from cart', async () => {
    console.log('Checking number of items in cart on screen...');
    const products = await page.$$('product-item');
    for (const product of products) {
      const shadowRoot = await product.getProperty('shadowRoot');
      const removeButton = await shadowRoot.$('button');
      await removeButton.click();
    }
    const cartCount = await page.$('#cart-count');
    const countText = await cartCount.getProperty('innerText');
    const cartCountValue = await countText.jsonValue();
    expect(cartCountValue).toBe('0');
  }, 10000);

  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');
    // TODO - Step 7
    // Reload the page once more, then go through each <product-item> to make sure that it has remembered nothing
    // is in the cart - do this by checking the text on the buttons so that they should say "Add to Cart".
    // Also check to make sure that #cart-count is still 0
    await page.reload();
    const prodItems = await page.$$('product-item');
    for (const item of prodItems) {
      const shadow = await item.getProperty('shadowRoot');
      const button = await shadow.$('button');
      const text = await button.getProperty('innerText');
      const plainText = await text.jsonValue();
      expect(plainText).toBe('Add to Cart');
    }
    const cartCount = await page.$('#cart-count');
    const text = await cartCount.getProperty('innerText');
    const plainText = await text.jsonValue();
    expect(plainText).toBe('0');
  }, 10000);

  // Checking to make sure that localStorage for the cart is as we'd expect for the
  // cart being empty
  it('Checking the localStorage to make sure cart is correct', async () => {
    console.log('Checking the localStorage...');
    // TODO - Step 8
    // At this point he item 'cart' in localStorage should be '[]', check to make sure it is
    const cart = await page.evaluate(() => JSON.parse(localStorage.getItem('cart')));
    expect(cart).toStrictEqual([]);
  });
});