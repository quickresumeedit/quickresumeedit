import { useState } from 'react';

export default function Pricing() {
  const [loading, setLoading] = useState<string | null>(null);

  const startCheckout = async (priceIdEnvName: 'NEXT_PUBLIC_STRIPE_PRICE_MONTHLY' | 'NEXT_PUBLIC_STRIPE_PRICE_YEARLY') => {
    try {
      setLoading(priceIdEnvName);
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceKey: priceIdEnvName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Checkout failed');
      window.location.href = data.url;
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(null);
    }
  };

  return (
    <main style={{maxWidth:800, margin:'40px auto', padding:16, fontFamily:'system-ui'}}>
      <h1>Pricing</h1>
      <p>Start free (2 resumes). Upgrade when you’re ready.</p>
      <ul>
        <li><strong>Free:</strong> 2 tailored resumes</li>
        <li><strong>Monthly:</strong> Unlimited – $9.99</li>
        <li><strong>Yearly:</strong> Unlimited – $59</li>
      </ul>

      <div style={{display:'flex', gap:12, marginTop:16}}>
        <button onClick={()=>startCheckout('NEXT_PUBLIC_STRIPE_PRICE_MONTHLY')} disabled={loading!==null} style={{padding:'10px 16px'}}>
          {loading==='NEXT_PUBLIC_STRIPE_PRICE_MONTHLY' ? 'Redirecting…' : 'Go Monthly ($9.99)'}
        </button>
        <button onClick={()=>startCheckout('NEXT_PUBLIC_STRIPE_PRICE_YEARLY')} disabled={loading!==null} style={{padding:'10px 16px'}}>
          {loading==='NEXT_PUBLIC_STRIPE_PRICE_YEARLY' ? 'Redirecting…' : 'Go Yearly ($59)'}
        </button>
      </div>

      <p style={{marginTop:24, fontSize:12, opacity:0.7}}>
        You’ll be taken to a secure Stripe checkout page.
      </p>
    </main>
  );
}
