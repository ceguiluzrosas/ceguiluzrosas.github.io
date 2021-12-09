class SaveImages {
    constructor(mode){
        this.mode = mode;
        this.numImages = 0;
        this.imageNames = [];
        this.saveImageContainer = $("div[id='savedImages']");
        // this.subImageContainer = $("div[id='subsetImages']");

    }

    // get_imageNames(){
    //     return this.imageNames;
    // }

    get_data(){
        return {"mode": this.mode, "saveImages": this.imageNames}
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

    sort_names(){
        return this.imageNames.sort((a,b)=>a-b)
    }

    unpopulate_subsets(){
        this.imageContainer.children().remove()
    }

    find_neighbor(curNumber){
        for(let i=0; i<this.imageNames.length-1; i++){
            if (this.imageNames[i] <= curNumber && curNumber < this.imageNames[i+1]) {
                let id = `save.${this.imageNames[i+1]}.jpg`;
                console.log(`[save] neighbor: ${id}`);
                return $('#savedImages').find(`div[id='${id}']`);
            }
        }
        return null;
    }

    insert_image(imageDiv, imgName){
        console.log(`[save] insert_image: ${imgName}`)
        let num = imgName.split(".")[1],
            fileName = `${num}.jpg`;
        this.imageNames.push(num);
        this.imageNames = this.sort_names();
        let neighborDiv = this.find_neighbor(num);
        console.log(neighborDiv);
        console.log(this.imageNames);
        if (neighborDiv == null){
            this.saveImageContainer.append(imageDiv);
        } else {
            $(imageDiv).insertBefore($(neighborDiv));
        }
        this.update_numImages(1);
    }

    add_image(target) {
        let imageDiv = target.clone(),
            fileNum = $(imageDiv).attr('id').split(".")[1],
            name = `save.${fileNum}.jpg`;
        console.log()
        imageDiv.removeClass('subImgTagContClicked');
        imageDiv.removeAttr("onclick");
        imageDiv.attr("id", name)
        imageDiv.children("span").remove();
        imageDiv.children("br").remove();
        this.insert_image(imageDiv, name);
    }

    remove_imageName(num) {
        this.imageNames = this.imageNames.filter(a => a != num)
        this.update_numImages(-1);
    }

    remove_image(imageDiv) {
        let num = $(imageDiv).attr('id').split(".")[1],
            name = `save.${num}.jpg`,
            ele = $('#savedImages').find(`div[id='${name}']`);
        console.log(name);
        console.log(ele)
        ele.remove();
        ele.attr("onclick", "bye(this)");
        this.remove_imageName(num);
    }

    update_numImages(value){
        this.numImages += value;
    }


}