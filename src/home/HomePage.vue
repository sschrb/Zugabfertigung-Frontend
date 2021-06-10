<template>
  <div>
    <h3>Frachtbrief anlegen</h3>
    <div class="card mb-2">
      <div class="card-body">
        <div class="form-group"> <!-- Pflichtfeld für spätere Bezeichnung des Frachtbriefes -->
          <label for="">Referenz Nummer (Name des Frachtbriefes)</label>
          <input type="text" v-model="refnr" name="Referenz" v-validate="{ required: true}" class="form-control" :class="{ 'is-invalid': submitted && errors.has('Referenz') }"/>
                <div v-if="submitted && errors.has('Referenz')" class="invalid-feedback">{{ errors.first('Referenz') }}</div>
        </div>
      </div>
    </div>


    <div class="card mb-2">
      <div class="card-body">
        <div class="form-group">
          <label for="erklarung">Vorlage auswählen (optional)</label>
          <div class="row">

            <div class="col">
              <em v-if="frachtbriefs">
                <select class="form-control" v-model="vorlagedata">
                  <option v-bind:value="vorlagedata_def">keine</option>
                  <option v-for="frachtbrief in frachtbriefs" v-bind:value="frachtbrief" v-bind:key="frachtbrief.id">{{ frachtbrief.frachtbriefdata.refnr }} </option>
                </select>
              </em>
            </div>

            <div class="col-auto">
              <button class="btn btn-primary" v-on:click="vorlageLaden()" >Vorlage laden</button>
            </div>

          </div>
        </div>

      </div>
    </div>

    <form @submit.prevent="handleSubmit">

      <!-- ############################################################ ABSENDER ############################################################ -->
      <div class="row">
        <div class="col-sm-6">
          <div class="card mb-2">
            <div class="card-body">
              <div class="form-group">
                <label for="adresse">Absender</label>
                <select class="form-control" v-model="adresse1">
                  <option v-bind:value="adresse_def"></option>
                  <option v-for="adresse in adressen" v-bind:value="adresse" v-bind:key="adresse.id">{{ adresse.name }}</option>
                </select>

                <button class="btn btn-link py-0" v-on:click="viewAdresse1=!viewAdresse1">Details anzeigen</button>
              </div>


              <em v-if="viewAdresse1">
                <div class="form-group">
                  <label for="">Name</label>
                  <input type="text" v-model="adresse1.name" disabled class="form-control" />

                  <label for="">Straße und Hausnummer</label>
                  <input type="text" v-model="adresse1.strasse" disabled class="form-control" />


                  <label for="">PLZ und Ort</label>
                  <input type="text" v-model="adresse1.ort" disabled class="form-control" />


                  <label for="">E-Mailadresse</label>
                  <input type="text" v-model="adresse1.mail" disabled class="form-control" />

                  <label for="">Telefonnummer</label>
                  <input type="text" v-model="adresse1.telefon" disabled class="form-control" />
                </div>
              </em>
            </div>
          </div>
        </div>



        <!-- ############################################################ EMPFÄNGER ############################################################ -->
        <div class="col-sm-6">
          <div class="card mb-2">
            <div class="card-body">
              <div class="form-group">
                <label for="adresse">Empfänger</label>
                <select class="form-control" v-model="adresse2">
                  <option v-bind:value="adresse_def"></option>
                  <option v-for="adresse in adressen" v-bind:value="adresse" v-bind:key="adresse.id">{{ adresse.name }}</option>
                </select>

                <button class="btn btn-link py-0" v-on:click="viewAdresse2=!viewAdresse2">Details anzeigen</button>
              </div>


              <em v-if="viewAdresse2">
                <div class="form-group">
                  <label for="">Name</label>
                  <input type="text" v-model="adresse2.name" disabled class="form-control" />

                  <label for="">Straße und Hausnummer</label>
                  <input type="text" v-model="adresse2.strasse" disabled class="form-control" />

                  <label for="">PLZ und Ort</label>
                  <input type="text" v-model="adresse2.ort" disabled class="form-control" />

                  <label for="">E-Mailadresse</label>
                  <input type="text" v-model="adresse2.mail" disabled class="form-control" />

                  <label for="">Telefonnummer</label>
                  <input type="text" v-model="adresse2.telefon" disabled class="form-control" />
                </div>
              </em>
            </div>
          </div>
        </div>
      </div>


      <!-- ############################################################ ABGANGSBAHNHOF ############################################################ -->
      <div class="row">
        <div class="col-sm-6">

          <div class="card mb-2">
            <div class="card-body">

              <div class="form-group">
                <label for="">Abgangsbahnhof</label>


                  <select class="form-control" v-model="bahnhof1">
                    <option v-bind:value="bahnhof_def"></option>
                    <option v-for="bahnhof in bahnhoefe" v-bind:value="bahnhof" v-bind:key="bahnhof.id">{{ bahnhof.name }}</option>
                  </select>




                <button class="btn btn-link py-0" v-on:click="viewBahnhof1=!viewBahnhof1">Details anzeigen</button>
              </div>


              <em v-if="viewBahnhof1">
                <div class="form-group">
                  <label for="">Name</label>
                  <input type="text" v-model="bahnhof1.name" disabled class="form-control" />

                  <label for="">Bahnhofscode</label>
                  <input type="text" v-model="bahnhof1.bahnhofscode" class="form-control" disabled />

                  <label for="">Ländercode</label>
                  <input type="text" v-model="bahnhof1.laendercode" class="form-control" disabled />

                  <label for="">Land</label>
                  <input type="text" v-model="bahnhof1.land" class="form-control" disabled />
                </div>
              </em>

              <div class="form-group">

                <label for="adresse">Beförderer</label>

                <select class="form-control" v-model="evu1">
                  <option v-bind:value="evu_def"></option>
                  <option v-for="evu in evus" v-bind:value="evu" v-bind:key="evu.id">{{ evu.name }}</option>
                </select>

                <button class="btn btn-link py-0" v-on:click="viewEvu1=!viewEvu1">Details anzeigen</button>
              </div>


              <em v-if="viewEvu1">
                <div class="form-group">
                  <label for="">Name</label>
                  <input type="text" v-model="evu1.name" class="form-control" disabled />

                  <label for="">Kurzbezeichnung</label>
                  <input type="text" v-model="evu1.short" class="form-control" disabled />

                  <label for="">EVU Code</label>
                  <input type="text" v-model="evu1.code" class="form-control" disabled />
                </div>
              </em>

            </div>
          </div>
        </div>

        <!-- ############################################################ ZIELBAHNHOF ############################################################ -->
        <div class="col-sm-6">
          <div class="card mb-2">
            <div class="card-body">
              <div class="form-group">
                <label for="adresse">Zielbahnhof</label>
                <select class="form-control" v-model="bahnhof7">
                  <option v-bind:value="bahnhof_def"></option>
                  <option v-for="bahnhof in bahnhoefe" v-bind:value="bahnhof" v-bind:key="bahnhof.id">{{ bahnhof.name }}</option>
                </select>

                <button class="btn btn-link py-0" v-on:click="viewBahnhof7=!viewBahnhof7">Details anzeigen</button>
              </div>
              <em v-if="viewBahnhof7">
                <div class="form-group">
                  <label for="">Name</label>
                  <input type="text" v-model="bahnhof7.name" class="form-control" disabled />

                  <label for="">Bahnhofscode</label>
                  <input type="text" v-model="bahnhof7.bahnhofscode" class="form-control" disabled />

                  <label for="">Ländercode</label>
                  <input type="text" v-model="bahnhof7.laendercode" class="form-control" disabled />

                  <label for="">Land</label>
                  <input type="text" v-model="bahnhof7.land" class="form-control" disabled />
                </div>
              </em>

            </div>
          </div>
        </div>
      </div>

      <button class="btn btn-primary mb-2" v-on:click="zwBahnhof1=!zwBahnhof1">1. Zwischenbahnhof hinzufügen</button>

      <!-- ############################################################ 1. Zwischenbahnhof ############################################################ -->
      <em v-if="zwBahnhof1">
        <div class="card mb-2">
          <div class="card-body">

            <div class="form-group">
              <label for="adresse">1. Zwischenbahnhof</label>
              <select class="form-control" v-model="bahnhof2">
                <option v-bind:value="bahnhof_def"></option>
                <option v-for="bahnhof in bahnhoefe" v-bind:value="bahnhof" v-bind:key="bahnhof.id">{{ bahnhof.name }}</option>
              </select>

              <button class="btn btn-link py-0" v-on:click="viewBahnhof2=!viewBahnhof2">Details anzeigen</button>
            </div>



            <em v-if="viewBahnhof2">
              <div class="form-group">
                <label for="">Name</label>
                <input type="text" v-model="bahnhof2.name" class="form-control" disabled />

                <label for="">Bahnhofscode</label>
                <input type="text" v-model="bahnhof2.bahnhofscode" class="form-control" disabled />

                <label for="">Ländercode</label>
                <input type="text" v-model="bahnhof2.laendercode" class="form-control" disabled />

                <label for="">Land</label>
                <input type="text" v-model="bahnhof2.land" class="form-control" disabled />
              </div>
            </em>

            <div class="form-group">
              <label for="adresse">Beförderer (ab diesem Bahnhof)</label>
              <select class="form-control" v-model="evu2">
                <option v-bind:value="evu_def"></option>
                <option v-for="evu in evus" v-bind:value="evu" v-bind:key="evu.id">{{ evu.name }}</option>
              </select>

              <button class="btn btn-link py-0" v-on:click="viewEvu2=!viewEvu2">Details anzeigen</button>
            </div>
            <em v-if="viewEvu2">
              <div class="form-group">
                <label for="">Name</label>
                <input type="text" v-model="evu2.name" class="form-control" disabled />

                <label for="">Kurzbezeichnung</label>
                <input type="text" v-model="evu2.short" class="form-control" disabled />

                <label for="">EVU Code</label>
                <input type="text" v-model="evu2.code" class="form-control" disabled />
              </div>
            </em>


          </div>
        </div>

        <button class="btn btn-primary mb-2" v-on:click="zwBahnhof2=!zwBahnhof2">2. Zwischenbahnhof hinzufügen</button>




        <!-- ############################################################ 2. Zwischenbahnhof ############################################################ -->
        <em v-if="zwBahnhof2">
          <div class="card mb-2">
            <div class="card-body">
              <div class="form-group">
                <label for="adresse">2. Zwischenbahnhof</label>
                <select class="form-control" v-model="bahnhof3">
                  <option v-bind:value="bahnhof_def"></option>
                  <option v-for="bahnhof in bahnhoefe" v-bind:value="bahnhof" v-bind:key="bahnhof.id">{{ bahnhof.name }}</option>
                </select>
                <button class="btn btn-link py-0" v-on:click="viewBahnhof3=!viewBahnhof3">Details anzeigen</button>
              </div>
              <em v-if="viewBahnhof3">
                <div class="form-group">
                  <label for="">Name</label>
                  <input type="text" v-model="bahnhof3.name" class="form-control" disabled />

                  <label for="">Bahnhofscode</label>
                  <input type="text" v-model="bahnhof3.bahnhofscode" class="form-control" disabled />

                  <label for="">Ländercode</label>
                  <input type="text" v-model="bahnhof3.laendercode" class="form-control" disabled />

                  <label for="">Land</label>
                  <input type="text" v-model="bahnhof3.land" class="form-control" disabled />
                </div>
              </em>

              <label for="adresse">Beförderer (ab diesem Bahnhof)</label>
              <select class="form-control" v-model="evu3">
                <option v-bind:value="evu_def"></option>
                <option v-for="evu in evus" v-bind:value="evu" v-bind:key="evu.id">{{ evu.name }}</option>
              </select>
              <button class="btn btn-link py-0" v-on:click="viewEvu3=!viewEvu3">Details anzeigen</button>

              <em v-if="viewEvu3">
                <div class="form-group">
                  <label for="">Name</label>
                  <input type="text" v-model="evu3.name" class="form-control" disabled />

                  <label for="">Kurzbezeichnung</label>
                  <input type="text" v-model="evu3.short" class="form-control" disabled />

                  <label for="">EVU Code</label>
                  <input type="text" v-model="evu3.code" class="form-control" disabled />
                </div>
              </em>


            </div>
          </div>

          <button class="btn btn-primary mb-2" v-on:click="zwBahnhof3=!zwBahnhof3">3. Zwischenbahnhof hinzufügen</button>



          <!-- ############################################################ 3. Zwischenbahnhof ############################################################ -->

          <em v-if="zwBahnhof3">
            <div class="card mb-2">
              <div class="card-body">
                <div class="form-group">
                  <label for="adresse">3. Zwischenbahnhof</label>
                  <select class="form-control" v-model="bahnhof4">
                    <option v-bind:value="bahnhof_def"></option>
                    <option v-for="bahnhof in bahnhoefe" v-bind:value="bahnhof" v-bind:key="bahnhof.id">{{ bahnhof.name }}</option>
                  </select>
                  <button class="btn btn-link py-0" v-on:click="viewBahnhof4=!viewBahnhof4">Details anzeigen</button>
                </div>

                <em v-if="viewBahnhof4">
                  <div class="form-group">
                    <label for="">Name</label>
                    <input type="text" v-model="bahnhof4.name" class="form-control" disabled />

                    <label for="">Bahnhofscode</label>
                    <input type="text" v-model="bahnhof4.bahnhofscode" class="form-control" disabled />

                    <label for="">Ländercode</label>
                    <input type="text" v-model="bahnhof4.laendercode" class="form-control" disabled />

                    <label for="">Land</label>
                    <input type="text" v-model="bahnhof4.land" class="form-control" disabled />
                  </div>
                </em>

                <label for="adresse">Beförderer (ab diesem Bahnhof)</label>

                <select class="form-control" v-model="evu4">
                  <option v-bind:value="evu_def"></option>
                  <option v-for="evu in evus" v-bind:value="evu" v-bind:key="evu.id">{{ evu.name }}</option>
                </select>
                <button class="btn btn-link py-0" v-on:click="viewEvu4=!viewEvu4">Details anzeigen</button>
                <em v-if="viewEvu4">
                  <div class="form-group">
                    <label for="">Name</label>
                    <input type="text" v-model="evu4.name" class="form-control" disabled />

                    <label for="">Kurzbezeichnung</label>
                    <input type="text" v-model="evu4.short" class="form-control" disabled />

                    <label for="">EVU Code</label>
                    <input type="text" v-model="evu4.code" class="form-control" disabled />
                  </div>
                </em>


              </div>
            </div>
            <button class="btn btn-primary mb-2" v-on:click="zwBahnhof4=!zwBahnhof4">4. Zwischenbahnhof hinzufügen</button>


            <!-- ############################################################ 4. Zwischenbahnhof ############################################################ -->
            <em v-if="zwBahnhof4">
              <div class="card mb-2">
                <div class="card-body">
                  <div class="form-group">
                    <label for="adresse">4. Zwischenbahnhof</label>

                    <select class="form-control" v-model="bahnhof5">
                      <option v-bind:value="bahnhof_def"></option>
                      <option v-for="bahnhof in bahnhoefe" v-bind:value="bahnhof" v-bind:key="bahnhof.id">{{ bahnhof.name }}</option>
                    </select>
                    <button class="btn btn-link py-0" v-on:click="viewBahnhof5=!viewBahnhof5">Details anzeigen</button>
                  </div>
                  <em v-if="viewBahnhof5">
                    <div class="form-group">
                      <label for="">Name</label>
                      <input type="text" v-model="bahnhof5.name" class="form-control" disabled />

                      <label for="">Bahnhofscode</label>
                      <input type="text" v-model="bahnhof5.bahnhofscode" class="form-control" disabled />

                      <label for="">Ländercode</label>
                      <input type="text" v-model="bahnhof5.laendercode" class="form-control" disabled />

                      <label for="">Land</label>
                      <input type="text" v-model="bahnhof5.land" class="form-control" disabled />
                    </div>
                  </em>

                  <label for="adresse">Beförderer (ab diesem Bahnhof)</label>

                  <select class="form-control" v-model="evu5">
                    <option v-bind:value="evu_def"></option>
                    <option v-for="evu in evus" v-bind:value="evu" v-bind:key="evu.id">{{ evu.name }}</option>
                  </select>
                  <button class="btn btn-link py-0" v-on:click="viewEvu5=!viewEvu5">Details anzeigen</button>
                  <em v-if="viewEvu5">
                    <div class="form-group">
                      <label for="">Name</label>
                      <input type="text" v-model="evu5.name" class="form-control" disabled />

                      <label for="">Kurzbezeichnung</label>
                      <input type="text" v-model="evu5.short" class="form-control" disabled />

                      <label for="">EVU Code</label>
                      <input type="text" v-model="evu5.code" class="form-control" disabled />
                    </div>
                  </em>


                </div>
              </div>
              <button class="btn btn-primary mb-2" v-on:click="zwBahnhof5=!zwBahnhof5">5. Zwischenbahnhof hinzufügen</button>


              <!-- ############################################################ 5. Zwischenbahnhof ############################################################ -->
              <em v-if="zwBahnhof5">
                <div class="card mb-2">
                  <div class="card-body">
                    <div class="form-group">
                      <label for="adresse">5. Zwischenbahnhof</label>

                      <select class="form-control" v-model="bahnhof6">
                        <option v-bind:value="bahnhof_def"></option>
                        <option v-for="bahnhof in bahnhoefe" v-bind:value="bahnhof" v-bind:key="bahnhof.id">{{ bahnhof.name }}</option>
                      </select>
                      <button class="btn btn-link py-0" v-on:click="viewBahnhof6=!viewBahnhof6">Details anzeigen</button>
                    </div>

                    <em v-if="viewBahnhof6">
                      <div class="form-group">
                        <label for="">Name</label>
                        <input type="text" v-model="bahnhof6.name" class="form-control" disabled />

                        <label for="">Bahnhofscode</label>
                        <input type="text" v-model="bahnhof6.bahnhofscode" class="form-control" disabled />

                        <label for="">Ländercode</label>
                        <input type="text" v-model="bahnhof6.laendercode" class="form-control" disabled />

                        <label for="">Land</label>
                        <input type="text" v-model="bahnhof6.land" class="form-control" disabled />
                      </div>
                    </em>

                    <label for="adresse">Beförderer (ab diesem Bahnhof)</label>

                    <select class="form-control" v-model="evu6">
                      <option v-bind:value="evu_def"></option>
                      <option v-for="evu in evus" v-bind:value="evu" v-bind:key="evu.id">{{ evu.name }}</option>
                    </select>
                    <button class="btn btn-link py-0" v-on:click="viewEvu6=!viewEvu6">Details anzeigen</button>
                    <em v-if="viewEvu6">
                      <div class="form-group">
                        <label for="">Name</label>
                        <input type="text" v-model="evu6.name" class="form-control" disabled />

                        <label for="">Kurzbezeichnung</label>
                        <input type="text" v-model="evu6.short" class="form-control" disabled />

                        <label for="">EVU Code</label>
                        <input type="text" v-model="evu6.code" class="form-control" disabled />
                      </div>
                    </em>
                  </div>
                </div>

              </em> <!-- 5. Zwischenbahnhof -->
            </em> <!-- 4. Zwischenbahnhof -->
          </em> <!-- 3. Zwischenbahnhof -->
        </em> <!-- 2. Zwischenbahnhof -->
      </em> <!-- 1. Zwischenbahnhof -->


      <!-- ############################################################ ÜBERNAHMEORT & ZEIT ############################################################ -->


      <div class="card mb-2">
        <div class="card-body">
          <div class="row">
            <div class="col-sm-6">
              <label for="adresse">Übernahmeort</label>

              <select class="form-control" v-model="ubernahmeort.bahnhof">
                <option v-bind:value="bahnhof_def"></option>
                <option v-for="bahnhof in bahnhoefe" v-bind:value="bahnhof" v-bind:key="bahnhof.id">{{ bahnhof.name }}</option>
              </select>

              <button class="btn btn-link py-0" v-on:click="viewUbernahmeort=!viewUbernahmeort">Details anzeigen</button>

              <em v-if="viewUbernahmeort">
                <div class="form-group">
                  <label for="">Name</label>
                  <input type="text" v-model="ubernahmeort.bahnhof.name" class="form-control" disabled />

                  <label for="">Bahnhofscode</label>
                  <input type="text" v-model="ubernahmeort.bahnhof.bahnhofscode" class="form-control" disabled />

                  <label for="">Ländercode</label>
                  <input type="text" v-model="ubernahmeort.bahnhof.laendercode" class="form-control" disabled />

                  <label for="">Land</label>
                  <input type="text" v-model="ubernahmeort.bahnhof.land" class="form-control" disabled />
                </div>
              </em>
            </div>

            <div class="col-sm-6">
              <label for="adresse">Übernahmedatum und Uhrzeit</label>
              <datetime type="datetime" v-model="ubernahmeort.datum" value-zone="Europe/Berlin" ></datetime>
            </div>
          </div>
        </div>
      </div>



      <!-- ############################################################ Frachtbrief-Typ ############################################################ -->


      <div class="card mb-2">
        <div class="card-body">
          <label>Frachtbrief Typ:</label>
          <div class="form-check form-check-inline">
            <input class="form-check-input" id="CIM" type="radio" name="type" value="CIM" v-model="type"/>
            <label class="form-check-label" for="CIM">CIM</label>
          </div>

          <div class="form-check form-check-inline">
            <input class="form-check-input" id="CUV" type="radio" name="type" value="CUV" v-model="type"/>
            <label class="form-check-label" for="CUV">CUV</label>
          </div>
        </div>
      </div>

      <!-- ############################################################ AUSSTELLUNGSORT ############################################################ -->



      <div class="card mb-2">
        <div class="card-body">
          <div class="row">
            <div class="col-sm-6">
              <label for="adresse">Ausstellungsort</label>
              <input type="text" v-model="ausstellung.ort" class="form-control" />
            </div>
            <div class="col-sm-6">
              <label for="adresse">Ausstellungsdatum</label>
              <datetime v-model="ausstellung.datum" value-zone="Europe/Berlin" ></datetime>
            </div>
          </div>
        </div>
      </div>

      <!-- ############################################################ ANDERE BEFÖRDERER ############################################################ -->

      <div class="card mb-2">
        <div class="card-body">

          <div class="row">
            <div class="col">
              <label for="adresse">Andere Beförderer</label>
            </div>
            <div class="col-auto">
              <button class="btn btn-primary" v-on:click="aBefordererVorschlag()">Vorschlag generieren</button>
            </div>
          </div>
          <div class="row">
            <div class="col-4 mb-1">EVU</div>
            <div class="col-8 mb-1">Strecke</div>

            <div class="col-4 mb-1"><input type="text" v-model="aBeforderer1.name" class="form-control" /></div>
            <div class="col-8 mb-1"><input type="text" v-model="aBeforderer1.strecke" class="form-control" /></div>

            <div class="col-4 mb-1"><input type="text" v-model="aBeforderer2.name" class="form-control" /></div>
            <div class="col-8 mb-1"><input type="text" v-model="aBeforderer2.strecke" class="form-control" /></div>

            <div class="col-4 mb-1"><input type="text" v-model="aBeforderer3.name" class="form-control" /></div>
            <div class="col-8 mb-1"><input type="text" v-model="aBeforderer3.strecke" class="form-control" /></div>

            <div class="col-4 mb-1"><input type="text" v-model="aBeforderer4.name" class="form-control" /></div>
            <div class="col-8 mb-1"><input type="text" v-model="aBeforderer4.strecke" class="form-control" /></div>

            <div class="col-4 mb-1"><input type="text" v-model="aBeforderer5.name" class="form-control" /></div>
            <div class="col-8 mb-1"><input type="text" v-model="aBeforderer5.strecke" class="form-control" /></div>

            <div class="col-4 mb-1"><input type="text" v-model="aBeforderer6.name" class="form-control" /></div>
            <div class="col-8 mb-1"><input type="text" v-model="aBeforderer6.strecke" class="form-control" /></div>
          </div>
        </div>
      </div>


      <!-- ############################################################ ERKLÄRUNGEN ############################################################ -->

      <div class="card mb-2">
        <div class="card-body">
          <div class="form-group">
            <label for="erklarung">Erklärungen</label>

            <select class="form-control" v-model="erklarung">
              <option v-bind:value="erklarung_def">neu anlegen</option>
              <option v-for="erklarung in erklarungen" v-bind:value="erklarung" v-bind:key="erklarung.id">{{ erklarung.code }}</option>
            </select>
          </div>

          <div class="form-group">
            <label for="wagenummer">Code mit Erläuterung</label>
            <textarea type="text" v-model="erklarung.code" class="form-control"/>

          </div>
        </div>
      </div>


