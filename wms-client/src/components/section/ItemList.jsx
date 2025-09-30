const ItemList = ({ items }) => {
  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          <h1>{item.serialNumber}</h1>
        </div>
      ))}
    </div>
  );
};

export default ItemList;