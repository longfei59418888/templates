export function downloadMediaWithUrl(url: string, filename?: string) {
  const pathname = new URL(url).pathname;
  const name = pathname.split('/').pop() ?? '';
  const a = document.createElement('a');
  a.href = url;
  a.download = filename ?? name;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