<!-- ############################################################ Kommerzielle Bedingungen ############################################################ -->
    <div class="card mb-2">
      <div class="card-body">
        <div class="row mb-1">
          <div class="col">
            <label for="">Kommerzielle Bedingungen</label>
          </div>
          <div class="col-auto">
            <button class="btn btn-primary" v-on:click="kommerzBedingVorschlag()">Vorschlag generieren</button>
          </div>
        </div>
        <textarea type="text" v-model="kommerziellebedingungen" class="form-control" />
      </div>
    </div>

      <!-- ############################################################ Ladeliste zuordnen ############################################################ -->


      <div class="card mb-2">
        <div class="card-body">
          <div class="row">
            <div class="col-sm-6">
              <label for="adresse">freigegebene Ladeliste zuordnen</label>

              <select class="form-control" v-model="ladeliste">
                <option v-bind:value="ladeliste_def"></option>
                <option v-for="ladeliste in ladelisten" v-bind:value="ladeliste" v-bind:key="ladeliste.id">{{ ladeliste.ladelistedata.refnr }}</option>
              </select>


            </div>


          </div>
        </div>
      </div>



      <!-- ############################################################ Bezeichnung des Gutes wenn Ladeliste zugeordnet ############################################################ -->
    <em v-if="ladeliste">
    <div class="card mb-2">
      <div class="card-body">
        <div class="form-group">
          <div class="row">
            <div class="col">
              <label for="">Bezeichnung des Gutes</label>
            </div>
            <div class="col-auto">
              <button class="btn btn-primary" v-on:click="bezeichnungGutVorschlag()">Vorschlag generieren</button>
            </div>
          </div>
        </div>
        <textarea type="text" v-model="bezeichnungGut" class="form-control" />
      </div>
    </div>
    </em>

      <div class="form-group">



      </div>

    </form>





    <div class="form-group">
      <div class="row mx-1">
        <div class="col">
          <label>Als Vorlage verwenden:</label>
          <div class="form-check form-check-inline">
            <input class="form-check-input" id="vorlagefalse" type="radio" name="vorlage" value="false" v-model="vorlage"/>
            <label class="form-check-label" for="vorlagefalse">Nein</label>
          </div>

          <div class="form-check form-check-inline">
            <input class="form-check-input" id="vorlagetrue" type="radio" name="vorlage" value="true" v-model="vorlage"/>
            <label class="form-check-label" for="vorlagetrue">Ja</label>
          </div>
        </div>
        <div class="col alert-info">
          <div v-if="submitted && errors.has('Referenz')">{{ errors.first('Referenz') }}</div>
          <em v-if="message.error">
            {{message.error.message}}
          </em>
        </div>

        <div class="col-auto">
          <button class="btn btn-success" v-on:click="saveFrachtbrief()" >Speichern u. Schließen</button>
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
        return {
            submitted: false,
            bezeichnungGut: '',
            ladeliste: '',
            ladeliste_def: '',
            kommerziellebedingungen: '',
            vorlagedata: {},
            vorlagedata_def: {},
            vorlage: false,
            zwBahnhof1: false,
            zwBahnhof2: false,
            zwBahnhof3: false,
            zwBahnhof4: false,
            zwBahnhof5: false,
            bahnhof_def: {
               name: "",
                bahnhofscode: '',
                laendercode: '',
                land: '',


            },
            viewBahnhof1: false,
            bahnhof1: {
               name: "",
                bahnhofscode: '',
                laendercode: '',
                land: '',


            },
            viewBahnhof2: false,
            bahnhof2: {
               name: "",
                bahnhofscode: '',
                laendercode: '',
                land: '',


            },
            viewBahnhof3: false,
            bahnhof3: {
               name: "",
                bahnhofscode: '',
                laendercode: '',
                land: '',


            },
            viewBahnhof4: false,
            bahnhof4: {
               name: "",
                bahnhofscode: '',
                laendercode: '',
                land: '',


            },
            viewBahnhof5: false,
            bahnhof5: {
               name: "",
                bahnhofscode: '',
                laendercode: '',
                land: '',


            },
            viewBahnhof6: false,
            bahnhof6: {
               name: "",
                bahnhofscode: '',
                laendercode: '',
                land: '',


            },
            viewBahnhof7: false,
            bahnhof7: {
               name: "",
                bahnhofscode: '',
                laendercode: '',
                land: '',


            },

            viewUbernahmeort: false,
            ubernahmeort: {
              bahnhof:
            {
              name: "",
                bahnhofscode: '',
                laendercode: '',
                land: '',
                },

                datum: new Date().toJSON(),


            },





            evu_def: {
                name: "",
                short: '',
                code: '',



            },
            viewEvu1: false,
            evu1: {
                name: "",
                short: '',
                code: '',



            },
            viewEvu2: false,
            evu2: {
                name: "",
                short: '',
                code: '',



            },
            viewEvu3: false,
            evu3: {
                name: "",
                short: '',
                code: '',



            },
            viewEvu4: false,
            evu4: {
                name: "",
                short: '',
                code: '',



            },
            viewEvu5: false,
            evu5: {
                name: "",
                short: '',
                code: '',



            },
            viewEvu6: false,
            evu6: {
                name: "",
                short: '',
                code: '',



            },

            adresse_def: {
                name: '',
                strasse: '',
                ort: '',
                mail: '',
                telefon: ''


            },
            viewAdresse1: false,
            adresse1: {
                name: '',
                strasse: '',
                ort: '',
                mail: '',
                telefon: ''


            },
            viewAdresse2: false,
            adresse2: {
                name: '',
                strasse: '',
                ort: '',
                mail: '',
                telefon: ''


            },

            ausstellung: {
                ort: 'Mülsen',
                datum: new Date().toJSON()
            },



            aBeforderer1: {
                name: '',
                strecke: ''

            },
            aBeforderer2: {
                name: '',
                strecke: ''

            },
            aBeforderer3: {
                name: '',
                strecke: ''

            },
            aBeforderer4: {
                name: '',
                strecke: ''

            },
            aBeforderer5: {
                name: '',
                strecke: ''

            },
            aBeforderer6: {
                name: '',
                strecke: ''

            },

            refnr: '',
            type: 'CIM',

            erklarung_def: {
                code: ''


            },

            erklarung: {
                code: ''


            },


        }
    },
