<!-- eslint-disable vue/no-mutating-props -->
<template>
    <v-dialog v-model="dialog" persistent width="1024px" @input="$emit('input', $event)">
        <!-- <template v-slot:activator="{ props }">
                <v-btn color="primary" v-bind="props">Open Dialog</v-btn>
            </template> -->
        <v-card justify="center">
            <v-card-title>
                <span class="text-h5">User Profile</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Legal first name*" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Legal middle name"
                                hint="example of helper text only on focus"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Legal last name*" hint="example of persistent helper text" persistent-hint
                                required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Email*" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Password*" type="password" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select :items="['0-17', '18-29', '30-54', '54+']" label="Age*" required></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-autocomplete
                                :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                label="Interests" multiple></v-autocomplete>
                        </v-col>
                    </v-row>
                </v-container>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="close()">
                    Close
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
  
<script>
export default {
    name: "ChapterDialog",
    props: {
        season: String,
        episode: String,
        chapterTitle: String,
        chapterContent: Text,
        access: String,
        price: Int32Array,
        //dialog: Boolean
    },
    data() {
        return {
            // season: '',
            // episode: '',
            // chapterTitle: '',
            // chapterContent: '',
            // access: '',
            // price: '',
            dialog: false
        };
    },
    methods: {

        close() {
            // this.$emit('closeDialog')
            this.dialog = false
        },
        createChapter() {
            // Perform chapter creation logic here
            // You can emit an event to notify the parent component
            // or make an API request to create the chapter
            // After chapter creation, close the dialog
            this.closeDialog();
        },
    },
    computed: {
    }
};
</script>