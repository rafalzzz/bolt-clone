import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import cookie from 'cookie';

import { EDarkMode } from '@/shared/enums/cookie-values';

import { DARK_MODE } from '@/shared/consts/cookie-names';

type TDocumentInitialProps = DocumentInitialProps & {
  darkMode: boolean;
};

class MyDocument extends Document<TDocumentInitialProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<TDocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    const cookies = ctx.req ? cookie.parse(ctx.req.headers.cookie || '') : {};
    const darkMode = cookies[DARK_MODE] === EDarkMode.ENABLED;

    return { ...initialProps, darkMode };
  }

  render() {
    const { darkMode } = this.props;

    return (
      <Html className={darkMode ? 'dark' : undefined}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
