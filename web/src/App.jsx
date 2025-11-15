import React, { useState } from 'react'
import PlanCard from './components/PlanCard'

export default function App() {
  const [plan, setPlan] = useState('basic')

  return (
    <div className="app-container" style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
      <h1>Social Platform</h1>
      <p>Created by Akin S. Sokpah (Liberia)</p>

      <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
        <PlanCard id="basic" title="Basic" price="$9.90/mo (trial $9.90)" selected={plan==='basic'} onSelect={()=>setPlan('basic')} />
        <PlanCard id="standard" title="Standard" price="$19.90/mo" selected={plan==='standard'} onSelect={()=>setPlan('standard')} />
        <PlanCard id="premium" title="Premium" price="$49.90/mo" selected={plan==='premium'} onSelect={()=>setPlan('premium')} />
      </div>

      <div style={{ marginTop: 20 }}>
        <button onClick={async ()=>{
          const res = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ plan })
          });
          const data = await res.json();
          if(data.sessionId){
            const stripeModule = await import('@stripe/stripe-js');
            const stripe = await stripeModule.loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY || window.__STRIPE_PUBLISHABLE_KEY__ || 'pk_test_placeholder');
            stripe.redirectToCheckout({ sessionId: data.sessionId });
          } else {
            alert('Failed to create session');
          }
        }} style={{ padding: '10px 18px', borderRadius: 6 }}>Subscribe</button>
      </div>

      <div style={{ marginTop: 30 }}>
        <h3>AI demo</h3>
        <AiDemo />
      </div>
    </div>
  )
}

function AiDemo(){
  const [prompt, setPrompt] = useState('Who created you?');
  const [output, setOutput] = useState('');

  async function run(){
    const res = await fetch('/api/ai/generate', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({prompt}) });
    const json = await res.json();
    const text = json?.choices?.[0]?.message?.content || JSON.stringify(json);
    setOutput(text);
  }

  return (
    <div>
      <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} style={{ width: '100%', height: 80 }} />
      <div style={{ marginTop: 8 }}>
        <button onClick={run}>Ask AI</button>
      </div>
      <pre style={{ marginTop: 12, background: '#f6f6f6', padding: 12 }}>{output}</pre>
    </div>
  )
}
