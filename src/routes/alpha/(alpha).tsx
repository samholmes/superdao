import AlphaLayout from '~/components/alpha/AlphaLayout';

export default function AlphaRouteLayout(props: { children?: any }) {
  return (
    <AlphaLayout>
      {props.children}
    </AlphaLayout>
  );
}
