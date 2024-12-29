import { NextUIProvider } from '@nextui-org/system';

export default function NextUiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
