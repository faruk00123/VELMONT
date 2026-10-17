import { StrictMode, act } from 'react'
import { createRoot } from 'react-dom/client'
import { MemoryRouter } from 'react-router-dom'
import App from '../src/App.jsx'
import StoreProvider from '../src/context/StoreContext.jsx'

/* ------------------------------ DOM helpers ------------------------------ */

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const settle = async (ms = 0) => {
  await act(async () => {
    await wait(ms)
  })
}

function textOf(node) {
  return (node.textContent || '').replace(/\s+/g, ' ').trim()
}

function findAll(container, selector) {
  return Array.from(container.querySelectorAll(selector))
}

function buttonByText(container, label, tag = 'button') {
  const match = findAll(container, tag).find((el) =>
    textOf(el).toLowerCase().includes(label.toLowerCase()),
  )
  if (!match) {
    throw new Error(`No ${tag} found containing "${label}"`)
  }
  return match
}

/** Icon-only buttons carry their meaning in aria-label rather than text. */
function buttonByLabel(container, label, tag = 'button') {
  const match = findAll(container, tag).find(
    (el) => (el.getAttribute('aria-label') || '').toLowerCase() === label.toLowerCase(),
  )
  if (!match) {
    throw new Error(`No ${tag} found labelled "${label}"`)
  }
  return match
}

function click(el) {
  el.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true }))
}

function type(el, value) {
  const proto = Object.getPrototypeOf(el)
  const descriptor = Object.getOwnPropertyDescriptor(proto, 'value')
  descriptor.set.call(el, value)
  el.dispatchEvent(new window.Event('input', { bubbles: true }))
}

function readStore(key) {
  try {
    return JSON.parse(window.localStorage.getItem(key))
  } catch {
    return null
  }
}

/* --------------------------------- harness -------------------------------- */

function mount(route, container) {
  const root = createRoot(container)
  act(() => {
    root.render(
      <StrictMode>
        <MemoryRouter initialEntries={[route]}>
          <StoreProvider>
            <App />
          </StoreProvider>
        </MemoryRouter>
      </StrictMode>,
    )
  })
  return root
}

/* ---------------------------------- tests --------------------------------- */

