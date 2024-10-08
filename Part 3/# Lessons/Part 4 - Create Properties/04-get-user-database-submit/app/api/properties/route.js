import connectDB from '@/config/database'
import Property from '@/models/Property'
import { getSessionUser } from '@/utils/getSessionUser'

// GET /api/properties
export const GET = async (req, res) => {
  try {
    await connectDB()
    const properties = await Property.find({})

    return new Response(JSON.stringify(properties), {
      status: 200,
    })
  } catch (error) {
    return new Response('Something went wrong', { status: 500 })
  }
}

// POST /api/properties
export const POST = async (request) => {
  try {
    await connectDB() // 2. Connect to DB

    const sessionUser = await getSessionUser() // 3. utils/getSessionUser
    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 })
    }
    const { userId } = sessionUser

    const formData = await request.formData()
    const amenities = formData.getAll('amenities')
    const images = formData
      .getAll('images')
      .filter((image) => image.name !== '')
    const propertyData = {
      type: formData.get('property_type'),
      name: formData.get('name'),
      description: formData.get('description'),
      location: {
        street: formData.get('location.street'),
        city: formData.get('location.city'),
        state: formData.get('location.state'),
        zipcode: formData.get('location.zipcode'),
      },
      beds: formData.get('beds'),
      baths: formData.get('baths'),
      square_feet: formData.get('square_feet'),
      amenities,
      rates: {
        weekly: formData.get('rates.weekly'),
        monthly: formData.get('rates.monthly'),
        nightly: formData.get('rates.nightly.'),
      },
      seller_info: {
        name: formData.get('seller_info.name'),
        email: formData.get('seller_info.email'),
        phone: formData.get('seller_info.phone'),
      },
      images,
      owner: userId, // 3.
    }
    console.log(propertyData)

    const newProperty = new Property(propertyData) // 4.
    await newProperty.save()

    // 5.
    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    )

    return new Response(JSON.stringify({ message: 'Success' }), {
      status: 201,
    })
  } catch (error) {
    console.log(error)
    return new Response('Failed to add property', { status: 500 })
  }
}
