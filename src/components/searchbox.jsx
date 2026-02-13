import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function SearchBox({
  value, 
  onChange, 
  placeholder = 'Search...', 
  loading= false, 
  debounce = 500
}) {
  const [internalValue, setInternalValue] = useState(value || '')

  useEffect(() => {
    setInternalValue(value || '')
  }, [value])

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(internalValue)
    }, debounce)

    return () => clearTimeout(timer)
  }, [internalValue])
  
  return (
    <div className="relative w-full max-w-md">
      <label htmlFor="search" className="sr-only">
        Search Todos
      </label>

      <div className="relative">
        <Search 
          size={18} 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input 
          type="text" 
          id="search" 
          value={internalValue} 
          onChange={(e) => setInternalValue(e.target.value)} 
          placeholder={placeholder} 
          className="w-full border round-md pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />

        {internalValue && (
          <button 
            type="button" 
            onClick={() => {
              setInternalValue('')
              onChange('')
            }}
            className="absolute right-3 top-1/2 -translate-y-12 text-gray-400 hover:text-black"
            aria-label= "Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {loading && (
        <p className="text-sm text-gray-500 mt-1">Searching...</p>
      )}
    </div>
  )
}