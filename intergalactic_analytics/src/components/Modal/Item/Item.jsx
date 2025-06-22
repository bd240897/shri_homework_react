import React from 'react'

const Item = ({text, value}) => {
  return (
    <div>
      <div>{text}</div>
      <div>{value}</div>
    </div>
  )
}

export default Item
