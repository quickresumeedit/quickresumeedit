export default function Pricing() {
  return (
    <main style={{maxWidth:800, margin:'40px auto', padding:16, fontFamily:'system-ui'}}>
      <h1>Pricing</h1>
      <p>Start free. Upgrade when you’re ready.</p>
      <ul>
        <li><strong>Free:</strong> 2 tailored resumes</li>
        <li><strong>Monthly:</strong> Unlimited – $9.99</li>
        <li><strong>Yearly:</strong> Unlimited – $59</li>
      </ul>
      <p>(Stripe checkout wiring comes next.)</p>
    </main>
  );
}
