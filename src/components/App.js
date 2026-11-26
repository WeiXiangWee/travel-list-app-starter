import { useState } from "react";

// Initial packing items
const initialItems = [
  { id: 1, description: "Shirt", quantity: 5, packed: false },
  { id: 2, description: "Pants", quantity: 2, packed: true },
];

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form({ handleAddItem }) {
  function handleSubmit(event) {
    event.preventDefault(); //used to prevent the reloading of the entire page
    if (!description) return;

    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };

    handleAddItem(newItem);

    setDescription("");
    setQuantity(1);
  }

  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>
      <select
        className="select"
        value={quantity}
        onChange={(event) => setQuantity(Number(event.target.value))}
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>
      <input
        type="text"
        placeholder="item..."
        className="input"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button className="button">ADD</button>
    </form>
  );
}

function Item({ item }) {
  return (
    <span style={item.packed ? { textDecoration: "line-through" } : {}}>
      <li>
        {item.quantity} {item.description}
      </li>
    </span>
  );
}

function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items in the list. You already packed Y (Z%).</em>
    </footer>
  );
}

function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((prevItems) => [...prevItems, item]);
  }

  return (
    <div className="app">
      <Logo />
      <Form handleAddItem={handleAddItems} />
      <PackingList items={items} />
      <Stats />
    </div>
  );
}

export default App;
