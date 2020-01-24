import React from "react"
import Image from "gatsby-image"
const Person = ({ name, bookCount, image }) => {
  return (
    <div style={{ margin: "1rem" }}>
      <Image fixed={image}></Image>
      <h3>{name}</h3>
      <p>{bookCount}</p>
    </div>
  )
}

export default Person
