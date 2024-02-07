import { useState, useEffect } from 'react'

function App() {
  const [musicians, setMusicians] = useState([]);
  const [puppies, setPuppies] =  useState([]);

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

  useEffect(()=> {
    const fetchPuppies = async()=> {
      const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2309-ftb-et-am/players');
      const json = await response.json();
      setPuppies(json.data.players);
    };
    fetchPuppies();
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
      <h1>Puppy Bowl ({ puppies.length })</h1>
      {
        puppies.map((puppy)=>{
          return (
            <div key={puppy.id}>
              { puppy.name }
            </div>
          );
        })
      }
    </div>
  )
}

export default App
