class Game {

    constructor(app) {
        this.app = app;
        this.as = "arda";
        this.animalUrl = ["bird.png", "dog.png", "fish.png",
            "fish1.png", "fish2.png", "fox.png",
            "horse.png", "kartPng.png", "kartPng1.png",
            "buttonBg.png", "arkaPlanButton.jpg"
        ];
        this.dd = new LoaderConfig(this.app, this.animalUrl, "images");
        //this.app.loader.add(`ree`, "images/dog.png");
        this.app.loader.onComplete.add((e) => this.doneLoading(e));
        this.app.loader.load();
        // bgSprite = new PIXI.Sprite.from("images/dog.png");
        // bgSprite.width = 200;
        // bgSprite.height = 200;
        // this.app.stage.addChild(bgSprite);
        this.kartContainer = new PIXI.Container();
        this.buttonContainer = new PIXI.Container();
    }
    doneLoading(e) {

        console.log("All DONE LOADİNG");
        this.createButton();

    }
    createButton() {
        let kutucuk22 = new kutu(0, 0, 200, 100, 0XA7C6ED, false, 0.7, this.app.loader.resources["res11"].texture);
        kutucuk22.addChild(newText("2 X 2", 50, kutucuk22));
        let kutucuk24 = new kutu(0, 120, 200, 100, 0XA7C6ED, false, 0.7, this.app.loader.resources["res11"].texture);
        kutucuk24.addChild(newText("2 X 4", 50, kutucuk24));
        let kutucuk34 = new kutu(0, 240, 200, 100, 0XA7C6ED, false, 0.7, this.app.loader.resources["res11"].texture);
        kutucuk34.addChild(newText("3 X 4", 50, kutucuk34));
        kutucuk22.interactive = true;
        kutucuk24.interactive = true;
        kutucuk34.interactive = true;
        kutucuk22.on("pointerdown", (e) => {
            this.removeChild(this.kartContainer);
            this.startGame(2, 2);
        });
        kutucuk24.on("pointerdown", (e) => {
            this.removeChild(this.kartContainer);
            this.startGame(2, 4);
        });
        kutucuk34.on("pointerdown", (e) => {
            this.removeChild(this.kartContainer);
            this.startGame(3, 4);
        });
        this.buttonContainer.addChild(kutucuk22);
        this.buttonContainer.addChild(kutucuk24);
        this.buttonContainer.addChild(kutucuk34);
        this.buttonContainer.x = 30;
        this.buttonContainer.y = (800 - this.buttonContainer.height) / 2;;
        this.app.stage.addChild(this.buttonContainer);
        console.log(this.kartContainer.children.length);
        this.idlist = null;
    }
    removeChild(container) {
        for (var i = container.children.length - 1; i >= 0; i--) {
            container.removeChild(container.children[i]);
        };

    }

    listeOlustur(elemanSayisi) {
        let idlist = []
        for (var i = 1; i <= elemanSayisi / 2; i++) {
            idlist.push(i);
            idlist.push(i);
        }
        return idlist;
    }
    startGame(satir, sutun) {
        this.idlist = this.listeOlustur(satir * sutun);
        let konumX = 0;
        let konumY = 0;
        console.log(this.idlist);
        for (var i = 0; i < satir; i++) {
            for (var j = 0; j < sutun; j++) {

                const random = Math.floor(Math.random() * this.idlist.length); // [0,9)
                console.log("Önce:", this.idlist)
                const id = this.idlist[random];
                this.idlist = this.idlist.filter((item, index) => index != random);
                console.log("Sonra:", this.idlist)
                console.log("random", random, "id:", id, );
                let kutucuk = new kutu(konumX, konumY, 200, 200, 0XA7C6ED, false, 0.8, this.app.loader.resources[`res${id}`].texture);
                this.kartContainer.addChild(kutucuk);
                konumX += 220;
            }
            konumY += 220;
            konumX = 0;
        }
        console.log(this.kartContainer.width, this.kartContainer.height);
        this.kartContainer.x = (1440 - this.kartContainer.width) / 2;
        this.kartContainer.y = (800 - this.kartContainer.height) / 2;
        this.app.stage.addChild(this.kartContainer);
        console.log(this.kartContainer.children.length);
    }

}