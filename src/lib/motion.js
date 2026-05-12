import React from 'react';
import gsap from 'gsap';

/* ---------------------------- Split (char / word) -------------------------- */

export const SplitText = React.forwardRef(
  ({ as: Tag = 'span', mode = 'word', text, className = '', ...rest }, ref) => {
    if (mode === 'char') {
      const parts = [...(text || '')];
      return (
        <Tag ref={ref} className={className} {...rest} aria-label={text}>
          {parts.map((ch, i) => (
            <span
              key={i}
              className="reveal-char"
              data-split-char
              aria-hidden="true"
              style={{ display: ch === ' ' ? 'inline' : 'inline-block' }}
            >
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          ))}
        </Tag>
      );
    }
    const words = (text || '').split(' ');
    return (
      <Tag ref={ref} className={className} {...rest} aria-label={text}>
        {words.map((w, i) => (
          <React.Fragment key={i}>
            <span className="split-mask" aria-hidden="true">
              <span className="split-line" data-split-word>
                {w}
              </span>
            </span>
            {i < words.length - 1 ? ' ' : null}
          </React.Fragment>
        ))}
      </Tag>
    );
  }
);

/* ----------------------- prefers-reduced-motion helper --------------------- */

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* --------------------------- reveal-on-scroll helper ---------------------- */

export const fadeUp = (el, opts = {}) => {
  if (!el) return null;
  const { duration = 0.7, delay = 0, y = 14, ease = 'power3.out' } = opts;
  return gsap.fromTo(el, { opacity: 0, y }, { opacity: 1, y: 0, duration, delay, ease });
};
