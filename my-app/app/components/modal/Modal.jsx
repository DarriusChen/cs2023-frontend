'use client';
import { useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import mstyle from '@/app/styles/modal.module.css';
import '@/app/styles/haha.module.css'

export default function Modal({ children }) {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
        className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black-60"

      // className={mstyle.modalmain}
      onClick={onClick}
    >
      <div
        ref={wrapper}

        className="absolute top-12 left-12 -translate-x-12 -translate-y-12 w-full p-6"

        // className="position-absolute top-50 start-50 w-50 h-50 overflow-scroll translate-middle col-12 bg-white rounded "
      >
        {children}
      </div>
    </div>
  );
}
