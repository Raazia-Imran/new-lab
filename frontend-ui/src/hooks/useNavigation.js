import { useEffect, useState } from "react";
const normalize = (p) => (p.endsWith("/") ? p : p + "/");
export default function useNavigation(initialPath) {
  const [path, setPath] = useState(initialPath);
  useEffect(() => {
    const pop = () => setPath(normalize(location.pathname));
    const click = (e) => {
      const a = e.target.closest("a");
      if (
        !a ||
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        a.target ||
        a.hasAttribute("download")
      )
        return;
      const u = new URL(a.href, location.href);
      if (
        u.origin !== location.origin ||
        !a.getAttribute("href")?.startsWith("/") ||
        u.pathname.includes(".")
      )
        return;
      const next = normalize(u.pathname);
      e.preventDefault();
      history.pushState({}, "", u.pathname + u.hash);
      const update = () => {
        setPath(next);
        if (u.hash)
          requestAnimationFrame(() =>
            document
              .getElementById(decodeURIComponent(u.hash.slice(1)))
              ?.scrollIntoView({
                behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "instant"
                  : "smooth",
              }),
          );
        else window.scrollTo({ top: 0, behavior: "instant" });
      };
      if (
        document.startViewTransition &&
        !matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        document.startViewTransition(update);
      else update();
    };
    document.addEventListener("click", click);
    window.addEventListener("popstate", pop);
    return () => {
      document.removeEventListener("click", click);
      window.removeEventListener("popstate", pop);
    };
  }, []);
  return path;
}
