// 画像の拡大表示と目次のハイライト（外部通信なし）
(() => {
  const dlg = document.getElementById('viewer');
  if (dlg && dlg.showModal) {
    const img = dlg.querySelector('img');
    const cap = dlg.querySelector('figcaption');
    document.addEventListener('click', e => {
      const a = e.target.closest('a.zoom');
      if (!a || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      img.src = a.getAttribute('href');
      img.alt = a.dataset.caption || '';
      cap.textContent = a.dataset.caption || '';
      dlg.showModal();
    });
    dlg.querySelector('.close').addEventListener('click', () => dlg.close());
    dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener('close', () => { img.removeAttribute('src'); });
  }

  const links = [...document.querySelectorAll('.toc a')];
  if (!('IntersectionObserver' in window) || !links.length) return;
  const map = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
  const io = new IntersectionObserver(entries => {
    for (const en of entries) {
      if (!en.isIntersecting) continue;
      links.forEach(a => a.classList.remove('on'));
      const a = map.get(en.target.id);
      if (a) a.classList.add('on');
    }
  }, { rootMargin: '-30% 0px -60% 0px' });
  document.querySelectorAll('main section[id]').forEach(s => io.observe(s));
})();
