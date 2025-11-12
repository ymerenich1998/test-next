'use client'
import { useQueryState } from 'nuqs'
export function SearchBox() {
  const [search, setSearch] = useQueryState('search', {
    defaultValue: null,
    shallow: true,
  })
  return (
    <>
      <input value={search || ''} onChange={e => setSearch(e.target.value)} />
      <button type='button' onClick={() => setSearch(null)}>Clear</button>
      <p>Hello, {search || 'anonymous visitor'}!</p>
    </>
  )
}