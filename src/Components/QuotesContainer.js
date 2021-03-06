import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";


const QuotesContainer = () => {

    const { id } = useParams();
    const [quotes, setQuotes] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null);
    const history = useHistory();

    
    useEffect(() => {
        const abortCont = new AbortController();
  
        setTimeout(() => {
          fetch('https://indigoroom.herokuapp.com/quotes/' + id, { signal: abortCont.signal })
        .then(res => {
          if (!res.ok) {
            throw Error('Danger Will Robinson, could not fetch data');
          }
          return res.json();
        })
        .then(data => {
          setQuotes(data);
          setIsLoading(false);
          setError(null);
        })
        .catch(err => {
          if (err.name === 'AbortError') {
            console.log('fetch aborted')
          } else {
          setIsLoading(false);
          setError(err.message);
          }
        })
        
        }, 1000);
  
        return () => abortCont.abort();

      }, [id]);

      const handleCick= () => {
          fetch('https://indigoroom.herokuapp.com/quotes/' + id, {
              method: `DELETE`
          }).then(() => {
              history.push('/');

          })

      }

    return (
      <div className="container">
      { error && <div>{ error }</div> }
     { isLoading && <div>LOADING...</div> }
       {quotes && (
           <article>
               <h2>{ quotes.title}</h2>
               <p>Written by: { quotes.author }</p>
               <div class="text md-start">{ quotes.body }</div>
               
               <img src={quotes.image} class="rounded img-thumbnail w-50 p-3" alt="" />
               
               <button onClick={ handleCick }>Delete</button>
           
           
           </article>
           
          
           
       )}
        </div>
);
}

 
export default QuotesContainer;