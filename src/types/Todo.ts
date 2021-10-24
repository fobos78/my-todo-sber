
export interface Todo {
    id: number;
    title: string;
    done: boolean;
    select: boolean;
}

// export interface Todo {
//     title: string;
//     description: string;
//     onDate: string;
//     cardColor: string;
// }

export interface TodoDTO { /////////
    "status"?: string,
    "message"?: string,
    "todo": {
        "timestamps"?: {
            "completedOn": null,
            "createdOn": string,
            "modifiedOn": string
        },
        "description"?: string,
        "cardColor"?: string,
        "isCompleted"?: boolean,
        "_id": string,
        "title": string,
        "onDate"?: string,
        "__v": number,
        "todoId"?: string
    }
}