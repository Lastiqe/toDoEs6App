class Utills {
    constructor() {
        //    
    }
    generateId() {
        const id = `f${(+new Date).toString(16)}`;
        return id
    }
    generateTaskProps(status, text, id) {
        return {
            id: id,
            status: status,
            text: text
        }
    }
}

export const utills = new Utills();