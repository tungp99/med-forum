/* eslint-disable @typescript-eslint/no-empty-function */
import {
  ComponentPropsWithoutRef,
  createContext,
  useContext,
  useState,
} from 'react'
import { Toast } from 'system/store'

type CollectionContextType = {
  addPostId: (id: string) => void
  deletePostId: (id: string) => void
  isCollected: (id: string) => boolean
  collection: string[]
}

const CollectionContext = createContext<CollectionContextType>({
  addPostId: () => {},
  deletePostId: () => {},
  isCollected: () => false,
  collection: [],
})

export function CollectionProvider(props: ComponentPropsWithoutRef<'div'>) {
  const [collection, setCollection] = useState<string[]>([])

  const addPostId = (id: string) => {
    const collectionString = localStorage.getItem('collection')
    let collection: string[] = []

    if (collectionString) {
      collection = JSON.parse(collectionString)
      collection.push(id)
    } else collection = [id]

    setCollection(collection)
    localStorage.setItem('collection', JSON.stringify(collection))

    Toast.success({ title: '', content: 'Saved article' })
  }

  const deletePostId = (id: string) => {
    const collectionString = localStorage.getItem('collection')
    if (collectionString) {
      let collection: string[] = JSON.parse(collectionString)
      collection = collection.filter(s => s !== id)
      setCollection(collection)

      localStorage.setItem('collection', JSON.stringify(collection))
      Toast.success({ title: '', content: 'Unsaved article' })

      return
    }
  }

  const isCollected = (id: string) => {
    const collectionString = localStorage.getItem('collection')
    if (collectionString) {
      const collection: string[] = JSON.parse(collectionString)

      return collection.includes(id)
    }

    return false
  }

  return (
    <CollectionContext.Provider
      value={{ collection, isCollected, addPostId, deletePostId }}
    >
      {props.children}
    </CollectionContext.Provider>
  )
}

export function useCollector() {
  return useContext(CollectionContext)
}
