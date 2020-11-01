<template>
    <v-app :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }" id="login">
    <v-container>
      <v-layout wrap>
        <v-flex sm12 md6 offset-md3>
          <v-card elevation="4" light tag="section">
            <v-card-title>
              <v-layout align-center justify-space-between>
                <h3 class="headline">
                  Procurement Management System
                </h3>
              </v-layout>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-alert v-if="message"
                dense
                outlined
                type="error"
              >
              I'm a dense alert with the <strong>outlined</strong> prop and a <strong>type</strong> of error
            </v-alert>
              <p>Sign in with your username and password:</p>
              <v-form v-model="isloginFormValid" ref="form" @submit.prevent="authenticate">
                <v-text-field
                    :rules="[rules.required]"
                    outlined
                    name="username"
                    label="Username"
                    type="text"
                    v-model="user.username"></v-text-field>
                <v-text-field
                    :rules="[rules.required, rules.min]"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    outlined
                    name="password"
                    label="Password"
                    hint="At least 8 characters"
                    @click:append="showPassword = !showPassword"
                    v-model="user.password"
                ></v-text-field>
                            <v-checkbox :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }"
              v-model="user.remember"
              label="Remember me"
              color="indigo"
              hide-details
            ></v-checkbox>
            <v-divider></v-divider>
            <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
              <v-btn color="info" text>
                Forgot password?
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="info" type="submit" :large="$vuetify.breakpoint.smAndUp"
              :loading="loading"
              :disabled="loading"
              >
                Login
              </v-btn>
            </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
    name: "Login",
    data: () => ({
        user: {
          username: "",
          password: "",
          remember: false,
        },
        showPassword: false,
        loading: false,
        message: "",
        isloginFormValid: false,
        rules: {
          required: value => !!value || 'Required.',
          min: v => (v && v.length >= 8) || 'Min 8 characters',
        },
    }),
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      }
    },
    created() {
      if (this.loggedIn) {
        this.$router.push('/admin');
      }
    },
    methods: {
        authenticate(){
          if (!this.$refs.form.validate()) {
                return
          }
          this.loading = true;
          // this.axios.post('/login', {
          //   username: 'Fred',
          //   password: 'Flintstone',
          //   remember: true
          // })
          // .then(function (response) {
          //   console.log(response);
          // })
          this.$store.dispatch('auth/login', this.user).then(
          () => {
            this.$router.push('/admin');
          },
          error => {
            this.loading = false;
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
          );
        }
    }
}
</script>
<style scoped>
    .v-btn, .v-card{
        border-radius: 4px;
    }
    .v-card__title{
        text-transform: uppercase;
    }
</style>