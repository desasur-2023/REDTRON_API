
// import { User } from "./domain/user";
// import controller from "./controllers/user.controller";
// import faker from "faker";

// const createMultipleRandom = async (count: number) => {
  
//   for (let i = 0; i < count; i++) {
//     const username = faker.internet.userName();
//     const phone = faker.phone.phoneNumber();
//     const email = faker.internet.email();
//     const percentAgreement = 40;

//     const user  = {
//       username,
//       phone,
//       email,
//       percent_agreement: percentAgreement,
//     };

//     await controller.create(user as User);
//   }

// };

// export default { createMultipleRandom };

import axios from 'axios';
import { User } from "./domain/user";
import controller from "./controllers/user.controller";

const createMultipleRandom = async (count: number) => {
    try {
      const response = await axios.get(`https://randomuser.me/api/?results=${count}`);
      const randomUsers = response.data.results;
  
      for (const randomUser of randomUsers) {
        const username = randomUser.login.username;
        const phone = randomUser.phone;
        const email = randomUser.email;
        const percentAgreement = Math.floor(Math.random() * 100) + 1;
  
        const user= {
          username,
          phone,
          email,
          percent_agreement: percentAgreement,
        };
  
        await controller.create(user as User);
      }
    } catch (error) {
      console.error('Error al crear los usuarios:', error);
    }
  };

export default {createMultipleRandom}