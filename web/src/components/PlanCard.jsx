import React from 'react'

export default function PlanCard({id, title, price, onSelect, selected}){
  return (
    <div onClick={onSelect} style={{ padding: 16, border: selected ? '2px solid #111' : '1px solid #ddd', borderRadius: 8, width: 220, cursor: 'pointer' }}>
      <h4>{title}</h4>
      <p>{price}</p>
      <button style={{ marginTop: 12 }}>{selected ? 'Selected' : 'Select'}</button>
    </div>
  )
}
