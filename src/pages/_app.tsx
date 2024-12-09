import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { NextIntlClientProvider } from 'next-intl';

const App = ({ Component, pageProps }: AppProps) => {
  const { locale } = useRouter();
  const { messages } = pageProps;

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone='Europe/Warsaw'>
      <Component {...pageProps} />
    </NextIntlClientProvider>
  );
};

export default App;
