(() => {
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));

  const selectTab = (tab, focus = false) => {
    tabs.forEach((candidate) => {
      const selected = candidate === tab;
      candidate.classList.toggle('is-active', selected);
      candidate.setAttribute('aria-selected', String(selected));
      candidate.tabIndex = selected ? 0 : -1;
      const panel = document.getElementById(candidate.getAttribute('aria-controls'));
      if (panel) {
        panel.classList.toggle('is-active', selected);
        panel.hidden = !selected;
      }
    });
    if (focus) tab.focus();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', (event) => {
      let next = null;
      if (event.key === 'ArrowRight') next = tabs[(index + 1) % tabs.length];
      if (event.key === 'ArrowLeft') next = tabs[(index - 1 + tabs.length) % tabs.length];
      if (event.key === 'Home') next = tabs[0];
      if (event.key === 'End') next = tabs[tabs.length - 1];
      if (next) {
        event.preventDefault();
        selectTab(next, true);
      }
    });
  });

  const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand('copy');
    field.remove();
    if (!copied) throw new Error('copy failed');
  };

  document.querySelectorAll('.copy').forEach((button) => {
    button.addEventListener('click', async () => {
      const original = button.textContent;
      try {
        await copyText(button.dataset.copy || '');
        button.textContent = 'Copied';
        button.classList.add('is-copied');
      } catch {
        button.textContent = 'Failed';
      }
      window.setTimeout(() => {
        button.textContent = original;
        button.classList.remove('is-copied');
      }, 1600);
    });
  });
})();
