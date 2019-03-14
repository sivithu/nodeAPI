import test from 'ava';
import request from 'request';
import axios from 'axios';

//test fonctionnel
test("La page d'index du site comprend bien un formulaire HTML", async t => {
  const response = await axios.get("https://mysterious-waters-98517.herokuapp.com");
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
      const response = await axios.post("https://mysterious-waters-98517.herokuapp.com/ville", { name : 'paris'});
      var test = response.data.toString().includes('Voici votre ville : paris');
      t.is(test, true);
    } catch (e) {
      t.fail("Une erreur s'est produite");
    }
})

//test d'intégration
test("la ville est inexistante", async t => {
    try {
      const response = await axios.post("https://mysterious-waters-98517.herokuapp.com/ville", { name : 'fzrgth'});
      var test = response.data.toString().includes('Voici votre ville : Non existant');
      t.is(test, true);
    } catch (e) {
      t.fail("Une erreur s'est produite");
    }
})
