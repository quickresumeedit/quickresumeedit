import { useState } from 'react';

export default function Home() {
  const [resumeText, setResumeText] = useState('');
  const [jobText, setJobText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult('');
    try {
      const res = await fetch('/api/tailor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, jobText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      setResult(data.output);
    } catch (err: any) {
      setResult('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{maxWidth: 900, margin: '40px auto', padding: 16, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto'}}>
      <h1>Quick Resume Edit</h1>
      <p>Paste your resume and the job description. Get an ATS-friendly, keyword-matched version in seconds.</p>
      <form onSubmit={handleSubmit} style={{display:'grid', gap:12, marginTop: 16}}>
        <label>
          <div>Resume (paste text)</div>
          <textarea value={resumeText} onChange={e=>setResumeText(e.target.value)} required rows={10} style={{width:'100%'}}/>
        </label>
        <label>
          <div>Job Description (paste text)</div>
          <textarea value={jobText} onChange={e=>setJobText(e.target.value)} required rows={10} style={{width:'100%'}}/>
        </label>
        <button disabled={loading} style={{padding:'10px 16px', cursor:'pointer'}}>
          {loading ? 'Tailoring…' : 'Tailor Resume'}
        </button>
      </form>
      {result && (
        <section style={{marginTop:24}}>
          <h2>Tailored Resume</h2>
          <pre style={{whiteSpace:'pre-wrap'}}>{result}</pre>
        </section>
      )}
      <div style={{marginTop:32}}>
        <a href="/pricing">See Pricing</a>
      </div>
      <footer style={{marginTop:40, fontSize:12, opacity:0.7}}>© {new Date().getFullYear()} QuickResumeEdit</footer>
    </main>
  );
}
