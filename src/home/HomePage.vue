<template>
<div>


  <div class="row mx-2">
    <div class="mb-3 col-2">
      <label for="exampleFormControlInput1" class="form-label">Fahrplandatum</label>
      <input type="date" class="form-control" id="exampleFormControlInput1" value="18.03.2021">
    </div>

    <div class="mb-3 col-3">
      <label for="exampleFormControlInput1" class="form-label">Versandbahnhof</label>
      <input type="Text" class="form-control" id="exampleFormControlInput1" value="WSBA (TL Diekhof)">
    </div>

    <div class="mb-3 col-3">
      <label for="exampleFormControlInput1" class="form-label">Bestimmungsbahnhof</label>
      <input type="Text" class="form-control" id="exampleFormControlInput1" value="NRHF">
    </div>

    <div class="mb-3 col-3">
      <label for="exampleFormControlInput1" class="form-label">Wagenmeister</label>
      <input type="Text" class="form-control" id="exampleFormControlInput1" value="Mustermann">
    </div>
  </div>

  <div class="row mx-2">
    <div class="mb-3 col-2">
      <label for="exampleFormControlInput1" class="form-label">Zugnummer</label>
      <input type="number" class="form-control" id="exampleFormControlInput1" value="18.03.2021">
    </div>

    <div class="form-check col-3">
      <p></p>
      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
      <label class="form-check-label" for="flexCheckDefault">Zugnummer aktuell unbekannt</label>
    </div>

    <div class="mb-3 col-3">
      <label for="exampleFormControlInput1" class="form-label">Kundenreferenz</label>
      <input type="Text" class="form-control" id="exampleFormControlInput1" value="exABC1223">
    </div>

    <div class="mb-3 col-3">
      <label for="exampleFormControlInput1" class="form-label">Bemerkungen für gesamten Zug</label>
      <input type="Text" class="form-control" id="exampleFormControlInput1" value="Gef. 3, UN 1202/30">
    </div>
  </div>

  
  <ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link active" id="betrieb-tab" data-bs-toggle="tab" data-bs-target="#betrieb" type="button" role="tab" aria-controls="betrieb" aria-selected="true">Betriebsdaten</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="reihung-tab" data-bs-toggle="tab" data-bs-target="#reihung" type="button" role="tab" aria-controls="reihung" aria-selected="false">Wagenreihung anpassen</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="wagendaten-tab" data-bs-toggle="tab" data-bs-target="#wagendaten" type="button" role="tab" aria-controls="wagendaten" aria-selected="false">Wagendaten</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="zusammenfassung-tab" data-bs-toggle="tab" data-bs-target="#zusammenfassung" type="button" role="tab" aria-controls="zusammenfassung" aria-selected="false">Klassische Ansicht</button>
    </li>
  </ul>
  <div class="tab-content" id="myTabContent">
    <div class="tab-pane fade show active" id="betrieb" role="tabpanel">
      <div class="container-fluid">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Wagennummer</th>
              <th scope="col">Ladegewicht</th>
              <th scope="col">Gesamtgewicht</th>
              <th scope="col">Bremsstellung</th>
              <th scope="col">Bremsgewicht</th>
              <th scope="col">Versandbahnhof</th>
              <th scope="col">Bestimmungsbahnhof</th>
              <th scope="col">Bemerkung</th>
              <th scope="col">Bremse aus</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>37 80 7840 893-7</td>
              <td><input class="col-4" type="text" value="67"></td>
              <td>89</td>
              <td>
                <label class="form-check-label">P</label>
                <div class="form-check form-check-inline form-switch">
                  <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                  <label class="form-check-label" for="flexSwitchCheckDefault">G</label>
                </div>
              </td>
              <td><input class="col-4" type="text" value="59"></td>
              <td><input type="text" value="WSBA"></td>
              <td><input type="text" value="NRHF"></td>
              <td><input type="text" value="Gef. 3, UN 1202/30"></td>
              <td>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                  <label class="form-check-label" for="flexCheckDefault">aus</label>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>37 80 7840 872-1</td>
              <td><input class="col-4" type="text" value="68"></td>
              <td>90</td>
              <td><label class="form-check-label">P</label>
                <div class="form-check form-check-inline form-switch">
                  <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                  <label class="form-check-label" for="flexSwitchCheckDefault">G</label>
                </div>
              </td>
              <td><input class="col-4" type="text" value="59"></td>
              <td><input type="text" value="WSBA"></td>
              <td><input type="text" value="NRHF"></td>
              <td><input type="text" value="Gef. 3, UN 1202/30"></td>
              <td>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                  <label class="form-check-label" for="flexCheckDefault">aus</label>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>37 80 7840 789-6</td>
              <td><input class="col-4" type="text" value="66"></td>
              <td>88</td>
              <td><label class="form-check-label">P</label>
                <div class="form-check form-check-inline form-switch">
                  <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                  <label class="form-check-label" for="flexSwitchCheckDefault">G</label>
                </div>
              </td>
              <td><input class="col-4" type="text" value="58"></td>
              <td><input type="text" value="WSBA"></td>
              <td><input type="text" value="NRHF"></td>
              <td><input type="text" value="Gef. 3, UN 1202/30"></td>
              <td>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                  <label class="form-check-label" for="flexCheckDefault">aus</label>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">+</th>
              <td><input type="text" value="37 80 7840"></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>


      <div class="container">
        <div class="card col-4 p-2">
          <h5>Bremsgewicht manuell erfassen</h5>

          <div class="col-6">
            <label for="maxBremsgewicht">Bremsgewicht</label>
            <input class="form-control" type="number" id="maxBremsgewicht">
          </div>

          <h5 class="mt-3">Wagendaten für automatische Berechnung</h5>
        <div class="form-check">
          <!-- Wenn gesetzt, gebe maxBremsgewicht frei und disable leerBremsgewicht, Umstellgewicht, beladenBremsgewicht -->
          <input class="form-check-input" type="radio" name="Lastwechsel" id="autoLastwechsel" checked>
          <label class="form-check-label" for="autoLastwechsel">
            Automatische Lastabbremsung
          </label>
        </div>


        <div class="col-6 mb-3">
          <label for="maxBremsgewicht">max. Bremsgewicht (in t)</label>
          <input class="form-control" type="number" id="maxBremsgewicht">
        </div>


        <div class="form-check">
          <!-- Wenn gesetzt, gebe leerBremsgewicht, Umstellgewicht, beladenBremsgewicht frei und disble maxBremsgewicht -->
          <input class="form-check-input" type="radio" name="Lastwechsel" id="manLastwechsel">
          <label class="form-check-label" for="manLastwechsel">
            Manuelle Lastabbremsung
          </label>
        </div>


        <div class="col-6">
            <label for="leerBremsgewicht" class="col-form-label">Bremsgewicht leer (in t)
            <input class="form-control" type="number" id="leerBremsgewicht"></label>

            <label for="Umstellgewicht" class="col-form-label">Umstellgewicht (in t)
            <input class="form-control" type="number" id="Umstellgewicht"></label>

            <label for="maxBremsgewicht" class="col-form-label">Bremsgewicht beladen (in t)
            <input class="form-control" type="number" id="beladenBremsgewicht"></label>

