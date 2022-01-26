export class ingredients {
    "ingredientsList": string
}

export class calories {
    "servings": number;
    "calories": number
}

export class Recept {
    "_id": string;
    "userID": string;
    "name": string;
    "description": string;
    "img": string;
    "preparation": number;
    "cooking": number;
    "instructions": string;
    "stars": number[];
    "avg": number;
    "ingredients": ingredients;
    "calories": calories;
}
