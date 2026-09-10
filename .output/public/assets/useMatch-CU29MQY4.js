import { i as e, n as t } from "./jsx-runtime-Cltr0gcK.js";
import { F as n, n as r, x as i } from "./link-CKQMLqzL.js";
import { t as a } from "./useRouter-CwjitLz4.js";
var o = `__root__`,
  s = e(t(), 1),
  c = s.createContext(void 0),
  l = s.createContext(void 0),
  u = {};
function d(e, t) {
  let r = s.useRef();
  return (i) => {
    let a = e?.select ? e.select(i) : i;
    return (e?.structuralSharing ?? t.options.defaultStructuralSharing)
      ? (r.current = n(r.current, a))
      : a;
  };
}
function f(e) {
  let t = a(),
    n = s.useContext(e.from ? l : c),
    o = e.from ?? n,
    f = t.stores.getMatchStore(o),
    p = d(e, t),
    m = r(f, (e) => (e ? p(e) : u));
  if (m !== u) return m;
  (e.shouldThrow ?? !0) && i();
}
export { o as i, d as n, c as r, f as t };
