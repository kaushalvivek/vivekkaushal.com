import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Talk = () => {
  const rootRef = useRef(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const head = rootRef.current.querySelectorAll('.page-head > *');
      const fields = rootRef.current.querySelectorAll('.talk-field, .talk-form button');

      gsap.from(head, {
        opacity: 0,
        y: 16,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
      });
      gsap.from(fields, {
        opacity: 0,
        y: 18,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.4,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

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
      .then(() => {
        setStatus('success');
        form.reset();
      })
      .catch(() => setStatus('error'));
  };

  return (
    <div ref={rootRef}>
      <div className="col-read">
        <div className="page-head">
          <div className="page-meta">
            <span className="smallcaps mark">Section · Contact</span>
            <span className="bar" />
          </div>
          <h1 className="page-title">
            Write to <em>me.</em>
          </h1>
          <p className="page-intro">
            If you're working on AI agents, evaluation, or something adjacent — or
            just want to compare notes — send a line. I read everything that
            lands here, and reply to most of it.
          </p>
        </div>

        {status === 'success' && (
          <div className="alert">
            Thanks for the note — I'll write back soon.
          </div>
        )}
        {status === 'error' && (
          <div className="alert error">
            Something broke in transit. Try again, or email me directly.
          </div>
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

        <div style={{ height: 80 }} />
      </div>
    </div>
  );
};

export default Talk;
