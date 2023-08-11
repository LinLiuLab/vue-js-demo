<template>
    <div data-theme="cupcake">
        <div class="navbar bg-base-300 text-base-content fixed top-0">
            <a class="btn btn-ghost normal-case text-xl">Document Manage</a>
        </div>
        <router-view />
        <footer
            class="footer footer-center p-4 bg-base-300 text-base-content"
            style="position: fixed; bottom: 0"
        >
            <div>
                <p>
                    Copyright © 2023 - All right reserved by SE 2023 Teaching
                    Group
                </p>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {};
    },
    mounted() {},
};
</script>

<style></style>
