let feedbacks = [];

let nextId = 1;

function getAll() {
  return feedbacks;
}

function addOne(sender, message, rating) {
  if (!sender || !message || !rating) {
    return false;
    } 
    const newFeedback = {
        id: nextId++,
        sender,
        message,
        rating,
    }
    feedbacks.push(newFeedback)
    return newFeedback
}

function findByID(id){
    const feedback = feedbacks.find((item)=>item.id==id)
    if (feedback){
        return feedback 
    
    } else {
        return false
    }

}

function updateOneByID(id,updateData){
    const feedback = findByID(id)
    if (feedback){
        if (updateData.sender){
            feedback.sender = updateData.sender
        }
        if (updateData.message){
            feedback.message = updateData.message
        }

        if (updateData.rating==undefined){
            feedback.rating = updateData.rating
        }
        return feedback
    }
    return false
    
}

function deleteOneByID(id){
    const feedback = findByID(id)
    if (feedback){
        const initialLength = feedbacks.length
        feedbacks = feedbacks.filter ((feedback)=>feedback.id!=id)
        return feedbacks.length < initialLength
    }
    return false
}

if (require.main === module) {
 let result = addOne("John Smith",  "Great session on React components! I found the examples very helpful.", 4);
 console.log(result);
 console.log("getAll called:", getAll());
 console.log("findById called:", findByID(1));
 // rest of the tests here
 console.log("updateOne called:",updateOneByID(1,{"sender":"John Smith","message":"Great session on React components","rating":5}))
 console.log("FindbyId called after feedback updated:",findByID(1))
 console.log("DeletedOnebyID called:",deleteOneByID(1))
 console.log("FindbyID called after feedback deleted:",findByID(1))
}
Feedback= {
    getAll,
    addOne,
    findByID,
    updateOneByID,
    deleteOneByID

}
module.exports= Feedback