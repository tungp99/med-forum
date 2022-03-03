import { ListItem } from './list-item'

export function List() {
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
      <ListItem data={car} />
    )
    items.push(element)
  }

  return <ul id="products-list">{items}</ul>
}
