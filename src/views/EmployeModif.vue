<template>
    <div class="container py-4">
        <div class="row justify-content-center align-items-center">
            <div class="col-md-8">
                <h1 class="text-center">Employé</h1>
                <div class="row">
                    <div class="col-md-6">
                        <div v-if="employe" class="card">
                            <div class="card-body">
                                <img :src="employe.photo" class="card-img-top img-fluid" alt="Photo de l'employé">
                                <div class="card-body">
                                    <p class="font-weight-bold">Matricule : {{ employe.matricule }}</p>
                                    <p class="card-text">Niveau Hiérarchique : {{ employe.niveau_hierarchique }}</p>
                                    <p class="card-text">N-1: {{ employe.n_1 }}</p>
                                    <p class="card-text">Nom : {{ employe.cache_nom }}</p>
                                    <p class="card-text">Date d'entrée : {{ formatDate(employe.dentree) }}</p>
                                    <p class="card-text" v-if="employe.dsortie">Date de sortie : {{ formatDate(employe.dsortie) }}</p>
                                    <p class="card-text">Initiales : {{ employe.initials }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <form @submit.prevent="updateEmployeTel">
                                    <div class="form-group">
                                        <label for="numero">Numéro Téléphone:</label>
                                        <input type="text" class="form-control" id="numero" v-model="numero" />
                                    </div>
                                    <div class="form-group">
                                        <label for="type">Type:</label>
                                        <select class="form-control" id="type1" v-model="type">
                                            <option value="Personnel">Personnel</option>
                                            <option value="Professionnel">Professionnel</option>
                                        </select>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Mettre à jour</button>
                                </form>
                                <div v-if="successMessage" class="alert alert-success mt-3">{{ successMessage }}</div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <form @submit.prevent="updateEmployeMail">
                                    <div class="form-group">
                                        <label for="numero">Mail:</label>
                                        <input type="text" class="form-control" id="adresse" v-model="adresse" />
                                    </div>
                                    <div class="form-group">
                                        <label for="type">Type:</label>
                                        <select class="form-control" id="type2" v-model="type">
                                            <option value="Personnel">Personnel</option>
                                            <option value="Professionnel">Professionnel</option>
                                        </select>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Mettre à jour</button>
                                </form>
                                <div v-if="successMessage" class="alert alert-success mt-3">{{ successMessage }}</div>
                                <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <router-view></router-view>
</template>


<script>
export default {
    props: {
        cfg: Object
    },
    data() {
        return {
            employe: null,
            numero: '',
            type: '',
            adresse: '',
            successMessage: '',
            errorMessage: ''
        };
    },
    mounted() {
        this.getEmployeById();
    },
    methods: {
        getEmployeById() {
            const id = 1;
            this.$app.apiGet('v2/personnel/' + id)
                .then((data) => {
                    this.employe = data;
                    this.employe.photo = 'https://img.freepik.com/free-icon/user_318-563642.jpg';
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        formatDate(date) {
            if (!date) return '';
            const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
            return new Date(date).toLocaleDateString(undefined, options);
        },
        updateEmployeTel() {
            const id = 1;
            const url = `http://761epbg2b.amandine.cloud/api/structurePersonnel/POST/${id}/telephone/0`;
            const data = {
                numero: this.numero,
                type: this.type
            };

            this.$app.apiPost(url, data)
                .then((response) => {
                    this.employe.numero = response.numero;
                    this.employe.type = response.type;
                    this.numero = '';
                    this.type = '';
                    this.successMessage = 'Mise à jour réussie !';
                    this.errorMessage = '';
                })
                .catch((error) => {
                    console.error(error);
                    this.successMessage = '';
                    this.errorMessage = 'Erreur lors de la mise à jour du numéro de téléphone.';
                });
        },
        updateEmployeMail() {
            const id = 1;
            const url = `http://761epbg2b.amandine.cloud/api/structurePersonnel/POST/${id}/email/0`;
            const data = {
                adresse: this.adresse,
                type: this.type
            };

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expression régulière pour valider l'adresse e-mail

            if (!emailRegex.test(this.adresse)) { // Vérifier si l'adresse e-mail est valide
                this.errorMessage = 'Adresse e-mail invalide !';
                return; // Arrêter l'exécution de la fonction si l'adresse e-mail est invalide
            }

            this.$app.apiPost(url, data)
                .then((response) => {
                    this.employe.adresse = response.adresse;
                    this.employe.type = response.type;
                    this.adresse = '';
                    this.type = '';
                    this.successMessage = 'Mise à jour réussie !';
                    this.errorMessage = '';
                })
                .catch((error) => {
                    console.error(error);
                    this.successMessage = '';
                    this.errorMessage = 'Erreur lors de la mise à jour de l\'adresse e-mail.';
                });
        }
    }
};
</script>


<style>
.card {
    max-width: 300px;
}
</style>
