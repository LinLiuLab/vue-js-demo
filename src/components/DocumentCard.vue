<template>
    <div v-if="!if_edit" class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">{{ title }}</h2>
            {{ content }}
            <div class="card-actions justify-end">
                <button class="btn btn-primary" @click="editDocument">
                    Edit
                </button>
                <button class="btn btn-ghost" @click="deleteDocument">
                    Delete
                </button>
            </div>
        </div>
    </div>
    <div v-else class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">
                <input
                    type="text"
                    v-model="edit_doc.title"
                    class="text-2xl input input-bordered"
                    style="width: 100%"
                />
            </h2>
            <textarea
                class="textarea input-bordered textarea-md"
                v-model="edit_doc.content"
            ></textarea>
            <div class="card-actions justify-end">
                <button class="btn btn-primary" @click="finishEdit">
                    Done
                </button>
                <button class="btn btn-ghost" @click="cancelEdit">
                    Cancel
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { startWindToast } from "@mariojgt/wind-notify/packages/index.js";

export default {
    name: "DocumentCard",
    emits: ["docDelete", "docEdit"],
    props: {
        id: Number,
        title: String,
        content: String,
        published: Boolean,
    },
    data() {
        return {
            base_url: "http://localhost:8000/",
            if_edit: false,
            edit_doc: {
                id: this.id,
                title: this.title,
                content: this.content,
                published: this.published,
            },
        };
    },
    methods: {
        deleteDocument() {
            this.$emit("docDelete", this.id, this.title);
        },
        editDocument() {
            this.edit_doc = {
                id: this.id,
                title: this.title,
                content: this.content,
                published: this.published,
            };
            this.if_edit = true;
        },
        finishEdit() {
            this.if_edit = false;
            axios
                .put(
                    this.base_url + "document/" + this.edit_doc.id + "/",
                    this.edit_doc
                )
                .then((response) => {
                    startWindToast("Edit document successfully!", "success");
                    this.$emit("docEdit");
                    console.log(response);
                })
                .catch((error) => {
                    startWindToast("Edit document failed!", "error");
                    console.log(error);
                });
        },
        cancelEdit() {
            this.if_edit = false;
        },
    },
};
</script>