export async function runFlowTest() {
  const results = []
  const container = window.document.createElement('div')
  window.document.body.appendChild(container)

  const assert = (label, condition, detail = '') => {
    results.push({ label, ok: Boolean(condition), detail })
    if (!condition) throw new Error(`${label}${detail ? ` — ${detail}` : ''}`)
  }

  const scenario = async (name, fn) => {
    window.localStorage.clear()
    try {
      await fn()
      console.log(`  PASS  ${name}`)
    } catch (error) {
      console.error(`  FAIL  ${name}\n         ${error.message}`)
      throw error
    }
  }

  /* ---------- 1. Product page: choose a size and add to the bag ---------- */
  await scenario('Product page — select size and add to bag', async () => {
    let root
    await act(async () => {
      root = mount('/product/vel-aurelia-low', container)
    })
    await settle(20)

    assert('PDP renders product name', textOf(container).includes('Aurelia Low Sneaker'))

    // Try adding without a size first — should be blocked with a validation message.
    await act(async () => click(buttonByText(container, 'Add to bag')))
    assert(
      'add-to-bag without size is blocked',
      textOf(container).includes('Please select a size before adding to bag'),
      'expected an inline size error',
    )
    assert('nothing was added to the bag', (readStore('velmont.cart') || []).length === 0)

    // Select EU 42.
    const sizeButton = findAll(container, 'button').find((b) => textOf(b) === '42')
    assert('size button 42 exists', Boolean(sizeButton))
    await act(async () => click(sizeButton))
    assert('size 42 is pressed', sizeButton.getAttribute('aria-pressed') === 'true')

    // Add to bag.
    await act(async () => click(buttonByText(container, 'Add to bag')))
    await settle(20)

    const cart = readStore('velmont.cart')
    assert('one cart line persisted', Array.isArray(cart) && cart.length === 1, JSON.stringify(cart))
    assert('cart line has the chosen size', cart[0].size === '42')
    assert('cart line quantity is 1', cart[0].quantity === 1)

    // A toast should have been announced.
    assert(
      'added-to-bag toast shown',
      textOf(container).includes('Added to bag'),
      'expected a confirmation toast',
    )

    // Bag badge in the header should read 1.
    const bagLinks = findAll(container, 'a[href="/cart"]')
    assert('bag link exists in header', bagLinks.length > 0)
    assert(
      'bag badge shows 1',
      bagLinks.some((a) => textOf(a).includes('1')),
      'expected the cart count bubble to update',
    )

    root.unmount()
  })

  /* ---------------- 2. Wishlist toggle persists to localStorage ---------- */
  await scenario('Product page — wishlist toggle persists', async () => {
    const root = mount('/product/vel-court-meridian', container)
    await settle(20)

    const heart = findAll(container, 'button').find((b) =>
      (b.getAttribute('aria-label') || '').toLowerCase().includes('wishlist'),
    )
    assert('wishlist button exists', Boolean(heart))

    await act(async () => click(heart))
    await settle(20)

    const wishlist = readStore('velmont.wishlist')
    assert(
      'product saved to wishlist',
      Array.isArray(wishlist) && wishlist.includes('vel-court-meridian'),
      JSON.stringify(wishlist),
    )
    assert('wishlist toast shown', textOf(container).includes('Saved to wishlist'))

    // Toggle back off.
    const heartOff = findAll(container, 'button').find((b) =>
      (b.getAttribute('aria-label') || '').toLowerCase().includes('wishlist'),
    )
    await act(async () => click(heartOff))
    await settle(20)
    assert(
      'product removed from wishlist',
      (readStore('velmont.wishlist') || []).length === 0,
    )

    root.unmount()
  })

  /* ------------- 3. Cart: quantity maths, promo code, removal ------------ */
  await scenario('Cart — quantity updates, promo code and removal', async () => {
    // Seed a bag directly, as a returning visitor would have.
    window.localStorage.setItem(
      'velmont.cart',
      JSON.stringify([
        {
          key: 'vel-aurelia-low::42::Ivory',
          productId: 'vel-aurelia-low',
          size: '42',
          color: 'Ivory',
          quantity: 1,
          addedAt: Date.now(),
        },
      ]),
    )

    const root = mount('/cart', container)
    await settle(20)

    assert('cart line is listed', textOf(container).includes('Aurelia Low Sneaker'))
    assert('size and colour shown', textOf(container).includes('EU 42 · Ivory'))
    assert('subtotal shown', textOf(container).includes('$189.00'))

    // Increase quantity to 2.
    const plus = findAll(container, 'button').find((b) =>
      (b.getAttribute('aria-label') || '').includes('Increase quantity of'),
    )
    assert('quantity increase control exists', Boolean(plus))
    await act(async () => click(plus))
    await settle(20)

    assert('quantity persisted as 2', readStore('velmont.cart')[0].quantity === 2)
    assert('subtotal doubled', textOf(container).includes('$378.00'))

    // Apply a valid promo code.
    const promoInput = container.querySelector('#promo')
    assert('promo input exists', Boolean(promoInput))
    await act(async () => type(promoInput, 'VELMONT10'))
    await act(async () => click(buttonByText(container, 'Apply')))
    await settle(20)
    assert('promo applied message shown', textOf(container).includes('10% off'))
    assert('discount line rendered', textOf(container).includes('−$37.80'))

    // An invalid code should show an error.
    await act(async () => type(promoInput, 'NOPE123'))
    await act(async () => click(buttonByText(container, 'Apply')))
    await settle(20)
    assert(
      'invalid promo shows an error',
      textOf(container).includes('isn’t a recognised demo code') ||
        textOf(container).includes('recognised demo code'),
    )

    // Remove the line.
    const remove = findAll(container, 'button').find((b) =>
      (b.getAttribute('aria-label') || '').includes('Remove Aurelia Low Sneaker'),
    )
    assert('remove control exists', Boolean(remove))
    await act(async () => click(remove))
    await settle(20)

    assert('bag is now empty in storage', (readStore('velmont.cart') || []).length === 0)
    assert('empty state displayed', textOf(container).includes('Your bag is empty'))

    root.unmount()
  })

  /* -------------------- 4. Checkout: validation and steps ---------------- */
  await scenario('Checkout — field validation and step progression', async () => {
    window.localStorage.setItem(
      'velmont.cart',
      JSON.stringify([
        {
          key: 'vel-belgrave-oxford::43::Espresso',
          productId: 'vel-belgrave-oxford',
          size: '43',
          color: 'Espresso',
          quantity: 1,
          addedAt: Date.now(),
        },
      ]),
    )

    const root = mount('/checkout', container)
    await settle(20)

    assert('step 1 heading shown', textOf(container).includes('Contact details'))
    assert('order summary lists the item', textOf(container).includes('Belgrave Oxford'))

    // Continue with an empty form — should be blocked.
    await act(async () => click(buttonByText(container, 'Continue')))
    await settle(20)
    assert(
      'empty contact form is blocked',
      textOf(container).includes('Enter your email address.'),
    )
    assert(
      'still on the contact step',
      textOf(container).includes('Contact details'),
    )

    // Invalid email should be caught.
    await act(async () => type(container.querySelector('#firstName'), 'Ada'))
    await act(async () => type(container.querySelector('#lastName'), 'Lovelace'))
    await act(async () => type(container.querySelector('#email'), 'not-an-email'))
    await act(async () => type(container.querySelector('#phone'), '+45 31 00 00 00'))
    await act(async () => click(buttonByText(container, 'Continue')))
    await settle(20)
    assert(
      'invalid email is rejected',
      textOf(container).includes('Enter a valid email'),
      'expected an email format error',
    )

    // Fix the email and continue to the address step.
    await act(async () => type(container.querySelector('#email'), 'ada@example.com'))
    await act(async () => click(buttonByText(container, 'Continue')))
    await settle(20)
    assert(
      'advanced to the address step',
      textOf(container).includes('Delivery address'),
      'expected step 2 to render',
    )

    // Address validation.
    await act(async () => click(buttonByText(container, 'Continue')))
    await settle(20)
    assert(
      'empty address is blocked',
      textOf(container).includes('Enter your street address.'),
    )

    await act(async () => type(container.querySelector('#address1'), '14 Harbour Lane'))
    await act(async () => type(container.querySelector('#city'), 'Copenhagen'))
    await act(async () => type(container.querySelector('#postalCode'), '1055'))
    await act(async () => click(buttonByText(container, 'Continue')))
    await settle(20)
    assert(
      'advanced to the delivery method step',
      textOf(container).includes('Delivery method'),
    )
    assert(
      'delivery options are listed',
      textOf(container).includes('Express delivery'),
    )

    // Choose express and review.
    const expressRadio = findAll(container, 'input[type="radio"]').find(
      (r) => r.value === 'express',
    )
    assert('express radio exists', Boolean(expressRadio))
    await act(async () => {
      expressRadio.click()
    })
    await settle(20)

    await act(async () => click(buttonByText(container, 'Continue')))
    await settle(20)
    assert('review step reached', textOf(container).includes('Review your demo order'))
    assert('review shows the contact name', textOf(container).includes('Ada Lovelace'))
    assert(
      'review states payment is not required',
      textOf(container).includes('Not required'),
    )
    assert(
      'express delivery reflected in the total',
      textOf(container).includes('$14.90'),
    )

    // Place the demo order.
    await act(async () => click(buttonByText(container, 'Place demo order')))
    await settle(900)

    assert('bag was cleared', (readStore('velmont.cart') || []).length === 0)
    const order = readStore('velmont.lastOrder')
    assert('demo order persisted', Boolean(order))
    assert('order number looks right', /^VEL-[A-Z2-9]{6}$/.test(order.orderNumber))
    assert('order flagged as demo', order.isDemo === true)
    assert('order kept no address', !('address1' in order) && !('postalCode' in order))
    assert('order kept no phone number', !('phone' in order))
    assert('order total is correct', Math.abs(order.totals.total - (349 + 14.9) * 1.08) < 0.02,
      `got ${order.totals.total}`)

    assert(
      'confirmation page shown',
      textOf(container).includes('simulated order'),
      'expected the demo disclaimer',
    )
    assert(
      'confirmation repeats the order number',
      textOf(container).includes(order.orderNumber),
    )

    root.unmount()
  })

  /* ------------------ 5. Shop: filters, sort and empty states ------------ */
  await scenario('Shop — category filter, sorting and empty state', async () => {
    const root = mount('/shop', container)
    await settle(20)

    assert('shop lists 24 styles', textOf(container).includes('24 styles'))

    // Filter to boots using the category checkbox.
    const bootCheckbox = findAll(container, 'input[type="checkbox"]').find((input) => {
      const label = input.closest('label')
      return label && textOf(label).startsWith('Boots')
    })
    assert('boots filter checkbox exists', Boolean(bootCheckbox))
    await act(async () => click(bootCheckbox))
    await settle(20)
    assert('filtered to 4 boot styles', textOf(container).includes('4 styles'), textOf(container).slice(0, 200))
    assert('boot name shown', textOf(container).includes('Nordal Chelsea Boot'))
    assert('non-boot excluded', !textOf(container).includes('Belgrave Oxford'))

    // Sort by price descending.
    const sortSelect = container.querySelector('#sort')
    assert('sort control exists', Boolean(sortSelect))
    await act(async () => {
      const proto = Object.getPrototypeOf(sortSelect)
      Object.getOwnPropertyDescriptor(proto, 'value').set.call(sortSelect, 'price-desc')
      sortSelect.dispatchEvent(new window.Event('change', { bubbles: true }))
    })
    await settle(20)
    const gridText = textOf(container)
    assert(
      'price sort places the pricier boot first',
      gridText.indexOf('Highland Leather Boot') < gridText.indexOf('Terra Chukka Boot'),
      'expected Highland ($359) before Terra ($265)',
    )

    // Searching nonsense should show the empty state.
    const search = container.querySelector('#shop-search')
    assert('in-collection search exists', Boolean(search))
    await act(async () => type(search, 'zzzzqqq'))
    await settle(20)
    assert(
      'empty state shown for no matches',
      textOf(container).includes('No footwear matches those filters'),
    )

    root.unmount()
  })

  /* --------------------- 6. In-collection search works ------------------- */
  await scenario('Shop — search and sale collection', async () => {
    const root = mount('/shop/sale', container)
    await settle(20)

    assert('sale page heading', textOf(container).includes('The Sale Room'))
    assert(
      'sale products listed',
      textOf(container).includes('Aurelia Low Sneaker'),
    )

    const search = container.querySelector('#shop-search')
    await act(async () => type(search, 'loafer'))
    await settle(20)
    assert(
      'search narrows the sale collection',
      textOf(container).includes('Harbour Tassel Loafer'),
    )

    root.unmount()
  })

  /* ----------------- 7. Mobile menu and the search overlay ---------------- */
  await scenario('Navigation — mobile drawer and search overlay', async () => {
    const root = mount('/', container)
    await settle(20)

    await act(async () => click(buttonByLabel(container, 'Open menu')))
    await settle(20)
    assert('mobile drawer opened', textOf(container).includes('Categories'))
    assert('drawer lists categories', textOf(container).includes('Running Shoes'))

    await act(async () => click(buttonByText(container, 'Search footwear')))
    await settle(20)
    assert('search overlay opened', textOf(container).includes('Search VELMONT'))
    assert('popular searches shown', textOf(container).includes('Popular searches'))

    const searchInput = container.querySelector('input[type="search"]')
    assert('search field focused/renderable', Boolean(searchInput))
    await act(async () => type(searchInput, 'oxford'))
    await settle(20)
    assert('live results appear', textOf(container).includes('Belgrave Oxford'))
    assert('results link into the shop', textOf(container).includes('View all results in shop'))

    await act(async () => type(searchInput, 'zzzzqqq'))
    await settle(20)
    assert('search shows a no-match state', textOf(container).includes('Nothing matched'))

    root.unmount()
  })

  /* ---------------------------- 8. Quick view ----------------------------- */
  await scenario('Quick view — open, pick a size and add to bag', async () => {
    const root = mount('/shop/loafers', container)
    await settle(20)

    assert('loafer grid rendered', textOf(container).includes('Sienna Penny Loafer'))

    const quickView = buttonByText(container, 'Quick view')
    await act(async () => click(quickView))
    await settle(20)

    const dialog = container.querySelector('[role="dialog"]')
    assert('quick view dialog opened', Boolean(dialog))
    assert('dialog shows a product', textOf(dialog).includes('Sienna Penny Loafer'))
    assert(
      'dialog prompts for a size',
      textOf(dialog).includes('Please choose a size'),
    )

    const sizeButton = findAll(dialog, 'button').find((b) => textOf(b) === '41')
    assert('size option available in dialog', Boolean(sizeButton))
    await act(async () => click(sizeButton))

    const addButton = findAll(dialog, 'button').find((b) =>
      textOf(b).includes('Add to bag'),
    )
    await act(async () => click(addButton))
    await settle(20)

    const cart = readStore('velmont.cart')
    assert('quick view added to the bag', Array.isArray(cart) && cart.length === 1)
    assert('quick view stored the chosen size', cart[0].size === '41')
    assert('dialog closed after adding', !container.querySelector('[role="dialog"]'))

    root.unmount()
  })

  console.log(`\n${results.length} interaction assertions passed across 8 flows.`)
  return { assertions: results.length }
}
