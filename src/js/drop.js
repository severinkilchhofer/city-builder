class App {

    static init(ids) {

        App.boxes = ids.map(id => document.querySelector(id));


        App.boxes.forEach(box => box.addEventListener("dragstart", App.dragstart));
        App.boxes.forEach(box => box.addEventListener("dragend", App.dragend));

        const containers = document.getElementsByClassName('holder');

        for (const container of containers) {
            container.addEventListener("dragover", App.dragover);
            container.addEventListener("dragenter", App.dragenter);
            container.addEventListener("dragleave", App.dragleave);
            container.addEventListener("drop", App.drop)
        }
    }

    static dragstart() {
        this.className += " held";
        App.currentBox = App.boxes.find(box => box.id === this.id);
        state.gamePlay.droppedElementId = App.currentBox.dataset.id;
        setTimeout(() => this.className = "invisible", 0);
        const currentElement = state.land.findIndex(entry => entry.id == this.parentElement.dataset.id);
        if (currentElement > -1) {
            state.land.splice(currentElement, 1);
        }
    }

    static dragend() {
        this.className = "box";
    }

    static dragover(e) {
        e.preventDefault()
    }

    static dragenter(e) {
        e.preventDefault();
        this.className += " hovered"
    }

    static dragleave() {
        this.className += "holder"
    }

    static drop() {
        displayNone(state.gamePlay.droppedElementId);
        this.className += "holder dropped";
        this.append(App.currentBox);

        state.land.push({
            id: +this.dataset.id,
            typ: App.currentBox.dataset.typ,
            einwohner: App.currentBox.dataset.einwohner,
            miete: App.currentBox.dataset.miete,
            kosten: App.currentBox.dataset.kosten
        });

        updateEinwohner();
        updateMonatsmiete();
        checkIsFinished();
    }

}

document.addEventListener("DOMContentLoaded", () => App.init(['#behoerde', '#cafe', '#wohnhaus', '#tanteemmaladen', '#apotheke', '#arztpraxis', '#buerogebaude', '#club', '#spital', '#baeckerei', '#altersheim', '#tankstelle', '#coiffeur', '#gefaengnis', '#brauerei', '#bank', '#blumenladen', '#startupbuero', '#versicherung', '#kino']));
