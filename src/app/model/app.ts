import { Subscription } from './subscription';

export class App {
    constructor(public id: string,
                public name: string,
                public description: string,
                public categories: string[],
                public subscriptions: Subscription[]

                ) {

    }
}
