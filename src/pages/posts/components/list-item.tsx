import { Car } from '../types/data'

type ListItemProps = {
  data: Car
}

export function ListItem(props: ListItemProps) {
  const {id, brand, model, price} = props.data

  return (
    <li className="c-container">
      <span className="c-id"> ID: {id}</span> |
      <span className="c-brand"> BRAND: {brand}</span> |
      <span className="c-model"> MODEL: {model}</span> |
      <span className="c-price"> PRICE: {price}</span>
    </li>
  )
}
