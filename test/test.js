import test from 'ava';
import request from 'request';
import axios from 'axios';
import nock from 'nock';
var express = require('express');
const port = 3000;
const app = require('./../app.js');
const router = require('./../routes/index');
app.use('/ville', router);

app.listen(port, () => {

//test fonctionnel
  test("La page d'index du site comprend bien un formulaire HTML", async t => {
    const response = await axios.get("http://localhost:3000");
      try {
          var test = response.data.toString().includes('<!DOCTYPE html>');
          t.is(test, true)
      } catch (e) {
        t.fail("Une erreur s'est produite");
      }
  });

  //test fonctionnel
  test("la page “ville” contient bien le nom de la ville qui lui a été passé en paramètre POST", async t => {
      try {
        var ville_name = 'paris'
        nock('https://geocode.xyz')
        .get(`/${ville_name}?json=1&auth=375272267982458272384x1967`)
        .reply(200, { latt: 4, longt: 30 });
        const response = await axios.post("http://localhost:3000/ville", { name : ville_name});
        var test = response.data.toString().includes('Voici votre ville : paris');
        t.is(test, true);
      } catch (e) {
        t.fail("Une erreur s'est produite");
      }
  })

  //test fonctionnel
  test("la ville est inexistante", async t => {
      try {
        var ville_name = 'fzrgth';
        nock('https://geocode.xyz')
        .get(`/${ville_name}?json=1&auth=375272267982458272384x1967`)
        .reply(200, { latt: 0.00000, longt: 0.00000 });
        const response = await axios.post("http://localhost:3000/ville", { name : ville_name});
        var test = response.data.toString().includes('Voici votre ville : Non existant');
        t.is(test, true);
      } catch (e) {
        t.fail("Une erreur s'est produite");
      }
  })

  test('POST /ville endpoint returns lattitude for existing city', async (t) => {
      const city = 'berlin';
      nock('https://geocode.xyz')
      .get(`/${city}?json=1&auth=375272267982458272384x1967`)
      .reply(200, { latt: 4, longt: 30 });
      const { data } = await axios.post('http://localhost:3000/ville', { name : city });
      console.log(data);
      t.true(data.includes(city));
  });

  test('POST /ville endpoint returns error for unknown city', async (t) => {
      const city = 'berlin';
      nock('https://geocode.xyz')
      .get(`/${city}?json=1&auth=375272267982458272384x1967`)
      .reply(404, { latt: 0, longt: 0 });
      const { data } = await axios.post('http://localhost:3000/ville', { name : city });
      console.log(data);
      t.true(data.includes('Non existant'));
  });

  test('POST /ville endpoint returns error 404', async (t) => {
      const city = 'berlin';
      nock('https://geocode.xyz')
      .get(`/${city}?json=1&auth=375272267982458272384x1967`)
      .reply(404, {longt : 5});
      const { data } = await axios.post('http://localhost:3000/ville', { name : city });
      console.log(data);
      t.true(data.includes('GeoCode is down'));
  });
})
