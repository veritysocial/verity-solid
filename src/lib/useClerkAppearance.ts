import { dark } from '@clerk/themes';

export function useClerkAppearance() {
  return {
    baseTheme: [dark],
    variables: {
      colorPrimary: 'hsl(217.2 91.2% 59.8%)',
      colorBackground: 'hsl(222.2 84% 4.9%)',
      colorText: 'hsl(210 40% 98%)',
      colorInputBackground: 'hsl(217.2 32.6% 17.5%)',
      colorInputText: 'hsl(210 40% 98%)',
      colorDanger: 'hsl(0 62.8% 30.6%)',
    },
  };
}
