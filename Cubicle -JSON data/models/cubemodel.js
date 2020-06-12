const fs = require('fs');
const path = require('path');

class CubeModel{
    constructor(){
        this.data = require('../config/database.json');
    }
    _write(newData,resolveData){
        return new Promise((resolve,reject)=>{
            fs.writeFile(path.resolve('config/database.json'),JSON.stringify(newData,null,2),(err)=>{
                if (err) {
                    reject(err);
                    return;
                }
                this.data = newData;
                resolve(resolveData);
            });
        });
    }

    create(name,description,imageUrl,difLevel){
        return {name,description,imageUrl,difLevel};
    }

    insert(newCube){
        const newIndex = ++this.data.lastIndex;
        newCube ={id:newIndex ,...newCube}
        const newData = {
            lastIndex : newIndex,
            entries: this.data.entries.concat(newCube)
        }

        return this._write(newData,newCube)
    };

    update(cubeId, updates) {
        const entriesIndex = this.data.entries.findIndex( ( {id} ) => id === cubeId)
        const entrie = this.data.entries[entriesIndex];
        const updateEntries = { ...entrie, ...updates };

        const newData = {
            lastIndex: this.data.lastIndex,
            entries: [
                ...this.data.entries.slice(0, entriesIndex),
                updateEntries,
                ...this.data.enrties.slice(entriesIndex + 1)
            ]
        };

        return this._write(newData,updateEntries)
    }

    delete(id) {
        const deletetEntrie = this.getCurent(id)

        const newData = {
            lastIndex: this.data.lastIndex,
            entries: this.data.enrties.filter(({id : i}) => i !== id)
        };
        return this._write(newData,deletetEntrie)
    }

    getCurent(id) {
        return Promise.resolve(this.data.entries.find(({ id: i }) => i === id))
    }

    getAll() {
        return Promise.resolve(this.data.entries)
    }
}

module.exports = new CubeModel();