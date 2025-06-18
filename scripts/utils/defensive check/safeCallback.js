export function safeCallback(cb) {
  if (typeof cb === 'function') cb();
}
