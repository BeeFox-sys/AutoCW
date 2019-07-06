

module.exports = {
    getById: async (id, model)=>{
        return new Promise(async (resolve)=>{
            var doc = model.findById(id)
            if(doc != null) return resolve(doc)
            doc = await new model({
                _id:id
            })
            return doc.save((err,doc)=>{
                if (err) return console.error(err)
                return resolve(doc);
            })
        })
    }
}