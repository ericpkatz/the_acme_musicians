import { useState, useEffect } from 'react'

function App() {
  const [musicians, setMusicians] = useState([]);

  useEffect(()=> {
    const fetchMusicians = async()=> {
      const response = await fetch('/api/musicians');
      if(response.ok){
        const json = await response.json();
        setMusicians(json);
      }
      else {
        console.log('error');
      }
    };
    fetchMusicians();

  }, []);

  return (
    <div>
      <h1>Acme Musicians ({ musicians.length })</h1>
      <ul>
        {
          musicians.map((musician)=> {
            return (
              <li key={ musician.id}>
                { musician.name }
              </li>
            );
          })
        }
      </ul>
    </div>
  )
}

export default App
