export namespace main {
	
	export class Todo {
	    Id: string;
	    Title: string;
	    Desc: string;
	    Completed?: boolean;
	    CreatedAt?: string;
	    CompletedAt?: string;
	
	    static createFrom(source: any = {}) {
	        return new Todo(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Id = source["Id"];
	        this.Title = source["Title"];
	        this.Desc = source["Desc"];
	        this.Completed = source["Completed"];
	        this.CreatedAt = source["CreatedAt"];
	        this.CompletedAt = source["CompletedAt"];
	    }
	}

}

