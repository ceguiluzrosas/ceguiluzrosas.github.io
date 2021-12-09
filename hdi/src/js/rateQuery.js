class RateQuery {
    constructor(mode){
        this.compRate = [];
        this.sigRate = [];
        this.enjoyRate = [];
    }

    add_rates(comp, sig, enjoy){
        this.compRate.push(comp);
        this.sigRate.push(sig);
        this.enjoyRate.push(enjoy);
    }

    clear_everything(){
        this.compRate = [];
        this.sigRate = [];
        this.enjoyRate = [];
    }

    change_mode(new_mode){
        this.mode = new_mode;
        this.clear_everything();
        this.reset_inputs();
    }

    reset_inputs(){
        $("#compRate")[0].value = 3;
        $("#sigRate")[0].value = 3;
        $("#enjoyRate")[0].value = 3;
    }

    get_data(){
        return {"mode": this.mode, "comp": this.compRate, "sig": this.sigRate, "enjoy": this.enjoyRate}
    }
}
