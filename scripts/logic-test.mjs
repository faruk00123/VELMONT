/**
 * Logic test for the pure data + utility layer.
 * Run with:  node scripts/logic-test.mjs
 */
import {
  CATEGORIES,
  COLLECTIONS,
  PRODUCTS,
  discountPercent,
  getByCategory,
  getByTag,
  getProductById,
  getRelated,
  money,
  searchProducts,
} from '../src/data/products.js'
import {
  computeDelivery,
  deliveryEstimate,
  makeOrderNumber,
  TAX_RATE,
} from '../src/utils/commerce.js'
import { hasErrors, isEmail, isPostalCode, validate } from '../src/utils/validation.js'

let passed = 0
const failures = []

function check(label, condition) {
  if (condition) {
    passed += 1
  } else {
    failures.push(label)
  }
}

/* ------------------------------- catalogue ------------------------------- */
check('catalogue has 24 products', PRODUCTS.length === 24)
check('seven categories', CATEGORIES.length === 7)

const categorySlugs = CATEGORIES.map((c) => c.slug)
check(
  'every product maps to a real category',
  PRODUCTS.every((p) => categorySlugs.includes(p.category)),
)
check(
  'every product has 3+ images',
  PRODUCTS.every((p) => Array.isArray(p.images) && p.images.length >= 3),
)
check(
  'every product has sizes, colours and a positive price',
  PRODUCTS.every(
    (p) => p.sizes.length > 0 && p.colors.length > 0 && p.price > 0,
  ),
)
check(
  'product ids are unique',
  new Set(PRODUCTS.map((p) => p.id)).size === PRODUCTS.length,
)
check(
  'each category has stock',
  categorySlugs.every((slug) => getByCategory(slug).length > 0),
)
check(
  'all collection references resolve',
  Object.values(COLLECTIONS).every((c) =>
    c.productIds.every((id) => Boolean(getProductById(id))),
  ),
)

/* --------------------------------- search -------------------------------- */
check('search finds the Oxford', searchProducts('oxford').some((p) => p.id === 'vel-belgrave-oxford'))
check('search is case-insensitive', searchProducts('BOOTS').length >= 3)
check('search matches a colour', searchProducts('bordeaux').length > 0)
check('empty search returns nothing', searchProducts('   ').length === 0)
check('nonsense search returns nothing', searchProducts('zzzzqqq').length === 0)

/* -------------------------------- relations ------------------------------ */
const sneakers = getByCategory('sneakers')
check('five sneakers', sneakers.length === 5)
const related = getRelated(sneakers[0], 4)
check('related returns 4', related.length === 4)
check('related excludes the product itself', related.every((p) => p.id !== sneakers[0].id))
check('sale tag has products', getByTag('sale').length >= 5)
check('bestseller tag has products', getByTag('bestseller').length >= 5)

/* --------------------------------- maths --------------------------------- */
check('money formats with thousands', money(1234.5) === '$1,234.50')
check('money formats small values', money(99) === '$99.00')
check('discount percent rounds up', discountPercent(189, 232) === 19)
check('no discount without compareAt', discountPercent(189, null) === 0)
check('no discount when compareAt is lower', discountPercent(200, 180) === 0)

/* -------------------------------- delivery ------------------------------- */
check('standard delivery is free over $150', computeDelivery(200, 'standard').charged === 0)
check('standard delivery is charged under $150', computeDelivery(100, 'standard').charged === 9.5)
check('express is always charged', computeDelivery(400, 'express').charged === 14.9)
check('boutique collection is free', computeDelivery(50, 'boutique').charged === 0)
check('unknown method falls back to standard', computeDelivery(50, 'nonsense').id === 'standard')
check('tax rate is 8%', TAX_RATE === 0.08)
check('delivery estimate is a date range', /\d/.test(deliveryEstimate()) && deliveryEstimate().includes('–'))
check('order number format', /^VEL-[A-Z2-9]{6}$/.test(makeOrderNumber()))
check('order numbers are not trivially repeated', new Set(Array.from({ length: 50 }, makeOrderNumber)).size > 40)

/* ------------------------------- validation ------------------------------ */
check('valid email accepted', isEmail('name@example.com'))
check('email without TLD rejected', !isEmail('name@example'))
check('email without @ rejected', !isEmail('name.example.com'))
check('postal code accepted', isPostalCode('1055'))
check('empty postal code rejected', !isPostalCode(''))

const contactSchema = {
  email: [(v) => (isEmail(v) ? undefined : 'bad email')],
  firstName: [(v) => (v ? undefined : 'required')],
}
const badErrors = validate({ email: 'nope', firstName: '' }, contactSchema)
check('validation catches bad email', badErrors.email === 'bad email')
check('validation catches missing name', badErrors.firstName === 'required')
check('validation passes when valid', !hasErrors(validate({ email: 'a@b.co', firstName: 'Ada' }, contactSchema)))

/* ------------------------------- results -------------------------------- */
console.log(`${passed} assertions passed`)
if (failures.length) {
  console.error(`\n${failures.length} failed:`)
  failures.forEach((f) => console.error(`  FAIL ${f}`))
  process.exit(1)
}
console.log('Logic layer looks correct.')
