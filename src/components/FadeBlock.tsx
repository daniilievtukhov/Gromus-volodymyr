import { gsap } from "gsap";
import { ReactNode, useEffect, useRef, useState } from "react";

export const FadeBlock = ({ children }: { children: ReactNode }) => {
  const ref = useRef(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!ref.current || done) return;

    gsap.from(ref.current, { opacity: 0, y: -10, duration: 1, onComplete: () => setDone(true) });
  }, [done]);

  return <div ref={ref}>{children}</div>;
};
