export default function PostsPage() {
  const data = [
    {
      id: 1,
      brand: 'Porsche',
      model: 'Taylor S 2021',
      price: 3000,
    },
    {
      id: 2,
      brand: 'Chevrolet',
      model: 'HD*(@HD',
      price: 20,
    },
  ]

  const items = []

  for (const car of data) {
    const element = (
      <li
        key={car.id}
        className="c-container">
        <span className="c-id"> ID: {car.id}</span> |
        <span className="c-brand"> BRAND: {car.brand}</span> |
        <span className="c-model"> MODEL: {car.model}</span> |
        <span className="c-price"> PRICE: {car.price}</span>
      </li>
    )
    items.push(element)
  }

  return (
    <>
      <span>CAR PAGE</span>

      <ul>{items}</ul>
    </>
  )
}
