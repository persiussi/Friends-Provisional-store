"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const mapsUrl =
  "https://www.google.com/maps/place/Friends+Provisional+Store/@33.3853347,74.3216291,17z/data=!3m1!4b1!4m6!3m5!1s0x391e2f686985d517:0x9c1b120f8397ac07!8m2!3d33.3853347!4d74.3216291!16s%2Fg%2F11y5h8n4l1";

const phoneNumber = "09797823407";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  image: string;
  tag: string;
};

type CartItem = Product & {
  quantity: number;
};

type IconName = "bag" | "cart" | "check" | "map" | "minus" | "phone" | "plus" | "search" | "star" | "truck" | "x";

const products: Product[] = [
  {
    id: 1,
    name: "Premium Rice",
    category: "Staples",
    price: 680,
    unit: "10 kg bag",
    image: "/business/friends-essentials.png",
    tag: "Family pack",
  },
  {
    id: 2,
    name: "Wheat Flour",
    category: "Staples",
    price: 420,
    unit: "10 kg bag",
    image: "/business/friends-essentials.png",
    tag: "Daily use",
  },
  {
    id: 3,
    name: "Mixed Dal Pack",
    category: "Staples",
    price: 160,
    unit: "1 kg",
    image: "/business/friends-essentials.png",
    tag: "Fresh stock",
  },
  {
    id: 4,
    name: "Cooking Oil",
    category: "Kitchen",
    price: 185,
    unit: "1 litre",
    image: "/business/friends-essentials.png",
    tag: "Essential",
  },
  {
    id: 5,
    name: "Tea & Biscuits Combo",
    category: "Snacks",
    price: 220,
    unit: "combo",
    image: "/business/friends-essentials.png",
    tag: "Tea time",
  },
  {
    id: 6,
    name: "Fresh Vegetable Basket",
    category: "Fresh",
    price: 260,
    unit: "basket",
    image: "/business/friends-produce.png",
    tag: "Local pick",
  },
  {
    id: 7,
    name: "Fruit Mix",
    category: "Fresh",
    price: 190,
    unit: "1.5 kg",
    image: "/business/friends-produce.png",
    tag: "Seasonal",
  },
  {
    id: 8,
    name: "Monthly Grocery Kit",
    category: "Kits",
    price: 1490,
    unit: "starter kit",
    image: "/business/friends-order.png",
    tag: "Quick order",
  },
];

const categories = ["All", ...Array.from(new Set(products.map((product) => product.category)))];