computed: {
        ...mapState('frachtbrief', ['status']),
        ...mapState('bahnhof', ['status']),

     ...mapState({

            bahnhoefe: state => state.bahnhof.all.items,
            evus: state => state.evu.all.items,
            adressen: state => state.adresse.all.items,
            erklarungen: state => state.erklarung.all.items,
            message: state => state.frachtbrief.all,
            frachtbriefs: state => state.frachtbrief.vorlagen.items,
            ladelisten: state => state.ladeliste.all.items,

        }),
    },
    mounted () {
        this.getAllVorlagen();

        this.getAllBahnhof();
        this.getAllEvu();
        this.getAllAdresse();
        this.getAllErklarung();
        this.getAllStatus("freigegeben");


        console.log('mount')
    },
    methods: {
         ...mapActions( 'frachtbrief', {
            getAllVorlagen: 'getAllVorlagen',
            deleteFrachtbrief: 'delete'
        }),
        ...mapActions('ladeliste', {getAllStatus: 'getAllStatus'}),
        ...mapActions('bahnhof', ['create']),
        ...mapActions('bahnhof', {getAllBahnhof: 'getAll'}),
        ...mapActions('evu', {getAllEvu: 'getAll'}),
        ...mapActions('adresse', {getAllAdresse: 'getAll'}),
        ...mapActions('erklarung', {createErklarung: 'create'}),
        ...mapActions('erklarung', {getAllErklarung: 'getAll'}),

         ...mapActions('bahnhof', ['delete']),
         ...mapActions('bahnhof', ['update']),
        ...mapActions('frachtbrief', {createFrachtbrief: 'create'}),
        handleSubmit(e) {
            //this.submitted = true;

        },
        checkVorlage(frachtbrief) {
            console.log(frachtbrief)
  return frachtbrief.frachtbriefdata.vorlage;
},
saveFrachtbrief(){


            this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {



if(this.erklarung.id == null && this.erklarung.code != ''){

    this.createErklarung(this.erklarung);
}
var frachtbriefdata = '';
if (this.vorlage){
  frachtbriefdata = JSON.parse('{"frachtbriefdata":' + JSON.stringify(this.$data) + ', "status": "Vorlage", "vorlage": "'+this.vorlage+'"}')
} else {
  frachtbriefdata = JSON.parse('{"frachtbriefdata":' + JSON.stringify(this.$data) + ', "status": "in Bearbeitung", "vorlage": "'+this.vorlage+'"}')

}




this.createFrachtbrief(frachtbriefdata);
this.submitted = false;


setTimeout(() => this.$router.push('/history') , 3000);





                }
            });


},

