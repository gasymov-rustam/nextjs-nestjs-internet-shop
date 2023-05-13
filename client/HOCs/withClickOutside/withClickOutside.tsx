import {
  ForwardRefExoticComponent,
  MutableRefObject,
  RefAttributes,
  useRef,
  useState,
} from 'react';
import { useAddEventListener } from '../../hooks';

interface WithClickOutsideProps {
  open: boolean;
  setOpen: (arg: boolean) => void;
}

export function withClickOutside(
  WrappedComponent: ForwardRefExoticComponent<
    WithClickOutsideProps & RefAttributes<HTMLDivElement>
  >
) {
  const Component = () => {
    const [open, setOpen] = useState(false);
    const ref = useRef() as MutableRefObject<HTMLDivElement>;

    useAddEventListener({
      type: 'mousedown',
      cb: (e: Event) => {
        if (!ref.current.contains(e.target as HTMLDivElement)) {
          setOpen(false);
        }
      },
    });

    return <WrappedComponent open={open} setOpen={setOpen} ref={ref} />;
  };

  return Component;
}
