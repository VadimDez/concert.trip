/**
 * Created by Vadym Yatsyuk on 24.06.17
 */

// @TODO will be changed before presentation.
const user = 'admin';
const password = 'admin1';

module.exports = {
  PORT: 3000,
  secrets: {
    session: 'secret'
  },
  spotify: {
    CLIENT_ID: 'aceb81be23b746b9a2f911d2808cc295',
    CLIENT_SECRET: '797405dc59964a2e928821112e488ca1'
  },
  booking: {
    username: 'b_munich_hackers17',
    password: 'f7u@9prYLjCZq,w]2Gd['
  },
  eventful: {
    APP_KEY: 'SP9tf2zGSWKS2rNH'
  },
  google: {
    API_KEY: 'AIzaSyAdQUnvp8L5CL9bOKRnpz2Ky1ubwBBeWEM'
  },
  MONGODB: `mongodb://${ user }:${ password }@ds129462.mlab.com:29462/concert-trip`
};
