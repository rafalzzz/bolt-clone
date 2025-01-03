import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

type TCompleteRegistrationEmailTemplate = {
  token: string;
};

const PROTOCOL = process.env.ENVIRONMENT === 'development' ? 'http' : 'https';

const baseUrl = process.env.DOMAIN_URL
  ? `${PROTOCOL}://${process.env.DOMAIN_URL}/en/driver/complete-registration/`
  : '';

export const CompleteRegistrationEmailTemplate = ({
  token,
}: TCompleteRegistrationEmailTemplate) => (
  <Html>
    <Head />
    <Preview>
      An app that allows you to work as a driver. You decide when and how much you want to work.
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={logo}>BoltCopy</Text>
        <Text style={paragraph}>Hi!</Text>
        <Text style={paragraph}>
          Welcome to BoltCopy! Decide for yourself when and how much you want to work. To continue
          with the registration, click the button below.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href={baseUrl + token} aria-label='Complete the registration'>
            Complete the registration
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          The BoltCopy team
        </Text>
      </Container>
    </Body>
  </Html>
);

export default CompleteRegistrationEmailTemplate;

const main = {
  backgroundColor: '#ffffff',
  fontFamily: `'Roboto', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
};

const logo = {
  fontSize: '32px',
  color: '#000',
  fontWeight: '900',
  marginBottom: '30px',
  textAlign: 'center' as const,
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#374151',
};

const btnContainer = {
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#4338ca',
  borderRadius: '10px',
  color: '#f3f4f6',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px',
};
