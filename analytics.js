(() => {
  const pending = [];
  const script = document.querySelector('script[data-site="QZSJEGHE"]');
  function track(name) {
    try {
      if (typeof window.fathom?.trackEvent === 'function') window.fathom.trackEvent(name);
      else if (pending.length < 20) pending.push(name);
    } catch (_) { /* Analytics must never interrupt the visitor. */ }
  }
  window.nbtTrackEvent = track;
  function flush() {
    if (typeof window.fathom?.trackEvent !== 'function') return;
    pending.splice(0).forEach(track);
  }
  script?.addEventListener('load', flush);
  flush();

  document.addEventListener('click', event => {
    const target = event.target.closest('a,button');
    if (!target) return;
    if (target.dataset.filter) {
      track('Episode Topic Filter ' + target.dataset.filter);
      return;
    }
    if (target.tagName !== 'A') return;
    let url;
    try { url = new URL(target.href, location.href); } catch (_) { return; }
    const host = url.hostname;
    if (host === 'podcasts.apple.com') track('Apple Podcasts Link Clicked');
    else if (host === 'www.youtube.com' || host === 'youtube.com') track('YouTube Link Clicked');
    else if (host === 'www.yournbt.com' && url.hash.startsWith('#block-')) track('Newsletter Signup Link Clicked');
    else if (url.protocol === 'mailto:') track('Email Contact Link Clicked');
    else if (host === 'amzn.to') track('Book Recommendation Clicked');
    else if (host === 'open.spotify.com' || host === 'www.smartless.com') track('Podcast Recommendation Clicked');
    else if (['www.nvidia.com','www.anthropic.com','coursiv.io'].includes(host)) track('AI Learning Resource Clicked');
    else if (host === 'www.linkedin.com') {
      track(url.pathname.startsWith('/help/') ? 'Networking Resource Clicked' : 'LinkedIn Link Clicked');
    } else if (host === 'www.instagram.com') track('Instagram Link Clicked');
  });

  const form = document.querySelector('.contact-form');
  form?.addEventListener('submit', event => {
    if (event.defaultPrevented || !form.checkValidity() || location.hostname.endsWith('.chatgpt.site')) return;
    track('Contact Form Submitted');
    try { sessionStorage.setItem('nbt-contact-pending', String(Date.now())); } catch (_) {}
  });
  if (/^\/thank-you\/?$/.test(location.pathname)) {
    try {
      const pendingAt = Number(sessionStorage.getItem('nbt-contact-pending'));
      sessionStorage.removeItem('nbt-contact-pending');
      if (pendingAt && Date.now() - pendingAt >= 0 && Date.now() - pendingAt < 600000) {
        track('Contact Thank You Reached');
      }
    } catch (_) {}
  }
})();
