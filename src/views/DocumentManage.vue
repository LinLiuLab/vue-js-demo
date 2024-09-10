<template>
    <div class="h-screen w-screen">
        <div>
            <div v-if="documents != None && documents.length > 0" class="pt-20">
                <DocumentCard
                    v-for="(doc, index) in documents"
                    v-bind:key="index"
                    @docDelete="showDeleteDocumentModal"
                    @docEdit="editDocument"
                    :title="doc.title"
                    :content="doc.content"
                    :id="doc.id"
                    :published="doc.published"
                    style="
                        margin-top: 30px;
                        width: 33%;
                        margin-left: auto;
                        margin-right: auto;
                    "
                />
            </div>
            <div v-else class="flex h-screen items-center justify-center">
                <div class="alert shadow-lg w-1/3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        class="stroke-info shrink-0 w-6 h-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                    <div class="flex">
                        <div>
                            <h3 class="font-bold">Please Add Document</h3>
                            <div class="text-xs">
                                Click add button on bottom right.
                            </div>
                        </div>
                        <svg
                            class="w-9 h-9 text-info animate-bounce fixed bottom-40 right-12"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 14"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 1v12m0 0 4-4m-4 4L1 9"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        <button
            @click="showAddDocumentModal"
            title="Add Document"
            class="fixed z-90 bottom-20 right-8 bg-info w-16 h-16 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-info hover:drop-shadow-2xl duration-300"
        >
            <svg
                class="w-7 h-7 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 20 20"
            >
                <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
            </svg>
        </button>

        <dialog class="modal" :class="{ 'modal-open': showAddModal }">
            <form method="dialog" class="modal-box w-11/12 max-w-5xl">
                <h3 class="font-bold text-lg">Add New Document</h3>

                <div class="card">
                    <label class="label">
                        <span class="label-text">Title</span>
                    </label>
                    <input
                        type="text"
                        v-model="new_doc.title"
                        class="text-2xl input input-bordered"
                        style="width: 100%"
                    />

                    <label class="label">
                        <span class="label-text">Content</span>
                    </label>
                    <textarea
                        class="textarea input-bordered textarea-md"
                        v-model="new_doc.content"
                    ></textarea>
                </div>

                <div class="flex float-right">
                    <div class="modal-action mr-3">
                        <button class="btn btn-success" @click="addDocument">
                            Add
                        </button>
                    </div>
                    <div class="modal-action">
                        <button class="btn btn-ghost" @click="cancelAdd">
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </dialog>

        <dialog class="modal" :class="{ 'modal-open': showDeleteModal }">
            <form method="dialog" class="modal-box">
                <h3 class="font-bold text-lg">Delete</h3>
                <p class="py-4">
                    Do you want to delete document
                    <span class="font-bold">{{ delete_doc.title }}</span
                    >?
                </p>
                <div class="modal-action">
                    <div>
                        <button class="btn btn-error" @click="deleteDocument">
                            Delete
                        </button>
                        <button class="btn btn-ghost ml-3">Close</button>
                    </div>
                </div>
            </form>
        </dialog>
    </div>
</template>

<script>
import DocumentCard from "@/components/DocumentCard.vue";
import { startWindToast } from "@mariojgt/wind-notify/packages/index.js";
import axios from "axios";

export default {
    name: "DocumentManage",
    components: {
        DocumentCard,
    },
    data: () => ({
        base_url: "http://localhost:8000/",
        documents: [],
        new_doc: {
            title: "",
            content: "",
            published: true,
        },
        showAddModal: false,
        showDeleteModal: false,
        delete_doc: {
            id: -1,
            title: "",
            published: true,
        },
    }),
    mounted() {
        this.getDocuments();
    },
    methods: {
        getDocuments() {
            axios
                .get(this.base_url + "document/")
                .then((response) => {
                    this.documents = response.data.documents;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        toggleAddModal() {
            this.showAddModal = !this.showAddModal;
        },
        showAddDocumentModal() {
            this.toggleAddModal();
        },
        toggleDeleteModal() {
            this.showDeleteModal = !this.showDeleteModal;
        },
        showDeleteDocumentModal(id, title) {
            this.delete_doc = {
                id: id,
                title: title,
                published: true,
            };
            this.toggleDeleteModal();
        },
        cancelAdd() {
            this.toggleAddModal();
        },
        addDocument() {
            axios
                .post(this.base_url + "document/", this.new_doc)
                .then((response) => {
                    console.log(response);
                    // close modal
                    this.toggleAddModal();
                    // update documents list
                    this.getDocuments();
                    // reset new_doc
                    this.new_doc = {
                        title: "",
                        content: "",
                        published: true,
                    };
                    // show toast
                    startWindToast("Add document successfully!", "success");
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        deleteDocument() {
            if (this.delete_doc.id === -1) {
                startWindToast("Please select document to delete", "warning");
                return;
            }
            axios
                .delete(this.base_url + "document/" + this.delete_doc.id)
                .then((response) => {
                    this.toggleDeleteModal();
                    startWindToast(
                        "Delete document " +
                            this.delete_doc.title +
                            " successfully!",
                        "success"
                    );
                    console.log(response);
                    this.getDocuments();
                })
                .catch((error) => {
                    startWindToast("Delete document failed!", "error");
                    console.log(error);
                });
        },
        editDocument() {
            this.getDocuments();
        },
    },
};
</script>
