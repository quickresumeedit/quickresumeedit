export default function Cancel() {
  return (
    <main style={{ maxWidth: 700, margin: '40px auto', padding: 16, fontFamily: 'system-ui' }}>
      <h1>Checkout canceled</h1>
      <p>No worries — your card wasn’t charged. You can try again anytime.</p>
      <a href="/pricing">Back to pricing</a>
    </main>
  );
}
