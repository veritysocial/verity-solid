import { A, Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { ClerkProvider, SignUpButton, SignedIn, SignedOut, UserButton } from 'clerk-solidjs';
import { Suspense } from 'solid-js/web';
import { buttonVariants } from './components/ui/button';
import VerityLogo from './components/verityLogo';
import { useClerkAppearance } from './lib/useClerkAppearance';

import './app.css';

const Layout = (props) => {
  return (
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <Suspense>
        <header class="fixed top-4 left-4">
          <SignedOut>
            <SignUpButton mode="modal">
              <div class={`${buttonVariants({ variant: 'default' })} cursor-pointer`}>Sign Up</div>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                ...useClerkAppearance(),
                elements: {
                  userButtonAvatarBox: {
                    height: '48px',
                    width: '48px',
                  },
                },
              }}
            />
          </SignedIn>
        </header>
        <div class="text-foreground fixed top-4 right-4 flex flex-col items-end">
          <A href="/">
            <VerityLogo />
          </A>
          <p class="w-fit">
            by{' '}
            <a
              href="https://www.arithefirst.com/"
              class="text-primary hover:text-primary/90 mr-2 underline"
              target="_blank"
            >
              April Hall
            </a>
          </p>
        </div>
        {props.children}
      </Suspense>
    </ClerkProvider>
  );
};

export default function App() {
  return (
    <Router root={Layout}>
      <FileRoutes />
    </Router>
  );
}
