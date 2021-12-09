class Subset {
    constructor(mode){
        this.mode = mode;
        this.numImages = 0;
        this.imageNames = [];
        this.imageContainer = $("div[id='subsetImages']");
        this.regSearchBttn = $("button[id='regularSearch']");
        this.subSearchBttn = $("button[id='subSearch']");
    }

    get_imageNames(){
        return this.imageNames;
    }

    clear_everything(){
        this.numImages = 0;
        this.imageNames = [];
    }

    change_mode(new_mode){
        this.mode = new_mode;
        this.clear_everything();
        this.unpopulate_subsets();
    }

    sort_names(unordered_names){
        return unordered_names.sort((a,b)=>a-b)
    }

    unpopulate_subsets(){
        this.imageContainer.children().remove()
    }

    find_neighbor(name){
        console.log(`[subset] find_neighbor:${name}`)
        let curNumber = name.split(".")[0];
        for(let i=0; i<this.imageNames.length-1; i++){
            if (this.imageNames[i] <= curNumber && curNumber < this.imageNames[i+1]) {
                return $('#subsetImages').find(`div[id='sub.${this.imageNames[i+1]}.jpg']`)
            }
        }
        return null;
    }

    insert_image(imageDiv, imgName){
        console.log(`[subset] insert_image: ${imgName}`)
        let name = imgName.split(".")[1];
        this.imageNames.push(name);
        this.imageNames = this.sort_names(this.imageNames);
        let neighborDiv = this.find_neighbor(name);
        if (neighborDiv == null){
            this.imageContainer.append(imageDiv);
        } else {
            $(imageDiv).insertBefore($(neighborDiv));
        }
        this.update_numImages(1);
    }

    add_image(target) {
        let imageDiv = target.clone(),
            name = `sub.${$(imageDiv).attr('id')}`;
        imageDiv.removeClass('imgTagContainer');
        imageDiv.removeClass('imgTagContClicked');
        imageDiv.removeAttr("onclick");
        imageDiv.attr("onclick", "bye(this)");
        imageDiv.attr("id", name)
        imageDiv.addClass('grid-item');
        this.insert_image(imageDiv, name);
    }

    remove_imageName(name) {
        this.imageNames = this.imageNames.filter(a => a != name)
        this.update_numImages(-1);
    }

    remove_image(imageDiv) {
        console.log(`[save_image] remove_image: ${$(imageDiv).attr('id')}`)
        let name = $(imageDiv).attr('id').split(".")[0];
        $('#subsetImages').find(`div[id='sub.${name}.jpg']`).remove();
        console.log(`[subset] remove image: ${name}`)
        this.remove_imageName(name);
    }

    update_numImages(value){
        this.numImages += value;
        if (this.numImages == 0) {
            this.subSearchBttn.css({'display': 'none'});
            this.regSearchBttn.css({'display': 'block'});
        } else {
            this.regSearchBttn.css({'display': 'none'});
            this.subSearchBttn.css({'display': 'block'});
        }
    }
}