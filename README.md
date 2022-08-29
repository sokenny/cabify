# Cabify challenge 🎉

# Installation and Setup Instructions

You will need `node` and `npm` installed globally on your machine.

Installation:

`npm install`

To Run in Dev Environment:

`npm run dev`

<br />

# Project decisions and tradeoffs

## AppContext.tsx and initialization

The store has a shared state living in `/contexts/AppContext.tsx`. Its main responsibility is to provide the global data that might be needed across different UIs (not only the cart). Many lower level components require this data so I chose to place it in a shared state **to avoid heavy prop drilling**.

The App is initialized by the async `initializeApp` function that will fetch the current products and discounts data from a db and update the state with them.

If it were about building the individual product pages or homepage, I would be fetching the products from a `getStaticProps` function to get SSG pages. But at checkout I consider that the latest real time data about a product is needed (latest stock info, latest price, etc) and this is **hard to grant with SSG**. So our final source of truth to validate the checkout must be the fetched API data.
<br />
<br />

## Checkout class implementation

A checkout is instanced by passing the store's products and discounts. The latter is optional.

```typescript
const checkout = new Checkout(products, discounts);
```

Since the data obtained from checkout might be needed across other parts of the UI that are not limited to the cart page, I placed it inside the app's context. Therefore you can access `checkout` from any component, no matter its level in the component tree.

```typescript
const { checkout } = useAppContext();
```

When it came to synchronizing the checkout class to the UI, I pondered two main possibilities.

The first one was to go with a **functional-oriented pattern** and make the checkout itself an **immutable** state variable.

```typescript
const [checkout, setCheckout] = useState(new Checkout(products, discounts));
```

To grant immutability, for every item added to the cart, the `checkout` state variable is updated through `handleAddItem` handler:

```typescript
function handleAddItem() {
  setCheckout(checkout.scan(product.code));
}
```

However, for this to work I could not have the scan method return `this` because the reference to `checkout` would continue to be the same. So `scan()` would need to change to:

```typescript
scan(code: string) {
    // ...Some code
    return new Checkout([...this.cart, product]) // new state, no mutation
}
```

In this scenario I would not be abiding to the requested checkout interface which demands that scan returns `this`. Therefore the idea was dismissed and I implemented an **Observer pattern**.

A `subscribe()` method was added to the `checkout` class:

```typescript
subscribe(
    stateVariable: React.Dispatch<React.SetStateAction<string[]>>
  ): void;
```

```typescript
const [cart, setCart] = useState<string[]>(checkout.cart);
checkout.subscribe(setCart);
```

`subscribe` takes a `setState` variable that will receive the updated cart. It is then pushed to the `subscriptions` array property inside checkout. For every `checkout.cart` update, the subscriptions are notified of the change:

```typescript
this.subscriptions.forEach(subscription => {
  subscription([...this.cart]);
});
```

This way we can bind our state to changes in the `checkout` class and keep a synchronized UI.
<br/>
<br/>

## Applying discounts

Discounts received from `getDiscounts` api call implement the following interface:

```typescript

{
    type: "2-for-1" | "bulk";
    code: string;
    shouldBuy?: number;
    shouldDiscount?: number;
}

```

The `shouldBuy` and `shouldDiscount` parameters are only mandatory for `type:"bulk"` discounts.

On every update of cart items, a validation is run to return the potential applied discounts. (See `getDiscountsApplied()` method of class `Checkout`). We get back an array of objects ready to be printed in the UI. Each object represents a row under _Order Summary -> Discounts_

```typescript
{
    label: "2x1 Mug offer",
    priceDiscounted: 10
}
```

## UI and components

Markup was broken down into components using **modular/atomic design principles**. Components made up of other components were placed under `/components/modules` while lower level primitives remain in `/components/elements`. Once the need to elaborate on more pages arises, it would be a good idea to have a `/components/layouts` containing the potential different layouts of the app.

Styles were decoupled from the `globals.css` file and refactored in a pure way to each component (meaning you'll easily find what is altering the component style's under its related `Component.module.scss` file).

Only the basic stylings considered were kept in `globals.css` to provide the general style rules we won't be opting out of.

The BEM convention may seem dismissed at a first glance. This is because we are now working with css modules where each class is already scoped to its corresponding component. We do not need to prefix each class by specifying its block. The css compiling process will take care of this for us.

So from our source code we do not prefix our classes in the BEM manner, to avoid redundancy: <br/><br/>
(class inside `ProductRow` component): `styles.image`<br/><br/>
However the final result in the browser does follow a BEM pattern: `ProductRow_image__Nlbbg`

<br />

## Product modal

As a matter of personal perference I placed the modal at a top level. It is declared in the App's higher level context and updated through its setter variable:

```typescript
const { setModal } = useAppContext();

function handleClickProduct() {
  setModal(<ProductDetailModal product={product} />);
}
```

Usually we will **not want multiple modals popping up simultaneously**. Keeping one top level variable dedicated to this makes it hard to abuse modals in our app and super easy to update from any component down in the tree.
<br/>
<br/>

# Project directory structure

├── api<br />
├── components<br />
│   ├── elemets<br />
│   └── modules<br />
│   └── layouts<br />
├── contexts<br />
│   ├── AppContext.tsx<br />
├── pages<br />
│   ├── api<br />
│   ├── \_app.tsx<br />
│   ├── index.tsx<br />
├── public<br />
├── styles<br />
├── types<br />
├── utils<br />