</div>
      </div>
      </div>
    </div>


  <div class="tab-pane fade" id="reihung" role="tabpanel">
    <div class="container-fluid">
      <button class="btn btn-secondary my-1">Wagenreihung umdrehen</button>
      <button class="btn btn-secondary my-1">alle Wagen leeren</button>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Neue Position</th>
            <th scope="col">Wagennummer</th>
            <th scope="col">Ladegewicht</th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td><input type="text" class="col-sm-2"></td>
            <td>37 80 7840 893-7</td>
            <td><input class="col-4" type="text" value="59"></td>
            <td></td>
            <td><button class="btn btn-info">↓</button></td>
            <td><button class="btn btn-danger">🗑️</button></td>

          </tr>
          <tr>
            <th scope="row">2</th>
            <td><input type="text" class="col-sm-2"></td>
            <td>37 80 7840 872-1</td>
            <td><input class="col-4" type="text" value="59"></td>
            <td><button class="btn btn-info">↑</button></td>
            <td><button class="btn btn-info">↓</button></td>
            <td><button class="btn btn-danger">🗑️</button></td>

          </tr>
          <tr>
            <th scope="row">3</th>
            <td><input type="text" class="col-sm-2"></td>
            <td>37 80 7840 789-6</td>
            <td><input class="col-4" type="text" value="58"></td>
            <td><button class="btn btn-info">↑</button></td>
            <td></td>
            <td><button class="btn btn-danger">🗑️</button></td>

          </tr>
          <tr>
            <th scope="row">+</th>
            <td></td>
            <td><input type="text" value="37 80 7840"></td>
            <td></td>
            <td></td>
            <td></td>

          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="tab-pane fade" id="wagendaten" role="tabpanel">
    <div class="container-fluid">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Wagennummer</th>
            <th scope="col">Gattung</th>
            <th scope="col">Achsen</th>
            <th scope="col">LüP</th>
            <th scope="col">Eigengewicht</th>
            <th scope="col">max. Bremsgewicht</th>
            <th scope="col">Bremsgewicht leer</th>
            <th scope="col">Umstellgewicht</th>
            <th scope="col">Bremsgewicht beladen</th>
            <th scope="col">Handbremse</th>
            <th scope="col">Scheibenbremse</th>
            <th scope="col">Verbundstoffsohle</th>
            <th scope="col">Bremse aus</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>37 80 7840 893-7</td>
            <td>Za</td>
            <td>4</td>
            <td>15,1</td>
            <td>22</td>
            <td>59</td>
            <td></td>
            <td></td>
            <td></td>
            <td>H</td>
            <td></td>
            <td>LL</td>
            <td>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">aus</label>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>37 80 7840 872-1</td>
            <td>Za</td>
            <td>4</td>
            <td>15,1</td>
            <td>22</td>
            <td>59</td>
            <td></td>
            <td></td>
            <td></td>
            <td>H</td>
            <td></td>
            <td>K</td>
            <td>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">aus</label>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>37 80 7840 789-6</td>
            <td>Za</td>
            <td>4</td>
            <td>15,0</td>
            <td>22</td>
            <td>58</td>
            <td></td>
            <td></td>
            <td></td>
            <td>(H)</td>
            <td>D</td>
            <td></td>
            <td>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">aus</label>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">+</th>
            <td><input type="text" value="37 80 7840"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>




  <div class="tab-pane fade" id="zusammenfassung" role="tabpanel">
    <div class="container-fluid">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Wagennummer</th>
            <th scope="col">Gattung</th>
            <th scope="col">Achsen</th>
            <th scope="col">LüP</th>
            <th scope="col">Eigengewicht</th>
            <th scope="col">Ladegewicht</th>
            <th scope="col">Gesamtgewicht</th>
            <th scope="col">Bremsstellung</th>
            <th scope="col">Bremsgewicht</th>
            <th scope="col">Versandbahnhof</th>
            <th scope="col">Bestimmungsbahnhof</th>
            <th scope="col">Bemerkung</th>
            <th scope="col">Handbremse</th>
            <th scope="col">Scheibenbremse</th>
            <th scope="col">Verbundstoffsohle</th>
            <th scope="col">Bremse aus</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>37 80 7840 893-7</td>
            <td>Za</td>
            <td>4</td>
            <td>15,1</td>
            <td>22</td>
            <td>67</td>
            <td>89</td>
            <td>
              <label class="form-check-label">P</label>
              <div class="form-check form-check-inline form-switch">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                <label class="form-check-label" for="flexSwitchCheckDefault">G</label>
              </div>
            </td>
            <td>59</td>
            <td>WSBA</td>
            <td>NRHF</td>
            <td>Gef. 3, UN 1202/30</td>
            <td>H</td>
            <td></td>
            <td>LL</td>
            <td>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">aus</label>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>37 80 7840 872-1</td>
            <td>Za</td>
            <td>4</td>
            <td>15,1</td>
            <td>22</td>
            <td>68</td>
            <td>90</td>
            <td><label class="form-check-label">P</label>
              <div class="form-check form-check-inline form-switch">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                <label class="form-check-label" for="flexSwitchCheckDefault">G</label>
              </div>
            </td>
            <td>59</td>
            <td>WSBA</td>
            <td>NRHF</td>
            <td>Gef. 3, UN 1202/30</td>
            <td>H</td>
            <td></td>
            <td>K</td>
            <td>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">aus</label>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>37 80 7840 789-6</td>
            <td>Za</td>
            <td>4</td>
            <td>15,0</td>
            <td>22</td>
            <td>66</td>
            <td>88</td>
            <td><label class="form-check-label">P</label>
              <div class="form-check form-check-inline form-switch">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                <label class="form-check-label" for="flexSwitchCheckDefault">G</label>
              </div>
            </td>
            <td>58</td>
            <td>WSBA</td>
            <td>NRHF</td>
            <td>Gef. 3, UN 1202/30</td>
            <td>(H)</td>
            <td>D</td>
            <td></td>
            <td>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">aus</label>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">+</th>
            <td><input type="text" value="37 80 7840"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>


  </div>
  </div>







</div>
</template>

<script>

import { mapState, mapActions } from 'vuex'
import "vue-select/dist/vue-select.css";

import { Datetime } from 'vue-datetime'
// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'
import { Validator } from 'vee-validate';



export default {

    data () {
        return {}
    },
computed: {

},
    mounted () {
    },
    methods: {
      
    }
};
</script>

<style>
@import '/node_modules/vue-datetime/dist/vue-datetime.css';

</style>