kommerzBedingVorschlag(){

if(this.evu2.short==''){
    var name1=this.evu1.short +  ' ' + this.evu1.code;
    var strecke1=this.bahnhof1.name + ' - ' + this.bahnhof7.name;
    var teil1 = '('+name1 +') ' + strecke1

    this.kommerziellebedingungen = teil1

}

if(this.evu2.short!='' && this.evu3.short==''){
    var name1=this.evu1.short +  ' ' + this.evu1.code;
    var strecke1=this.bahnhof1.name + ' - ' + this.bahnhof2.name;
    var teil1 = '('+name1 +') ' + strecke1

    var name2=this.evu2.short +  ' ' + this.evu2.code;
    var strecke2=this.bahnhof2.name + ' - ' + this.bahnhof7.name;
    var teil2 = '('+name2 +') ' + strecke2

this.kommerziellebedingungen = teil1 + '\n' + teil2

}

if(this.evu2.short!='' && this.evu3.short!='' && this.evu4.short==''){
    var name1=this.evu1.short +  ' ' + this.evu1.code;
    var strecke1=this.bahnhof1.name + ' - ' + this.bahnhof2.name;
    var teil1 = '('+name1 +') ' + strecke1

    var name2=this.evu2.short +  ' ' + this.evu2.code;
    var strecke2=this.bahnhof2.name + ' - ' + this.bahnhof3.name;
    var teil2 = '('+name2 +') ' + strecke2

    var name3=this.evu3.short +  ' ' + this.evu3.code;
    var strecke3=this.bahnhof3.name + ' - ' + this.bahnhof7.name;
    var teil3 = '('+name3 +') ' + strecke3

    this.kommerziellebedingungen = teil1 + '\n' + teil2 + '\n' + teil3

}

if(this.evu2.short!='' && this.evu3.short!='' && this.evu4.short!='' && this.evu5.short==''){
    var name1=this.evu1.short +  ' ' + this.evu1.code;
    var strecke1=this.bahnhof1.name + ' - ' + this.bahnhof2.name;
    var teil1 = '('+name1 +') ' + strecke1

    var name2=this.evu2.short +  ' ' + this.evu2.code;
    var strecke2=this.bahnhof2.name + ' - ' + this.bahnhof3.name;
    var teil2 = '('+name2 +') ' + strecke2

    var name3=this.evu3.short +  ' ' + this.evu3.code;
    var strecke3=this.bahnhof3.name + ' - ' + this.bahnhof4.name;
    var teil3 = '('+name3 +') ' + strecke3

    var name4=this.evu4.short +  ' ' + this.evu4.code;
    var strecke4=this.bahnhof4.name + ' - ' + this.bahnhof7.name;
    var teil4 = '('+name4 +') ' + strecke4

    this.kommerziellebedingungen = teil1 + '\n' + teil2 + '\n' + teil3 + '\n' + teil4
}

if(this.evu2.short!='' && this.evu3.short!='' && this.evu4.short!='' && this.evu5.short!='' && this.evu6.short==''){
    var name1=this.evu1.short +  ' ' + this.evu1.code;
    var strecke1=this.bahnhof1.name + ' - ' + this.bahnhof2.name;
    var teil1 = '('+name1 +') ' + strecke1

    var name2=this.evu2.short +  ' ' + this.evu2.code;
    var strecke2=this.bahnhof2.name + ' - ' + this.bahnhof3.name;
    var teil2 = '('+name2 +') ' + strecke2

    var name3=this.evu3.short +  ' ' + this.evu3.code;
    var strecke3=this.bahnhof3.name + ' - ' + this.bahnhof4.name;
    var teil3 = '('+name3 +') ' + strecke3

    var name4=this.evu4.short +  ' ' + this.evu4.code;
    var strecke4=this.bahnhof4.name + ' - ' + this.bahnhof5.name;
    var teil4 = '('+name4 +') ' + strecke4

    var name5=this.evu5.short +  ' ' + this.evu5.code;
    var strecke5=this.bahnhof5.name + ' - ' + this.bahnhof7.name;
    var teil5 = '('+name5 +') ' + strecke5

    this.kommerziellebedingungen = teil1 + '\n' + teil2 + '\n' + teil3 + '\n' + teil4 + '\n' + teil5

}

if(this.evu2.short!='' && this.evu3.short!='' && this.evu4.short!='' && this.evu5.short!='' && this.evu6.short!=''){
    var name1=this.evu1.short +  ' ' + this.evu1.code;
    var strecke1=this.bahnhof1.name + ' - ' + this.bahnhof2.name;
    var teil1 = '('+name1 +') ' + strecke1

    var name2=this.evu2.short +  ' ' + this.evu2.code;
    var strecke2=this.bahnhof2.name + ' - ' + this.bahnhof3.name;
    var teil2 = '('+name2 +') ' + strecke2

    var name3=this.evu3.short +  ' ' + this.evu3.code;
    var strecke3=this.bahnhof3.name + ' - ' + this.bahnhof4.name;
    var teil3 = '('+name3 +') ' + strecke3

    var name4=this.evu4.short +  ' ' + this.evu4.code;
    var strecke4=this.bahnhof4.name + ' - ' + this.bahnhof5.name;
    var teil4 = '('+name4 +') ' + strecke4

    var name5=this.evu5.short +  ' ' + this.evu5.code;
    var strecke5=this.bahnhof5.name + ' - ' + this.bahnhof6.name;
    var teil5 = '('+name5 +') ' + strecke5

    var name6=this.evu6.short +  ' ' + this.evu6.code;
    var strecke6=this.bahnhof6.name + ' - ' + this.bahnhof7.name;
    var teil6 = '('+name6 +') ' + strecke6

    this.kommerziellebedingungen = teil1 + '\n' + teil2 + '\n' + teil3 + '\n' + teil4 + '\n' + teil5 + '\n' + teil6

}

},

