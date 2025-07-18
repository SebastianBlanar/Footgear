
export function CartItem({ item }) {
  return (
    <div className="flex justify-between py-2 border-b ">
      <span className="flex-1">{item.name}</span>
      <span className="flex-1 text-right">${item.price}</span>
      <div className="flex flex-col gap-2 flex-1 justify-between">
        {item.selected.map((i) => (
          <div
            key={i.size}
            className="flex-col items-end flex text-sm text-gray-400"
          >
            <span>Talle: {i.size}</span>
            <span>Cantidad: {i.quantity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
