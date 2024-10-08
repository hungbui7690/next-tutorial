import Link from 'next/link'
import Image from 'next/image' // 1.
import drinkImg from './drink.jpg' // 2.

const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const getSingleDrink = async (id) => {
  const res = await fetch(`${url}${id}`)

  if (!res.ok) {
    throw new Error('Failed to fetch drink...')
  }
  return res.json()
}

const SingleDrink = async ({ params }) => {
  const data = await getSingleDrink(params.id)

  const title = data?.drinks[0]?.strDrink
  const imgSrc = data?.drinks[0]?.strDrinkThumb

  return (
    <div>
      <Link href='/drinks' className='btn btn-primary mt-8 mb-12'>
        back to drinks
      </Link>

      {/* 3. */}
      <Image src={drinkImg} className='w-48 h-48 rounded' alt='' />
      <h1 className='text-4xl mb-8'>{title}</h1>
    </div>
  )
}

export default SingleDrink
