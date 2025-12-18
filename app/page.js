
'use client'
import { useState } from 'react'

export default function Home() {
  const [q,setQ]=useState('');
  const [items,setItems]=useState([]);

  const search=async()=>{
    const r=await fetch(`/api/search?q=${q}`);
    const j=await r.json();
    setItems(j.results||[]);
  };

  return (
    <main style={{maxWidth:1100,margin:'40px auto'}}>
      <h1>PosterFlix Advanced</h1>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search movie or TV show" />
      <button onClick={search}>Search</button>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,220px)',gap:20,marginTop:30}}>
        {items.map(i=>(
          <div key={i.id} style={{background:'#111',padding:10,borderRadius:10}}>
            {i.poster && <img src={i.poster} width="200" />}
            <div><b>{i.title}</b></div>
            <div>{i.year}</div>
            <a href={i.poster} download>Download Poster</a>
          </div>
        ))}
      </div>
    </main>
  )
}
