export type TCompleteDriverRegistrationPage = {
  params: Promise<{ token: string }>;
};

const CompleteDriverRegistrationPage = async ({ params }: TCompleteDriverRegistrationPage) => {
  const { token } = await params;

  return <div>{token}</div>;
};

export default CompleteDriverRegistrationPage;
