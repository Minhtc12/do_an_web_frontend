<template>
    <div  v-if="contact"class="page">
        <h4>Thêm Liên hệ</h4>
        <ContactForm :contact="contact" 
        @submit:contact="createContact"/>
        <p>{{ message }}</p>
    </div>
</template>
<script>
    import ContactForm from "@/components/ContactForm.vue";
    import ContactService from "@/services/contact.service";
    export default {
        components: {
            ContactForm,
        },
        // props: {
        //     id: { type: String, required: true },
        // },
    data() {
        return {
            contact: {
                name: "",
                email: "",
                address: "",
                phone: "",
                favorite: false,
            },
            message: "",
        };
    },
    methods: {
        async createContact(data) {
            try {
                await ContactService.create(data);
                alert('Liên hệ được Thêm thành công.');
                this.$router.push({ name: "contactbook" });
            } catch (error) {
                console.log(error);
            }
        },
    },
    //  created() {
    //      this.createContact(this.data)
    //        this.message = "";
    //    },
};
</script>