// export interface Todo {
//     title: string;
//     description: string;
//     onDate: string;
//     cardColor: string;
// }

export interface Todo_s { /////////
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
        "todoId": string
    }
}