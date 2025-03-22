const getDriverCredentials = (email: string, password: string) => ({
  email,
  password,
  options: {
    data: {
      role: 'driver',
      carAdded: false,
      faceAuth: false,
    },
  },
});

export default getDriverCredentials;
