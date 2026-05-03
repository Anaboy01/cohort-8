# ContextAPI — Product CRUD App

A React application that demonstrates how **Context API** and **Custom Hooks** work together to manage global state without a third-party state library.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Folder Structure](#folder-structure)
4. [How It Works — The Data Flow](#how-it-works--the-data-flow)
5. [Custom Hooks](#custom-hooks)
   - [useFetchProducts](#1-usefetchproducts)
   - [useProductForm](#2-useproductform)
   - [useConfirm](#3-useconfirm)
   - [useLocalStorage](#4-uselocalstorage)
6. [Context — ProductContext](#context--productcontext)
7. [Components](#components)
8. [Bug Fixes Applied](#bug-fixes-applied)
9. [Getting Started](#getting-started)

---

## Project Overview

The app lets users **view**, **edit**, and **delete** products fetched from the [DummyJSON API](https://dummyjson.com/). State is shared globally via React Context API, while repetitive stateful logic is extracted into custom hooks so components stay lean and readable.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 19 | UI & component model |
| React Router v7 | Client-side routing |
| Axios | HTTP requests |
| Tailwind CSS v4 | Utility-first styling |
| Vite | Dev server & bundler |

---

## Folder Structure

```
src/
├── App.jsx                        # Routes + Nav
├── main.jsx                       # App entry, wraps with ProductProvider
│
├── Context-API/
│   └── ProductContext.jsx         # Global state + CRUD operations
│
├── Components/
│   ├── Products.jsx               # Product list page
│   ├── EditProduct.jsx            # Edit form page
│   └── Confirm.jsx                # Delete confirmation dialog
│
└── hooks/                         # ← Custom hooks live here
    ├── useFetchProducts.js
    ├── useProductForm.js
    ├── useConfirm.js
    └── useLocalStorage.js
```

---

## How It Works — The Data Flow

```
main.jsx
  └── <ProductProvider>          (wraps the whole app)
        ├── useFetchProducts()   → fetches products on mount
        ├── useConfirm()         → manages delete dialog state
        │
        └── Context value exposed to all children:
              products, loading, error,
              deleteId, confirmOpen, setDeleteId, cancelConfirm,
              addProduct, editProduct, deleteProduct

Products.jsx
  └── useProduct()               (reads from context)
        ├── Renders product cards
        └── Passes confirmOpen / cancelConfirm → <Confirm />

EditProduct.jsx
  └── useProduct()               (reads from context)
  └── useProductForm()           (local form state)
        ├── Hydrates form from products array
        └── Calls editProduct() on submit
```

---

## Custom Hooks

### 1. `useFetchProducts`
**File:** `src/hooks/useFetchProducts.js`

Handles the async side-effect of loading products from the API.

| Return value | Type | Description |
|---|---|---|
| `products` | `array` | The fetched list of product objects |
| `setProducts` | `fn` | Direct state setter (used by CRUD ops in context) |
| `loading` | `boolean` | `true` while a request is in-flight |
| `error` | `string \| null` | Error message if the fetch fails, otherwise `null` |
| `refetch` | `fn` | Manually re-trigger the fetch (e.g. on a retry button) |

**How it works:**
```js
const useFetchProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)

  const fetchProducts = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await axios.get('https://dummyjson.com/products?...')
      setProducts(data.products)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProducts() }, [])

  return { products, setProducts, loading, error, refetch: fetchProducts }
}
```

**Used in:** `ProductContext.jsx`

---

### 2. `useProductForm`
**File:** `src/hooks/useProductForm.js`

Manages form field state for both the Add and Edit product forms.

| Return value | Type | Description |
|---|---|---|
| `formData` | `object` | Current values of all form fields (`title`, `description`, `price`, `image`) |
| `handleChange` | `fn` | `onChange` handler — attach directly to any `<input>` |
| `setFormData` | `fn` | Direct setter — used to hydrate the form when editing an existing product |
| `resetForm` | `fn` | Clears all fields back to empty strings |

**How it works:**
```js
const useProductForm = (initialValues = DEFAULT_FORM) => {
  const [formData, setFormData] = useState(initialValues)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => setFormData(DEFAULT_FORM)

  return { formData, handleChange, setFormData, resetForm }
}
```

**Used in:** `EditProduct.jsx`

---

### 3. `useConfirm`
**File:** `src/hooks/useConfirm.js`

Manages the open/closed state of the delete-confirmation dialog.

| Return value | Type | Description |
|---|---|---|
| `pendingId` | `number \| null` | The ID of the item awaiting confirmation (`null` = dialog closed) |
| `isOpen` | `boolean` | `true` when the dialog should be shown |
| `requestConfirm(id)` | `fn` | Opens the dialog for the given item ID |
| `cancelConfirm()` | `fn` | Closes the dialog without taking action |

**How it works:**
```js
const useConfirm = () => {
  const [pendingId, setPendingId] = useState(null)

  return {
    pendingId,
    isOpen: pendingId !== null,
    requestConfirm: (id) => setPendingId(id),
    cancelConfirm:  ()  => setPendingId(null),
  }
}
```

**Used in:** `ProductContext.jsx` — the `pendingId` and `isOpen` values are exposed on the context so any component can read the dialog state.

---

### 4. `useLocalStorage`
**File:** `src/hooks/useLocalStorage.js`

A generic, reusable hook — a drop-in replacement for `useState` that automatically keeps its value in sync with `localStorage`.

| Parameter | Type | Description |
|---|---|---|
| `key` | `string` | The localStorage key to read/write |
| `initialValue` | `any` | Value to use when nothing is stored yet |

Returns `[storedValue, setValue]` — identical API to `useState`.

**How it works:**
```js
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  })

  const setValue = (value) => {
    const toStore = value instanceof Function ? value(storedValue) : value
    setStoredValue(toStore)
    window.localStorage.setItem(key, JSON.stringify(toStore))
  }

  return [storedValue, setValue]
}
```

**Usage example:**
```js
// Persist a theme preference across page refreshes
const [theme, setTheme] = useLocalStorage('theme', 'light')
```

**Available for use** wherever persistence across refreshes is needed (e.g. cart, filters, user preferences).

---

## Context — ProductContext

**File:** `src/Context-API/ProductContext.jsx`

The context is the **orchestration layer**. It composes the custom hooks and exposes a unified API to the component tree.

```
ProductProvider
  ├── useFetchProducts()  → products, setProducts, loading, error, refetch
  ├── useConfirm()        → deleteId, confirmOpen, setDeleteId, cancelConfirm
  │
  └── Defines CRUD operations:
        addProduct(product)    – POST to API, appends to list
        editProduct(product)   – PUT to API, updates item in list
        deleteProduct(id)      – DELETE from API, removes from list
```

All values and operations are provided via `<ProductContext.Provider>` so that any component can call `useProduct()` to access them — no prop-drilling required.

---

## Components

### `Products.jsx`
- Reads `products`, `loading`, `error` from context.
- Reads `confirmOpen`, `deleteId`, `setDeleteId`, `cancelConfirm` for the delete flow.
- Passes `isOpen`, `onConfirm`, `onCancel` props to `<Confirm />`.

### `EditProduct.jsx`
- Uses `useProductForm()` for local form state.
- Reads `products` from context to hydrate the form on mount.
- Calls `editProduct()` on submit, then navigates back to `/`.

### `Confirm.jsx`
- Pure presentational component.
- Shows/hides based on `isOpen` prop.
- Emits `onConfirm` or `onCancel` callbacks.

---

## Bug Fixes Applied

The following bugs from the original codebase were corrected during the refactor:

| Location | Bug | Fix |
|---|---|---|
| `EditProduct.jsx` | `e.preventDafault()` typo | Changed to `e.preventDefault()` |
| `EditProduct.jsx` | `handleChange` wrapped values in arrays (`[e.target.value]`) | Fixed to use plain `e.target.value` |
| `ProductContext.jsx` | `editProduct` referenced `Product` (undefined) instead of `product` | Fixed variable name |
| `ProductContext.jsx` | `deleteProduct` URL was missing `/` before `product.id` | Fixed to `/products/${id}` using the passed `id` param |

---

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

The app will be available at `http://localhost:5173`.
