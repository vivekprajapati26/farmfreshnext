

import Layout from '../components/Layout'
import ProductItem from '../components/ProductItem'
import data from '../utils/data'



export default function Home() {
  return (

    <Layout >
      <div className='px-4  container mx-auto'>
        <div className="flex flex-wrap mx-2 my-4 ">

          {data.products.map((product) => (


            <ProductItem product={product} key={product.slug} ></ProductItem>


          ))}




        </div>
      </div>


    </Layout>

  )
}
