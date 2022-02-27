import { useState } from "react";
import { Formik, Form, Field } from "formik";
import './header.css'
import './content.css'
import './article.css'
const App = () => {
  const [photos, setPhotos] = useState([])
  const open = (url) => window.open(url)
  console.log({photos})
  return (
    <div>
      <header>
        <Formik initialValues={{search: ''}} 
          //funcion asincrona - Llamado a la api unplash
        onSubmit={async values => {const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,{
            //Requiere un objeto de configuracion
            //Contiene dentro de las cabeceras la api Key
            headers: {
              'Authorization': 'Client-ID iIqECBnS2kE_pf6kkNFPOJMuy8UNvA7IZicdM9BxiN0'
            }
          })
          //Pasando a json
          const data = await response.json()
          setPhotos(data.results)
        }}>

          <Form>
            <Field name='search'/>
          </Form>
        </Formik>
      
      </header>
      <div className="container">
        <div className="center">
          {photos.map(photo => 
          
          <article key={photo.id} onClick={() => open(photo.links.html)}>
            <img src={photo.urls.regular}/>
            <p>{[photo.description, photo.alt_description].join(' - ')}</p>
          </article>)
          
          }
        </div>
      </div>
    </div>
  )
}

export default App;
