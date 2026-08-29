import React, { useState } from 'react';

const Talk = () => {
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    const form = e.target;
    const formData = new FormData(form);
    const body = new URLSearchParams();
    formData.forEach((v, k) => body.append(k, v));
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    })
      .then((r) => {
        if (!r.ok) throw new Error(`Submit failed (${r.status})`);
        setStatus('success');
        form.reset();
      })
      .catch(() => setStatus('error'));
  };

  return (
    <div className="col">
      <div className="page-head">
        <h1 className="page-title">Contact</h1>
        <p className="page-intro">
          If you're working on AI agents, evaluation, or something adjacent — or
          just want to compare notes — send a line. I read everything that
          lands here, and reply to most of it.
        </p>
      </div>

      {status === 'success' && (
        <div className="alert">Thanks for the note — I'll write back soon.</div>
      )}
      {status === 'error' && (
        <div className="alert">Something broke in transit. Try again, or email me directly.</div>
      )}

      <form
        className="talk-form"
        name="talk"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="talk" />
        <input type="hidden" name="bot-field" />

        <div className="talk-field">
          <label htmlFor="contact">How do I reach you?</label>
          <input
            className="field"
            id="contact"
            name="contact"
            placeholder="Email, phone, or any handle you prefer"
            required
            autoComplete="off"
          />
        </div>

        <div className="talk-field">
          <label htmlFor="message">Your note</label>
          <textarea
            className="field"
            id="message"
            name="message"
            placeholder="Share context, links, or anything I should know."
            required
            rows={6}
          />
        </div>

        <div>
          <button type="submit" className="btn" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending…' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Talk;