bezeichnungGutVorschlag(){
let s = ''




for (var l in this.ladeliste.ladelistedata){



if(typeof (this.ladeliste.ladelistedata[l].ladegut) !== 'undefined'){
  if(typeof (this.ladeliste.ladelistedata[l].ladegut.bezeichnung) !== 'undefined'){








s = s + this.ladeliste.ladelistedata[l].wagen.length + 'x ' + this.ladeliste.ladelistedata[l].ladegut.wagentyp + ' (' + this.ladeliste.ladelistedata[l].ladegut.bezeichnung + ') \n' +
this.ladeliste.ladelistedata[l].ladegut.bemerkung + '\n \n'



  }

}

}

this.bezeichnungGut = s;

},

        aBefordererVorschlag() {





if(this.evu2.short==''){
    this.aBeforderer1.name=this.evu1.short;
    this.aBeforderer1.strecke=this.bahnhof1.name + ' - ' + this.bahnhof7.name;
}

if(this.evu2.short!='' && this.evu3.short==''){
    this.aBeforderer1.name=this.evu1.short;
    this.aBeforderer1.strecke=this.bahnhof1.name + ' - ' + this.bahnhof2.name;

    this.aBeforderer2.name=this.evu2.short;
    this.aBeforderer2.strecke=this.bahnhof2.name + ' - ' + this.bahnhof7.name;

}

if(this.evu2.short!='' && this.evu3.short!='' && this.evu4.short==''){
    this.aBeforderer1.name=this.evu1.short;
    this.aBeforderer1.strecke=this.bahnhof1.name + ' - ' + this.bahnhof2.name;

    this.aBeforderer2.name=this.evu2.short;
    this.aBeforderer2.strecke=this.bahnhof2.name + ' - ' + this.bahnhof3.name;

    this.aBeforderer3.name=this.evu3.short;
    this.aBeforderer3.strecke=this.bahnhof3.name + ' - ' + this.bahnhof7.name;

}

if(this.evu2.short!='' && this.evu3.short!='' && this.evu4.short!='' && this.evu5.short==''){
    this.aBeforderer1.name=this.evu1.short;
    this.aBeforderer1.strecke=this.bahnhof1.name + ' - ' + this.bahnhof2.name;

    this.aBeforderer2.name=this.evu2.short;
    this.aBeforderer2.strecke=this.bahnhof2.name + ' - ' + this.bahnhof3.name;

    this.aBeforderer3.name=this.evu3.short;
    this.aBeforderer3.strecke=this.bahnhof3.name + ' - ' + this.bahnhof4.name;

    this.aBeforderer4.name=this.evu4.short;
    this.aBeforderer4.strecke=this.bahnhof4.name + ' - ' + this.bahnhof7.name;

}

if(this.evu2.short!='' && this.evu3.short!='' && this.evu4.short!='' && this.evu5.short!='' && this.evu6.short==''){
    this.aBeforderer1.name=this.evu1.short;
    this.aBeforderer1.strecke=this.bahnhof1.name + ' - ' + this.bahnhof2.name;

    this.aBeforderer2.name=this.evu2.short;
    this.aBeforderer2.strecke=this.bahnhof2.name + ' - ' + this.bahnhof3.name;

    this.aBeforderer3.name=this.evu3.short;
    this.aBeforderer3.strecke=this.bahnhof3.name + ' - ' + this.bahnhof4.name;

    this.aBeforderer4.name=this.evu4.short;
    this.aBeforderer4.strecke=this.bahnhof4.name + ' - ' + this.bahnhof5.name;

    this.aBeforderer5.name=this.evu5.short;
    this.aBeforderer5.strecke=this.bahnhof5.name + ' - ' + this.bahnhof7.name;

}

if(this.evu2.short!='' && this.evu3.short!='' && this.evu4.short!='' && this.evu5.short!='' && this.evu6.short!=''){
    this.aBeforderer1.name=this.evu1.short;
    this.aBeforderer1.strecke=this.bahnhof1.name + ' - ' + this.bahnhof2.name;

    this.aBeforderer2.name=this.evu2.short;
    this.aBeforderer2.strecke=this.bahnhof2.name + ' - ' + this.bahnhof3.name;

    this.aBeforderer3.name=this.evu3.short;
    this.aBeforderer3.strecke=this.bahnhof3.name + ' - ' + this.bahnhof4.name;

    this.aBeforderer4.name=this.evu4.short;
    this.aBeforderer4.strecke=this.bahnhof4.name + ' - ' + this.bahnhof5.name;

    this.aBeforderer5.name=this.evu5.short;
    this.aBeforderer5.strecke=this.bahnhof5.name + ' - ' + this.bahnhof6.name;

    this.aBeforderer6.name=this.evu6.short;
    this.aBeforderer6.strecke=this.bahnhof6.name + ' - ' + this.bahnhof7.name;

}


        },
        changeAdress() {
            if(this.frachtbrief.adresseform==this.adressen[0].name){
                this.frachtbrief.adresseview=true;
            } else {
                this.frachtbrief.adresseview=false;
            }
            this.frachtbrief.adresse=this.frachtbrief.adresseform;

        },
        bahnhofscodeChange() {
        if(this.frachtbrief.bahnhofscode.charAt(0).toUpperCase()=='O'){
            this.frachtbrief.laendercode = '81';
            this.frachtbrief.land = "Österreich";


        } else {
            this.frachtbrief.laendercode = '80';
            this.frachtbrief.land = "Deutschland";
        }
    },
    vorlageLaden(){


        var merged = {};
Object.assign(this.$data, this.$data, this.vorlagedata.frachtbriefdata);
this.vorlagedata = {};
this.vorlage = false;
    }

    }
};
</script>

<style>
@import '/node_modules/vue-datetime/dist/vue-datetime.css';

</style>
