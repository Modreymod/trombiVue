<template>
  <div class="container py-4">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h1 class="text-center">Formulaire Planning Type</h1>
        <form @submit.prevent="submitForm">
          <div v-for="(jour, index) in jours" :key="index">
            <h2 class="mt-4">{{ jour }}</h2>

            <div class="mb-3">
              <label class="form-label">Matin:</label>
              <div class="row">
                <div class="col">
                  <label for="debutMatin" class="form-label">Début:</label>
                  <input type="time" :id="'debutMatin' + index" v-model="plagesHoraires[index].matin.debut"
                    class="form-control">
                </div>
                <div class="col">
                  <label for="finMatin" class="form-label">Fin:</label>
                  <input type="time" :id="'finMatin' + index" v-model="plagesHoraires[index].matin.fin"
                    class="form-control">
                </div>
                <div class="col">
                  <label class="form-label">État:</label>
                  <select v-model="plagesHoraires[index].matin.etat.id" class="form-select">
                    <option value="1">Repos</option>
                    <option value="2">Télétravail</option>
                    <option value="3">Sur site</option>
                    <option value="4">Déplacement</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Après-midi:</label>
              <div class="row">
                <div class="col">
                  <label for="debutApresMidi" class="form-label">Début:</label>
                  <input type="time" :id="'debutApresMidi' + index" v-model="plagesHoraires[index].apresMidi.debut"
                    class="form-control">
                </div>
                <div class="col">
                  <label for="finApresMidi" class="form-label">Fin:</label>
                  <input type="time" :id="'finApresMidi' + index" v-model="plagesHoraires[index].apresMidi.fin"
                    class="form-control">
                </div>
                <div class="col">
                  <label class="form-label">État:</label>
                  <select v-model="plagesHoraires[index].apresMidi.etat.id" class="form-select">
                    <option value="1">Repos</option>
                    <option value="2">Télétravail</option>
                    <option value="3">Sur site</option>
                    <option value="4">Déplacement</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="mb-3 text-center">
            <button type="submit" class="btn btn-primary">Envoyer</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jours: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'],
      plagesHoraires: [
        {
          matin: {
            debut: "",
            fin: "",
            etat: {
              id: null,
              nomEtat: ""
            }
          },
          apresMidi: {
            debut: "",
            fin: "",
            etat: {
              id: null,
              nomEtat: ""
            }
          }
        },
        {
          matin: {
            debut: "",
            fin: "",
            etat: {
              id: null,
              nomEtat: ""
            }
          },
          apresMidi: {
            debut: "",
            fin: "",
            etat: {
              id: null,
              nomEtat: ""
            }
          }
        },
        {
          matin: {
            debut: "",
            fin: "",
            etat: {
              id: null,
              nomEtat: ""
            }
          },
          apresMidi: {
            debut: "",
            fin: "",
            etat: {
              id: null,
              nomEtat: ""
            }
          }
        },
        {
          matin: {
            debut: "",
            fin: "",
            etat: {
              id: null,
              nomEtat: ""
            }
          },
          apresMidi: {
            debut: "",
            fin: "",
            etat: {
              id: null,
              nomEtat: ""
            }
          }
        },
        {
          matin: {
            debut: "",
            fin: "",
            etat: {
              id: null,
              nomEtat: ""
            }
          },
          apresMidi: {
            debut: "",
            fin: "",
            etat: {
              id: null,
              nomEtat: ""
            }
          }
        },
        {
          matin: {
            debut: "",
            fin: "",
            etat: {
              id: null,
              nomEtat: ""
            }
          },
          apresMidi: {
            debut: "",
            fin: "",
            etat: {
              id: null,
              nomEtat: ""
            }
          }
        },
        {
          matin: {
            debut: "",
            fin: "",
            etat: {
              id: null,
              nomEtat: ""
            }
          },
          apresMidi: {
            debut: "",
            fin: "",
            etat: {
              id: null,
              nomEtat: ""
            }
          }
        }
      ]
    };
  },
  methods: {
    submitForm() {
      const data = {
        id: 26,
        idEmploye: 83,
        nom: "Planning été",
        plagesHoraires: []
      };

      for (let index in this.plagesHoraires) {
        const matin = this.plagesHoraires[index].matin;
        const apresMidi = this.plagesHoraires[index].apresMidi;

        data.plagesHoraires.push(
          {
            id: parseInt(index) + 1,
            nomPlage: "matin",
            debut: "1970-01-01T" + matin.debut + ":00+00:00",
            fin: "1970-01-01T" + matin.fin + ":00+00:00",
            numJour: parseInt(index),
            etat: {
              id: matin.etat.id,
              nomEtat: this.getNomEtat(matin.etat.id)
            }
          },
          {
            id: parseInt(index) + 2,
            nomPlage: "après-midi",
            debut: "1970-01-01T" + apresMidi.debut + ":00+00:00",
            fin: "1970-01-01T" + apresMidi.fin + ":00+00:00",
            numJour: parseInt(index),
            etat: {
              id: apresMidi.etat.id,
              nomEtat: this.getNomEtat(apresMidi.etat.id)
            }
          }
        );
      }

      // Envoie des données au serveur
      fetch('http://172.17.0.3/public/api/plannings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (response.ok) {
            // La requête a réussi (code de statut 2xx)
            return response.json(); // Analyser le corps de la réponse en JSON
          } else {
            throw new Error('La requête a échoué avec le statut ' + response.status);
          }
        })
        .then(responseData => {
          // Gérer la réponse du serveur
          console.log('Réponse du serveur:', responseData);
          // Effectuer d'autres actions si nécessaire
        })
        .catch(error => {
          // Gérer les erreurs survenues lors de la requête
          console.error('Erreur lors de l\'envoi du formulaire:', error);
        });
    },
    getNomEtat(id) {
      switch (id) {
        case 1:
          return "Repos";
        case 2:
          return "Télétravail";
        case 3:
          return "Sur site";
        case 4:
          return "Déplacement";
        default:
          return "";
      }
    }
  }
};
</script>
