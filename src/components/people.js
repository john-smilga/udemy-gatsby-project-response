import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Person from "./person"

const getImages = graphql`
  query MyQuery {
    allFile(filter: { relativeDirectory: { eq: "people" } }) {
      nodes {
        childImageSharp {
          fixed(width: 200) {
            originalName
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
`

const People = () => {
  const {
    allFile: { nodes: images },
  } = useStaticQuery(getImages)
  // refactor images array to object, key image name and value fixed object
  const newImages = images.reduce((acc, curr) => {
    const name = curr.childImageSharp.fixed.originalName
    acc[name] = curr.childImageSharp.fixed
    return acc
  }, {})
  // people data
  const peopleData = [
    { bookCount: 27, imageUrl: "Bill Maher.jpeg", name: "Bill Maher" },
    { bookCount: 14, imageUrl: "Jo Koy.jpeg", name: "Jo Koy" },
    { bookCount: 35, imageUrl: "Will Ferrell.jpeg", name: "Will Ferrell" },
    { bookCount: 15, imageUrl: "Dave Chappelle.jpeg", name: "Dave Chappelle" },
  ]
  return (
    <div style={{ display: "flex" }}>
      {peopleData.map((item, index) => {
        const { name, bookCount, imageUrl } = item
        // get image from newImages object using the key
        const image = newImages[imageUrl]

        return (
          <Person
            key={index}
            name={name}
            bookCount={bookCount}
            image={image}
          ></Person>
        )
      })}
    </div>
  )
}

export default People
