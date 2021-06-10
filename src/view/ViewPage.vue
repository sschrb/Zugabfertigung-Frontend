<template>
  <div>
    <h3>Frachtbrief bearbeiten</h3>
    <div class="card mb-2">
      <div class="card-body">
        <div class="form-group"> <!-- Hallo Tim -->
          <label for="">Referenz Nummer (Name des Frachtbriefes)</label>
          <input :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" type="text" v-model="frachtbrief.frachtbriefdata.refnr" name="Referenz" v-validate="{ required: true}" class="form-control" :class="{ 'is-invalid': submitted && errors.has('Referenz') }"/>
                <div v-if="submitted && errors.has('Referenz')" class="invalid-feedback">{{ errors.first('Referenz') }}</div>
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
                <select :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" class="form-control" v-model="frachtbrief.frachtbriefdata.adresse1" name="Absender" v-validate="{ objectNotEmpty: true}" :class="{ 'is-invalid': submitted && errors.has('Absender') }">
                  <option v-bind:value="frachtbrief.frachtbriefdata.adresse_def"></option>
                  <option v-for="adresse in adressen" v-bind:value="adresse" v-bind:key="adresse.id">{{ adresse.name }}</option>
                </select>


                <div v-if="submitted && errors.has('Absender')" class="invalid-feedback">{{ errors.first('Absender') }}</div>

                <button class="btn btn-link py-0" v-on:click="viewAdresse1=!viewAdresse1">Details anzeigen</button>
              </div>


              <em v-if="viewAdresse1">
                <div class="form-group">
                  <label for="">Name</label>
                  <input type="text" v-model="frachtbrief.frachtbriefdata.adresse1.name" class="form-control" disabled />

                  <label for="">Straße und Hausnummer</label>
                  <input type="text" v-model="frachtbrief.frachtbriefdata.adresse1.strasse" class="form-control" disabled />


                  <label for="">PLZ und Ort</label>
                  <input type="text" v-model="frachtbrief.frachtbriefdata.adresse1.ort" class="form-control" disabled />


                  <label for="">E-Mailadresse</label>
                  <input type="text" v-model="frachtbrief.frachtbriefdata.adresse1.mail" class="form-control" disabled />

                  <label for="">Telefonnummer</label>
                  <input type="text" v-model="frachtbrief.frachtbriefdata.adresse1.telefon" class="form-control" disabled />
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
                <select :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" class="form-control" v-model="frachtbrief.frachtbriefdata.adresse2" name="Empfänger" v-validate="{ objectNotEmpty: true}" :class="{ 'is-invalid': submitted && errors.has('Empfänger') }">
                  <option v-bind:value="frachtbrief.frachtbriefdata.adresse_def"></option>
                  <option v-for="adresse in adressen" v-bind:value="adresse" v-bind:key="adresse.id">{{ adresse.name }}</option>
                </select>
                <div v-if="submitted && errors.has('Empfänger')" class="invalid-feedback">{{ errors.first('Empfänger') }}</div>
                <button class="btn btn-link py-0" v-on:click="viewAdresse2=!viewAdresse2">Details anzeigen</button>
              </div>




              <em v-if="viewAdresse2">
                <div class="form-group">
                  <label for="">Name</label>
                  <input type="text" v-model="frachtbrief.frachtbriefdata.adresse2.name" class="form-control" disabled />

                  <label for="">Straße und Hausnummer</label>
                  <input type="text" v-model="frachtbrief.frachtbriefdata.adresse2.strasse" class="form-control" disabled />

                  <label for="">PLZ und Ort</label>
                  <input type="text" v-model="frachtbrief.frachtbriefdata.adresse2.ort" class="form-control" disabled />

                  <label for="">E-Mailadresse</label>
                  <input type="text" v-model="frachtbrief.frachtbriefdata.adresse2.mail" class="form-control" disabled />

                  <label for="">Telefonnummer</label>
                  <input type="text" v-model="frachtbrief.frachtbriefdata.adresse2.telefon" class="form-control" disabled />
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

                <select :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" class="form-control" v-model="frachtbrief.frachtbriefdata.bahnhof1" name="Abgangsbahnhof" v-validate="{ objectNotEmpty: true}" :class="{ 'is-invalid': submitted && errors.has('Abgangsbahnhof') }">
                  <option v-bind:value="frachtbrief.frachtbriefdata.bahnhof_def"></option>
                  <option v-for="bahnhof in bahnhoefe" v-bind:value="bahnhof" v-bind:key="bahnhof.id">{{ bahnhof.name }}</option>
                </select>
                <div v-if="submitted && errors.has('Abgangsbahnhof')" class="invalid-feedback">{{ errors.first('Abgangsbahnhof') }}</div>

                <button class="btn btn-link py-0" v-on:click="viewBahnhof1=!viewBahnhof1">Details anzeigen</button>
              </div>




              <em v-if="viewBahnhof1">
                <div class="form-group">
                  <label for="">Name</label>
                  <input type="text" v-model="frachtbrief.frachtbriefdata.bahnhof1.name" class="form-control" disabled />

                  <label for="">Bahnhofscode</label>
                  <input type="text" v-model="frachtbrief.frachtbriefdata.bahnhof1.bahnhofscode" class="form-control" disabled />

                  <label for="">Ländercode</label>
                  <input type="text" v-model="frachtbrief.frachtbriefdata.bahnhof1.laendercode" class="form-control" disabled />

                  <label for="">Land</label>
                  <input type="text" v-model="frachtbrief.frachtbriefdata.bahnhof1.land" class="form-control" disabled />
                </div>
              </em>

              <div class="form-group">

                <label for="adresse">Beförderer</label>

                <select :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" class="form-control" v-model="frachtbrief.frachtbriefdata.evu1" name="Beförderer" v-validate="{ objectNotEmpty: true}" :class="{ 'is-invalid': submitted && errors.has('Beförderer') }">
                  <option v-bind:value="frachtbrief.frachtbriefdata.evu_def"></option>
                  <option v-for="evu in evus" v-bind:value="evu" v-bind:key="evu.id">{{ evu.name }}</option>
                </select>
                <div v-if="submitted && errors.has('Beförderer')" class="invalid-feedback">{{ errors.first('Beförderer') }}</div>

                <button class="btn btn-link py-0" v-on:click="viewEvu1=!viewEvu1">Details anzeigen</button>
              </div>




              <em v-if="viewEvu1">
                <div class="form-group">
                  <label for="">Name</label>
                  <input type="text" v-model="frachtbrief.frachtbriefdata.evu1.name" class="form-control" disabled />

                  <label for="">Kurzbezeichnung</label>
                  <input type="text" v-model="frachtbrief.frachtbriefdata.evu1.short" class="form-control" disabled />

                  <label for="">EVU Code</label>
                  <input type="text" v-model="frachtbrief.frachtbriefdata.evu1.code" class="form-control" disabled />
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
                <select :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" class="form-control" v-model="frachtbrief.frachtbriefdata.bahnhof7" name="Zielbahnhof" v-validate="{ objectNotEmpty: true}" :class="{ 'is-invalid': submitted && errors.has('Zielbahnhof') }">
                  <option v-bind:value="frachtbrief.frachtbriefdata.bahnhof_def"></option>
                  <option v-for="bahnhof in bahnhoefe" v-bind:value="bahnhof" v-bind:key="bahnhof.id">{{ bahnhof.name }}</option>
                </select>
                <div v-if="submitted && errors.has('Zielbahnhof')" class="invalid-feedback">{{ errors.first('Zielbahnhof') }}</div>
                <button class="btn btn-link py-0" v-on:click="viewBahnhof7=!viewBahnhof7">Details anzeigen</button>
              </div>




              <em v-if="viewBahnhof7">
                <div class="form-group">
                  <label for="">Name</label>
                  <input type="text" v-model="frachtbrief.frachtbriefdata.bahnhof7.name" class="form-control" disabled />

                  <label for="">Bahnhofscode</label>
                  <input type="text" v-model="frachtbrief.frachtbriefdata.bahnhof7.bahnhofscode" class="form-control" disabled />

                  <label for="">Ländercode</label>
                  <input type="text" v-model="frachtbrief.frachtbriefdata.bahnhof7.laendercode" class="form-control" disabled />

                  <label for="">Land</label>
                  <input type="text" v-model="frachtbrief.frachtbriefdata.bahnhof7.land" class="form-control" disabled />
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
              <select :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" class="form-control" v-model="frachtbrief.frachtbriefdata.bahnhof2">
                <option v-bind:value="frachtbrief.frachtbriefdata.bahnhof_def"></option>
                <option v-for="bahnhof in bahnhoefe" v-bind:value="bahnhof" v-bind:key="bahnhof.id">{{ bahnhof.name }}</option>
              </select>

              <button class="btn btn-link py-0" v-on:click="viewBahnhof2=!viewBahnhof2">Details anzeigen</button>
            </div>



            <em v-if="viewBahnhof2">
              <div class="form-group">
                <label for="">Name</label>
                <input type="text" v-model="frachtbrief.frachtbriefdata.bahnhof2.name" class="form-control" disabled />

                <label for="">Bahnhofscode</label>
                <input type="text" v-model="frachtbrief.frachtbriefdata.bahnhof2.bahnhofscode" class="form-control" disabled />

                <label for="">Ländercode</label>
                <input type="text" v-model="frachtbrief.frachtbriefdata.bahnhof2.laendercode" class="form-control" disabled />

                <label for="">Land</label>
                <input type="text" v-model="frachtbrief.frachtbriefdata.bahnhof2.land" class="form-control" disabled />
              </div>
            </em>

            <div class="form-group">
              <label for="adresse">Beförderer (ab diesem Bahnhof)</label>
              <select :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" class="form-control" v-model="frachtbrief.frachtbriefdata.evu2">
                <option v-bind:value="frachtbrief.frachtbriefdata.evu_def"></option>
                <option v-for="evu in evus" v-bind:value="evu" v-bind:key="evu.id">{{ evu.name }}</option>
              </select>

              <button class="btn btn-link py-0" v-on:click="viewEvu2=!viewEvu2">Details anzeigen</button>
            </div>
            <em v-if="viewEvu2">
              <div class="form-group">
                <label for="">Name</label>
                <input type="text" v-model="frachtbrief.frachtbriefdata.evu2.name" class="form-control" disabled />

                <label for="">Kurzbezeichnung</label>
                <input type="text" v-model="frachtbrief.frachtbriefdata.evu2.short" class="form-control" disabled />

                <label for="">EVU Code</label>
                <input type="text" v-model="frachtbrief.frachtbriefdata.evu2.code" class="form-control" disabled />
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
                <select :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" class="form-control" v-model="frachtbrief.frachtbriefdata.bahnhof3">
                  <option v-bind:value="frachtbrief.frachtbriefdata.bahnhof_def"></option>
                  <option v-for="bahnhof in bahnhoefe" v-bind:value="bahnhof" v-bind:key="bahnhof.id">{{ bahnhof.name }}</option>
                </select>
                <button class="btn btn-link py-0" v-on:click="viewBahnhof3=!viewBahnhof3">Details anzeigen</button>
              </div>
              <em v-if="viewBahnhof3">
                <div class="form-group">
                  <label for="">Name</label>
                  <input type="text" v-model="frachtbrief.frachtbriefdata.bahnhof3.name" class="form-control" disabled />

                  <label for="">Bahnhofscode</label>
                  <input type="text" v-model="frachtbrief.frachtbriefdata.bahnhof3.bahnhofscode" class="form-control" disabled />

                  <label for="">Ländercode</label>
                  <input type="text" v-model="frachtbrief.frachtbriefdata.bahnhof3.laendercode" class="form-control" disabled />

                  <label for="">Land</label>
                  <input type="text" v-model="frachtbrief.frachtbriefdata.bahnhof3.land" class="form-control" disabled />
                </div>
              </em>

              <label for="adresse">Beförderer (ab diesem Bahnhof)</label>
              <select :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" class="form-control" v-model="frachtbrief.frachtbriefdata.evu3">
                <option v-bind:value="frachtbrief.frachtbriefdata.evu_def"></option>
                <option v-for="evu in evus" v-bind:value="evu" v-bind:key="evu.id">{{ evu.name }}</option>
              </select>
              <button class="btn btn-link py-0" v-on:click="viewEvu3=!viewEvu3">Details anzeigen</button>

              <em v-if="viewEvu3">
                <div class="form-group">
                  <label for="">Name</label>
                  <input type="text" v-model="frachtbrief.frachtbriefdata.evu3.name" class="form-control" disabled />

                  <label for="">Kurzbezeichnung</label>
                  <input type="text" v-model="frachtbrief.frachtbriefdata.evu3.short" class="form-control" disabled />

                  <label for="">EVU Code</label>
                  <input type="text" v-model="frachtbrief.frachtbriefdata.evu3.code" class="form-control" disabled />
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
                  <select :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" class="form-control" v-model="frachtbrief.frachtbriefdata.bahnhof4">
                    <option v-bind:value="frachtbrief.frachtbriefdata.bahnhof_def"></option>
                    <option v-for="bahnhof in bahnhoefe" v-bind:value="bahnhof" v-bind:key="bahnhof.id">{{ bahnhof.name }}</option>
                  </select>
                  <button class="btn btn-link py-0" v-on:click="viewBahnhof4=!viewBahnhof4">Details anzeigen</button>
                </div>

                <em v-if="viewBahnhof4">
                  <div class="form-group">
                    <label for="">Name</label>
                    <input type="text" v-model="frachtbrief.frachtbriefdata.bahnhof4.name" class="form-control" disabled />

                    <label for="">Bahnhofscode</label>
                    <input type="text" v-model="frachtbrief.frachtbriefdata.bahnhof4.bahnhofscode" class="form-control" disabled />

                    <label for="">Ländercode</label>
                    <input type="text" v-model="frachtbrief.frachtbriefdata.bahnhof4.laendercode" class="form-control" disabled />

                    <label for="">Land</label>
                    <input type="text" v-model="frachtbrief.frachtbriefdata.bahnhof4.land" class="form-control" disabled />
                  </div>
                </em>

                <label for="adresse">Beförderer (ab diesem Bahnhof)</label>

                <select :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" class="form-control" v-model="frachtbrief.frachtbriefdata.evu4">
                  <option v-bind:value="frachtbrief.frachtbriefdata.evu_def"></option>
                  <option v-for="evu in evus" v-bind:value="evu" v-bind:key="evu.id">{{ evu.name }}</option>
                </select>
                <button class="btn btn-link py-0" v-on:click="viewEvu4=!viewEvu4">Details anzeigen</button>
                <em v-if="viewEvu4">
                  <div class="form-group">
                    <label for="">Name</label>
                    <input type="text" v-model="frachtbrief.frachtbriefdata.evu4.name" class="form-control" disabled />

                    <label for="">Kurzbezeichnung</label>
                    <input type="text" v-model="frachtbrief.frachtbriefdata.evu4.short" class="form-control" disabled />

                    <label for="">EVU Code</label>
                    <input type="text" v-model="frachtbrief.frachtbriefdata.evu4.code" class="form-control" disabled />
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

                    <select :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" class="form-control" v-model="frachtbrief.frachtbriefdata.bahnhof5">
                      <option v-bind:value="frachtbrief.frachtbriefdata.bahnhof_def"></option>
                      <option v-for="bahnhof in bahnhoefe" v-bind:value="bahnhof" v-bind:key="bahnhof.id">{{ bahnhof.name }}</option>
                    </select>
                    <button class="btn btn-link py-0" v-on:click="viewBahnhof5=!viewBahnhof5">Details anzeigen</button>
                  </div>
                  <em v-if="viewBahnhof5">
                    <div class="form-group">
                      <label for="">Name</label>
                      <input type="text" v-model="frachtbrief.frachtbriefdata.bahnhof5.name" class="form-control" disabled />

                      <label for="">Bahnhofscode</label>
                      <input type="text" v-model="frachtbrief.frachtbriefdata.bahnhof5.bahnhofscode" class="form-control" disabled />

                      <label for="">Ländercode</label>
                      <input type="text" v-model="frachtbrief.frachtbriefdata.bahnhof5.laendercode" class="form-control" disabled />

                      <label for="">Land</label>
                      <input type="text" v-model="frachtbrief.frachtbriefdata.bahnhof5.land" class="form-control" disabled />
                    </div>
                  </em>

                  <label for="adresse">Beförderer (ab diesem Bahnhof)</label>

                  <select :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" class="form-control" v-model="frachtbrief.frachtbriefdata.evu5">
                    <option v-bind:value="frachtbrief.frachtbriefdata.evu_def"></option>
                    <option v-for="evu in evus" v-bind:value="evu" v-bind:key="evu.id">{{ evu.name }}</option>
                  </select>
                  <button class="btn btn-link py-0" v-on:click="viewEvu5=!viewEvu5">Details anzeigen</button>
                  <em v-if="viewEvu5">
                    <div class="form-group">
                      <label for="">Name</label>
                      <input type="text" v-model="frachtbrief.frachtbriefdata.evu5.name" class="form-control" disabled />

                      <label for="">Kurzbezeichnung</label>
                      <input type="text" v-model="frachtbrief.frachtbriefdata.evu5.short" class="form-control" disabled />

                      <label for="">EVU Code</label>
                      <input type="text" v-model="frachtbrief.frachtbriefdata.evu5.code" class="form-control" disabled />
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

                      <select :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" class="form-control" v-model="frachtbrief.frachtbriefdata.bahnhof6">
                        <option v-bind:value="frachtbrief.frachtbriefdata.bahnhof_def"></option>
                        <option v-for="bahnhof in bahnhoefe" v-bind:value="bahnhof" v-bind:key="bahnhof.id">{{ bahnhof.name }}</option>
                      </select>
                      <button class="btn btn-link py-0" v-on:click="viewBahnhof6=!viewBahnhof6">Details anzeigen</button>
                    </div>

                    <em v-if="viewBahnhof6">
                      <div class="form-group">
                        <label for="">Name</label>
                        <input type="text" v-model="frachtbrief.frachtbriefdata.bahnhof6.name" class="form-control" disabled />

                        <label for="">Bahnhofscode</label>
                        <input type="text" v-model="frachtbrief.frachtbriefdata.bahnhof6.bahnhofscode" class="form-control" disabled />

                        <label for="">Ländercode</label>
                        <input type="text" v-model="frachtbrief.frachtbriefdata.bahnhof6.laendercode" class="form-control" disabled />

                        <label for="">Land</label>
                        <input type="text" v-model="frachtbrief.frachtbriefdata.bahnhof6.land" class="form-control" disabled />
                      </div>
                    </em>

                    <label for="adresse">Beförderer (ab diesem Bahnhof)</label>

                    <select :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" class="form-control" v-model="frachtbrief.frachtbriefdata.evu6">
                      <option v-bind:value="frachtbrief.frachtbriefdata.evu_def"></option>
                      <option v-for="evu in evus" v-bind:value="evu" v-bind:key="evu.id">{{ evu.name }}</option>
                    </select>
                    <button class="btn btn-link py-0" v-on:click="viewEvu6=!viewEvu6">Details anzeigen</button>
                    <em v-if="viewEvu6">
                      <div class="form-group">
                        <label for="">Name</label>
                        <input type="text" v-model="frachtbrief.frachtbriefdata.evu6.name" class="form-control" disabled />

                        <label for="">Kurzbezeichnung</label>
                        <input type="text" v-model="frachtbrief.frachtbriefdata.evu6.short" class="form-control" disabled />

                        <label for="">EVU Code</label>
                        <input type="text" v-model="frachtbrief.frachtbriefdata.evu6.code" class="form-control" disabled />
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

              <select :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" class="form-control" v-model="frachtbrief.frachtbriefdata.ubernahmeort.bahnhof" name="Übernahmeort" v-validate="{ objectNotEmpty: true}" :class="{ 'is-invalid': submitted && errors.has('Übernahmeort') }">
                <option v-bind:value="frachtbrief.frachtbriefdata.bahnhof_def"></option>
                <option v-for="bahnhof in bahnhoefe" v-bind:value="bahnhof" v-bind:key="bahnhof.id">{{ bahnhof.name }}</option>
              </select>
              <div v-if="submitted && errors.has('Übernahmeort')" class="invalid-feedback">{{ errors.first('Übernahmeort') }}</div>


              <button class="btn btn-link py-0" v-on:click="viewUbernahmeort=!viewUbernahmeort">Details anzeigen</button>

              <em v-if="viewUbernahmeort">
                <div class="form-group">
                  <label for="">Name</label>
                  <input type="text" v-model="frachtbrief.frachtbriefdata.ubernahmeort.bahnhof.name" class="form-control" disabled />

                  <label for="">Bahnhofscode</label>
                  <input type="text" v-model="frachtbrief.frachtbriefdata.ubernahmeort.bahnhof.bahnhofscode" class="form-control" disabled />

                  <label for="">Ländercode</label>
                  <input type="text" v-model="frachtbrief.frachtbriefdata.ubernahmeort.bahnhof.laendercode" class="form-control" disabled />

                  <label for="">Land</label>
                  <input type="text" v-model="frachtbrief.frachtbriefdata.ubernahmeort.bahnhof.land" class="form-control" disabled />
                </div>
              </em>
            </div>

            <div class="col-sm-6">
              <label for="adresse">Übernahmedatum und Uhrzeit</label>

              <datetime :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" type="datetime" v-model="frachtbrief.frachtbriefdata.ubernahmeort.datum" value-zone="Europe/Berlin" ></datetime>
            </div>
          </div>
        </div>
      </div>


      <!-- ############################################################ Frachtbrief-Typ ############################################################ -->


      <div class="card mb-2">
        <div class="card-body">
          <label>Frachtbrief Typ:</label>
          <div class="form-check form-check-inline">
            <input :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" class="form-check-input" id="CIM" type="radio" name="type" value="CIM" v-model="frachtbrief.frachtbriefdata.type"/>
            <label class="form-check-label" for="CIM">CIM</label>
          </div>

          <div class="form-check form-check-inline">
            <input :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" class="form-check-input" id="CUV" type="radio" name="type" value="CUV" v-model="frachtbrief.frachtbriefdata.type"/>
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
              <input :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" type="text" v-model="frachtbrief.frachtbriefdata.ausstellung.ort" name="Ausstellungsort" v-validate="{ required: true}" class="form-control" :class="{ 'is-invalid': submitted && errors.has('Ausstellungsort') }"/>
                <div v-if="submitted && errors.has('Ausstellungsort')" class="invalid-feedback">{{ errors.first('Ausstellungsort') }}</div>
            </div>
            <div class="col-sm-6">
              <label for="adresse">Ausstellungsdatum</label>
              <datetime :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" v-model="frachtbrief.frachtbriefdata.ausstellung.datum" value-zone="Europe/Berlin" ></datetime>
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
              <button class="btn btn-primary" v-on:click="aBefordererVorschlag()" :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'">Vorschlag generieren</button>
            </div>
          </div>
          <div class="row">
            <div class="col-4 mb-1">EVU</div>
            <div class="col-8 mb-1">Strecke</div>

            <div class="col-4 mb-1"><input :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" type="text" v-model="frachtbrief.frachtbriefdata.aBeforderer1.name" class="form-control" /></div>
            <div class="col-8 mb-1"><input :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" type="text" v-model="frachtbrief.frachtbriefdata.aBeforderer1.strecke" name="Strecke" v-validate="{ required: true}" class="form-control" :class="{ 'is-invalid': submitted && errors.has('Strecke') }"/>
                <div v-if="submitted && errors.has('Strecke')" class="invalid-feedback">{{ errors.first('Strecke') }}</div></div>

            <div class="col-4 mb-1"><input :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" type="text" v-model="frachtbrief.frachtbriefdata.aBeforderer2.name" class="form-control" /></div>
            <div class="col-8 mb-1"><input :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" type="text" v-model="frachtbrief.frachtbriefdata.aBeforderer2.strecke" class="form-control" /></div>

            <div class="col-4 mb-1"><input :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" type="text" v-model="frachtbrief.frachtbriefdata.aBeforderer3.name" class="form-control" /></div>
            <div class="col-8 mb-1"><input :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" type="text" v-model="frachtbrief.frachtbriefdata.aBeforderer3.strecke" class="form-control" /></div>

            <div class="col-4 mb-1"><input :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" type="text" v-model="frachtbrief.frachtbriefdata.aBeforderer4.name" class="form-control" /></div>
            <div class="col-8 mb-1"><input :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" type="text" v-model="frachtbrief.frachtbriefdata.aBeforderer4.strecke" class="form-control" /></div>

            <div class="col-4 mb-1"><input :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" type="text" v-model="frachtbrief.frachtbriefdata.aBeforderer5.name" class="form-control" /></div>
            <div class="col-8 mb-1"><input :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" type="text" v-model="frachtbrief.frachtbriefdata.aBeforderer5.strecke" class="form-control" /></div>

            <div class="col-4 mb-1"><input :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" type="text" v-model="frachtbrief.frachtbriefdata.aBeforderer6.name" class="form-control" /></div>
            <div class="col-8 mb-1"><input :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" type="text" v-model="frachtbrief.frachtbriefdata.aBeforderer6.strecke" class="form-control" /></div>
          </div>
        </div>
      </div>


      <!-- ############################################################ ERKLÄRUNGEN ############################################################ -->

      <div class="card mb-2">
        <div class="card-body">
          <div class="form-group">
            <label for="erklarung">Erklärungen</label>

            <select :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" class="form-control" v-model="frachtbrief.frachtbriefdata.erklarung">
              <option v-bind:value="frachtbrief.frachtbriefdata.erklarung_def">neu anlegen</option>
              <option v-for="erklarung in erklarungen" v-bind:value="erklarung" v-bind:key="erklarung.id">{{ erklarung.code }}</option>
            </select>
          </div>

          <div class="form-group">
            <label for="wagenummer">Code mit Erläuterung</label>
            <textarea :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" type="text" v-model="frachtbrief.frachtbriefdata.erklarung.code" name="Code mit Erläuterung" v-validate="{ required: true}" class="form-control" :class="{ 'is-invalid': submitted && errors.has('Code mit Erläuterung') }"/>
                <div v-if="submitted && errors.has('Code mit Erläuterung')" class="invalid-feedback">{{ errors.first('Code mit Erläuterung') }}</div>

          </div>
        </div>
      </div>

      <!-- ############################################################ Kommerzielle Bedingungen ############################################################ -->
      <div class="card mb-2">
        <div class="card-body">
          <div class="form-group">
            <div class="row">
              <div class="col">
                <label for="">Kommerzielle Bedingungen</label>
              </div>
              <div class="col-auto">
                <button class="btn btn-primary" v-on:click="kommerzBedingVorschlag()" :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'">Vorschlag generieren</button>
              </div>
            </div>
          </div>
          <textarea :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" type="text" v-model="frachtbrief.frachtbriefdata.kommerziellebedingungen" name="Kommerzielle Bedingungen" v-validate="{ required: true}" class="form-control" :class="{ 'is-invalid': submitted && errors.has('Kommerzielle Bedingungen') }"/>
          <div v-if="submitted && errors.has('Kommerzielle Bedingungen')" class="invalid-feedback">{{ errors.first('Kommerzielle Bedingungen') }}</div>
        </div>
      </div>

          <!-- ############################################################ Ladeliste zuordnen ############################################################ -->


      <div class="card mb-2">
        <div class="card-body">
          <div class="row">

            <div class="col-sm-6">
              <label for="adresse">freigegebene Ladeliste zuordnen</label>

                <em v-if="frachtbrief.status != 'Abgeschlossen'">
              <select :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" class="form-control" v-model="frachtbrief.frachtbriefdata.ladeliste" >
                <option v-bind:value="frachtbrief.frachtbriefdata.ladeliste_def"></option>
                <option v-for="ladeliste in ladelisten" v-bind:value="ladeliste" v-bind:key="ladeliste.id">{{ ladeliste.ladelistedata.refnr }}</option>
              </select>


                </em>

            </div>


          </div>
          <em v-if="frachtbrief.frachtbriefdata.ladeliste.ladelistedata">
          zugeordnet: {{' ' + this.frachtbrief.frachtbriefdata.ladeliste.ladelistedata.refnr}}
          </em>
        </div>
      </div>


      <!-- ############################################################ Bezeichnung des Gutes wenn Ladeliste zugeordnet ############################################################ -->
    <em v-if="frachtbrief.frachtbriefdata.ladeliste">
    <div class="card mb-2">
      <div class="card-body">
        <div class="form-group">
          <div class="row">
            <div class="col">
              <label for="">Bezeichnung des Gutes</label>
            </div>
            <div class="col-auto">
              <button class="btn btn-primary" v-on:click="bezeichnungGutVorschlag()" :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'">Vorschlag generieren</button>
            </div>
          </div>
        </div>
        <textarea :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" type="text" v-model="frachtbrief.frachtbriefdata.bezeichnungGut" class="form-control" name="Bezeichnung des Gutes" v-validate="{ required: true}" :class="{ 'is-invalid': submitted && errors.has('Bezeichnung des Gutes') }"/>
        <div v-if="submitted && errors.has('Bezeichnung des Gutes')" class="invalid-feedback">{{ errors.first('Bezeichnung des Gutes') }}</div>
      </div>
    </div>
    </em>

    </form>






    <div class="form-group">
      <div class="row mx-1">
        <div class="col">
          <label>Als Vorlage verwenden:</label>
          <div class="form-check form-check-inline">
            <input class="form-check-input" id="vorlagefalse" type="radio" name="vorlage" value="false" v-model="frachtbrief.vorlage" v-on:click="frachtbrief.status= 'in Bearbeitung'" :disabled="frachtbrief.status == 'Abgeschlossen'"/>
            <label class="form-check-label" for="vorlagefalse">Nein</label>
          </div>

          <div class="form-check form-check-inline">
            <input class="form-check-input" id="vorlagetrue" type="radio" name="vorlage" value="true" v-model="frachtbrief.vorlage" v-on:click="frachtbrief.status= 'Vorlage'" :disabled="frachtbrief.status == 'Abgeschlossen'"/>
            <label class="form-check-label" for="vorlagetrue">Ja</label>
          </div>
        </div>

        <div class="col alert-info">
          <em v-if="nachricht">
            {{nachricht.text}}
          </em>
        </div>

        <div class="col-auto">
          <button class="btn btn-success" v-on:click="speichern()" :disabled="frachtbrief.status == 'Abgeschlossen'">Zwischenspeichern</button>
        </div>
      </div>
    </div>




    <div class="card mb-2">
      <div class="card-header">
        PDF-Dokumente
      </div>

      <div class="card-body">

        <label>PDF-Vorschau (ohne Ladeliste)</label>
        <div class="form-group">
          <button class="btn btn-secondary mx-1" v-on:click="generatePdfButton" :disabled="frachtbrief.status == 'Abgeschlossen'">PDF-Vorschau generieren</button>

          <em v-if="frachtbrief.pdf_id != null">
            <button class="btn btn-link mx-1" v-on:click="viewPdfButton" :disabled="frachtbrief.status == 'Abgeschlossen'">PDF-Vorschau anzeigen</button>
          </em>
        </div>

        <label>PDF-Frachtbrief (mit Ladeliste)</label>
        <div class="form-group">
          <em v-if="frachtbrief.status == 'freigegeben' || frachtbrief.status == 'Abgeschlossen'">
            <div class="form-group">
              <button class="btn btn-secondary mx-1" v-on:click="generateFinalPdfButton" :disabled="frachtbrief.status == 'Abgeschlossen'">finalen Frachtbrief generieren</button>
              <button class="btn btn-link mx-1" v-on:click="viewFinalPdfButton" :disabled="frachtbrief.pdf_id_komplett == null">finalen Frachtbrief anzeigen</button>
            </div>


          </em>
        </div>
      </div>
    </div>


    <div class="card mb-2">

      <div class="card-header">
        <label>Aktueller Status des Frachtbriefes: {{frachtbrief.status}}</label>
        <!--<select :disabled="frachtbrief.status == 'Abgeschlossen' || frachtbrief.status == 'freigegeben' || frachtbrief.status == 'storniert'" class="form-control" v-model="frachtbrief.status">
        <option disabled value="Abgeschlossen">Abgeschlossen</option>
        <option disabled value="in Bearbeitung">in Bearbeitung</option>
        <option disabled value="freigegeben">freigegeben</option>
        <option disabled value="storniert">storniert</option>
        <option disabled value="Vorlage">Vorlage</option>
      </select> -->
    </div>

    <div class="card-body">
      <label>Status des Frachtbriefes ändern und Speichern:</label>
      <div class="form-group">
        <button class="btn btn-info mx-1" v-on:click="setStatus('in Bearbeitung')" :disabled="frachtbrief.status == 'Abgeschlossen'" >in Bearbeitung</button>
        <button class="btn btn-info mx-1" v-on:click="setStatus('freigegeben')" :disabled="frachtbrief.status == 'Abgeschlossen'">freigegeben</button>
        <button class="btn btn-info mx-1" v-on:click="setStatus('storniert')" :disabled="frachtbrief.status == 'Abgeschlossen'">storniert</button>
      </div>
    </div>
  </div>


  <div class="form-group">
    <button class="btn btn-info col-12 mb-5" v-on:click="setStatus('Abgeschlossen')" :disabled="frachtbrief.pdf_id_komplett == null || frachtbrief.status == 'Abgeschlossen'">Frachtbrief abschließen</button>
  </div>

  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { Validator } from 'vee-validate';


