import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const { id } =  useParams();   
  const [loading, setLoading] = useState(false)
  const [cocktail, setCocktail] = useState(null)
  useEffect(() => {
   async function fetchSingleCocktail() {
      setLoading(true)
      try {
        const res = await fetch(`${url}${id}`)
        const data = await res.json()
         if(data.drinks){
            const {strDrink:name, strDrinkThumb:image, strAlcoholic:info, strCategory:category, strGlass:glass, strInstructions:instructions,  
              strIngredient1,
              strIngredient2,
              strIngredient3,
              strIngredient4,
              strIngredient5,
              } = data.drinks[0]
              const ingredients = [
                strIngredient1,
                strIngredient2,
                strIngredient3,
                strIngredient4,
                strIngredient5,
              ]
              const newCocktail = {
                name, image, info, category, glass, instructions, ingredients
              }
              setCocktail(newCocktail)
         }
         else{
          setCocktail(null)
         }
      
        setLoading(false)
        
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
     
    }
    fetchSingleCocktail()
  }, [id])
  if(loading){
    return <Loading />
  }
  if(!cocktail){
    return <h2 className='section-title'>no cocktail to display</h2>
  }
  const {name, info, image, category, glass, ingredients, instructions} = cocktail
  return (
    <section className='section cocktail-section'>    
    <Link to='/' className='btn btn-primary'>
      back home
    </Link>
            <h2 className='section-title'>{name}</h2>
        <div className='drink'>
          <img src={image} alt={name} />
          <div className='drink-info'>
            <p>
            <span className='drink-data'>name:</span>
            {name}
            </p>
            <p>
            <span className='drink-data'>Category :</span>
            {category}
            </p>
            <p>
            <span className='drink-data'>Info :</span>
            {info}
            </p>
            <p>
            <span className='drink-data'>Glass :</span>
            {glass}
            </p>
            <p>
            <span className='drink-data'>Instructons :</span>
            {instructions}
            </p>
            <p>
            <span className='drink-data'>ingredients:</span>
            {ingredients.map((item, index) => {
              return item? <span key={index}>
                {item}
              </span>:null
            })}
            {name}
            </p>
          </div>
        </div>
     
    </section>
  )
}

export default SingleCocktail
