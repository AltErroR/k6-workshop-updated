import { group, check } from 'k6';
import http from 'k6/http';
// @ts-ignore
 import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';;

// SWAGGER "PET STORE" API - https://petstore.swagger.io/#/

// npm install - to install dependencies
// npm run test - to run this test with npm script and with k6 debug requests mode (K6_HTTP_DEBUG=true|full)
// k6 run tests\test.ts - to run this test with k6 command

// Get API token from https://{GRAFANA_ACCOUNT_NAME}.grafana.net/a/k6-app/settings/api-token
//k6 cloud login --token <YOUR_API_TOKEN> --stack <GRAFANA_ACCOUNT_NAME> - to login to k6 cloud
//k6 cloud run tests\test.ts - to run this test in k6 cloud


// JSON.stringify(obj)  - Converts an object to a JSON string.
// JSON.parse(jsonString)  - Converts a JSON string to an object

// @ts-ignore  - for disabling TypeScript error

export const options = {
  vus: 1,
  iterations: 1,
};

export default function() {
  group('Default group', function () {
   
  const resp: any = http.get('https://petstore.swagger.io/v2/pet/findByStatus?status=available');
  check(resp, { 'status equals 200': (r) => r.status === 200 });
        console.log(`response Body: ${resp.body}`);
    

    const pets = JSON.parse(resp.body);
    const randomPet = randomItem(pets);
    console.log(`Random Pet: ${JSON.stringify(randomPet)}`);
    console.log(`Random Pet Name: ${randomPet.name}`);

    const foundPet = pets.find( (pet: any) => pet.name === randomPet.name) ?? 'somePet_NOT_FOUND';
    console.log(`Found Pet by Name: ${JSON.stringify(foundPet)}`);
    console.log(`Found Pet ID: ${foundPet.id}`);
  });
}