Validator.extend('objectNotEmpty', {
  validate: (value) => {
    if (value[Object.keys(value)[0]]) {

      return true;
    }
    return false
  },
});

Validator.extend('objectNotEmpty2', {
  validate: (value) => {
    console.log('rein')
    if (value[Object.keys(value)[0]]) {
      console.log("gggtrue")
      return true;
    }
    console.log("false")
    return false
  },
});


export default {
    data () {
        return {
            submitted: false,
            test1: {
            loading: null
            },
            zwBahnhof1: false,
            zwBahnhof2: false,
            zwBahnhof3: false,
            zwBahnhof4: false,
            zwBahnhof5: false,
            viewEvu1: false,
            viewEvu2: false,
            viewEvu3: false,
            viewEvu4: false,
            viewEvu5: false,
            viewEvu6: false,
            viewAdresse1: false,
            viewAdresse2: false,
            viewUbernahmeort: false,
            viewBahnhof1: false,
            viewBahnhof2: false,
            viewBahnhof3: false,
            viewBahnhof4: false,
            viewBahnhof5: false,
            viewBahnhof6: false,
            viewBahnhof7: false,

        }

    },
    computed: {
        ...mapState({

            frachtbrief: state => state.frachtbrief.all.items,
            brief: state => state.frachtbrief.all,
            pdf: state => state.frachtbrief.pdf.items,

            bahnhoefe: state => state.bahnhof.all.items,
            evus: state => state.evu.all.items,
            adressen: state => state.adresse.all.items,
            erklarungen: state => state.erklarung.all.items,
            nachricht: state => state.frachtbrief.nachricht,
            ladelisten: state => state.ladeliste.all.items,
        })
    },
    created () {

        this.getById(this.$route.params.id)


    },
    mounted () {
        this.getAllBahnhof();
        this.getAllEvu();
        this.getAllAdresse();
        this.getAllErklarung();
        this.getAllStatus("freigegeben");
        this.clearErrorMessages();
        console.log('mount')
    },
    methods: {


         ...mapActions('ladeliste', {getAllStatus: 'getAllStatus'}),
       ...mapActions( 'frachtbrief', ['getById']
        ),
        ...mapActions( 'frachtbrief', ['update']
        ),
        ...mapActions( 'frachtbrief', ['createPDF']
        ),
        ...mapActions( 'frachtbrief', ['getPdfById']
        ),
        ...mapActions( 'frachtbrief', ['createFinalPDF']
        ),
         ...mapActions('bahnhof', {getAllBahnhof: 'getAll'}),
        ...mapActions('evu', {getAllEvu: 'getAll'}),
        ...mapActions('adresse', {getAllAdresse: 'getAll'}),
        ...mapActions('ladeliste', {updateLadelisteO: 'updateO'}),
        ...mapActions('erklarung', {createErklarung: 'create'}),
        ...mapActions('erklarung', {getAllErklarung: 'getAll'}),
        speichern() {
            console.log("handlesub")

            if(this.frachtbrief.vorlage=='true'){
              console.log(true)
              this.frachtbrief.status = 'Vorlage'
            }
            let data = this.frachtbrief;





this.update(data);
        },
        setStatus(s){
this.clearErrorMessages()
var ladelisteid = this.frachtbrief.frachtbriefdata.ladeliste.id




          if(s=='Abgeschlossen'){
this.updateLadelisteO({id: ladelisteid, status: 'Abgeschlossen'})
}

if(s=='freigegeben'){
var ladeliste = true;
              this.submitted = true;
              console.log(this.frachtbrief.frachtbriefdata.ladeliste.ladelistedata)
            if(!this.frachtbrief.frachtbriefdata.ladeliste.ladelistedata){
              this.nachricht.text = "Bitte Ladeliste zuordnen"
              console.log('Bitte Ladeliste zuordnen')
              ladeliste = false
            }
            this.$validator.validate().then(valid => {
                if (valid && ladeliste) {

            this.frachtbrief.status = s;
                    this.speichern()
                }
            });

}

if(s!='freigegeben'){
  this.frachtbrief.status = s;
  this.speichern()
}
        },
        clearErrorMessages(){
this.nachricht.text = ''
        },
       generateFinalPdfButton(){
let data = this.frachtbrief;
                  this.createFinalPDF(data)
       },
    generatePdfButton() {

                   let data = this.frachtbrief;
                  this.createPDF(data)
                  //.then(this.getById(this.$route.params.id));
                   //.then((reslut) => {this.getById(this.$route.params.id);console.log('test')});




        },
        viewFinalPdfButton(){

                  this.getPdfById(this.frachtbrief.pdf_id_komplett).then(() => {
                      console.log(this.pdf.pdf)

                      const blob = new Blob(
    [Uint8Array.from(this.pdf.pdf.data)],
    {type: 'application/pdf'});

                      let a = document.createElement("a")
  let blobURL = URL.createObjectURL(blob)
  a.download = this.frachtbrief.frachtbriefdata.refnr + '_' + this.frachtbrief.createdAt.slice(0, 10).split('-').reverse().join('.') + '.pdf'
  a.href = blobURL
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)



    }




    )


                   //.then((reslut) => {this.getById(this.$route.params.id);console.log('test')});





        },
    viewPdfButton() {


                  this.getPdfById(this.frachtbrief.pdf_id).then(() => {
                      console.log(this.pdf.pdf)

                      const file = new Blob(
    [Uint8Array.from(this.pdf.pdf.data)],
    {type: 'application/pdf'});

                      const fileURL = URL.createObjectURL(file);
    //Open the URL on new Window
    window.open(fileURL);})


                   //.then((reslut) => {this.getById(this.$route.params.id);console.log('test')});




        },

    handleSubmit(){

    },

kommerzBedingVorschlag(){
//this.frachtbrief.frachtbriefdata.kommerziellebedingungen = '('+this.frachtbrief.frachtbriefdata.bahnhof1.name+' - '+this.frachtbrief.frachtbriefdata.bahnhof7.name +') ' + this.frachtbrief.frachtbriefdata.evu1.short + ' ' + this.frachtbrief.frachtbriefdata.evu1.code

if(this.frachtbrief.frachtbriefdata.evu2.short==''){
    var name1=this.frachtbrief.frachtbriefdata.evu1.short +  ' ' + this.frachtbrief.frachtbriefdata.evu1.code;
    var strecke1=this.frachtbrief.frachtbriefdata.bahnhof1.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof7.name;
    var teil1 = '('+name1 +') ' + strecke1

    this.frachtbrief.frachtbriefdata.kommerziellebedingungen = teil1

}

if(this.frachtbrief.frachtbriefdata.evu2.short!='' && this.frachtbrief.frachtbriefdata.evu3.short==''){
    var name1=this.frachtbrief.frachtbriefdata.evu1.short +  ' ' + this.frachtbrief.frachtbriefdata.evu1.code;
    var strecke1=this.frachtbrief.frachtbriefdata.bahnhof1.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof2.name;
    var teil1 = '('+name1 +') ' + strecke1

    var name2=this.frachtbrief.frachtbriefdata.evu2.short +  ' ' + this.frachtbrief.frachtbriefdata.evu2.code;
    var strecke2=this.frachtbrief.frachtbriefdata.bahnhof2.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof7.name;
    var teil2 = '('+name2 +') ' + strecke2

this.frachtbrief.frachtbriefdata.kommerziellebedingungen = teil1 + '\n' + teil2

}

if(this.frachtbrief.frachtbriefdata.evu2.short!='' && this.frachtbrief.frachtbriefdata.evu3.short!='' && this.frachtbrief.frachtbriefdata.evu4.short==''){
    var name1=this.frachtbrief.frachtbriefdata.evu1.short +  ' ' + this.frachtbrief.frachtbriefdata.evu1.code;
    var strecke1=this.frachtbrief.frachtbriefdata.bahnhof1.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof2.name;
    var teil1 = '('+name1 +') ' + strecke1

    var name2=this.frachtbrief.frachtbriefdata.evu2.short +  ' ' + this.frachtbrief.frachtbriefdata.evu2.code;
    var strecke2=this.frachtbrief.frachtbriefdata.bahnhof2.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof3.name;
    var teil2 = '('+name2 +') ' + strecke2

    var name3=this.frachtbrief.frachtbriefdata.evu3.short +  ' ' + this.frachtbrief.frachtbriefdata.evu3.code;
    var strecke3=this.frachtbrief.frachtbriefdata.bahnhof3.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof7.name;
    var teil3 = '('+name3 +') ' + strecke3

    this.frachtbrief.frachtbriefdata.kommerziellebedingungen = teil1 + '\n' + teil2 + '\n' + teil3

}

if(this.frachtbrief.frachtbriefdata.evu2.short!='' && this.frachtbrief.frachtbriefdata.evu3.short!='' && this.frachtbrief.frachtbriefdata.evu4.short!='' && this.frachtbrief.frachtbriefdata.evu5.short==''){
    var name1=this.frachtbrief.frachtbriefdata.evu1.short +  ' ' + this.frachtbrief.frachtbriefdata.evu1.code;
    var strecke1=this.frachtbrief.frachtbriefdata.bahnhof1.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof2.name;
    var teil1 = '('+name1 +') ' + strecke1

    var name2=this.frachtbrief.frachtbriefdata.evu2.short +  ' ' + this.frachtbrief.frachtbriefdata.evu2.code;
    var strecke2=this.frachtbrief.frachtbriefdata.bahnhof2.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof3.name;
    var teil2 = '('+name2 +') ' + strecke2

    var name3=this.frachtbrief.frachtbriefdata.evu3.short +  ' ' + this.frachtbrief.frachtbriefdata.evu3.code;
    var strecke3=this.frachtbrief.frachtbriefdata.bahnhof3.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof4.name;
    var teil3 = '('+name3 +') ' + strecke3

    var name4=this.frachtbrief.frachtbriefdata.evu4.short +  ' ' + this.frachtbrief.frachtbriefdata.evu4.code;
    var strecke4=this.frachtbrief.frachtbriefdata.bahnhof4.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof7.name;
    var teil4 = '('+name4 +') ' + strecke4

    this.frachtbrief.frachtbriefdata.kommerziellebedingungen = teil1 + '\n' + teil2 + '\n' + teil3 + '\n' + teil4
}

if(this.frachtbrief.frachtbriefdata.evu2.short!='' && this.frachtbrief.frachtbriefdata.evu3.short!='' && this.frachtbrief.frachtbriefdata.evu4.short!='' && this.frachtbrief.frachtbriefdata.evu5.short!='' && this.frachtbrief.frachtbriefdata.evu6.short==''){
    var name1=this.frachtbrief.frachtbriefdata.evu1.short +  ' ' + this.frachtbrief.frachtbriefdata.evu1.code;
    var strecke1=this.frachtbrief.frachtbriefdata.bahnhof1.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof2.name;
    var teil1 = '('+name1 +') ' + strecke1

    var name2=this.frachtbrief.frachtbriefdata.evu2.short +  ' ' + this.frachtbrief.frachtbriefdata.evu2.code;
    var strecke2=this.frachtbrief.frachtbriefdata.bahnhof2.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof3.name;
    var teil2 = '('+name2 +') ' + strecke2

    var name3=this.frachtbrief.frachtbriefdata.evu3.short +  ' ' + this.frachtbrief.frachtbriefdata.evu3.code;
    var strecke3=this.frachtbrief.frachtbriefdata.bahnhof3.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof4.name;
    var teil3 = '('+name3 +') ' + strecke3

    var name4=this.frachtbrief.frachtbriefdata.evu4.short +  ' ' + this.frachtbrief.frachtbriefdata.evu4.code;
    var strecke4=this.frachtbrief.frachtbriefdata.bahnhof4.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof5.name;
    var teil4 = '('+name4 +') ' + strecke4

    var name5=this.frachtbrief.frachtbriefdata.evu5.short +  ' ' + this.frachtbrief.frachtbriefdata.evu5.code;
    var strecke5=this.frachtbrief.frachtbriefdata.bahnhof5.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof7.name;
    var teil5 = '('+name5 +') ' + strecke5

    this.frachtbrief.frachtbriefdata.kommerziellebedingungen = teil1 + '\n' + teil2 + '\n' + teil3 + '\n' + teil4 + '\n' + teil5

}

if(this.frachtbrief.frachtbriefdata.evu2.short!='' && this.frachtbrief.frachtbriefdata.evu3.short!='' && this.frachtbrief.frachtbriefdata.evu4.short!='' && this.frachtbrief.frachtbriefdata.evu5.short!='' && this.frachtbrief.frachtbriefdata.evu6.short!=''){
    var name1=this.frachtbrief.frachtbriefdata.evu1.short +  ' ' + this.frachtbrief.frachtbriefdata.evu1.code;
    var strecke1=this.frachtbrief.frachtbriefdata.bahnhof1.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof2.name;
    var teil1 = '('+name1 +') ' + strecke1

    var name2=this.frachtbrief.frachtbriefdata.evu2.short +  ' ' + this.frachtbrief.frachtbriefdata.evu2.code;
    var strecke2=this.frachtbrief.frachtbriefdata.bahnhof2.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof3.name;
    var teil2 = '('+name2 +') ' + strecke2

    var name3=this.frachtbrief.frachtbriefdata.evu3.short +  ' ' + this.frachtbrief.frachtbriefdata.evu3.code;
    var strecke3=this.frachtbrief.frachtbriefdata.bahnhof3.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof4.name;
    var teil3 = '('+name3 +') ' + strecke3

    var name4=this.frachtbrief.frachtbriefdata.evu4.short +  ' ' + this.frachtbrief.frachtbriefdata.evu4.code;
    var strecke4=this.frachtbrief.frachtbriefdata.bahnhof4.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof5.name;
    var teil4 = '('+name4 +') ' + strecke4

    var name5=this.frachtbrief.frachtbriefdata.evu5.short +  ' ' + this.frachtbrief.frachtbriefdata.evu5.code;
    var strecke5=this.frachtbrief.frachtbriefdata.bahnhof5.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof6.name;
    var teil5 = '('+name5 +') ' + strecke5

    var name6=this.frachtbrief.frachtbriefdata.evu6.short +  ' ' + this.frachtbrief.frachtbriefdata.evu6.code;
    var strecke6=this.frachtbrief.frachtbriefdata.bahnhof6.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof7.name;
    var teil6 = '('+name6 +') ' + strecke6

    this.frachtbrief.frachtbriefdata.kommerziellebedingungen = teil1 + '\n' + teil2 + '\n' + teil3 + '\n' + teil4 + '\n' + teil5 + '\n' + teil6

}


},

bezeichnungGutVorschlag(){
let s = ''

console.log("bezeichnungGutVorschlag");


for (var l in this.frachtbrief.frachtbriefdata.ladeliste.ladelistedata){



if(typeof (this.frachtbrief.frachtbriefdata.ladeliste.ladelistedata[l].ladegut) !== 'undefined'){

  if(typeof (this.frachtbrief.frachtbriefdata.ladeliste.ladelistedata[l].ladegut.bezeichnung) !== 'undefined'){



console.log(this.frachtbrief.frachtbriefdata.ladeliste.ladelistedata[l].ladegut.bezeichnung)




s = s + this.frachtbrief.frachtbriefdata.ladeliste.ladelistedata[l].wagen.length + 'x ' + this.frachtbrief.frachtbriefdata.ladeliste.ladelistedata[l].ladegut.wagentyp + ' (' + this.frachtbrief.frachtbriefdata.ladeliste.ladelistedata[l].ladegut.bezeichnung + ') \n' +
this.frachtbrief.frachtbriefdata.ladeliste.ladelistedata[l].ladegut.bemerkung + '\n \n'



  }

}

}

this.frachtbrief.frachtbriefdata.bezeichnungGut = s;
console.log(s)
},


    aBefordererVorschlag() {





if(this.frachtbrief.frachtbriefdata.evu2.short==''){
    this.frachtbrief.frachtbriefdata.aBeforderer1.name=this.frachtbrief.frachtbriefdata.evu1.short;
    this.frachtbrief.frachtbriefdata.aBeforderer1.strecke=this.frachtbrief.frachtbriefdata.bahnhof1.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof7.name;
}

if(this.frachtbrief.frachtbriefdata.evu2.short!='' && this.frachtbrief.frachtbriefdata.evu3.short==''){
    this.frachtbrief.frachtbriefdata.aBeforderer1.name=this.frachtbrief.frachtbriefdata.evu1.short;
    this.frachtbrief.frachtbriefdata.aBeforderer1.strecke=this.frachtbrief.frachtbriefdata.bahnhof1.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof2.name;

    this.frachtbrief.frachtbriefdata.aBeforderer2.name=this.frachtbrief.frachtbriefdata.evu2.short;
    this.frachtbrief.frachtbriefdata.aBeforderer2.strecke=this.frachtbrief.frachtbriefdata.bahnhof2.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof7.name;

}

if(this.frachtbrief.frachtbriefdata.evu2.short!='' && this.frachtbrief.frachtbriefdata.evu3.short!='' && this.frachtbrief.frachtbriefdata.evu4.short==''){
    this.frachtbrief.frachtbriefdata.aBeforderer1.name=this.frachtbrief.frachtbriefdata.evu1.short;
    this.frachtbrief.frachtbriefdata.aBeforderer1.strecke=this.frachtbrief.frachtbriefdata.bahnhof1.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof2.name;

    this.frachtbrief.frachtbriefdata.aBeforderer2.name=this.frachtbrief.frachtbriefdata.evu2.short;
    this.frachtbrief.frachtbriefdata.aBeforderer2.strecke=this.frachtbrief.frachtbriefdata.bahnhof2.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof3.name;

    this.frachtbrief.frachtbriefdata.aBeforderer3.name=this.frachtbrief.frachtbriefdata.evu3.short;
    this.frachtbrief.frachtbriefdata.aBeforderer3.strecke=this.frachtbrief.frachtbriefdata.bahnhof3.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof7.name;

}

if(this.frachtbrief.frachtbriefdata.evu2.short!='' && this.frachtbrief.frachtbriefdata.evu3.short!='' && this.frachtbrief.frachtbriefdata.evu4.short!='' && this.frachtbrief.frachtbriefdata.evu5.short==''){
    this.frachtbrief.frachtbriefdata.aBeforderer1.name=this.frachtbrief.frachtbriefdata.evu1.short;
    this.frachtbrief.frachtbriefdata.aBeforderer1.strecke=this.frachtbrief.frachtbriefdata.bahnhof1.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof2.name;

    this.frachtbrief.frachtbriefdata.aBeforderer2.name=this.frachtbrief.frachtbriefdata.evu2.short;
    this.frachtbrief.frachtbriefdata.aBeforderer2.strecke=this.frachtbrief.frachtbriefdata.bahnhof2.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof3.name;

    this.frachtbrief.frachtbriefdata.aBeforderer3.name=this.frachtbrief.frachtbriefdata.evu3.short;
    this.frachtbrief.frachtbriefdata.aBeforderer3.strecke=this.frachtbrief.frachtbriefdata.bahnhof3.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof4.name;

    this.frachtbrief.frachtbriefdata.aBeforderer4.name=this.frachtbrief.frachtbriefdata.evu4.short;
    this.frachtbrief.frachtbriefdata.aBeforderer4.strecke=this.frachtbrief.frachtbriefdata.bahnhof4.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof7.name;

}

if(this.frachtbrief.frachtbriefdata.evu2.short!='' && this.frachtbrief.frachtbriefdata.evu3.short!='' && this.frachtbrief.frachtbriefdata.evu4.short!='' && this.frachtbrief.frachtbriefdata.evu5.short!='' && this.frachtbrief.frachtbriefdata.evu6.short==''){
    this.frachtbrief.frachtbriefdata.aBeforderer1.name=this.frachtbrief.frachtbriefdata.evu1.short;
    this.frachtbrief.frachtbriefdata.aBeforderer1.strecke=this.frachtbrief.frachtbriefdata.bahnhof1.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof2.name;

    this.frachtbrief.frachtbriefdata.aBeforderer2.name=this.frachtbrief.frachtbriefdata.evu2.short;
    this.frachtbrief.frachtbriefdata.aBeforderer2.strecke=this.frachtbrief.frachtbriefdata.bahnhof2.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof3.name;

    this.frachtbrief.frachtbriefdata.aBeforderer3.name=this.frachtbrief.frachtbriefdata.evu3.short;
    this.frachtbrief.frachtbriefdata.aBeforderer3.strecke=this.frachtbrief.frachtbriefdata.bahnhof3.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof4.name;

    this.frachtbrief.frachtbriefdata.aBeforderer4.name=this.frachtbrief.frachtbriefdata.evu4.short;
    this.frachtbrief.frachtbriefdata.aBeforderer4.strecke=this.frachtbrief.frachtbriefdata.bahnhof4.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof5.name;

    this.frachtbrief.frachtbriefdata.aBeforderer5.name=this.frachtbrief.frachtbriefdata.evu5.short;
    this.frachtbrief.frachtbriefdata.aBeforderer5.strecke=this.frachtbrief.frachtbriefdata.bahnhof5.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof7.name;

}

if(this.frachtbrief.frachtbriefdata.evu2.short!='' && this.frachtbrief.frachtbriefdata.evu3.short!='' && this.frachtbrief.frachtbriefdata.evu4.short!='' && this.frachtbrief.frachtbriefdata.evu5.short!='' && this.frachtbrief.frachtbriefdata.evu6.short!=''){
    this.frachtbrief.frachtbriefdata.aBeforderer1.name=this.frachtbrief.frachtbriefdata.evu1.short;
    this.frachtbrief.frachtbriefdata.aBeforderer1.strecke=this.frachtbrief.frachtbriefdata.bahnhof1.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof2.name;

    this.frachtbrief.frachtbriefdata.aBeforderer2.name=this.frachtbrief.frachtbriefdata.evu2.short;
    this.frachtbrief.frachtbriefdata.aBeforderer2.strecke=this.frachtbrief.frachtbriefdata.bahnhof2.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof3.name;

    this.frachtbrief.frachtbriefdata.aBeforderer3.name=this.frachtbrief.frachtbriefdata.evu3.short;
    this.frachtbrief.frachtbriefdata.aBeforderer3.strecke=this.frachtbrief.frachtbriefdata.bahnhof3.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof4.name;

    this.frachtbrief.frachtbriefdata.aBeforderer4.name=this.frachtbrief.frachtbriefdata.evu4.short;
    this.frachtbrief.frachtbriefdata.aBeforderer4.strecke=this.frachtbrief.frachtbriefdata.bahnhof4.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof5.name;

    this.frachtbrief.frachtbriefdata.aBeforderer5.name=this.frachtbrief.frachtbriefdata.evu5.short;
    this.frachtbrief.frachtbriefdata.aBeforderer5.strecke=this.frachtbrief.frachtbriefdata.bahnhof5.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof6.name;

    this.frachtbrief.frachtbriefdata.aBeforderer6.name=this.frachtbrief.frachtbriefdata.evu6.short;
    this.frachtbrief.frachtbriefdata.aBeforderer6.strecke=this.frachtbrief.frachtbriefdata.bahnhof6.name + ' - ' + this.frachtbrief.frachtbriefdata.bahnhof7.name;

}
    }


    }
};
</script>

<style>
@import '/node_modules/vue-datetime/dist/vue-datetime.css';

</style>
