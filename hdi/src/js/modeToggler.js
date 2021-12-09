class ModeToggler {
    constructor(mode){
        this.mode = mode;
        this.label1 = [];
        this.temporalRelation = [];
        this.spatialRelation = [];
        this.label2 = [];
        this.recentQuery = {};
        this.queries = [];
        this.queryTimes = [];
        this.time = new Date().getTime();
    }

    log_time(){
        let diff = (new Date().getTime() - this.time) / 1000;
        this.queryTimes.push(diff);
        this.time = new Date().getTime();
    }

    clear_inputs(){
        let x = $('.searchInput').children();
        for (var i=0; i < x.prevObject.length; i++){
            x.prevObject[i].value = "";
        }
        this.label1 = [];
        this.temporalRelation = [];
        this.spatialRelation = [];
        this.label2 = [];
        this.recentQuery = {};
        this.queryTimes = [];
        this.queries = [];
    }

    get_data(){
        return {
            "mode": this.mode,
            "label1": this.label1,
            "temporalRelation": this.temporalRelation,
            "spatialRelation": this.spatialRelation,
            "label2": this.label2,
            "queryTimes": this.queryTimes,
            "queries": this.queries,
        };
    }

    save_data(type){
        let x = $('.searchInput'),
            query = {"type": type};
        for (let i=0; i<x.length; i++){
            let input_name = x[i].id.split("Input")[0],
                input_value = x[i].value;
            switch (input_name) {
                case "label1":
                    this.label1.push(input_value);
                    break;
                case "temporalRelation":
                    this.temporalRelation.push(input_value);
                    break;
                case "spatialRelation":
                    this.spatialRelation.push(input_value);
                    break;
                case "label2":
                    this.label2.push(input_value);
                    break;
                default:
                    break;
            }
            query[input_name] = input_value;
        }
        this.recentQuery = query;
        this.queries.push(query);
    }

    change_mode(new_mode) {
        this.clear_inputs();
        this.disable_mode();
        this.mode = new_mode;
        this.enable_mode();
    }

    disable_mode(){
        $(`input[id='${this.mode}']`).prop("checked", false);
    }

    enable_mode(){
        $(`input[id='${this.mode}']`).prop("checked", true);
    }

}