const features = [
  ["Fresh daily stock", "Staples, snacks, vegetables and household essentials."],
  ["Local pickup", "Prepare your order and collect directly from the store."],
  ["Simple requests", "Add custom notes for brands, packet sizes or substitutions."],
];

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    bag: (
      <>
        <path d="M6 8h12l-1 13H7L6 8Z" />
        <path d="M9 8a3 3 0 0 1 6 0" />
      </>
    ),
    cart: (
      <>
        <path d="M4 5h2l2 11h9l2-7H8" />
        <circle cx="10" cy="20" r="1" />
        <circle cx="17" cy="20" r="1" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    map: (
      <>
        <path d="M12 21s7-4.6 7-11a7 7 0 1 0-14 0c0 6.4 7 11 7 11Z" />
        <path d="M12 10.5h.01" />
      </>
    ),
    minus: <path d="M6 12h12" />,
    phone: <path d="M7 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L17 13l5 2v4c0 1-1 2-2 2A17 17 0 0 1 3 6c0-1 1-2 2-2h2Z" />,
    plus: <path d="M12 5v14M5 12h14" />,
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m16 16 4 4" />
      </>
    ),
    star: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6-5.4-2.9-5.4 2.9 1-6-4.4-4.3 6.1-.9L12 3Z" />,
    truck: (
      <>
        <path d="M3 6h11v10H3z" />
        <path d="M14 10h4l3 3v3h-7z" />
        <circle cx="7" cy="19" r="2" />
        <circle cx="17" cy="19" r="2" />
      </>
    ),
    x: <path d="m6 6 12 12M18 6 6 18" />,
  };

  return (
    <svg aria-hidden="true" className="icon" viewBox="0 0 24 24">
      {paths[name]}
    </svg>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [pickupSlot, setPickupSlot] = useState("Today evening");
  const [requestNote, setRequestNote] = useState("");
  const [orderMessage, setOrderMessage] = useState("Add items to cart and send a pickup request.");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  function addToCart(product: Product) {
    setCart((items) => {
      const existingItem = items.find((item) => item.id === product.id);

      if (existingItem) {
        return items.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }

      return [...items, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
    setOrderMessage(`${product.name} added to your cart.`);
  }

  function updateQuantity(id: number, change: number) {
    setCart((items) =>
      items
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item))
        .filter((item) => item.quantity > 0),
    );
  }

  function sendOrder() {
    if (cart.length === 0) {
      setOrderMessage("Please add at least one item before sending an order request.");
      setCartOpen(true);
      return;
    }

    if (!customerName.trim() || !customerPhone.trim()) {
      setOrderMessage("Please add your name and phone number to prepare the order.");
      setCartOpen(true);
      return;
    }

    setOrderMessage(`Order request prepared for ${customerName.trim()}. Please confirm by call or store visit.`);
    setCart([]);
    setCartOpen(false);
    setRequestNote("");
  }

  return (
    <main>
      <header className="topbar">
        <Link className="brand" href="#top">
          <span>FPS</span>
          <strong>Friends Provisional Store</strong>
        </Link>
        <nav>
          <Link href="#shop">Shop</Link>
          <Link href="#order">Order</Link>
          <Link href="#gallery">Photos</Link>
          <Link href="#location">Location</Link>
        </nav>
        <button className="cart-button" onClick={() => setCartOpen(true)} type="button">
          <Icon name="cart" />
          <span>{cartCount}</span>
        </button>
      </header>

      <section className="hero" id="top">
        <video className="hero-video" autoPlay loop muted playsInline poster="/business/friends-storefront.png">
          <source src="/business/friends-store-loop.mp4" type="video/mp4" />
        </video>
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="kicker">
            <Icon name="star" /> Rajouri daily essentials
          </p>
          <h1>Friends Provisional Store</h1>
          <p>
            A local grocery stop for staples, fresh produce, snacks and quick
            household needs near Dhanidhar Fort, Rajouri.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href="#shop">
              <Icon name="bag" />
              Start shopping
            </Link>
            <a className="ghost-button" href={`tel:${phoneNumber}`}>
              <Icon name="phone" />
              Call store
            </a>
          </div>
        </div>
      </section>

      <section className="feature-strip">
        {features.map(([title, copy]) => (
          <article key={title}>
            <Icon name={title.includes("Fresh") ? "star" : title.includes("pickup") ? "truck" : "check"} />
            <strong>{title}</strong>
            <span>{copy}</span>
          </article>
        ))}
      </section>

      <section className="shop-section" id="shop">
        <div className="section-head">
          <div>
            <p className="kicker">
              <Icon name="bag" /> Store catalog
            </p>
            <h2>Shop groceries like a local counter order.</h2>
          </div>
          <label className="search-box">
            <Icon name="search" />
            <input
              aria-label="Search products"
              placeholder="Search rice, oil, fruits..."
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
        </div>

        <div className="category-tabs">
          {categories.map((category) => (
            <button
              className={activeCategory === category ? "active" : ""}
              key={category}
              onClick={() => setActiveCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-media">
                <Image src={product.image} alt={product.name} fill sizes="(max-width: 900px) 100vw, 33vw" />
                <span>{product.tag}</span>
              </div>
              <div className="product-body">
                <p>{product.category}</p>
                <h3>{product.name}</h3>
                <div>
                  <strong>₹{product.price}</strong>
                  <small>{product.unit}</small>
                </div>
                <button onClick={() => addToCart(product)} type="button">
                  <Icon name="plus" />
                  Add
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="order-section" id="order">
        <div>
          <p className="kicker">
            <Icon name="truck" /> Pickup request
          </p>
          <h2>Prepare the basket before you visit.</h2>
          <p>
            Add items to the cart, share your contact details and mention brand
            choices or substitutions. Final availability and price can be
            confirmed directly with the store.
          </p>
          <div className="order-total">
            <span>Current cart</span>
            <strong>₹{cartTotal}</strong>
            <small>{cartCount} item{cartCount === 1 ? "" : "s"}</small>
          </div>
        </div>

        <form className="order-form" onSubmit={(event) => event.preventDefault()}>
          <label>
            Name
            <input value={customerName} onChange={(event) => setCustomerName(event.target.value)} placeholder="Your name" />
          </label>
          <label>
            Phone
            <input value={customerPhone} onChange={(event) => setCustomerPhone(event.target.value)} placeholder="Contact number" type="tel" />
          </label>
          <label>
            Pickup slot
            <select value={pickupSlot} onChange={(event) => setPickupSlot(event.target.value)}>
              <option>Today evening</option>
              <option>Tomorrow morning</option>
              <option>Tomorrow evening</option>
              <option>Call me first</option>
            </select>
          </label>
          <label>
            Notes
            <textarea
              value={requestNote}
              onChange={(event) => setRequestNote(event.target.value)}
              placeholder="Preferred brand, quantity changes, delivery question..."
            />
          </label>
          <button onClick={sendOrder} type="button">
            <Icon name="check" />
            Send order request
          </button>
          <p className="message">{orderMessage}</p>
        </form>
      </section>

      <section className="gallery-section" id="gallery">
        <div className="section-head">
          <div>
            <p className="kicker">
              <Icon name="star" /> Photos and video
            </p>
            <h2>Fresh visuals for the shop.</h2>
          </div>
        </div>
        <div className="gallery-grid">
          <div className="gallery-card wide">
            <Image src="/business/friends-storefront.png" alt="Friends Provisional Store storefront" fill sizes="100vw" />
          </div>
          <div className="gallery-card">
            <Image src="/business/friends-produce.png" alt="Fresh produce display" fill sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
          <video className="gallery-video" controls muted loop playsInline poster="/business/friends-order.png">
            <source src="/business/friends-store-loop.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      <section className="location-section" id="location">
        <div>
          <p className="kicker">
            <Icon name="map" /> Location
          </p>
          <h2>Find Friends Provisional Store.</h2>
          <p>
            Use the map for directions to the store area in Rajouri. Call before
            visiting for special items, monthly grocery lists or bulk packets.
          </p>
          <div className="location-actions">
            <a className="primary-button dark" href={mapsUrl} target="_blank" rel="noreferrer">
              <Icon name="map" />
              Open map
            </a>
            <a className="ghost-button dark" href={`tel:${phoneNumber}`}>
              <Icon name="phone" />
              {phoneNumber}
            </a>
          </div>
        </div>
        <div className="map-frame">
          <iframe
            title="Map showing Friends Provisional Store"
            src="https://www.google.com/maps?q=33.3853347,74.3216291&z=17&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <footer>
        <strong>Friends Provisional Store</strong>
        <span>Local groceries, essentials and pickup requests</span>
      </footer>

      {cartOpen ? (
        <div className="cart-layer" role="dialog" aria-modal="true" aria-label="Shopping cart">
          <button className="cart-backdrop" aria-label="Close cart" onClick={() => setCartOpen(false)} type="button" />
          <aside className="cart-panel">
            <div className="cart-head">
              <div>
                <p className="kicker">
                  <Icon name="cart" /> Basket
                </p>
                <h2>Your order</h2>
              </div>
              <button className="icon-button" onClick={() => setCartOpen(false)} type="button" aria-label="Close cart">
                <Icon name="x" />
              </button>
            </div>

            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <Icon name="bag" />
                  <strong>Your cart is empty</strong>
                  <span>Add products from the store catalog.</span>
                </div>
              ) : (
                cart.map((item) => (
                  <article className="cart-item" key={item.id}>
                    <Image src={item.image} alt={item.name} width={82} height={70} />
                    <div>
                      <strong>{item.name}</strong>
                      <span>₹{item.price} · {item.unit}</span>
                      <div className="qty">
                        <button onClick={() => updateQuantity(item.id, -1)} type="button" aria-label={`Remove one ${item.name}`}>
                          <Icon name="minus" />
                        </button>
                        <b>{item.quantity}</b>
                        <button onClick={() => updateQuantity(item.id, 1)} type="button" aria-label={`Add one ${item.name}`}>
                          <Icon name="plus" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>

            <div className="cart-footer">
              <div>
                <span>Estimated total</span>
                <strong>₹{cartTotal}</strong>
              </div>
              <a className="primary-button" href="#order" onClick={() => setCartOpen(false)}>
                Continue to order
              </a>
            </div>
          </aside>
        </div>
      ) : null}
    </main>
  );
}
