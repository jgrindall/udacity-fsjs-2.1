import {Book, BookStore} from "../../src/models/book";
const store = new BookStore();

describe("Test books store", ()=>{

    let idCreated: number;

    it("index works", async ()=>{
        const books:Book[] = await store.index();
        expect(books).toBeTruthy();
        expect(books).toEqual([]);
    });

    it("create", async()=>{
        const b:Book = {
            title:"My favourite cake recipes",
            author:"John",
            total_pages:120,
            summary:"All about cakes"
        };
        const book:Book = await store.create(b);
        expect(book).toBeTruthy();
        expect(book.total_pages).toEqual(120);
        idCreated = book.id as number;

    });

    it("show", async()=>{
        const book:Book = await store.show(idCreated);
        expect(book).toBeTruthy();
        expect(book.total_pages).toEqual(120);
    });

    it("delete", async()=>{
        const book:Book = await store.delete(idCreated);
        expect(book).toBeTruthy();
        expect(book.total_pages).toEqual(120);

        const books:Book[] = await store.index();
        expect(books).toBeTruthy();
        expect(books).toEqual([]);
    });

});

